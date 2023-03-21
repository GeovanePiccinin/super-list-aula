import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #e3e3e6;
  margin: 10px 10px 10px;

  border-radius: 10px;
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 25%;
`;

const CustomButton = styled.TouchableOpacity`
  margin-left: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const EditButton = styled(CustomButton)`
  background-color: ${(props) => props.color};
`;
export const DeleteButton = styled(CustomButton)`
  background-color: #9e0000;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const SubText = styled.Text`
  font-size: 12px;
`;

export const TextItem = styled.Text`
  font-size: 20px;
  color: #1f1f22;
  font-weight: bold;
`;
