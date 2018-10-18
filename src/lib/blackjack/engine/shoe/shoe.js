import _ from "lodash";

import Card from "../card/card.js";
import GameUtils from "../game-utils";

class Shoe {
  constructor(size = 1) {
    this.size = size;
    this.cards = this.newShoe(size);
  }
  // size specifies the number of decks in a shoe
  newShoe(size) {
    const suits = GameUtils.suits;
    const values = GameUtils.values;

    let cards = [];

    for (let i = 0; i < size; i++) { // eslint-disable-next-line no-loop-func
      suits.forEach(suit => {        // eslint-disable-next-line no-loop-func
        values.forEach(value => {
          cards.push(new Card(suit, value));
        });
      });
    }

    // shuffle the cards
    cards = _.shuffle(cards);
    return cards;
  }

  draw() {
    // verify the shoe isn't empty
    if (this.cards.length === 0) {
      this.cards = this.newShoe(this.size);
    }

    return this.cards.pop();
  }

  remainingCount() {
    return this.cards.length;
  }

  // convert the shoe into an array of objects represented as strings to be written to local storage
  toString() {
    // store the cards
    const stringArray = [];
    _.forEach(this.cards, card => {
      stringArray.push(
        card.toString()
      );
    });

    // also store the size as the last element
    const sizeObjectString = JSON.stringify({
      size: this.size.toString(),
    });
    stringArray.push(sizeObjectString);

    return stringArray.toString();
  }

  // convert a string array representation of the shoe from local storage back into a shoe object of
  // card objects.
  restoreFromString(stringArray) {
    this.cards = [];
    const convertedArray = JSON.parse(`[${stringArray}]`);

    // restore the initial size for when the shoe runs out of cards
    const sizeObjectString = convertedArray.pop();
    this.size = parseInt(sizeObjectString.size, 10);

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
