import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const filterYearHandler = function (event) {
    props.onFilterByYear(event.target.value);
  };

  // Kada se implementira two-way binding (value={props.selected}), takav component se zove controlled component
  // Odnosno, promjene u ovom componentu handlea njegov parent
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={filterYearHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
