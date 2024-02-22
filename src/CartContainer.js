import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

const CartContainer = () => {
  const { cartItems, isLoading, isError, totalAmount, dispatch } =
    useGlobalContext();
  if (isLoading) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <section className="cart">
        <div className="error-message-container">
          <p className="error-message">Unable to load data!</p>
        </div>
      </section>
    );
  }
  if (!isError && cartItems.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2 className="cart-header">Products In Cart</h2>
          <h4 className="empty-cart">Your cart is empty!</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <h2 className="cart-header">Products In Cart</h2>
      {cartItems.map((c) => (
        <CartItem key={c.id} item={c} />
      ))}
      <div className="cart-total">
        <h4>Total</h4>
        <span>&#36;{totalAmount.toFixed(2)}</span>
      </div>
      <button
        className="clear-btn"
        onClick={() => {
          dispatch({ type: "CLEAR_CART" });
          dispatch({ type: "SAVE_DATA" });
        }}
      >
        clear cart
      </button>
    </section>
  );
};

export default CartContainer;
