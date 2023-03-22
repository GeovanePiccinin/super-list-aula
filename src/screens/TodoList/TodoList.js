import { useState, useEffect, useContext } from "react";
import { TouchableOpacity, FlatList, Alert } from "react-native";
import "react-native-gesture-handler";

import { firebase } from "../../firebase/config";
import AppItem from "../../components/AppItem/AppItem";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Container,
  OrderByContainer,
  TextEmptyList,
  TextOrderBy,
  ListContainer,
} from "./TodoList.styles";

const ORDER_BY_DESCRIPTION = "ORDER_BY_DESCRIPTION";
const ORDER_BY_ID = "ORDER_BY_ID";

const TodoList = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState(ORDER_BY_ID);
  const theme = useContext(ThemeContext);

  const entityRef = firebase.firestore().collection("todolist");

  useEffect(() => {
    console.log("loading stored data");
    fetchTodoListFirebase();
  }, [route]);

  function fetchTodoListFirebase() {
    entityRef
      /* .where("authorID", "==", userID)*/
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const newTodoList = [];
          querySnapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;
            newTodoList.push(task);
          });
          setItems(newTodoList);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async function handleEditPress(id) {
    console.log("handleEditPress", id);

    let item;
    await entityRef
      .doc(id)
      .get()
      .then((docRef) => {
        item = docRef.data();
        item.id = id;
      })
      .catch((error) => {
        console.log("document not found");
      });
    navigation.navigate("TodoForm", item);
  }

  function handleDeletePress(id) {
    entityRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
        if (a.createdAt > b.createdAt) {
          return 1;
        } else if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      })
    );
  }

  return (
    <Container>
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
              handleDeletePress={() => handleDeletePress(item.id)}
              handleEditPress={() => handleEditPress(item.id)}
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
