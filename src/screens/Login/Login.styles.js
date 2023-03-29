import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InputText = styled.TextInput`
  height: 48px;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  margin: 10px;
  padding: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #788eec;
  margin: 25px;
  height: 48px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const FooterView = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const FooterText = styled.Text`
  font-size: 16px;
  color: #2e2e2d;
`;

export const FooterLink = styled.Text`
  color: #788eec;
  font-weight: bold;
  font-size: 16px;
`;
