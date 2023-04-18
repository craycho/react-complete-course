import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { jelBrat: false, udaljenost: null };

const bratSlice = createSlice({
  name: "jelBrat",
  initialState,
  reducers: {
    bratify(state) {
      state.jelBrat = !state.jelBrat;
    },
    udalji(state, action) {
      console.log(action.payload.udaljenost);
      if (state.udaljenost == null) {
        state.udaljenost = action.payload.udaljenost;
      } else {
        state.udaljenost = null;
      }
    },
  },
});

const lokacijaSlice = createSlice({
  name: "lokacija",
  initialState: { lokacija: "" },
  reducers: {
    idiKuci(state) {
      state.lokacija = "Sarajevo";
    },
    idiVani(state) {
      state.lokacija = "Dortmund";
    },
    promijeni(state) {
      state.lokacija === "Dortmund"
        ? (state.lokacija = "Sarajevo")
        : (state.lokacija = "Dortmund");
    },
  },
});

const dndSlice = createSlice({
  name: "dnd",
  initialState: {},
  reducers: {
    sacredFlame(state, action) {
      // state = { ...action.payload };
      return { ...action.payload };
    },
  },
});

const store = configureStore({
  reducer: {
    brat: bratSlice.reducer,
    lokacija: lokacijaSlice.reducer,
    dnd: dndSlice.reducer,
  },
});

export const bratActions = bratSlice.actions;
export const lokacijaActions = lokacijaSlice.actions;
export const dndActions = dndSlice.actions;
export default store;

// const testReducer = function (state = initialState, action) {
//   if (action.type === "Jeste") {
//     return {
//       jelBrat: true,
//       udaljenost: state.udaljenost,
//     };
//   }

//   if (action.type === "Nije") {
//     return {
//       jelBrat: false,
//       udaljenost: state.udaljenost,
//     };
//   }

//   if (action.type === "Ajda") {
//     return {
//       jelBrat: true,
//       udaljenost: action.udaljenost,
//     };
//   }

//   return state;
// };
