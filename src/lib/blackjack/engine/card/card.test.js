import Card from "./card.js";

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
  expect(newCard.suit).toEqual(card.suit);
});