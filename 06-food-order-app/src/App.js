import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderForm from "./components/Cart/Checkout";

function App() {
  const [cartVisible, setCartVisible] = useState(false);
  const [orderFormVisible, setOrderFormVisible] = useState(false);

  const showCartHandler = function () {
    setCartVisible(true);
  };

  const hideCartHandler = function () {
    setCartVisible(false);
  };

  return (
    <CartProvider>
      {cartVisible && <Cart onCartClose={hideCartHandler} />}
      <Header onCartOpen={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
