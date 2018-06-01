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
