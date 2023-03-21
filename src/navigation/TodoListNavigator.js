import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "../screens/TodoList/TodoList";
import TodoForm from "../screens/TodoForm/TodoForm";
import { Feather as Icon } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

const TodoListNavigator = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={({ navigation }) => ({
          title: "Todo List",
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
              onPress={() => navigation.navigate("TodoForm")}
            />
          ),
        })}
      />

      <Stack.Screen
        options={{
          title: "Task",
          headerStyle: {
            backgroundColor: theme.state.baseColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="TodoForm"
        component={TodoForm}
      />
    </Stack.Navigator>
  );
};

export default TodoListNavigator;
