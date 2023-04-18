import React, { useState } from "react"; // Legacy code, nije potrebno u savremenom reactu

import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2021");
  // const [displayedExpenses, setDisplayedExpenses] = useState(props.items);

  const filterByYear = function (selectedYear) {
    setFilteredYear(selectedYear);
    //   setDisplayedExpenses(filteredExpenses);
  };

  const filteredExpenses = props.items.filter(
    (expense) => expense.date.getFullYear() === +filteredYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onFilterByYear={filterByYear} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
} // key property je potreban radi performance i bugova, da react zna identity i poredak itema te ne renderuje sve uvijek ispocetka
// .map vraca/outputa niz JSX (<ExpenseItem>) elemenata sa odredjenim properties

export default Expenses;
