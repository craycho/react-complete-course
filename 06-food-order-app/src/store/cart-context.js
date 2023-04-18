// Za application-wide state je common koristiti context, kao i "store" folder
import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem() {},
  removeItem(id) {},
  clearCart() {},
});

export default CartContext;
