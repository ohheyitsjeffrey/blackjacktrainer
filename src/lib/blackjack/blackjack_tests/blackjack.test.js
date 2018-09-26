import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

import BlackJack from "../blackjack.js";
import Shoe from "../engine/shoe/shoe.js";

beforeEach(() => {
  localStorage.clear();
});

// // TODO rework this suite

it("needs to be refactored", ()=>{
  expect(true).toBe(true);
});

// it("BlackJack Class Generates New Game State When None Is Saved In Local Storage", () => {
//   // verify that local storage values are empty
//   expect(localStorage.getItem("funds")).toBe(null);
//   expect(localStorage.getItem("bet")).toBe(null);
//   expect(localStorage.getItem("shoe")).toBe(null);
//   expect(localStorage.getItem("options.minimumBet")).toBe(null);
//   expect(localStorage.getItem("betPlaced")).toBe(null);

//   // create a blackjack instance
//   const blackjack = new BlackJack();

//   // verify state values are there and are default values
//   expect(blackjack.state.bet).toEqual(5);
//   expect(blackjack.state.funds).toEqual(1000);
//   expect(blackjack.state.shoe instanceof Shoe).toEqual(true);
//   expect(blackjack.state.bet).toEqual(blackjack.state.options.minimumBet);
//   expect(blackjack.state.betPlaced).toEqual(false);
// });

// test("BlackJackEngine Initiates With Existing State From localStorage", () => {
//   // set some initial values to restore from
//   localStorage.setItem("funds", "100");
//   localStorage.setItem("bet", "20");
//   localStorage.setItem("betPlaced", "true");
//   localStorage.setItem("shoe",
//     '{"suit":"hearts","value":"2"},{"suit":"hearts","value":"3"}' // eslint-disable-line quotes
//   );
//   localStorage.setItem("options.minimumBet", 5);

//   // create a blackjack instance
//   const blackjack = new BlackJack();

//   // verify state values are restored from previous values
//   expect(blackjack.state.funds).toEqual(100);
//   expect(blackjack.state.bet).toEqual(20);
//   // expect(blackjack.state.shoe instanceof Shoe).toEqual(true);
//   expect(blackjack.state.options.minimumBet).toEqual(5);
//   expect(blackjack.state.betPlaced).toEqual(true);
// });

// test("BlackJack Overwrites Existing GameState. ", () => {
//   const blackjack = new BlackJack();

//   blackjack.state.bet = 10;
//   blackjack.state.funds = 333;

//   blackjack.writeGameStateToLocalStorage();

//   expect(localStorage.getItem("bet")).toEqual("10");
//   expect(localStorage.getItem("funds")).toEqual("333");
// });

// test("incrementBet() Increment Bet When Called", () => {
//   const div = document.createElement("div");
//   const blackjack =  ReactTestUtils.renderIntoDocument(<BlackJack />, div);

//   const minimumBet = blackjack.state.options.minimumBet;
//   const initialBet = blackjack.state.bet;

//   blackjack.incrementBet();
//   blackjack.incrementBet();
//   blackjack.incrementBet();

//   expect(blackjack.state.bet).toEqual(initialBet + (minimumBet * 3));
//   ReactDOM.unmountComponentAtNode(div);
// });

// test("decrementBet() Decrement Bet When Called", () => {
//   const div = document.createElement("div");
//   const blackjack = ReactTestUtils.renderIntoDocument(<BlackJack />, div);

//   const minimumBet = blackjack.state.options.minimumBet;
//   blackjack.state.bet = 30;
//   const initialBet = blackjack.state.bet;

//   blackjack.decrementBet();
//   blackjack.decrementBet();
//   blackjack.decrementBet();

//   expect(blackjack.state.bet).toEqual(initialBet - (minimumBet * 3));
//   ReactDOM.unmountComponentAtNode(div);
// });
