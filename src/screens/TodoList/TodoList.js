import { TouchableOpacity, FlatList, Alert } from "react-native";

import {
  Container,
  OrderByContainer,
  TextEmptyList,
  TextOrderBy,
  ListContainer,
} from "./TodoList.styles";

import { db } from "../../firebase/config";
import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

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
  const [orderByAttr, setOrderByAttr] = useState(ORDER_BY_ID);

  const theme = useContext(ThemeContext);

  const superListRef = collection(db, "super-list-firebase");

  let unsubscribe;

  useEffect(() => {
    console.log("loading stored data");

    fetchDBFirebase();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [route]);

  async function fetchDBFirebase() {
    try {
      const q = query(superListRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newTodoList = [];
        querySnapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          newTodoList.push(task);
        });
        console.log(newTodoList);
        setItems(newTodoList);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function fetchDatabase() {
    Database.getItems(TODO_LIST).then((items) => setItems(items));
  }

  async function handleEditPress(list, id) {
    let item;

    const docSnap = await getDoc(doc(superListRef, id));

    if (docSnap.exists()) {
      item = docSnap.data();
      item.id = id;
    } else {
      console.log("No such document!");
    }

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
        onPress: async () => {
          try {
            await deleteDoc(doc(superListRef, id));
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  }

  function handleOrderByDescription() {
    setOrderByAttr(ORDER_BY_DESCRIPTION);
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
    setOrderByAttr(ORDER_BY_ID);
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
            color={
              orderByAttr === ORDER_BY_ID ? theme.state.baseColor : "#d6d6d6"
            }
          >
            Order By ID
          </TextOrderBy>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOrderByDescription}>
          <TextOrderBy
            color={
              orderByAttr === ORDER_BY_DESCRIPTION
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
