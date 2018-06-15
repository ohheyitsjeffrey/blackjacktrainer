import React, { Component } from "react";

import Controls from "./components/controls/controls.js";
import GameHeader from "./components/game_header/game_header.js";
import GameTable from "./components/game_table/game_table.js";

import Shoe from "./classes/shoe/shoe.js";
import Hand from "./classes/hand/hand.js";

import "./blackjack.css";

const betStep = 5;

class BlackJack extends Component {
  constructor(props) {
    super(props);

    this.state = this.hasStateInLocalStorage()
      ? this.restoreState()
      : this.createNewState();

    // core blackjack engine methods
    this.createNewState = this.createNewState.bind(this);
    this.restoreState = this.restoreState.bind(this);
    this.hasStateInLocalStorage = this.hasStateInLocalStorage.bind(this);
    this.writeGameStateToLocalStorage = this.writeGameStateToLocalStorage.bind(this);

    // game table actions
    this.incrementBet = this.incrementBet.bind(this);
    this.decrementBet = this.decrementBet.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.dealNewRound = this.dealNewRound.bind(this);

    // controls 
    this.hit = this.hit.bind(this);
  }

  createNewState() {
    const newShoe = new Shoe(8);
    newShoe.shuffle();

    return {
      options: {
        minimumBet: betStep,
      },
      funds: 1000,
      bet: betStep,
      betPlaced: false,
      shoe: newShoe,
      dealersHand: new Hand(),
      playersHands: [new Hand()],
    };
  }

  // check for existing blackjack state in localstorage
  hasStateInLocalStorage() {
    // check for relevent keys to make sure there is a valid game state in local storage somewhere.
    return (
      localStorage.getItem("funds") !== null &&
      localStorage.getItem("bet") !== null &&
      localStorage.getItem("betPlaced") !== null &&
      localStorage.getItem("shoe") !== null &&
      localStorage.getItem("options.minimumBet") !== null
    );
  }

  restoreState() {
    // restore previous values from local storage 
    const restoredFunds = parseInt(localStorage.getItem("funds"), 10);
    const restoredBet = parseInt(localStorage.getItem("bet"), 10);
    const restoredBetPlaced = localStorage.getItem("betPlaced");

    const shoe = new Shoe();
    const shoeCardsAsString = localStorage.getItem("shoe");
    const restoredShoe = shoe.restoreFromString(shoeCardsAsString);

    const restoredOptions = {
      minimumBet: parseInt(localStorage.getItem("options.minimumBet"), 10),
    };

    // now restore the options object and return like new
    return {
      options: restoredOptions,
      funds: restoredFunds,
      bet: restoredBet,
      betPlaced: (restoredBetPlaced === "true"),
      shoe: restoredShoe,
      dealersHand: new Hand(),
      playersHands: [new Hand()],
      playersHandIndex: 0,
    };
  }

  writeGameStateToLocalStorage() {
    localStorage.setItem("funds", this.state.funds);
    localStorage.setItem("bet", this.state.bet);
    localStorage.setItem("shoe", this.state.shoe.toString());
    // write options object    
    localStorage.setItem("options.minimumBet", this.state.options.minimumBet);
    localStorage.setItem("betPlaced", this.state.betPlaced);
  }

  incrementBet() {
    if (this.state.bet + betStep <= this.state.funds) {
      this.setState((prevState) => ({
        bet: prevState.bet + betStep,
      }));
    }
  }

  decrementBet() {
    if (this.state.bet - betStep >= this.state.options.minimumBet) {
      this.setState((prevState) => ({
        bet: prevState.bet - betStep,
      }));
    }
  }

  placeBet() {
    this.setState(() => ({ betPlaced: true }));
    this.dealNewRound();
  }

  dealNewRound() {
    const shoe = this.state.shoe;
    const dealer = new Hand();
    const player = new Hand();

    dealer.insert(shoe.draw());
    player.insert(shoe.draw());
    dealer.insert(shoe.draw());
    player.insert(shoe.draw());
    this.setState({
      dealersHand: dealer,
      playersHands: [player],
    });
  }

  hit() {
    if (this.state.bet) {
      const shoe = this.state.shoe;
      const hands = this.state.playersHands;

      console.log(hands)
      hands[0].insert(shoe.draw());

      this.setState({
        shoe,
        playersHands: hands,
      });
    }
  }

  render() {
    return (
      <div className="blackjack">
        <GameHeader
          funds={this.state.funds}
        />
        <GameTable
          bet={this.state.bet}
          betPlaced={this.state.betPlaced}
          incrementBet={() => { this.incrementBet(); }}
          decrementBet={() => { this.decrementBet(); }}
          placeBet={() => { this.placeBet(); }}
          dealersHand={this.state.dealersHand}
          playersHands={this.state.playersHands}
        />
        <Controls
          hit={this.hit}
        />
      </div>
    );
  }
}

export default BlackJack;