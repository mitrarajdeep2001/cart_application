const reducer = (state, action) => {
  //This will clear all the items from cart, then total quantity and total amount will be 0.
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
  //This will remove a particular item from cart and will deduct its quantity and amount.
  if (action.type === "REMOVE") {
    const cartItems = state.cartItems.filter(
      (item) => item.id !== action.payload.id
    );
    state.totalQuantity = state.totalQuantity - action.payload.amount;
    state.totalAmount =
      state.totalAmount - action.payload.amount * action.payload.price;
    return {
      ...state,
      cartItems,
    };
  }
  //This will increase quantity of a particular cart item.
  if (action.type === "INCREASE_QUANTITY") {
    const cartItems = state.cartItems.map((item) => {
      if (item.id === action.payload.id) {
        item.amount = item.amount + 1;
        state.totalAmount = state.totalAmount + +item.price;
        state.totalQuantity = state.totalQuantity + 1;
      }
      return item;
    });
    return {
      ...state,
      cartItems,
    };
  }
  //This will decrease quantity of a particular cart item.
  if (action.type === "DECREASE_QUANTITY") {
    const cartItems = state.cartItems
      .map((item) => {
        if (item.id === action.payload.id) {
          item.amount = item.amount - 1;
          state.totalAmount = state.totalAmount - +item.price;
          state.totalQuantity = state.totalQuantity - 1;
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return {
      ...state,
      cartItems,
    };
  }
  //This will calculate the initial total amount.
  if (action.type === "GET_TOTAL_AMOUNT") {
    return {
      ...state,
      totalAmount: +state.totalAmount + +action.payload,
    };
  }
  //This will handle fetch errors.
  if (action.type === "ERROR") {
    return {
      ...state,
      isError: true,
      isLoading: false,
    };
  }
  //This will save state data to local storage.
  if (action.type === "SAVE_DATA") {
    localStorage.setItem("STATE_DATA", JSON.stringify(state));
    return state;
  }
  //This will retrieve the state data from local storage.
  if (action.type === "GET_DATA") {
    return action.payload;
  }
  //This will load the fetched data, stop loading and calculate the initial totalQuantity.
  if (action.type === "FETCH") {
    const cartItems = action.payload.filter((item) => item.amount > 0);
    const totalAmount = action.payload.reduce(
      (prev, curr) => prev + +curr.price,
      0
    );
    return {
      ...state,
      cartItems,
      isLoading: false,
      totalQuantity: action.payload.length,
      totalAmount,
    };
  }
  //If none of the above type is matched, then throw error.
  throw new Error("no matching action type");
};

export default reducer;
