import { View, Text } from "react-native";

import { Container, Button } from "./Settings.styles";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const Settings = () => {
  const theme = useContext(ThemeContext);

  const alternateColor = () => {
    if (theme.state.name === "GREEN") theme.dispatch({ type: "BLUE" });
    else theme.dispatch({ type: "GREEN" });
  };

  return (
    <Container>
      <Button onPress={alternateColor}>
        <View
          style={{
            padding: 5,
            width: 50,
            height: 50,
            backgroundColor: theme.state.baseColor,
          }}
        />
        <Text>Alternate theme color</Text>
      </Button>
    </Container>
  );
};
export default Settings;
