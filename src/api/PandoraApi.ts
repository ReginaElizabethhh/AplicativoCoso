import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const {authState} = useContext(AuthContext);
export const pandoraApi = axios.create();

