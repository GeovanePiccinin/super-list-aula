import { Feather as Icon } from "@expo/vector-icons";
import {
  Container,
  Button,
  TextButton,
  Input,
  ButtonContainer,
} from "./TodoForm.styles";
import { useState, useEffect } from "react";

import * as Database from "../../libs/Database";

export const TODO_LIST = "TODO_LIST";

console.log("database", Database);

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

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
    if (!description) {
      console.log("description empty");
      return;
    }

    console.log("id handleSaveButtonPress", id);

    const listItem = { description };
    Database.saveItem(TODO_LIST, listItem, id).then((response) => {
      setDescription("");
      navigation.navigate("TodoList", listItem);
    });
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
