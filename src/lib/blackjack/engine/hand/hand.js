import _ from "lodash";
import Card from "../card/card.js";

export default class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
    this.bust = false;
    this.stand = false;
  }
  // add a card to the hand.
  insert(card) {
    this.cards.push(card);
    this.calcValue();
  }

  // calculate the best value of the card
  calcValue() {
    // reset value to 0
    this.value = 0;
    let flexibleAces = 0;

    // eslint indent is throwing a fit on this switch and I don't want to deal with it.
    /* eslint-disable indent */
    this.cards.forEach(card => {
        if (card.cardValue() === "ace"){
          flexibleAces += 1;
          this.value += 11;
        }
        else {
          this.value += parseInt(card.cardValue(), 10);
      }
    });
    /* eslint-enable indent */
    // up until this point we have assumed all aces are value 11.  If this causes the hand to
    // bust, we want to reduce their values one by one to 1 until the hand is no longer over 21.
    while (flexibleAces > 0 && this.value > 21) {
      this.value -= 10;
      flexibleAces -= 1;
    }
    // at this point, if there are no more aces to adjust in the hand, and the value is still over
    // 21, this hand busts and we move on.
    if (this.value > 21) {
      this.bust = true;
    }
  }

  isBlackJack() {
    return (this.cards.length === 2 && this.value === 21);
  }

  length() {
    return this.cards.length;
  }

  isResolved() {
    return this.bust || this.stand;
  }

  toString() {
    if (this.cards.length === 0) {
      return "empty";
    }
    const stringArray = this.cards.map(card => {
      return card.toString();
    });

    return stringArray.toString();
  }

  restoreFromString(stringArray) {
    if(stringArray === "empty") {
      this.cards = [];
    } else {
      const convertedArray = JSON.parse(`[${stringArray}]`);

      _.forEach(convertedArray, (cardData) => {
        // convert the card data string back to a card object
        let card = new Card(
          cardData.suit,
          cardData.value
        );
        // now restore the card to the cards array
        this.insert(card);
      });
    }
  }
}
