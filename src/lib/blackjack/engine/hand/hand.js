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
      switch (card.value) {
        case "ace":
          flexibleAces += 1;
          this.value += 11;
          break;
        case "jack":
        case "queen":
        case "king":
          this.value += 10;
          break;
        default:
          this.value += parseInt(card.value, 10);
          break;
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
}
