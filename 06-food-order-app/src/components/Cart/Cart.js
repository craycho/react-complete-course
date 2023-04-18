import React from "react";
import { useContext, useState } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout.js";

const Cart = function (props) {
  const [checkoutFormVisible, setCheckoutFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const checkoutSubmitHandler = async function (userData) {
    console.log(userData);
    setIsSubmitting(true);

    // Pretpostavlja da uvijek radi, u stvarnosti treba handleati sa try/catch
    await fetch(
      "https://react-http-food-app-85eae-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItemRemoveHandler = function (id) {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 }); // nije samo "item", jer se povecava amount, a ne dodaje novi item
  };

  const orderHandler = function () {
    setCheckoutFormVisible(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  ); // .bind preconfigurea funkcije da primaju samo odredjene parametre

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCartClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutFormVisible && (
        <Checkout
          onCancel={props.onCartClose}
          onCheckoutSubmit={checkoutSubmitHandler}
        />
      )}
      {!checkoutFormVisible && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Order successfully sent!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
