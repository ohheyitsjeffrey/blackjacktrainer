import calcPayout from "./calcPayout";
import suitsAndValues from "./suitsAndValues";
import {
  createNewState
} from "./stateUtils";

const gameUtils = {
  calcPayout,
  createNewState,
  suits: suitsAndValues.suits,
  values: suitsAndValues.values,
};

export default gameUtils;