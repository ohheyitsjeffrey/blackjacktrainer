import _ from "lodash";

import Shoe from "./shoe.js";
import Card from "../card/card.js";
import GameUtils from "../game-utils";

test("Creating A Shoe Of Size 1 Contains 52 Cards", () => {
  const shoe = new Shoe();
  expect(shoe.cards.length).toEqual(52);
});

test("Creating A Shoe Of Size 8 Contains 416 Cards", () => {
  const shoe = new Shoe(8);
  expect(shoe.cards.length).toEqual(416);
});

test("Shoe Order is Randomized", () => {
  const shoe = new Shoe(1);
  const deck = [];

  const suits = GameUtils.suits;
  const values = GameUtils.values;

  // make a deck of 52 cards
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push(new Card(suit, value));
    });
  });

  // verify they both have 52 cards
  expect(deck.length).toEqual(52);
  expect(shoe.cards.length).toEqual(52);

  // verify it has all the same cards
  shoe.cards.forEach((card) => {
    expect(deck).toContainEqual(card);
  });
  // finally verify they are not in the same order
  expect(shoe.cards).not.toEqual(deck);
});

test("Drawing A Card Returns 'Top' Card In Shoe", () => {
  const shoe = new Shoe(1);
  const lastIndex = shoe.cards.length - 1;

  const lastCard = shoe.cards[lastIndex];
  const drawnCard = shoe.draw();

  expect(lastCard).toEqual(drawnCard);
});

test("Drawing A Card Removes That Card From Shoe", () => {
  const shoe = new Shoe(1);
  const initialLength = shoe.cards.length;

  const drawnCard = shoe.draw();

  // verify a card has been removed and that the card we drew is no longer in the shoe
  expect(shoe.cards.length).toEqual(initialLength - 1);
  expect(shoe.cards).not.toContainEqual(drawnCard);
});

test("remainingCount() Method Accurately Returns Cards Total", () => {
  const shoe = new Shoe(1);
  const shoeLength = shoe.cards.length;
  const shoeRemaining = shoe.remainingCount();

  expect(shoeRemaining).toEqual(shoeLength);
});

test("toString() Returns Array Of Strings", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();

  expect(typeof shoeString).toEqual("string");
});

test("toString() Values Reflect Those Of Original Cards Array And Size And Can Be Converted Back", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();
  // now convert it back into an array of objects
  const stringToArray = JSON.parse(`[${shoeString}]`);

  // verify the size object is intact
  const shoeSizeObject = stringToArray.pop();
  const shoeSize = parseInt(shoeSizeObject.size);
  expect(shoeSize).toBe(1);

  // verify card data from string in indexes reflects original values.
  _.forEach(stringToArray, (cardData, index) => {
    expect(shoe.cards[index].value).toEqual(cardData.value);
    expect(shoe.cards[index].suit).toEqual(cardData.suit);
  });
});

test("restoreFromString() Properly Restores Cards And Size From toString() Backup", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();
  // now convert it back into a shoe
  const restoredShoe = new Shoe();
  restoredShoe.restoreFromString(shoeString);

  // verify cards are the same and in the same order
  _.forEach(restoredShoe.cards, (restoredCard, index) => {
    expect(shoe.cards[index]).toEqual(restoredCard);
  });

  // verify the size is intact as well
  expect(restoredShoe.size).toEqual(1);
});

test("restoreFromString() Properly Restores An Empty Shoe From toString() Backup", () => {
  const shoe = new Shoe();
  shoe.cards = [];
  // convert the shoe to a string array
  const shoeString = shoe.toString();
  // now convert it back into a shoe
  const restoredShoe = new Shoe();
  restoredShoe.restoreFromString(shoeString);
  // verify cards are empty
  expect(restoredShoe.cards.length).toBe(0);
  // verify the size is intact as well
  expect(restoredShoe.size).toBe(1);
});

