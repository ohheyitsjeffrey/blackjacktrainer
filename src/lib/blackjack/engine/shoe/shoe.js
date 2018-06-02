import Card from "../card/card.js";
import { suitsAndValues } from "../suitsAndValues.js";

class Shoe {
  constructor(size=1) {
    this.cards = this.newShoe(size);
  }
  // size specifies the number of decks in a shoe
  newShoe(size) {
    const suits = suitsAndValues.suits;
    const values = suitsAndValues.values;

    const shoe = [];

    for(let i = 0; i < size; i++){
      suits.forEach(suit => {
        values.forEach(value => {
          shoe.push(new Card(suit, value));
        });
      });
    }

    return shoe;
  }

  shuffle() {
    for(let i = 0; i < this.cards.length; i++) {
      let j = Math.floor(Math.random(0) * this.cards.length);
      let temp = this.cards[i];
      // swap cards in positions i and j
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  draw() {
    return this.cards.pop();
  }

  remainingCount() {
    return this.cards.length;
  }
}

export default Shoe;
