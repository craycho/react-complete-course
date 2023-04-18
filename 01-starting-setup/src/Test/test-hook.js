import { useState } from "react";

const useTestHook = function (staVoli) {
  const [recenica, setRecenica] = useState("Stara voli " + staVoli);

  return recenica;
};

export default useTestHook;
