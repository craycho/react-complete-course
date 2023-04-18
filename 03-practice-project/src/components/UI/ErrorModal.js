import React, { useState } from "react";
import ReactDOM from "react-dom";

import styles from "./ErrorModal.module.css";
import styleButton from "../Users/AddUser.module.css";
import Card from "./Card";

const Backdrop = function (props) {
  return <div className={styles.backdrop} onClick={props.onDismiss} />;
};

const ModalOverlay = function (props) {
  return (
    <Card className={styles.modal}>
      <div className={styles.header}>
        <h2>{props.title}</h2>
      </div>
      <p className={styles.content}>{props.message}</p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styleButton.button}
          onClick={props.onDismiss}
        >
          Okay
        </button>
      </div>
    </Card>
  );
};

const ErrorModal = function (props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={props.onDismiss} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onDismiss={props.onDismiss}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}; // Gdje god bi se inace koristio component moze se koristiti portal (interchangeable su, samo je potreban {})

export default ErrorModal;