test("Shoe Replenishes To Default Size When It Runs Out Of Cards", () => {
  // make a shoe of default size 1
  const shoe = new Shoe();

  const card0 = new Card("spades", "5");
  const card1 = new Card("diamonds", "6");

  // shoe has two cards left
  shoe.cards = [card0, card1];
  expect(shoe.cards.length).toBe(2);

  // draw those two cards
  shoe.draw();
  shoe.draw();
  expect(shoe.cards.length).toBe(0);

  // now try and draw a card against the empty shoe
  const card = shoe.draw();

  // new card should not be undefined
  expect(card === undefined).toBe(false);

  // shoe now has 51 cards
  expect(shoe.cards.length).toBe(51);
});

test("Shoe Replenishes To Custom Size When It Runs Out Of Cards", () => {
  // make a shoe of default size 1
  const shoe = new Shoe(2);

  const card0 = new Card("spades", "5");
  const card1 = new Card("diamonds", "6");

  // shoe has two cards left
  shoe.cards = [card0, card1];
  expect(shoe.cards.length).toBe(2);

  // draw those two cards
  shoe.draw();
  shoe.draw();
  expect(shoe.cards.length).toBe(0);

  // now try and draw a card against the empty shoe
  const card = shoe.draw();

  // new card should not be undefined
  expect(card === undefined).toBe(false);
  // shoe should now have 103 cards
  expect(shoe.cards.length).toBe(103);
});

test("Shoe can be cloneDeeped by lodash", () => {
  const shoe = new Shoe(3);
  const newShoe = _.clone(shoe);

  // both have size 3
  expect(newShoe.size).toBe(3);
  expect(shoe.size).toBe(3);

  // both cards arrays are of length
  expect(newShoe.cards.length).toBe(156);
  expect(shoe.cards.length).toBe(156);

  // is not the same instance of the card
  expect(shoe == newShoe).toEqual(false);
});

test("draw() works after being cloneDeeped by lodash", () => {
  const shoe = new Shoe(3);
  const newShoe = _.cloneDeep(shoe);

  // both arrays have the same top card
  expect(newShoe.cards[0]).toEqual(shoe.cards[0]);

  // both have same card length
  const shoeLength = shoe.cards.length;
  const newLength =  newShoe.cards.length;

  expect(shoeLength).toEqual(newLength);

  // draw doesn't throw an error on either
  const card =  shoe.draw();
  const newCard = newShoe.draw();

  // cards are equal and not undefined
  expect(card).toEqual(newCard);
  expect(card === undefined).toBe(false);
  expect(newCard === undefined).toBe(false);

  // each has one less card in their cards array
  expect(shoe.cards.length).toEqual(shoeLength - 1);
  expect(newShoe.cards.length).toEqual(newLength - 1);

  // is not the same instance of the card
  expect(shoe == newShoe).toEqual(false);
});

test("remainingCount() works after being cloneDeeped by lodash", () => {
  const shoe = new Shoe(1);
  const newShoe = _.cloneDeep(shoe);

  const shoeLength = newShoe.cards.length;
  const shoeRemaining = newShoe.remainingCount();

  expect(shoeRemaining).toEqual(shoeLength);
});

test("toString() works after being cloneDeeped by lodash", () => {
  const shoe = new Shoe();
  const newShoe = _.cloneDeep(shoe);
  // convert the shoe to a string array
  const shoeString = newShoe.toString();
  // now convert it back into an array of objects
  const stringToArray = JSON.parse(`[${shoeString}]`);

  // verify the size object is intact
  const shoeSizeObject = stringToArray.pop();
  const shoeSize = parseInt(shoeSizeObject.size);
  expect(shoeSize).toBe(1);

  // verify card data from string in indexes reflects original values.
  _.forEach(stringToArray, (cardData, index) => {
    expect(newShoe.cards[index].value).toEqual(cardData.value);
    expect(newShoe.cards[index].suit).toEqual(cardData.suit);
  });
});

test("restoreFromString() works after being cloneDeeped by lodash", () => {
  const shoe = new Shoe();
  const newShoe = _.cloneDeep(shoe);

  // convert the shoe to a string array
  const shoeString = newShoe.toString();
  // now convert it back into a shoe
  const restoredShoe = new Shoe().restoreFromString(shoeString);

  // verify cards are the same and in the same order
  _.forEach(restoredShoe, (restoredCard, index) => {
    expect(newShoe.cards[index]).toEqual(restoredCard);
  });
});
