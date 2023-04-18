import React, { useState, useCallback } from "react";

import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]); // dependencies, isto ko useEffect. [] govori da se funkcija nikada nece promijeniti
  // Problem je sto se onda ostane zapamcena originalna vrijednost allowToggle
  // [allowToggle] cini da, kada je promijenjena varijabla, funkcija se recreate

  const allowToggleHandler = function () {
    setAllowToggle(true);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow toggling!</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;

// useCallback "sacuva" funkciju kroz dalje executione, te se ona ne recreatea svaki put
// Jer se ne recreatea, ne izaziva ni execution <Button> svaki put kada se kreira

/* useMemo je sustinski useCallback ali za varijable koje nisu funkcije.
Sintaksa je slicna, samo sto funkcija (argument) mora returnati vrijednost
te isto ima niz dependencies, u kojem se slucaju mijenja.

NPR: 

const {items} = props;

const sortedList = useMemo(() => {
  return props.items.sort((a,b) => a - b)
}, [items]);

Kada se god .items promijeni, sortedList ce se TEK tad promijeniti, a ne sa svakim executionom componenta.
*/
