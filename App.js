import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import firebase from "./src/firebase/config";
import Login from "./src/screens/Login/Login";
import Registration from "./src/screens/Registration/Registration";

const Stack = createNativeStackNavigator();

console.log(firebase);

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={DrawerNavigator}
          />

          <Stack.Screen
            name="Registration"
            options={{ headerShown: false }}
            component={Registration}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
