import { View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import {
  Container,
  ButtonContainer,
  EditButton,
  DeleteButton,
  ButtonText,
  SubText,
  TextItem,
} from "./AppItem.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const AppItem = ({ item, handleDeletePress, handleEditPress }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <View>
        <TextItem>{"Title"}</TextItem>
        <SubText>{item.description}</SubText>
      </View>
      <ButtonContainer>
        <DeleteButton onPress={handleDeletePress}>
          <Icon name="trash" color="white" size={18} />
        </DeleteButton>
        <EditButton color={theme.state.baseColor} onPress={handleEditPress}>
          <Icon name="edit" color="white" size={18} />
        </EditButton>
      </ButtonContainer>
    </Container>
  );
};

export default AppItem;
