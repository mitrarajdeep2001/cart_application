import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
export const AppContext = React.createContext();

export function useGlobalContext() {
  const {
    cartItems,
    isLoading,
    isError,
    totalAmount,
    totalQuantity,
    dispatch,
  } = useContext(AppContext);
  return {
    cartItems,
    isLoading,
    isError,
    totalAmount,
    totalQuantity,
    dispatch,
  };
}
export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: true,
    isError: false,
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
    dispatch: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("STATE_DATA"));
    if (data) {
      dispatch({ type: "GET_DATA", payload: data });
    } else {
      getData();
    }
  }, []);
  async function getData() {
    try {
      const url = "https://course-api.com/react-useReducer-cart-project";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Unable to load!");
      }
      const data = await res.json();
      dispatch({ type: "FETCH", payload: data });
      dispatch({ type: "SAVE_DATA" });
    } catch (error) {
      dispatch({ type: "ERROR" });
      dispatch({ type: "SAVE_DATA" });
      console.log(error);
    }
  }
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
