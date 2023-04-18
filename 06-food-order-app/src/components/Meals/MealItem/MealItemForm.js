import { useRef, useState } from "react";

import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = function (props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef(); // mogao je i useState
  // Kada se god promijeni ref value u <Input> (tj. unutar Input.js), mijenja se i "amountInputRef", sto triggeruje re-render

  const submitHandler = function (event) {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value; // current.value su default react values
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return; // exit clause
    }

    props.onAddToCart(enteredAmountNumber); // Ovdje imamo samo amount, nista drugo, zato ne pozivamo context method
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

// id, type, min, max, step i defaultValue su default props u reactu (htmlu)

export default MealItemForm;
