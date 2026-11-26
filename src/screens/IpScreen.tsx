
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const IpScreen = () => {
    const {authState, changeIp} = useContext(AuthContext);
    const [ipState, setIpState] = useState("");

    const Coso = (coso:string) => {
        console.log("Ejecutando ip ingresada...");
        console.log("IP ingresada:", coso);
        changeIp(coso);
        console.log("Esta es la ip desde el context: ", authState);
    }

    return (
        <View>
            <Text>Ingresa la ip</Text>

            <TextInput
                value={ipState}
                onChangeText={(texto) => setIpState(texto)}
            />

            <TouchableOpacity
                onPress={()=>Coso(ipState)}
            >
                <Text>Subir ip</Text>
            </TouchableOpacity>
        </View>
    );
}
