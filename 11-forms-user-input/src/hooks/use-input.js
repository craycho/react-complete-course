import userEvent from "@testing-library/user-event";
import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducerFunction = function (state, action) {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched }; // Koristi isTouched iz prethodnog statea
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value }; // Koristi value od prethodnog statea (ne treba se mijenjati)
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialInputState;
};

const useInput = function (validateValue) {
  const [inputState, dispatch] = useReducer(
    inputStateReducerFunction,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = function (event) {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = function (event) {
    dispatch({ type: "BLUR" });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }; // Funkcije se exportaju da bi se mogle pozvati na mjestu gdje se hook koristi
};

export default useInput;

/*  Pomocu useState 
------------------------
import { useState } from "react";

const useInput = function (validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = function (event) {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = function (event) {
    setIsTouched(true);
  };

  const reset = function () {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  }; // Funkcije se exportaju da bi se mogle pozvati na mjestu gdje se hook koristi
};

export default useInput; */
