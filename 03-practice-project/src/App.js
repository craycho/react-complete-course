import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = function (user) {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList items={users} />
    </React.Fragment>
  );
  // Moze i samo <> </> umjesto <React.fragment>
  // Moze i import {Fragment} + <Fragment></Fragment>
}

export default App;
