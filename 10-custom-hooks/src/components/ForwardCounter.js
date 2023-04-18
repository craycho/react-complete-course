import Card from "./Card";
import useCounter from "../hooks/use-counter";

const ForwardCounter = () => {
  /* Stateovi/effectovi u custom hooks ce biti vezani za component u kojem 
  se hook pozove. Note: NE DIJELE state, svaki component ce imati vlastiti. */
  const counter = useCounter();

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
