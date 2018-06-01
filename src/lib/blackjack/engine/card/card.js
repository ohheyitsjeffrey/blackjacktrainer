import { suitsAndValues } from "../suitsAndValues.js";

class Card {
  constructor(suit, value) {
    if (!suitsAndValues.suits.includes(suit)) {
      throw new Error(`Not a valid card suit.  Valid suites are: ${suitsAndValues.suits}`);
    }
    if (!suitsAndValues.values.includes(value)) {
      throw new Error(`Not a valid card value.  Valid values are: ${suitsAndValues.values}`);
    }
    this.suit = suit;
    this.value = value;
  }
}

export default Card;