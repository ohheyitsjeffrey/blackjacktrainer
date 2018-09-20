import Card from "./card.js";
import _ from "lodash";

test("Can Create A New Card With a Valid Suit And Valid Value", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  expect(card.suit).toEqual(suit);
  expect(card.value).toEqual(value);
});

test("Creating A Card With An Invalid Value Parameter Throws An 'InvalidCardValue' Error", () => {
  expect(() => {
    new Card("not a real suit", "5");
  }).toThrow("Not a valid card suit");
});

test("Creating A Card With An Invalid Suit Parameter Throws An 'InvalidCardValue' Error", () => {
  expect(() => {
    new Card("diamonds", "not a real value");
  }).toThrow("Not a valid card value");
});

test("toString() Returns A String Object Of The Card ", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const cardString = card.toString();

  const newCard = JSON.parse(cardString);

  expect(newCard.suit).toEqual(card.suit);
  expect(newCard.value).toEqual(card.value);
});

test("cardValue() Returns A String Of The Card Value ", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const cardValue = card.cardValue();

  expect(cardValue).toEqual(value);
});

test("cardValue() Returns '10' For Jack Cards ", () => {
  const suit = "diamonds";
  const value = "jack";

  const card = new Card(suit, value);
  const cardValue = card.cardValue();

  expect(cardValue).toEqual("10");
});

test("cardValue() Returns '10' For Queen Cards ", () => {
  const suit = "diamonds";
  const value = "queen";

  const card = new Card(suit, value);
  const cardValue = card.cardValue();

  expect(cardValue).toEqual("10");
});

test("cardValue() Returns '10' For King Cards ", () => {
  const suit = "diamonds";
  const value = "king";

  const card = new Card(suit, value);
  const cardValue = card.cardValue();

  expect(cardValue).toEqual("10");
});

test("cardValue() Returns 'ace' For Ace Cards ", () => {
  const suit = "diamonds";
  const value = "ace";

  const card = new Card(suit, value);
  const cardValue = card.cardValue();

  expect(cardValue).toEqual("ace");
});

test("Card can be cloneDeeped by lodash", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const newCard = _.cloneDeep(card);

  // value and suit are the same
  expect(newCard.value === value).toEqual(true);
  expect(newCard.suit === suit).toEqual(true);

  // is not the same instance of the card
  expect(newCard == card).toEqual(false);
});

test("Card instance function cardValue() works after being cloneDeeped by lodash", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const newCard = _.cloneDeep(card);

  // should return the card value as a string
  const cardValue = newCard.cardValue();
  expect(cardValue).toEqual("5");
});

test("Card instance function toString() works after being cloneDeeped by lodash", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const newCard = _.cloneDeep(card);

  // this toString should return a string representation of a JSON object with the cards suit and value
  const cardString = newCard.toString();
  expect(cardString).toEqual("{\"suit\":\"diamonds\",\"value\":\"5\"}");
});

test("Card can be cloneDeeped by lodash", () => {
  const suit = "diamonds";
  const value = "5";

  const card = new Card(suit, value);
  const newCard = _.cloneDeep(card);

  // value and suit are the same
  expect(newCard.value === value).toEqual(true);
  expect(newCard.suit === suit).toEqual(true);

  // is not the same instance of the card
  expect(newCard == card).toEqual(false);
});