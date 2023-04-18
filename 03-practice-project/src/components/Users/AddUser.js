import React, { useState, useRef } from "react";

import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = function (props) {
  const nameInputRef = useRef(); // Ref je objekat koji sadrzi "current:" property koji drzi value
  const ageInputRef = useRef();

  const [error, setError] = useState();

  /* USING STATE (loga svaki keystroke)
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const usernameChangeHandler = function (event) {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = function (event) {
    setEnteredAge(event.target.value);
  }; */

  const addUserHandler = function (event) {
    event.preventDefault();

    // USING REFS
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError("Please enter a valid name and age (non-empty values).");
      return;
    }

    if (+enteredUserAge < 1) {
      setError("Please enter a valid age (> 0).");
      return;
    }

    const user = {
      username: enteredName,
      age: +enteredUserAge,
      key: Math.random() * 100000,
    };

    props.onAddUser(user);
    nameInputRef.current.value = ""; // Two-way binding pomocu refs, izbjegavati inace modificiranje .value
    ageInputRef.current.value = "";

    // setEnteredUsername(""); Ne koristi se vise state za storeanje valuea, vec refs. U stateu ga samo getamo
    // setEnteredAge("");
  };

  const errorHandler = function () {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title="Invalid input"
          message={error}
          onDismiss={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler} autoComplete="off">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age" className={styles.label}>
            Age (Years)
          </label>
          <input id="age" type="text" ref={ageInputRef} />
          <button type="submit" className={styles.button}>
            Add User
          </button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
