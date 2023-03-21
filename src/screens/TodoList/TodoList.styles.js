import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #4a4a4a;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const TextEmptyList = styled.Text`
  color: #fff;
  padding: 10px;
`;

export const OrderByContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const TextOrderBy = styled.Text`
  font-weight: bold;
  color: ${(props) => props.color};
  padding: 5px;
`;
