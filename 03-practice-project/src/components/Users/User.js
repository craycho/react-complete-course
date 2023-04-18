import React from "react";
import ErrorModal from "../UI/ErrorModal";

const User = function (props) {
  if (props.age === 0) {
    return (
      <ErrorModal message="Please enter a valid name and age (non-empty values)." />
    );
  }

  if (props.age < 0) {
    return <ErrorModal message="Please enter a valid age (> 0)." />;
  }

  return (
    <li>
      {props.username} {props.age}
    </li>
  );
};

export default User;
