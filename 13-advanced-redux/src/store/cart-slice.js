import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    changed: false, // Potrebno da se ne re-execute drugi useEffect kada se god fetcha cart (jer se napravi novi cart svaki put)
  },

  /*NOTE: Synchronous kod bez side-effecta, kao sto je npr jednostavni data transformation 
  dole, se generalno pise unutar reducera, a ne Action Creatora ili Componenta */
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.items;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      state.changed = true;

      // console.log(newItem); OUTPUT: {id: p1, title: "My first book", price: 6}

      // Ako item ne postoji/undefined je
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1, // Jer je tek napravljen
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        /* Ovo radi iskljucivo jer je .find() metoda pretrazila niz objekata 
           i vratila REFERENCE. Isto ne bi radilo na nizu primitivnih velicina. */
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        // Zadrzi sve iteme u kojima se ne podudara id
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
