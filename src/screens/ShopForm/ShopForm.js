import { Feather as Icon } from "@expo/vector-icons";
import {
  Container,
  Button,
  TextButton,
  Input,
  ButtonContainer,
} from "./ShopForm.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import * as Database from "../../libs/Database";

export const SHOP_LIST = "SHOP_LIST";

const ShopForm = ({ route, navigation }) => {
  const id = route.params ? route.params.id : undefined;

  const theme = useContext(ThemeContext);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!route.params) return;
    setDescription(route.params.description);
  }, [route]);

  async function handleCancelButtonPress() {
    setDescription("");
    navigation.goBack();
  }

  async function handleSaveButtonPress() {
    if (!description) {
      console.log("description empty");
      return;
    }

    console.log("id handleSaveButtonPress", id);

    const listItem = { description };
    Database.saveItem(SHOP_LIST, listItem, id).then((response) => {
      setDescription("");
      navigation.navigate("ShopList", listItem);
    });
  }
  return (
    <Container>
      <Input
        onChangeText={setDescription}
        placeHolder="insert item"
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
export default ShopForm;
