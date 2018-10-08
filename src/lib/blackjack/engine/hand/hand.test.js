import _ from "lodash";
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

test("Calling isResolved() On A Hand That Busts Returns True", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("spades", "6"));

  expect(newHand.stand).toEqual(false);
  expect(newHand.bust).toEqual(true);
  expect(newHand.isResolved()).toEqual(true);
});

test("Calling isResolved() On A Hand That Stands Returns True", () => {
  const newHand = new Hand();
  newHand.stand = true;

  expect(newHand.bust).toEqual(false);
  expect(newHand.stand).toEqual(true);
  expect(newHand.isResolved()).toEqual(true);
});

test("Calling isResolved() On A Hand That Has Not Bust Or Stood Returns False ", () => {
  const newHand = new Hand();

  newHand.insert(new Card("hearts", "10"));
  newHand.insert(new Card("spades", "6"));

  expect(newHand.stand).toEqual(false);
  expect(newHand.bust).toEqual(false);
  expect(newHand.isResolved()).toEqual(false);
});

test("toString returns string representation of cards in hand", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  // insert the initial cards into the initial hand
  hand.insert(card1);
  hand.insert(card2);

  // get the toString value
  const strings = hand.toString();

  // convert it back to an array of values
  const convertedArray = JSON.parse(`[${strings}]`);

  // create a new hand and attempt to re-insert the cards into it
  const newHand = new Hand();
  convertedArray.forEach(cardStringObject => {
    const newCard = new Card(
      cardStringObject.suit,
      cardStringObject.value
    );
    newHand.insert(newCard);
  });

  // should have the same value and cards array should be the same length for each
  expect(newHand.value).toEqual(hand.value);
  expect(newHand.length()).toEqual(hand.length());
  // verify cards with the same values exist in the array as well
  const hasCard1 = _.find(newHand.cards, (card) => {
    return card.value === card1.value && card.suit === card1.suit;
  });
  const hasCard2 = _.find(newHand.cards, (card) => {
    return card.value === card2.value && card.suit === card2.suit;
  });

  // verify something came back, this could probably be better...
  expect(hasCard1).toBeTruthy();
  expect(hasCard2).toBeTruthy();
});

test("restoreFromString() correctly restores hand with cards", () => {
  const hand = new Hand();
  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  // insert the initial cards into the initial hand
  hand.insert(card1);
  hand.insert(card2);

  const string = hand.toString();

  const newHand = new Hand();
  newHand.restoreFromString(string);

  // newHand's instance variables are the same as hands
  expect(hand.value).toEqual(newHand.value);
  expect(hand.value).toEqual(newHand.value);
  expect(hand.value).toEqual(newHand.value);

  // verify it also has the same cards
  const hasCard1 = _.find(newHand.cards, (card) => {
    return card.value === card1.value && card.suit === card1.suit;
  });
  const hasCard2 = _.find(newHand.cards, (card) => {
    return card.value === card2.value && card.suit === card2.suit;
  });

  expect(hasCard1).toBeTruthy();
  expect(hasCard2).toBeTruthy();
});

test("restoreFromString() correctly restores empty hand", () => {
  const hand = new Hand();
  const string = hand.toString();
  const newHand = new Hand();

  newHand.restoreFromString(string);

  // newHand's instance variables are the same as hands
  expect(hand.value).toEqual(newHand.value);
  expect(hand.value).toEqual(newHand.value);
  expect(hand.value).toEqual(newHand.value);
});

test("Hand can be cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand = _.clone(hand);

  expect(newHand.value === hand.value).toBe(true);
  // is not the same instance of the card
  expect(newHand == hand).toEqual(false);
});

test("Hand can be cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand = _.clone(hand);

  // both have value (we will test functions later)
  expect(newHand.value === hand.value).toBe(true);
  // is not the same instance of the card
  expect(newHand == hand).toEqual(false);
});

test("insert() works after being cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand = _.clone(hand);
  const card = new Card("spades", "5");

  // initial value is 0
  expect(newHand.value).toBe(0);
  newHand.insert(card);

  expect(newHand.value).toBe(5);
});

test("isBlackJack() works after being cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand1 = _.cloneDeep(hand);
  const newHand2 = _.cloneDeep(hand);

  const card1 = new Card("spades", "10");
  const card2 = new Card("spades", "ace");
  const card3 = new Card("spades", "5");
  const card4 = new Card("spades", "6");

  // newHand1 will equal 21 but not be a blackjack
  newHand1.insert(card1);
  newHand1.insert(card3);
  newHand1.insert(card4);

  // newHand2 will be a blackjack
  newHand2.insert(card1);
  newHand2.insert(card2);

  // both should have a value of 21
  expect(newHand1.value).toBe(21);
  expect(newHand2.value).toBe(21);

  // newHand1 should not be blackjack
  expect(newHand1.isBlackJack()).toBe(false);

  // newHand2 should be blackjack
  expect(newHand2.isBlackJack()).toBe(true);
});

test("length() works after being cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand1 = _.cloneDeep(hand);
  const newHand2 = _.cloneDeep(hand);

  const card = new Card("spades", "10");

  // newHand1 will have length 1
  newHand1.insert(card);

  // newHand2 will have length 2
  newHand2.insert(card);
  newHand2.insert(card);

  // verify the method works and that they are different objects
  expect(hand.length()).toBe(0);
  expect(newHand1.length()).toBe(1);
  expect(newHand2.length()).toBe(2);
});

test("isResolved() works after being cloneDeeped by lodash", () => {
  const hand = new Hand();
  const newHand1 = _.cloneDeep(hand);
  const newHand2 = _.cloneDeep(hand);

  const card = new Card("spades", "10");

  // this hand should bust
  newHand1.insert(card);
  newHand1.insert(card);
  newHand1.insert(card);

  // this hand will stand
  newHand2.stand = true;

  // verify the method works and that they are different objects
  expect(hand.isResolved()).toBe(false);
  expect(newHand1.isResolved()).toBe(true);
  expect(newHand2.isResolved()).toBe(true);
});

test("toString() works after being cloneDeeped by lodash", () => {
  const oldHand = new Hand();
  const hand =  _.cloneDeep(oldHand);

  const card1 = new Card("hearts", "10");
  const card2 = new Card("spades", "6");

  // insert the initial cards into the initial hand
  hand.insert(card1);
  hand.insert(card2);

  // get the toString value
  const strings = hand.toString();

  // convert it back to an array of values
  const convertedArray = JSON.parse(`[${strings}]`);

  // create a new hand and attempt to re-insert the cards into it
  const newHand = new Hand();
  convertedArray.forEach(cardStringObject => {
    const newCard = new Card(
      cardStringObject.suit,
      cardStringObject.value
    );
    newHand.insert(newCard);
  });

  // should have the same value and cards array should be the same length for each
  expect(newHand.value).toEqual(hand.value);
  expect(newHand.length()).toEqual(hand.length());
  // verify cards with the same values exist in the array as well
  const hasCard1 = _.find(newHand.cards, (card) => {
    return card.value === card1.value && card.suit === card1.suit;
  });
  const hasCard2 = _.find(newHand.cards, (card) => {
    return card.value === card2.value && card.suit === card2.suit;
  });

  // verify something came back, this could probably be better...
  expect(hasCard1).toBeTruthy();
  expect(hasCard2).toBeTruthy();
});


