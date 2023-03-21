import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
