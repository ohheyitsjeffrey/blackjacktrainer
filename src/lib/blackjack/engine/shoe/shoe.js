import _ from "lodash";

import Card from "../card/card.js";
import GameUtils from "../game-utils";

class Shoe {
  constructor(size = 1) {
    this.cards = this.newShoe(size);
  }
  // size specifies the number of decks in a shoe
  newShoe(size) {
    const suits = GameUtils.suits;
    const values = GameUtils.values;

    const shoe = [];

    for (let i = 0; i < size; i++) {
      suits.forEach(suit => {
        values.forEach(value => {
          shoe.push(new Card(suit, value));
        });
      });
    }

    return shoe;
  }

  shuffle() {
    this.cards = _.shuffle(this.cards);
  }

  draw() {
    return this.cards.pop();
  }

  remainingCount() {
    return this.cards.length;
  } 
  
  // convert the shoe into an array of objects represented as strings to be written to local storage
  toString() {
    const stringArray = [];
    _.forEach(this.cards, card => {
      stringArray.push(
        card.toString()
      );
    });
 
    return stringArray.toString();
  }

  // convert a string array representation of the shoe from local storage back into a shoe object of
  // card objects.
  restoreFromString(stringArray){
    this.cards = [];
    const convertedArray = JSON.parse(`[${stringArray}]`);

    _.forEach(convertedArray, cardData => {
      // convert the card data string back to a card object
      let card = new Card(
        cardData.suit,
        cardData.value
      );
      // now restore the card to the cards array
      this.cards.push(card);
    });
  }
}

export default Shoe;
