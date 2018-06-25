import React, { Component } from "react";
import _ from "lodash";

import Controls from "./components/controls/controls.js";
import GameHeader from "./components/game_header/game_header.js";
import GameTable from "./components/game_table/game_table.js";

import Shoe from "./engine/shoe/shoe.js";
import Hand from "./engine/hand/hand.js";
import GameUtils from "./engine/gameUtils.js";

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

    this.evaluateGameState = this.evaluateGameState.bind(this);
    this.getPlayersNextHand = this.getPlayersNextHand.bind(this);
    this.dealersTurn = this.dealersTurn.bind(this);
    this.settleRound = this.settleRound.bind(this);
    this.updateAndStartNewRound = this.updateAndStartNewRound.bind(this);

    // game table actions
    this.incrementBet = this.incrementBet.bind(this);
    this.decrementBet = this.decrementBet.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.dealNewRound = this.dealNewRound.bind(this);

    // controls 
    this.hit = this.hit.bind(this);
    this.stand = this.stand.bind(this);
    this.double = this.double.bind(this);
    this.split = this.split.bind(this);

    // control checks
    this.canHit = this.canHit.bind(this);
    this.canStand = this.canStand.bind(this);
    this.canDouble = this.canDouble.bind(this);
    this.canSplit = this.canSplit.bind(this);
  }

  createNewState() {
    const newShoe = new Shoe(8);
    newShoe.shuffle();

    return {
      options: {
        minimumBet: betStep,
        dealerStands: 17,
      },
      funds: 1000,
      bet: betStep,
      betPlaced: false,
      shoe: newShoe,
      dealersHand: new Hand(),
      playersHands: [new Hand()],
      activeHand: 0,
      isPlayersTurn: false,
      isDealersTurn: false,
    };
  }

  // check for existing blackjack state in localstorage
  hasStateInLocalStorage() {
    // check for relevent keys to make sure there is a valid game state in local storage somewhere.
    // this allows existing gamestates to be overwritten if the game is updated with new needs.
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

  componentDidUpdate() {
    // this lives here to ensure it is called anytime state updates.  It is it's 
    // own function because that makes it easier to test.
    this.evaluateGameState();
  }

  // A common function to evaluate the state of the game and determine what if 
  // anything to do next.  Needs a better name but so do plenty of things...
  evaluateGameState() {
    // The game just started and a bet has not been placed 
    if (!this.state.betPlaced) {
      // just wait for bet to be placed
      return;
    }

    // player's turn
    if (this.state.isPlayersTurn) {
      // is the player's hand finished?  If so look to see if they have another 
      // hand from a split to play.  If they do make it active.  If not, then it
      // should be the dealer's turn 
      const playersHands = this.state.playersHands;
      let activeHand = this.state.activeHand;

      if (playersHands[activeHand].isResolved()) {
        const nextHand = this.getPlayersNextHand();
        if (nextHand < 0) {
          this.setState({
            isPlayersTurn: false,
            isDealersTurn: true,
          });
        } else {
          this.setState({
            activeHand: nextHand,
          });
        }
      }
      return;
    }

    // is the dealer's turn
    if (this.state.isDealersTurn && !this.state.dealersHand.isResolved()) {
      this.dealersTurn();
      return;
    }

    if (this.state.dealersHand.isResolved()) {
      this.settleRound();
    }
  }

  settleRound() {
    const playersHands = this.state.playersHands;
    const dealersHand = this.state.dealersHand;
    const bet = this.state.bet;

    let payout = 0;

    _.forEach(playersHands, (hand) => {
      payout += GameUtils.calcPayout(hand, dealersHand, bet);
    });

    (this.state.funds + payout) >= this.state.options.minimumBet
      ? this.updateAndStartNewRound(payout)
      : this.createNewState();
  }

  updateAndStartNewRound(payout) {
    this.setState((prevState) => ({
      funds: prevState.funds + payout,
      betPlaced: false,
      bet: prevState.options.minimumBet,
      isPlayersTurn: false,
      isDealersTurn: false,
      dealersHand: undefined,
      playersHands: [],
    }));
  }

  // if a player has split and has multiple hands, get the first one that is not resolved
  getPlayersNextHand() {
    const playersHands = this.state.playersHands;
    return _.findIndex(playersHands, (hand) => {
      return !hand.isResolved();
    });
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
    this.setState((prevState) => ({
      betPlaced: true,
      funds: prevState.funds - prevState.bet,
    }));

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
      isPlayersTurn: true,
    });
  }

  dealersTurn() {
    const dealersHand = this.state.dealersHand;
    const shoe = this.state.shoe;

    if (dealersHand.value < 17) {
      dealersHand.insert(shoe.draw());

      this.setState({
        dealersHand,
        shoe,
      });
    } else {
      dealersHand.stand = true;
      this.setState({
        dealersHand,
        shoe,
        dealersTurn: false,
      });
    }
  }

  canHit() {
    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&              // it is the players turn
      this.state.playersHands.length > 0 &&         // the player has been dealt cards
      !this.state.playersHands[handIndex].bust &&   // current hand is not busted
      !this.state.playersHands[handIndex].stand;    // current hand is not standing either
  }

  hit() {
    const handIndex = this.state.activeHand;
    const shoe = this.state.shoe;
    const hands = this.state.playersHands;

    hands[handIndex].insert(shoe.draw());
    this.setState({
      shoe,
      playersHands: hands,
    });
  }

  canStand() {
    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&
      this.state.playersHands.length > 0 &&         // the player has been dealt cards
      !this.state.playersHands[handIndex].bust &&   // current hand is not busted
      !this.state.playersHands[handIndex].stand;    // current hand is not standing either
  }

  stand() {
    // check to see if this is the last hand in the player's array,   
    const hands = this.state.playersHands;
    const handIndex = this.state.activeHand;

    hands[handIndex].stand = true;

    this.setState({
      playersHands: hands,
    });
  }

  canDouble() {
    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&
      this.state.playersHands.length > 0 &&                 // the player has been dealt cards
      this.state.playersHands[handIndex].length() === 2 &&  // the player has their first two cards
      this.state.funds > this.state.bet &&
      !this.state.playersHands[handIndex].bust &&           // current hand is not busted
      !this.state.playersHands[handIndex].stand;            // current hand is not standing either
  }

  double() {
    const handIndex = this.state.activeHand;
    const shoe = this.state.shoe;
    const hands = this.state.playersHands;
    const funds = this.state.funds - this.state.bet;
    const bet = this.state.bet * 2;


    hands[handIndex].insert(shoe.draw());
    hands[handIndex].stand = true;

    this.setState({
      shoe,
      playersHands: hands,
      funds,
      bet,
    });
  }

  canSplit() {
    const handIndex = this.state.activeHand;

    if (!this.state.playersHands[handIndex] || !this.state.playersHands[handIndex]) {
      return false;
    }

    const firstCard = this.state.playersHands[handIndex].cards[0];
    const secondCard = this.state.playersHands[handIndex].cards[1];

    return this.state.isPlayersTurn &&                              // it is the player's turn
      this.state.playersHands.length > 0 &&                         // the player has a hand
      this.state.playersHands[handIndex].cards.length === 2 &&      // hand has not hit
      firstCard.cardValue() === secondCard.cardValue();             // the cards are of equal value
  }

  split() {
    const handIndex = this.state.activeHand;
    const funds = this.state.funds - this.state.bet;
    const bet = this.state.bet * 2;

    // get card 1 and 2 from the current hand to be split
    const card1 = this.state.playersHands[handIndex].cards[0];
    const card2 = this.state.playersHands[handIndex].cards[1];

    // create two new hands
    const hand1 = new Hand();
    const hand2 = new Hand();

    // insert card 1 and card 2 into hand 1 and hand 2 respectively
    hand1.insert(card1);
    hand2.insert(card2);

    // copy the players hands as they are from state
    const playersHands = this.state.playersHands;

    // remove the hands to be split
    playersHands.splice(handIndex, 1);

    // push the new hands into the player's hands array
    playersHands.push(hand1);
    playersHands.push(hand2);

    // update state
    this.setState({
      playersHands,
      funds,
      bet,
    });
  }

  render() {
    console.log(this.state)

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
          shouldHighlight={this.state.isPlayersTurn && this.state.playersHands.length > 1}
          highlightIndex={this.state.activeHand}
          isDealersTurn={this.state.isDealersTurn}
        />
        <Controls
          canHit={this.canHit()}
          hit={this.hit}
          canStand={this.canStand()}
          stand={this.stand}
          canDouble={this.canDouble()}
          double={this.double}
          canSplit={this.canSplit()}
          split={this.split}
        />
      </div>
    );
  }
}

export default BlackJack;