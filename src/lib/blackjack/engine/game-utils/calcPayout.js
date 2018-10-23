export default function calcPayout(playersHand, dealersHand, bet) {
  /*
  players's bet has already been removed from funds, and the return value of this function will
  be added to the player's funds so we need to account for the initial bet.

  any scenario where the dealer wins returns 0
  any scenario where the player wins except for a blackjack will return bet * 2
  a player blackjack pays 3/2, and therefor will return bet * 2.5

  this method does not yet and may never take into account surrender or insurance bets as they have
  not been implemented yet
  */
  if (playersHand.bust) {
    // if the player has bust the game is over and dealer wins
    return 0;
  } else if (dealersHand.isBlackJack() && !playersHand.isBlackJack()) {
    // dealer wins on blackjack
    return 0;
  } else if (playersHand.isBlackJack() && !dealersHand.isBlackJack()) {
    // player wins if they have blackjack and dealer does not
    return bet * 2.5;
  } else if (dealersHand.bust) {
    // if the dealer busts but not the player then the player wins
    return bet * 2;
  } else if (playersHand.value > dealersHand.value) {
    // player wins if their hand is greater than the dealers and there are no blackjacks
    return bet * 2;
  } else if (playersHand.value === dealersHand.value) {
    // equal hands means a push, return players initial bet
    return bet;
  } else {
    // player has lost and gets nothing
    return 0;
  }
};