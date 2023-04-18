import { bratActions, dndActions } from "./test-store";

export const customActionCreator = function (argument) {
  return (dispatch) => {
    if (argument > 0) {
      dispatch(bratActions.bratify());
    }
  };
};

export const getSacredFlame = function () {
  return async (dispatch) => {
    const response = await fetch(
      "https://www.dnd5eapi.co/api/spells/sacred-flame"
    );
    const data = await response.json();

    dispatch(dndActions.sacredFlame(data));
  };
};
