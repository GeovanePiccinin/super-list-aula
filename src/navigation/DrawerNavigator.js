import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useEffect } from "react";
import Settings from "../screens/Settings/Settings";
import TabNavigator from "./TabNavigator";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import firebase, { auth } from "../firebase/config";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          signOut(auth)
            .then(() => {
              console.log("signout successfully");
              props.navigation.closeDrawer();
              props.navigation.navigate("Login");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Login");
    } else {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigation.navigate("Login");
        }
      });
    }
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.state.baseColor },
        headerTitleStyle: { color: "#fff" },
        drawerStyle: {
          backgroundColor: "#e3e3e6",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: theme.state.baseColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
