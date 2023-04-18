import { useState, useEffect } from "react";

// Ovim variables ima pristup/zajednicke su za svaki pojedinacan component koji implementira ovaj hook (useStore)
let globalState = {};
let listeners = []; // Niz funkcija "zainteresovanih" za state changes. Triggeruju ih actions.
let actions = {};

// shouldListen - omogucava da components koji samo dispatchaju akcije nece biti rerenderovane podjednako ko one koje mijenjaju state (pozivaju setState)
export const useStore = function (shouldListen = true) {
  const setState = useState(globalState)[1]; // (*)

  const dispatch = (actionIdentifier, payload) => {
    // Values actions objekta su funkcije, pa je ovo "actions.nekaFunkcija()"
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      /* Ovo ce updateovati (*) state. Sve setState funkcije kad se pozovu ucine da SVAKI component 
      koji koristi custom "useStore" hook rerenderuje. (listener(globalState) === setState(globalState))

      TO JESTE: Listeneri nisu nista drugo nego setState callovi koji rerenderuju componente. */
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      /* Registruje novi listener (samo jedan za svaki component) za component koji koristi ovaj custom hook (useStore),
    kada component mounta prvi put. U pitanju je closure, tj. setState je captured za taj component. */
      listeners.push(setState);
    }

    /* Cleanup funkcija koja removea listener (cim je COMPONENT koji koristi ovaj listener unmounted,
     rijesimo se njenih listenera. Cleanup funkcija runa tek poslije unmountanja te radi toga ovo radi. (closures) */
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch]; // useReducer isto ovo returna
};

export const initStore = function (userActions, initialState) {
  // Dodaju se na postojeci state da moze biti vise sliceova storea odjednom (kao multiplace slices u Reduxu)
  if (initialState) {
    globalState = { ...globalState, ...initialState };
    actions = { ...actions, ...userActions };
  }
};
