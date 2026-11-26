import { useCallback, useEffect, useState } from "react";
import { pandoraApi } from "../api/PandoraApi";
import { Welcome } from "../interfaces/dispositivosResponse";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const {authState} = useContext(AuthContext);

interface UseDataResponse {
  data: Welcome | undefined;
  isLoading: boolean;
  loadData: () => Promise<void>;
}

export const useDataResponse = (): UseDataResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Welcome | undefined>(undefined);

  const loadData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await pandoraApi.get<Welcome>(
        `http://${authState.ip}:3000/dispositivo/consultas/data`
      );

      setData(response.data);
      console.log("Dispositivos recibidos correctamente");
    } catch (error) {
      console.error("Error al cargar dispositivos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return { data, isLoading, loadData };
};
