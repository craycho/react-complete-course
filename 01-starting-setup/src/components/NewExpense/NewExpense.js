import React, { useState } from "react"; // Desi se under the hood, ali stoji u dosta starijih react projekata
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = function (props) {
  const [formVisible, setFormVisible] = useState(false);

  function formVisibleHandler() {
    setFormVisible(true);
  }

  function formInvisibleHandler() {
    setFormVisible(false);
  }

  const saveExpenseDataHandler = function (enteredExpenseData) {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  /* Proslijedili smo prop onSaveExpenseData, ciji je parametar funkcija 
  saveExpenseDataHandler, koju kasnije mozemo pozvati u child componentu (ExpenseForm) 
    
  "onSaveExpenseData" je basically custom event (kao onClick), 
  koji isto prima funkciju za argument kao i ostali eventovi*/
  return (
    <div className="new-expense">
      {formVisible ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          hideForm={formInvisibleHandler}
        />
      ) : (
        <button onClick={formVisibleHandler}>Add New Expense</button>
      )}
    </div>
  );
};

export default NewExpense;
