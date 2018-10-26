export default function dealerShouldHit(dealersHand, options) {
  if (dealersHand.value > 17) {
    // if the dealer has hard 17 or greater dealer stands regardless of soft 17 rule
    return false;
  } else if (dealersHand.value === 17 && !dealersHand.isSoft) {
    return false;
  } else if (dealersHand.value === 17 && !options.hitOnSoft17) {
    return false;
  } else {
    return true;
  }
}