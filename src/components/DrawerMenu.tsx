
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";


interface BtnProps {
  action: () => void;
  text: string;
}

const BtnMenu = ({ action, text }: BtnProps) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={style.textBg}>
        <Text style={style.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View style={style.container}>
        <View style={style.avatarBorder}>
          <Image
            style={style.avatar}
            source={{
              uri: "https://i.postimg.cc/ryZpyDPr/stacymewgenics.jpg",
            }}
          />
        </View>

        <Text style={style.username}>User: Regina</Text>

        <View style={style.container}>
          <BtnMenu
            text="Pokedex"
            action={() => navigation.navigate("PokemonNavigator")}
          />

          <BtnMenu
            text="Pantallas"
            action={() => navigation.navigate("StackNavigator")}
          />

          <BtnMenu
            text="Formulario"
            action={() => navigation.navigate("FormScreen")}
          />

          <BtnMenu
            text="Graficas"
            action={() => navigation.navigate("dispositivoScreen")}
          />

          <BtnMenu
          text="Pantalla Ip"
          action={() => navigation.navigate("IpScreen")}
          />

        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBg: {
    backgroundColor: "#E9F1DD",
    borderColor: "#C65D5D",
    borderRadius: 10,
    borderWidth: 5,
    marginTop: 10,
    width: 240,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  avatar: {
    borderColor: "#C65D5D",
    borderRadius: 100,
    borderWidth: 10,
    height: 180,
    width: 180,
  },
  avatarBorder: {
    borderColor: "white",
    borderRadius: 100,
    borderWidth: 10,
    height: 200,
    width: 200,
  },
  username: {
    fontSize: 40,
    color: "#C65D5D",
    fontWeight: "bold",
  },
});
