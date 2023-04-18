import React from "react";
import styles from "./Card.module.css";

const Card = function (props) {
  /* className ne radi automatski na custom componentima <Card className={sth}/>
    potrebno ih je dodati na postojeci element manually*/
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
