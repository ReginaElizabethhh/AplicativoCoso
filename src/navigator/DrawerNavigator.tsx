
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";
import { PokemonNavigator } from "./PokemonNavigator";
import { useWindowDimensions } from "react-native";
import { DrawerMenu } from "../components/DrawerMenu";
import { FormScreen } from "../screens/FormScreen";
import { DispositivoScreen } from "../screens/dispositivoScreen";
import { IpScreen } from "../screens/IpScreen";

export type RootDrawerParams = {
  StackNavigator: undefined;
  PokemonNavigator: undefined;
  FormScreen: undefined;
  dispositivoScreen: undefined;
  IpScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="PokemonNavigator"
      screenOptions={{
        headerShown: true,
        drawerType: width > 720 ? "permanent" : "front",
        drawerPosition: "right",
        overlayColor: "rgba(99,61,67,0.35)",

        drawerStyle: {
          backgroundColor: "#E8B8B8",
          width: width > 720 ? 280 : width * 0.75,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
        },

        headerStyle: {
          backgroundColor: "#C65D5D",
          elevation: 0,
          shadowOpacity: 0,
        },

        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,

        drawerActiveTintColor: "#C65D5D",
        drawerInactiveTintColor: "#633D43",
        drawerActiveBackgroundColor: "#FFF9F7",

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          marginLeft: 5,
        },

        drawerItemStyle: {
          borderRadius: 15,
          marginHorizontal: 10,
          marginVertical: 4,
        },
      }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{ title: "Inicio" }}
      />

      <Drawer.Screen
        name="PokemonNavigator"
        component={PokemonNavigator}
        options={{ title: "Pokédex" }}
      />

      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ title: "Formulario" }}
      />

      <Drawer.Screen
        name="dispositivoScreen"
        component={DispositivoScreen}
        options={{ title: "Graficas" }}
      />

      <Drawer.Screen
        name="IpScreen"
        component={IpScreen}
        options={{ title: "Ip Screen" }}
      />

    </Drawer.Navigator>
  );
};
