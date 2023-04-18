import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import Card from "./Card";
import { Fragment } from "react";

const Backdrop = function (props) {
  return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
};

const ModalOverlay = function (props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
/* Kao sto bih returnao <Backdrop/> i <ModalOverlay></ModalOverlay> jedno pored
drugog, tako mogu returnati njihove portale, koji displayaju isto, na dr. mjestu */

const Modal = function (props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onBackdropClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
