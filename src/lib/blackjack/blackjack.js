import React, { Component } from "react";
import _ from "lodash";

import Controls from "./components/controls/controls.js";
import GameHeader from "./components/game_header/game_header.js";
import GameTable from "./components/game_table/game_table.js";

import Hand from "./engine/hand/hand.js";
import Shoe from "./engine/shoe/shoe.js";
import GameUtils from "./engine/game-utils";

import "./blackjack.css";

const BETSTEP = 5;
const DEALER = "dealer";

class BlackJack extends Component {
  constructor(props) {
    super(props);

    this.state = GameUtils.createNewState();

    // core blackjack engine methods
    this.evaluateGameState = this.evaluateGameState.bind(this);

    this.getPlayersNextHand = this.getPlayersNextHand.bind(this);
    this.dealersTurn = this.dealersTurn.bind(this);
    this.settleRound = this.settleRound.bind(this);
    this.updateAndStartNewRound = this.updateAndStartNewRound.bind(this);
    this.clickToStartNextRound = this.clickToStartNextRound.bind(this);
    this.clickToSelectHand = this.clickToSelectHand.bind(this);

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

    this.dealCard = this.dealCard.bind(this);
  }

  dealCard(who) {
    return new Promise((resolve) => {
      // clone shoe properties to avoid weird state mutations
      const shoe = _.cloneDeep(this.state.shoe);
      const card = shoe.draw();

      let stateUpdate;

      if (who === DEALER) {
        // clone hand to avoid weird state mutations
        const newHand = _.cloneDeep(this.state.dealersHand);
        newHand.insert(card);
        stateUpdate = {
          dealersHand: newHand,
          shoe,
        };
      } else {
        const index = this.state.activeHand;
        const newPlayersHands = Array.from(this.state.playersHands);
        newPlayersHands[index].insert(card);
        stateUpdate = {
          playersHands: newPlayersHands,
          shoe,
        };
      }

      this.setState(stateUpdate, () => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    });
  }

  createNewState() {
    const newShoe = new Shoe(8);
    newShoe.shuffle();

    return {
      options: {
        minimumBet: BETSTEP,
        dealerStands: 17,
      },
      funds: 1000,
      bet: BETSTEP,
      betPlaced: false,
      shoe: newShoe,
      dealersHand: new Hand(),
      playersHands: [new Hand()],
      activeHand: 0,
      isPlayersTurn: false,
      isDealersTurn: false,
      waitForPlayerClick: false,
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
      activeHand: 0,
    };
  }

  componentDidUpdate() {
    // this lives here to ensure it is called anytime state updates.
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
        // if the player's turn is over, update state and call dealtersTurn()
        if (nextHand < 0) {
          this.setState({
            isPlayersTurn: false,
            isDealersTurn: true,
          }, () => {
            setTimeout(() => {
              this.dealersTurn();
            }, 500);
          });
        } else {
          this.setState({
            activeHand: nextHand,
          });
        }
      }
      return;
    }

    // the round is over, settle each hand and wait for user input
    if (this.state.dealersHand.isResolved() && !this.state.waitForPlayerClick) {
      setTimeout(() => {
        this.settleRound();
      }, 500);
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

    this.setState(prevState => ({
      funds: prevState.funds + payout,
      waitForPlayerClick: true,
    }));
  }

  clickToStartNextRound() {
    // this.state.waitForPlayerClick
    //   ? this.updateAndStartNewRound()
    //   : this.createNewState();
    if (this.state.waitForPlayerClick) {
      this.updateAndStartNewRound();
    }
  }

  clickToSelectHand(index) {
    if (!this.state.playersHands[index].isResolved()) {
      this.setState({
        activeHand: index,
      });
    }
  }

  updateAndStartNewRound() {
    this.setState((prevState) => ({
      activeHand: 0,
      betPlaced: false,
      bet: prevState.options.minimumBet,
      isPlayersTurn: false,
      isDealersTurn: false,
      dealersHand: undefined,
      playersHands: [],
      waitForPlayerClick: false,
    }));
  }

  // if a player has split and has multiple hands, get the first one that is not resolved
  getPlayersNextHand() {
    const playersHands = this.state.playersHands;
    return _.findIndex(playersHands, (hand) => {
      return !hand.isResolved();
    });
  }

  incrementBet() {
    if (this.state.bet + BETSTEP <= this.state.funds) {
      this.setState((prevState) => ({
        bet: prevState.bet + BETSTEP,
      }));
    }
  }

  decrementBet() {
    if (this.state.bet - BETSTEP >= this.state.options.minimumBet) {
      this.setState((prevState) => ({
        bet: prevState.bet - BETSTEP,
      }));
    }
  }

  placeBet() {
    // const shoe = { ...this.state.shoe};
    const dealer = new Hand();
    const player = new Hand();

    this.setState((prevState) => ({
      betPlaced: true,
      funds: prevState.funds - prevState.bet,
      dealersHand: dealer,
      playersHands: [player],
    }), () => { this.dealNewRound(); });
  }



  dealNewRound() {
    this.dealCard()
      .then(() => {
        return this.dealCard(DEALER);
      }).then(() => {
        return this.dealCard();
      }).then(() => {
        return this.dealCard(DEALER);
      })
      .then(() => {
        return this.setState({
          isPlayersTurn: true,
        });
      });
  }

  dealersTurn() {
    const dealersHand = _.cloneDeep(this.state.dealersHand);
    const playerDidBust = GameUtils.allPlayerHandsDidBust(this.state.playersHands);

    if (playerDidBust || dealersHand.value >= 17) {
      dealersHand.stand = true;
      this.setState({
        dealersHand,
        dealersTurn: false,
      });
    } else {
      this.dealCard(DEALER).then(
        () => {
          this.dealersTurn();
        }
      );
    }
  }

  canHit() {
    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&              // it is the players turn
      this.state.playersHands.length > 0 &&         // the player has been dealt cards
      !this.state.playersHands[handIndex].bust &&   // current hand is not bust
      !this.state.playersHands[handIndex].stand;    // current hand is not standing either
  }

  hit() {
    this.dealCard();
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
      this.state.playersHands.length < 2 &&                         // single splits for now
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
    return (
      <div className="blackjack">
        <GameHeader
          funds={this.state.funds}
          disableMenu={!this.state.betPlaced}
        />
        <GameTable
          bet={this.state.bet}
          betPlaced={this.state.betPlaced}
          clickToStartNextRound={this.clickToStartNextRound}
          waitForPlayerClick={this.state.waitForPlayerClick}
          dealersHand={this.state.dealersHand}
          decrementBet={() => { this.decrementBet(); }}
          highlightIndex={this.state.activeHand}
          incrementBet={() => { this.incrementBet(); }}
          isDealersTurn={this.state.isDealersTurn}
          placeBet={() => { this.placeBet(); }}
          playersHands={this.state.playersHands}
          shouldHighlight={this.state.isPlayersTurn && this.state.playersHands.length > 1}
          clickToSelectHand={this.clickToSelectHand}
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
