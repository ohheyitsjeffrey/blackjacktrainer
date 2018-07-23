import React from "react";
import ReactTestUtils from "react-dom/test-utils";

import BlackJack from "../blackjack.js";

// increment bet
test("incrementBet() Increments Bet When Called", () => {
  const div = document.createElement("div");
  const blackjack =  ReactTestUtils.renderIntoDocument(<BlackJack />, div);

  const minimumBet = blackjack.state.options.minimumBet;
  const initialBet = blackjack.state.bet;

  blackjack.incrementBet();

  expect(blackjack.state.bet).toEqual(initialBet + minimumBet);
});

test("incrementBet() Cannot Exceed Funds", () => {
  const div = document.createElement("div");
  const blackjack =  ReactTestUtils.renderIntoDocument(<BlackJack />, div);

  blackjack.state.bet = blackjack.state.funds;
  const initialBet = blackjack.state.bet;

  blackjack.incrementBet();

  expect(blackjack.state.bet).toEqual(initialBet);
});

// decrement bet
test("decrementBet() Decrements Bet When Called", () => {
  const div = document.createElement("div");
  const blackjack = ReactTestUtils.renderIntoDocument(<BlackJack />, div);

  const minimumBet = blackjack.state.options.minimumBet;
  blackjack.state.bet = 30;
  const initialBet = blackjack.state.bet;
    
  blackjack.decrementBet();

  expect(blackjack.state.bet).toEqual(initialBet - minimumBet);
});

test("decrementBet() Cannot Reduce Bet Amount Below Minimum Bet", () => {
  const div = document.createElement("div");
  const blackjack = ReactTestUtils.renderIntoDocument(<BlackJack />, div);

  blackjack.state.bet = blackjack.state.options.minimumBet;
  const initialBet = blackjack.state.bet;
    
  blackjack.decrementBet();

  expect(blackjack.state.bet).toEqual(initialBet);
});

// place bet
test("placeBet() Deducts Funds Accurately And Sets betPlaced To true In State", () => {
  const div = document.createElement("div");
  const blackjack = ReactTestUtils.renderIntoDocument(<BlackJack />, div);
  const initialFunds = blackjack.state.funds;
  const bet = blackjack.state.bet;

  blackjack.state.bet = blackjack.state.options.minimumBet;

  
  blackjack.placeBet();

  expect(blackjack.state.betPlaced).toEqual(true);
  expect(blackjack.state.funds).toEqual(initialFunds - bet);
});

