import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

// funkcija configureStore kao argument ocekuje configuration object te je ona zapravo ta koja kreira sam store
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});
// Moze i npr. reducer: counterSlice.reducer ako je samo jedan reducer. Regardless, svi reduceri ce biti objedinjeni u jedan "root" reducer

export default store;

/* NOTE:
  Svaki slice objekat (counterSlice i authSlice) ima built-in methods.
  .actions i .reducer su medju njima te se uvijek isto zovu. */

/* ------- Pomocu createStore (sad vec legacy) -------

const counterReducer = function (
  state = { counter: 0, showCounter: true },
  action
) {
  if (action.type === "increment") {
    // state.counter++; POGRESNO
    // U reduxu NIKADA ne mijenjati postojeci state, uvijek returnati potpuno novi

    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};
*/
