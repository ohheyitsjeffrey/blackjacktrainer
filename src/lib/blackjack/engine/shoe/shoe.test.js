import Shoe from "./shoe.js";
import _ from "lodash";

test("Creating A Shoe Of Size 1 Contains 52 Cards", () => {
  const shoe = new Shoe();
  expect(shoe.cards.length).toEqual(52);
});

test("Creating A Shoe Of Size 8 Contains 416 Cards", () => {
  const shoe = new Shoe(8);
  expect(shoe.cards.length).toEqual(416);
});

test("Shuffling A Shoe Randomizes The Shoe Order", () => {
  const shoe = new Shoe(1);
  const copyOfOriginalShoe = _.cloneDeep(shoe);
  // original shoe and copyOfOriginalShoe have the same cards but are not the
  // same object.
  expect(shoe.cards).toEqual(copyOfOriginalShoe.cards);
  expect(shoe.cards).not.toBe(copyOfOriginalShoe.cards);
  // now shuffle shoe
  shoe.shuffle();
  // verify we didn't lose cards or just break the shoe  
  expect(shoe.cards.length).toEqual(copyOfOriginalShoe.cards.length);
  // verify it has all the same cards
  copyOfOriginalShoe.cards.forEach((card) => {
    expect(shoe.cards).toContainEqual(card);
  });
  // finally verify they are not in the same order
  expect(shoe.cards).not.toEqual(copyOfOriginalShoe.cards);
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

test("toString() Returns String Of Array", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();

  expect(typeof shoeString).toEqual("string");
});

test("toString() Values Reflect Those Of Original Array And Can Be Converted Back", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();
  // now convert it back into an array of objects
  const stringToArray = JSON.parse(`[${shoeString}]`);

  // verify card data from string in indexes reflects original values.
  _.forEach(stringToArray, (cardData, index) => {
    expect(shoe.cards[index].value).toEqual(cardData.value);
    expect(shoe.cards[index].suit).toEqual(cardData.suit);
  });
});

test("restoreFromString() Properly Restores Cards From toString() Backup", () => {
  const shoe = new Shoe();
  // convert the shoe to a string array
  const shoeString = shoe.toString();
  // now convert it back into a shoe
  const restoredShoe = new Shoe().restoreFromString(shoeString);

  // verify cards are the same and in the same order
  _.forEach(restoredShoe, (restoredCard, index) => {
    expect(shoe.cards[index]).toEqual(restoredCard);
  });
});