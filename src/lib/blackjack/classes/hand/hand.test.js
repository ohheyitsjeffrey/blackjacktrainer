import Hand from "./hand.js";
import Card from "../card/card.js";

test("Can Create A New Empty Hand", () => {
  const newHand = new Hand();

  // new hand should exist
  expect(newHand).not.toBe(undefined);

  // should also have all of those default constructor values
  expect(newHand.cards).toEqual([]);
  expect(newHand.value).toEqual(0);
  expect(newHand.bust).toEqual(false);
  expect(newHand.stand).toEqual(false);
});

test("Can insert() A Card To A Hand", () => {
  const newHand = new Hand();
  expect(newHand.cards).toEqual([]);

  const card = new Card("spades", "5");
  newHand.insert(card);
  expect(newHand.cards[0]).toEqual(card);
});

test("Can insert() Multiple Card To A Hand And They Will Maintain Their Order", () => {
  const newHand = new Hand();
  // cards in newHand is empty
  expect(newHand.cards).toEqual([]);

  const card0 = new Card("spades", "5");
  const card1 = new Card("diamonds", "6");
  const card2 = new Card("hearts", "7");

  newHand.insert(card0);
  newHand.insert(card1);
  newHand.insert(card2);

  // now it should contain our cards in the order we added them
  expect(newHand.cards[0]).toEqual(card0);
  expect(newHand.cards[1]).toEqual(card1);
  expect(newHand.cards[2]).toEqual(card2);
});

// calcValue() tests
test("Calling calcValue() On An Empty Hand Yields value of 0", () => {
  const newHand = new Hand();
  newHand.calcValue();

  expect(newHand.value).toEqual(0);
});

test("Calling calcValue() On A Hand With A Single Int Value Card Yields value of Int", () => {
  const newHand = new Hand();
  newHand.insert(new Card("spades", "5"));

  expect(newHand.value).toEqual(5);
});

test("Calling calcValue() On A Hand With A Face Card Yields value of 10", () => {
  const newHand0 = new Hand();
  const newHand1 = new Hand();
  const newHand2 = new Hand();

  newHand0.insert(new Card("spades", "jack"));
  newHand1.insert(new Card("diamonds", "queen"));
  newHand2.insert(new Card("hearts", "king"));

  expect(newHand0.value).toEqual(10);
  expect(newHand1.value).toEqual(10);
  expect(newHand2.value).toEqual(10);
});

test("Calling calcValue() On A Hand With An Ace Yields value of 11", () => {
  const newHand = new Hand();
  newHand.insert(new Card("spades", "ace"));

  expect(newHand.value).toEqual(11);
});

// no ace multi-card tests
test("Calling calcValue() On A Hand With A King, 7, and 3 Card Yields value of 20", () => {
  const newHand = new Hand();

  newHand.insert(new Card("spades", "3"));
  newHand.insert(new Card("diamonds", "7"));
  newHand.insert(new Card("hearts", "king"));

  expect(newHand.value).toEqual(20);
});

test("Calling calcValue() On A Hand With A King, Queen, and 3 Card Yields value of 23", () => {
  const newHand = new Hand();

  newHand.insert(new Card("spades", "3"));
  newHand.insert(new Card("diamonds", "queen"));
  newHand.insert(new Card("hearts", "king"));

  expect(newHand.value).toEqual(23);
});

// now tests with aces
test("Calling calcValue() On A Hand With A King, Queen, and Ace Card Yields value of 21", () => {
  const newHand = new Hand();

  newHand.insert(new Card("spades", "king"));
  newHand.insert(new Card("diamonds", "queen"));
  newHand.insert(new Card("hearts", "ace"));

  expect(newHand.value).toEqual(21);
});

test("Calling calcValue() On A Hand With Three Aces Yields value of 13", () => {
  const newHand = new Hand();

  newHand.insert(new Card("spades", "ace"));
  newHand.insert(new Card("diamonds", "ace"));
  newHand.insert(new Card("hearts", "ace"));

  expect(newHand.value).toEqual(13);
});

// accurately detects bust
test("Calling calcValue() On A Hand Of value of 23 Updates bust To true", () => {
  const newHand = new Hand();

  newHand.insert(new Card("spades", "3"));
  newHand.insert(new Card("diamonds", "queen"));
  newHand.insert(new Card("hearts", "king"));

  expect(newHand.bust).toEqual(true);
});

test("Calling calcValue() On A Hand Of value of 20 Will Have bust Equal To False", () => {
  const newHand = new Hand();

  newHand.insert(new Card("diamonds", "queen"));
  newHand.insert(new Card("hearts", "king"));

  expect(newHand.bust).toEqual(false);
});

// isBlackJack() tests
test("Calling isBlackJack() On A Hand With A King and Ace Returns True", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "king"));
  newHand.insert(new Card("spades", "ace"));

  expect(newHand.isBlackJack()).toEqual(true);
});

test("Calling isBlackJack() On A Hand With A 10 and Ace Returns True", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("spades", "ace"));

  expect(newHand.isBlackJack()).toEqual(true);
});

test("Calling isBlackJack() On A Hand With Two Cards That Are Not Valued 21 Returns False", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("spades", "3"));

  expect(newHand.isBlackJack()).toEqual(false);
});

test("Calling isBlackJack() On A Hand With More Than Two Cards Valued 21 Returns False", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("hearts", "5"));
  newHand.insert(new Card("hearts", "5"));
  newHand.insert(new Card("spades", "6"));

  expect(newHand.isBlackJack()).toEqual(false);
});
