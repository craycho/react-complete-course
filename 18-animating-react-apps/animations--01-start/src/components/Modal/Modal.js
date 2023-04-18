import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
  // Moraju biti ovi property names
};

const modal = (props) => {
  /* const cssClasses = [
    "Modal",
    props.show === "entering"
      ? "ModalOpen"
      : props.show === "exiting"
      ? "ModalClosed"
      : null,
  ]; je isto kao i:

  if(props.show === "entering") "ModalOpen"
  else if(props.show === "exiting") "ModalClosed"
  else null */

  return (
    // Klase u classNames ce se dodati na postojecu "Modal" klasu u ovisnosti od statea transitiona
    // Stateovi su "enter", "enter-active", "exit" i "exit-active"
    /* Umjesto string moze i objekat 
    classNames = {{
      enter: "", enterActive: "ModalOpen", exit: "", exitActive: "ModalClose",
    }} */

    <CSSTransition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames="fade-slide"
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal;

/* Sa Transition:

return (
    <Transition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        // NOTE: state je STRING (npr. "entering") pa se pristupa sa bracket notation u slucaju zasebnog objekta
        const cssClasses = [
          "Modal",
          state === "entering"
            ? "ModalOpen"
            : state === "exiting"
            ? "ModalClosed"
            : null,
        ];

        return (
          <div className={cssClasses.join(" ")}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </Transition>
  );
*/
