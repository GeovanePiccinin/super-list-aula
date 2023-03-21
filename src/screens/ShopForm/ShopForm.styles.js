import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background-color: #4a4a4a;
  flex: 1;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 95%;
  margin-top: 10px;
  height: 60px;
  background-color: #e3e3e6;
  color: #1f1f22;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  align-items: stretch;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 95%;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 5px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  justify-content: space-around;
  flex-direction: row;
  width: 35%;
`;

export const TextButton = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
