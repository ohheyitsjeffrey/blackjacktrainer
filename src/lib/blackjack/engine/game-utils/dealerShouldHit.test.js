import Hand from "../hand";
import Card from "../card";

import dealerShouldHit from "./dealerShouldHit";

it("dealerShouldHit() should return true when dealer's hand < 17", () => {
  const dealersHand = new Hand();
  const options = {};

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  // hand is 16

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(true);
});

it("dealerShouldHit() should return false when dealer's hand > 17", () => {
  const dealersHand = new Hand();
  const options = {};

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("spades", "3");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  dealersHand.insert(card3);
  // hand is 19

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return false when dealer's hand === hard 17 and options.hitOnSoft17 === undefined", () => {
  const dealersHand = new Hand();
  const options = {};

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  dealersHand.insert(card3);
  // hand is hard 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return false when dealer's hand === hard 17 and options.hitOnSoft17 === false", () => {
  const dealersHand = new Hand();
  const options = {
    hitOnSoft17: false,
  };

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  dealersHand.insert(card3);
  // hand is hard 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return false when dealer's hand === hard 17 and options.hitOnSoft17 === true", () => {
  const dealersHand = new Hand();
  const options = {
    hitOnSoft17: true,
  };

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");
  const card3 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  dealersHand.insert(card3);
  // hand is hard 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return false when dealer's hand === soft 17 and options.hitOnSoft17 === undefined", () => {
  const dealersHand = new Hand();
  const options = {};

  const card1 = new Card("spades", "6");
  const card2 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  // hand is soft 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return false when dealer's hand === soft 17 and options.hitOnSoft17 === false", () => {
  const dealersHand = new Hand();
  const options = {
    hitOnSoft17: false,
  };

  const card1 = new Card("spades", "6");
  const card2 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  // hand is soft 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(false);
});

it("dealerShouldHit() should return true when dealer's hand === soft 17 and options.hitOnSoft17 === true", () => {
  const dealersHand = new Hand();
  const options = {
    hitOnSoft17: true,
  };

  const card1 = new Card("spades", "6");
  const card2 = new Card("spades", "ace");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  // hand is soft 17

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(true);
});

it("dealerShouldHit() should return true when dealer's hand < 17", () => {
  const dealersHand = new Hand();
  const options = {};

  const card1 = new Card("spades", "6");
  const card2 = new Card("spades", "5");

  dealersHand.insert(card1);
  dealersHand.insert(card2);
  // hand is 11

  const shouldHit = dealerShouldHit(dealersHand, options);
  expect(shouldHit).toBe(true);
});
