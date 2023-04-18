import React, { Component } from "react";
import Transition from "react-transition-group/Transition";
import CSSTransition from "react-transition-group/CSSTransition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

const animationTiming = {
  enter: 400,
  exit: 1000,
  // Moraju biti ovi property names
};

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  // Objekat se u arrow funkciji mora returnati sa () => ({}), a ne  () => {}
  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={(prevState) => {
            this.setState((prevState) => ({
              showBlock: !prevState.showBlock,
            }));
          }}
        >
          Toggle
        </button>
        <br />
        {/* Ako je "in" (showBlock) true, div ce biti renderovan.
            "timeout" odredjuje koliko ce se "entering" i "exiting" state zadrzati
            Transition returna state, koji se moze koristiti. 
            ako je mountOnEnter(=true) dodat ce se u DOM tek kad je in=true 
            unmountOnExit removea iz DOM kada je in=false*/}
        <Transition
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("onEnter")} // Prije ulaska u entering state
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
          onExit={() => console.log("onExit")} // Prije ulaska u exiting state
          onExiting={() => console.log("onExiting")}
          onExited={() => console.log("onExited")}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
                // Tj: Kada je state "exiting" set opacity to 0 i animiraj koristeci "transition" opcije
              }}
            />
          )}
        </Transition>
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
/* RED CUBE WITH CSSTransition:
 
<CSSTransition
  in={this.state.showBlock}
  timeout={animationTiming}
  mountOnEnter
  unmountOnExit
  classNames="fade-slide"
>
  <div
    className="Modal"
    style={{
      backgroundColor: "red",
      width: 100,
      height: 100,
      margin: "auto",

      // Tj: Kada je state "exiting" set opacity to 0 i animiraj koristeci "transition" opcije
    }}
  />
</CSSTransition>; */
