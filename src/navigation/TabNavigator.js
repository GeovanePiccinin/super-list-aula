import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoListNavigator from "./TodoListNavigator";
import ShopListNavigator from "./ShopListNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#32264d",
        tabBarInactiveTintColor: "#c1bccc",
        tabBarActiveBackgroundColor: "#ebebf5",
        tabBarInactiveBackgroundColor: "#fafafc",
        headerStyle: {
          backgroundColor: "#2176FF",
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          position: "absolute",
          top: 15,
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        options={{ tabBarLabel: "Todo List" }}
        name="TodoListNavigator"
        component={TodoListNavigator}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Shop List" }}
        name="ShopListNavigator"
        component={ShopListNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
