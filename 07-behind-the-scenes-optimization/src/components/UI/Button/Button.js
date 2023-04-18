import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  console.log("BTN RUNNING");
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);

// Bez obzira na memo, Button funkcija ce se opet re-execute.

/* Razlog je sto se toggleParagraphHandler funkcija (props.onClick) svaki put
re-executea kada se sama App funkcija executea, sto je na svaku promjenu. */
