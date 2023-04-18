import React from "react"; // Nije potrebno ali ne smeta
/* useState je tzv. "React hook" i moze se pozvati samo unutar component funkcije
Isto tako se ne treba pozivati unutar nested funkcije*/

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  /*  const [title, setTitle] = useState(props.title);
     1) Argument useState je vrijednost default statea (seta initial/prvobitni value)
     2) useState returna niz, prvi element istog je current state value (props.title)
     3) Drugi element je funkcija koju koristimo za update statea

  const clickHandler = () => {
    setTitle("Updated!"); // 1. title = "Updated!" 2. builda citav component opet (reevaluatea ga)
  }; */

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;

/* Components primaju samo jedan parametar: objekat (props) ciji su 
properties proslijedjeni parametri */

/* <ExpenseDate></ExpenseDate> === <ExpenseDate /> */
