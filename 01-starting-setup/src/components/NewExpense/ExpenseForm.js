import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = function (props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState(""); // Value input elementa je uvijek string, bez obzira sto je unesen broj
  const [enteredDate, setEnteredDate] = useState("");

  /* const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  }); */ // USING A SINGLE STATE

  const titleChangeHandler = function (event) {
    setEnteredTitle(event.target.value);
    /* setUserInput({
      ...userInput, // Moraju se kopirati i one values koje se ne mijenjaju
      enteredTitle: event.target.value,
    }); */

    /* // BOLJI NACIN, garantuje da je prevState latest valid state u slucaju npr. errora
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    }); */
  };

  const amountChangeHandler = function (event) {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = function (event) {
    setEnteredDate(event.target.value);
  };

  const submitHandler = function (event) {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");

    props.hideForm();
  };

  // "value = {enteredTitle}" stvara two-way binding, tj. kada promijenimo value titlea, promijenit ce se i value forma, a ne samo obrnuto
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.hideForm}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
