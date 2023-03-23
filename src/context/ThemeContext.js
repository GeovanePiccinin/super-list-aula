import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = { baseColor: "#2abac1", name: "GREEN" };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "GREEN":
      return { baseColor: "#2abac1", name: "GREEN" };
    case "BLUE":
      return { baseColor: "#33a1fd", name: "BLUE" };
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
