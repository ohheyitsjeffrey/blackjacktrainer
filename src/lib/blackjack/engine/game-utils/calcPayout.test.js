import Card from "../card";
import Hand from "../hand";
import {calcPayout } from "./index.js";

it("calcPayout() returns 0 when dealer's hand > players", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 10
  playersHand.insert(new Card("spades", "5"));
  playersHand.insert(new Card("clubs", "5"));

  // dealer's hand will be 17
  dealersHand.insert(new Card("diamonds", "7"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return 0
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(0);
});

it("calcPayout() returns 10 when players's hand > dealers hand on a bet of 5", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 18
  playersHand.insert(new Card("spades", "8"));
  playersHand.insert(new Card("clubs", "10"));

  // dealer's hand will be 17
  dealersHand.insert(new Card("diamonds", "7"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return bet * 2
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(10);
});

it("calcPayout() returns 5 when players's hand === dealers hand on a bet of 5", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 17
  playersHand.insert(new Card("spades", "7"));
  playersHand.insert(new Card("clubs", "10"));

  // dealer's hand will be 17
  dealersHand.insert(new Card("diamonds", "7"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return bet
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(bet);
});

it("calcPayout() returns 0 when dealer has a blackjack and player does not", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 21
  playersHand.insert(new Card("spades", "7"));
  playersHand.insert(new Card("clubs", "10"));
  playersHand.insert(new Card("clubs", "4"));

  // dealer's hand will be 17
  dealersHand.insert(new Card("diamonds", "ace"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return true
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(0);
});

it("calcPayout() returns 12.5 when player has a blackjack and dealer does not", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be blackjack
  playersHand.insert(new Card("diamonds", "ace"));
  playersHand.insert(new Card("diamonds", "10"));

  // dealer's hand will be 21
  dealersHand.insert(new Card("spades", "7"));
  dealersHand.insert(new Card("clubs", "10"));
  dealersHand.insert(new Card("clubs", "4"));

  // should return true
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(bet * 2.5);
});

it("calcPayout() returns 0 when players hand > dealers but player has bust", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 27
  playersHand.insert(new Card("spades", "5"));
  playersHand.insert(new Card("clubs", "5"));
  playersHand.insert(new Card("diamonds", "7"));
  playersHand.insert(new Card("diamonds", "10"));

  // dealer's hand will be 17
  dealersHand.insert(new Card("diamonds", "7"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return 0
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(0);
});

it("calcPayout() returns 10 when dealer's hand > players but dealer has bust", () => {
  const playersHand = new Hand();
  const dealersHand = new Hand();
  const bet = 5;

  // player's hand will be 10
  playersHand.insert(new Card("spades", "5"));
  playersHand.insert(new Card("clubs", "5"));

  // dealer's hand will be 27
  dealersHand.insert(new Card("diamonds", "7"));
  dealersHand.insert(new Card("diamonds", "10"));
  dealersHand.insert(new Card("diamonds", "10"));

  // should return 10
  expect(calcPayout(playersHand, dealersHand, bet)).toEqual(10);
});