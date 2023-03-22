import { useState, useEffect, useContext } from "react";
import { Keyboard } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { Feather as Icon } from "@expo/vector-icons";
import { firebase } from "../../firebase/config";
import {
  Container,
  Button,
  TextButton,
  Input,
  ButtonContainer,
} from "./TodoForm.styles";

export const TODO_LIST = "TODO_LIST";

const TodoForm = ({ navigation, route }) => {
  const id = route.params ? route.params.id : undefined;
  const [description, setDescription] = useState("");
  const theme = useContext(ThemeContext);

  const entityRef = firebase.firestore().collection("todolist");

  console.log(route.params);

  useEffect(() => {
    if (!route.params) return;
    setDescription(route.params.description);
  }, [route]);

  const handleSaveButtonPress = () => {
    if (description && description.length > 0) {
      let data = route.params || {};
      data.description = description;
      if (!id) {
        const timestamp = new Date().getTime();
        data.createdAt = timestamp;
      }

      entityRef
        .doc(id)
        .set(data)
        .then(() => {
          console.log("Document successfully written!");
          setDescription("");
          Keyboard.dismiss();
          navigation.navigate("TodoList");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };

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
