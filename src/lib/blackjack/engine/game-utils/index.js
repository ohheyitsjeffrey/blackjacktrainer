import calcPayout from "./calcPayout";
import suitsAndValues from "./suitsAndValues";
import dealerShouldHit from "./dealerShouldHit";

import {
  createNewState
} from "./stateUtils";

const gameUtils = {
  dealerShouldHit,
  calcPayout,
  createNewState,
  suits: suitsAndValues.suits,
  values: suitsAndValues.values,
};

export default gameUtils;