import React, { Component } from "react";

const DemoOutput = function (props) {
  console.log("Demo RUNNING!");
  return <p>{props.show ? "This is new!" : ""}</p>;
};

export default React.memo(DemoOutput);

// Da bi component funkcija bila reevaluated, dovoljno je da je parent function reevaluated
// Sa React.memo, reevaluate (re-execute) ce se SAMO ako je doslo do promjene u njoj samoj (u props koje joj se proslijedjuju)
// Istovremeno se ne reevaluateaju ni child components od DemoOutput
