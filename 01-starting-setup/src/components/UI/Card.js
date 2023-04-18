import React from "react"; // Legacy code, nije potrebno u savremenom reactu
import "./Card.css";

function Card(props) {
  const classes = "card " + props.className; // jer je proslijedjen className
  return <div className={classes}>{props.children}</div>;
}

export default Card;

/* props.children je reserved property ciji je value sve izmedju 
opening i closing tag */
