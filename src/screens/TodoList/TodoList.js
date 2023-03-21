import { TouchableOpacity, FlatList, Alert } from "react-native";

import {
  Container,
  OrderByContainer,
  TextEmptyList,
  TextOrderBy,
  ListContainer,
} from "./TodoList.styles";

import { useState, useEffect } from "react";

import * as Database from "../../libs/Database";
import { TODO_LIST } from "../TodoForm/TodoForm";

import AppItem from "../../components/AppItem/AppItem";

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const ORDER_BY_DESCRIPTION = "ORDER_BY_DESCRIPTION";
const ORDER_BY_ID = "ORDER_BY_ID";

const TodoList = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState(ORDER_BY_ID);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    console.log("loading stored data");
    fetchDatabase();
  }, [route]);

  function fetchDatabase() {
    Database.getItems(TODO_LIST).then((items) => setItems(items));
  }

  async function handleEditPress(list, id) {
    const item = await Database.getItem(list, id);
    navigation.navigate("TodoForm", item);
  }

  function handleDeletePress(list, id) {
    Alert.alert("Attention", "Are you sure of deleting this item?", [
      {
        text: "No",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Database.deleteItem(list, id).then((response) => fetchDatabase());
        },
      },
    ]);
  }

  function handleOrderByDescription() {
    setOrderBy(ORDER_BY_DESCRIPTION);
    setItems(
      items.sort(function (a, b) {
        if (a.description > b.description) {
          return 1;
        } else if (a.description < b.description) {
          return -1;
        }
        return 0;
      })
    );
  }

  function handleOrderById() {
    setOrderBy(ORDER_BY_ID);
    setItems(
      items.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
    );
  }

  return (
    <Container>
      {console.log("items", items)}
      <OrderByContainer>
        <TouchableOpacity onPress={handleOrderById}>
          <TextOrderBy
            color={orderBy === ORDER_BY_ID ? theme.state.baseColor : "#d6d6d6"}
          >
            Order By ID
          </TextOrderBy>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOrderByDescription}>
          <TextOrderBy
            color={
              orderBy === ORDER_BY_DESCRIPTION
                ? theme.state.baseColor
                : "#d6d6d6"
            }
          >
            Order By Description
          </TextOrderBy>
        </TouchableOpacity>
      </OrderByContainer>
      <ListContainer>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <AppItem
              item={item}
              handleDeletePress={() => handleDeletePress(TODO_LIST, item.id)}
              handleEditPress={() => handleEditPress(TODO_LIST, item.id)}
            />
          )}
          ListEmptyComponent={<TextEmptyList>0 tasks created.</TextEmptyList>}
          keyExtractor={(item) => item.id}
          extraData={items}
        />
      </ListContainer>
    </Container>
  );
};
export default TodoList;
