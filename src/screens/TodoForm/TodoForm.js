import { Feather as Icon } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import {
  Container,
  Button,
  TextButton,
  Input,
  ButtonContainer,
} from "./TodoForm.styles";
import { useState, useEffect } from "react";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import * as Database from "../../libs/Database";
import { db } from "../../firebase/config";

export const TODO_LIST = "TODO_LIST";

console.log("database", Database);

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const superListRef = collection(db, "super-list-firebase");

const TodoForm = ({ navigation, route }) => {
  const id = route.params ? route.params.id : undefined;

  console.log("id", id);

  const theme = useContext(ThemeContext);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!route.params) return;
    setDescription(route.params.description);
  }, [route]);

  async function handleSaveButtonPress() {
    if (description && description.length > 0) {
      let data = route.params || {};
      data.description = description;
      if (!id) {
        const timestamp = new Date().getTime();
        data.createdAt = timestamp;
        await addDoc(superListRef, data);
      } else {
        await updateDoc(doc(db, "super-list-firebase", id), data);
      }

      setDescription("");
      Keyboard.dismiss();
      navigation.navigate("TodoList");
    }
  }

  async function handleCancelButtonPress() {
    setDescription("");
    navigation.goBack();
  }

  return (
    <Container>
      <Input
        onChangeText={setDescription}
        placeHolder="Task description"
        value={description}
      />
      <ButtonContainer>
        <Button color={theme.state.baseColor} onPress={handleCancelButtonPress}>
          <Icon name="x-square" size={22} color="white" />
          <TextButton>Cancel</TextButton>
        </Button>
        <Button color={theme.state.baseColor} onPress={handleSaveButtonPress}>
          <Icon name="save" size={22} color="white" />
          <TextButton>Save</TextButton>
        </Button>
      </ButtonContainer>
    </Container>
  );
};
export default TodoForm;
