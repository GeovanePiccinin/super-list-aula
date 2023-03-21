import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopList from "../screens/ShopList/ShopList";
import ShopForm from "../screens/ShopForm/ShopForm";
import { Feather as Icon } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const Stack = createNativeStackNavigator();

const ShopListNavigator = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopList"
        component={ShopList}
        options={({ navigation }) => ({
          title: "Shop List",
          headerStyle: {
            backgroundColor: theme.state.baseColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Icon
              name="plus"
              type="feather"
              color="#fff"
              size={23}
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("ShopForm")}
            />
          ),
        })}
      />
      <Stack.Screen
        options={{
          title: "Shop Item",
          headerStyle: {
            backgroundColor: theme.state.baseColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="ShopForm"
        component={ShopForm}
      />
    </Stack.Navigator>
  );
};

export default ShopListNavigator;
