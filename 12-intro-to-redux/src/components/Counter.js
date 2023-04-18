import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";

import classes from "./Counter.module.css";

// useSelector - bira specifican variable unutar storea (centralnog statea)
// useDispatch - kreira dispatch funkciju pomocu koje ce se dispatchati actions

const Counter = () => {
  const dispatch = useDispatch();
  // Return statement u useSelector treba biti se dio statea kojem se zeli pristupiti
  const counter = useSelector((state) => state.counter.counter);
  /* Note: useSelector cini da sve promjene u redux storeu (jedinstvenom stateu)
  automatski triggeruju rerendering component functiona (u ovom slucaju Counter)  */

  const show = useSelector((state) => state.counter.showCounter);
  // .counter da se pristupi sliceu pod imenom "counter", ime definisano u configureStore() i .showCounter da se pristupi varijabli u tom sliceu

  const incrementHandler = function () {
    dispatch(counterActions.increment());
    // Mora se pozvati jer returna objekat u kojem je "type" automatski set
  };

  const increaseHandler = function () {
    dispatch(counterActions.increase(10)); // type: UNIQUE-IDENTIFIER, payload: 10
  };

  const decrementHandler = function () {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// --------- REDUX SA CLASS BASED COMPONENTS ---------
/*
import { Component } from "react";
import { connect } from "react-redux";
 
class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

// Automatski dobija state kao argument, alt za useSelector
const mapStateToProps = function (state) {
  return {
    counter: state.counter,
  };
};

// Automatski dobija dispatch funkciju kao argument, alt za useDispatch
const mapDispatchToProps = function (dispatch) {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect() vraca funkciju, u koju onda proslijedjujemo Counter kao argument
 */
