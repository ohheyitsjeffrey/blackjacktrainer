import _ from "lodash";

export default function allPlayerHandsDidBust(playersHands) {
  // returns first hand that did not bust
  const hasNonBustHand = _.find(playersHands, (hand) => {
    return !hand.bust;
  });

  // return if there are no hands that have not bust
  return !hasNonBustHand;
}