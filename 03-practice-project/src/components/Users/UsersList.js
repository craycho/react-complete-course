import React, { useState } from "react";

import styles from "./UsersList.module.css";
import Card from "../UI/Card";
// import ErrorModal from "../UI/ErrorModal";

const UsersList = function (props) {
  // const condition = props.items[props.items.length - 1]?.age;
  // const messageEmpty = "Please enter a valid name and age (non-empty values).";
  // const messageNegative = "Please enter a valid age (> 0).";

  // if (condition !== undefined && condition < 1) {
  //   return (
  //     <ErrorModal message={condition === 0 ? messageEmpty : messageNegative} />
  //   );
  // }

  if (props.items.length > 0) {
    return (
      <Card className={styles.users}>
        <ul>
          {props.items.map((user) => (
            <li key={user.key}>
              {user.username} ({user.age} years old)
            </li>
          ))}
        </ul>
      </Card>
    );
  }
};

export default UsersList;
