
import React, { type ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/navigator/DrawerNavigator";
import { AuthProvider } from "./src/context/AuthContext";

const App = () => {

  return (
    <AppState>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AppState>
  );

}

const AppState = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default App;
