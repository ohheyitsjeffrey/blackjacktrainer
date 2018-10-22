import Hand from "../hand/hand.js";
import Card from "../card/card.js";

import allPlayerHandsDidBust from "./allPlayerHandsDidBust";

it("allPlayerHandsDidBust() returns false for a single hand that did not bust", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand.insert(card1);
  hand.insert(card2);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(false);
});

it("allPlayerHandsDidBust() returns false for two hands that did not bust", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand1.insert(card1);
  hand1.insert(card2);

  hand2.insert(card1);
  hand2.insert(card2);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand1, hand2];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(false);
});

it("allPlayerHandsDidBust() returns false for two hands where the first did not bust and the second did", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand1.insert(card1);
  hand1.insert(card2);

  hand2.insert(card1);
  hand2.insert(card2);
  hand2.insert(card1);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand1, hand2];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(false);
});

it("allPlayerHandsDidBust() returns false for two hands where the first did bust and the second did not", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand1.insert(card1);
  hand1.insert(card2);
  hand1.insert(card1);

  hand2.insert(card1);
  hand2.insert(card2);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand1, hand2];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(false);
});

it("allPlayerHandsDidBust() returns true for one hands that did bust", () => {
  const hand = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand.insert(card1);
  hand.insert(card2);
  hand.insert(card1);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(true);
});

it("allPlayerHandsDidBust() returns true for two hands that both bust", () => {
  const hand1 = new Hand();
  const hand2 = new Hand();

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  hand1.insert(card1);
  hand1.insert(card2);
  hand1.insert(card1);

  hand2.insert(card1);
  hand2.insert(card1);
  hand2.insert(card2);

  // verify allPlayerHandsDidBust() returns false
  const playerHands = [hand1, hand2];
  const didBust = allPlayerHandsDidBust(playerHands);

  expect(didBust).toBe(true);
});
