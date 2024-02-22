import React from "react";
import { useGlobalContext } from "./context";
const CartItem = ({ item }) => {
  const { dispatch } = useGlobalContext();
  return (
    <section className="cart-item">
      <div className="cart-item-details">
        <img src={item.img} alt={item.title + " img"} />
        <div>
          <h4 className="item-name">{item.title}</h4>
          <h4 className="item-price">&#36; {item.price}</h4>
          {/* remove button */}
          <button
            className="remove-btn"
            onClick={() => {
              dispatch({ type: "REMOVE", payload: item });
              dispatch({ type: "SAVE_DATA" });
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="cart-amount-container">
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => {
            dispatch({ type: "INCREASE_QUANTITY", payload: item });
            dispatch({ type: "SAVE_DATA" });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        {/* amount */}
        <p className="amount">{item.amount}</p>
        {/* decrease amount */}
        <button
          className="amount-btn"
          onClick={() => {
            dispatch({ type: "DECREASE_QUANTITY", payload: item });
            dispatch({ type: "SAVE_DATA" });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CartItem;
