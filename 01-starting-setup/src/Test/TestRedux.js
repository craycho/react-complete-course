import React, { useEffect } from "react";
import styles from "./Test.module.css";
import { useSelector, useDispatch } from "react-redux";

import { bratActions, lokacijaActions } from "./test-store";

// TEST ACTION CREATOR THUNK
import { customActionCreator, getSacredFlame } from "./custom-actions";

const TestRedux = function (props) {
  const dispatch = useDispatch();
  const jelBrat = useSelector((state) => state.brat.jelBrat);
  const udaljenost = useSelector((state) => state.brat.udaljenost);
  const lokacija = useSelector((state) => state.lokacija.lokacija);

  const sacredFlame = useSelector((state) => state.dnd);
  console.log(sacredFlame);

  function clickHandler() {
    // dispatch(bratActions.bratify());
    dispatch(getSacredFlame());
  }

  function differentClickHandler() {
    dispatch(bratActions.udalji({ udaljenost: 200 }));
  }

  function thirdClickHandler() {
    dispatch(lokacijaActions.promijeni());
  }

  return (
    <>
      <button onClick={clickHandler} className={styles["test-btn"]}>
        Set Brat
      </button>
      <br />
      <button onClick={differentClickHandler} className={styles["test-btn"]}>
        Add Udaljenost
      </button>
      <br />
      <button onClick={thirdClickHandler} className={styles["test-btn"]}>
        Change Lokacija
      </button>
      {jelBrat ? "BRAT JE" : "NIJE BRAT"}
      {udaljenost && " i udaljen je " + udaljenost + "km"}
      {lokacija === "Dortmund"
        ? " te je u Dortmundu."
        : ", ali je ipak u Sarajevu."}
      {Object.keys(sacredFlame).length === 0
        ? ""
        : ` Custom action: ${sacredFlame.name}`}
    </>
  );
};

export default TestRedux;

//<li key={Math.random()}>{name + " "}</li>
