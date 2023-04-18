import React, { useState, useReducer, useContext } from "react";
import styles from "./Test.module.css";

import TestContext from "./test-context";
import useTestHook from "./test-hook";

const counterReducer = function (state, action) {
  if (action.type === "click") {
    // console.log("Click u reduceru.");
    return state++;
  }
};

const Test = function (props) {
  const [names, setNames] = useState([]);
  const [counter, dispatchCounter] = useReducer(counterReducer, 0);
  const ctx = useContext(TestContext);

  const nekaOsoba = useTestHook("med");

  function nameHandler() {
    dispatchCounter({ type: "click" });
    // console.log(ctx.zena);

    console.log(nekaOsoba);
  }

  return (
    <>
      {/* <button onClick={nameHandler} className={styles["test-btn"]}>
        Show names
      </button>
      {counter} */}
    </>
  );
};

export default Test;

//<li key={Math.random()}>{name + " "}</li>
