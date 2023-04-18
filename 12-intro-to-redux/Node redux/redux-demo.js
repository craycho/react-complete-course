const redux = require("redux");

// Reducer funkcija se automatski izvrsi pri samoj inicijalizaciji
const counterReducer = function (state = { counter: 0 }, action) {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);
// console.log(store.getState()); Displaya default state

const counterSubscriber = function () {
  const latestState = store.getState(); // Latest state snapshot after it was updated
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" }); // Dispatch pozove reducer funkciju opet izvrsi
store.dispatch({ type: "decrement" });
