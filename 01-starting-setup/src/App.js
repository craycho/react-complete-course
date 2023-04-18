import React, { useState } from "react"; // Legacy code, nije potrebno u savremenom reactu

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import Test from "./Test/Test";

import TestContext from "./Test/test-context";
import TestRedux from "./Test/TestRedux";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = function (expense) {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  }; // u setState funkcijama element callback funkcije je automatski previous state

  return (
    <div>
      <TestContext.Provider
        value={{
          zena: "Joj zeno moja jesam ti u kontekstu",
        }}
      >
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses items={expenses} />
        <Test imena={["Joj", "Moja", "Zeno", "Draga", "Jesam", "Umorna"]} />
        <br />
        <TestRedux />
      </TestContext.Provider>
    </div>
  );
}

export default App;

// React detektuje samo uppercase HTML elements kao custom components
