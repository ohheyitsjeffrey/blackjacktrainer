import React, { Component } from "react";
import _ from "lodash";

import Controls from "./components/controls/controls.js";
import GameHeader from "./components/game_header/game_header.js";
import GameTable from "./components/game_table/game_table.js";

import Hand from "./engine/hand";
// import Shoe from "./engine/shoe";
import {
  calcPayout,
  createNewState,
  dealerShouldHit,
  MODALMODES,
} from "./engine/game-utils";

import "./blackjack.css";

// unit in which bets are incremented, should probably be moved somewher else
const BETSTEP = 10;

// constants for determining which fragment to load in modal
// const INSURANCE = MODALMODES.INSURANCE;
const OPTIONS = MODALMODES.OPTIONS;
const PLACEBET = MODALMODES.PLACEBET;

class BlackJack extends Component {
  constructor(props) {
    super(props);

    this.state = createNewState();
    // core blackjack engine methods
    this.evaluateGameState = this.evaluateGameState.bind(this);

    this.getPlayersNextHand = this.getPlayersNextHand.bind(this);
    this.dealersTurn = this.dealersTurn.bind(this);
    this.settleRound = this.settleRound.bind(this);
    this.updateAndStartNewRound = this.updateAndStartNewRound.bind(this);
    this.clickToStartNextRound = this.clickToStartNextRound.bind(this);
    this.clickToSelectHand = this.clickToSelectHand.bind(this);
    this.updateCustomOptions = this.updateCustomOptions.bind(this);

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

  dealCard(hand) {
    return new Promise((resolve) => {
      // first prevent players from clicking other actions if it is their turn
      // while card is being dealt
      this.setState({ inhibitPlayerAction: true },
        () => {
          // next, actually deal the card
          // clone shoe properties to avoid weird state mutations
          const shoe = _.cloneDeep(this.state.shoe);
          const card = shoe.draw();

          let stateUpdate;

          if (!_.isNil(hand)) {
            // const index = this.state.activeHand;
            const newPlayersHands = Array.from(this.state.playersHands);
            newPlayersHands[hand].insert(card);
            stateUpdate = {
              playersHands: newPlayersHands,
              shoe,
            };
          } else {
            // clone hand to avoid weird state mutations
            const newHand = _.cloneDeep(this.state.dealersHand);
            newHand.insert(card);
            stateUpdate = {
              dealersHand: newHand,
              shoe,
            };
          }

          this.setState(stateUpdate, () => {
            // wait for card animation to complete, update state to allow player
            // action again, and resolve the promise.
            setTimeout(() => {
              this.setState(
                { inhibitPlayerAction: false },
                () => {
                  resolve();
                });
            }, 500);
          });
        });
    });
  }

  toggleModal(mode) {
    this.state.modalMode === mode
      ? this.setState({ modalMode: undefined })
      : this.setState({ modalMode: mode });
  }

  componentDidUpdate() {
    // this lives here to ensure it is called anytime state updates.
    this.evaluateGameState();
  }

  // A common function to evaluate the state of the game and determine what if
  // anything to do next.  Needs a better name but so do plenty of things...
  evaluateGameState() {
    // The game just started and a bet has not been placed
    if (!this.state.betPlaced && this.state.modalMode !== PLACEBET) {
      // just wait for bet to be placed
      this.setState({
        modalMode: PLACEBET,
      });
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
          if(!this.state.inhibitPlayerAction) {
            this.setState({
              isPlayersTurn: false,
            }, () => {
              setTimeout(() => {
                this.setState(
                  {isDealersTurn: true},
                  () => {
                    setTimeout(() => {
                      this.dealersTurn();
                    }, 500);
                  }
                );
              }, 500);
            });
          }
        } else {
          this.setState({
            activeHand: nextHand,
          });
        }
      }
      return;
    }

    // the round is over, settle each hand and wait for user input
    if (this.state.dealersHand && this.state.dealersHand.isResolved() && !this.state.waitForPlayerClick) {
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
      payout += calcPayout(hand, dealersHand, bet);
    });

    this.setState(prevState => ({
      funds: prevState.funds + payout,
      waitForPlayerClick: true,
    }));
  }

  clickToStartNextRound() {
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
    const funds = this.state.funds;
    const minimumBet = this.state.options.minimumBet;

    if (funds < minimumBet) {
      // create a new gamestate with the existing options
      const newGameState = createNewState(this.state.options);
      // update state to start a new game
      this.setState(newGameState);
    } else {
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
    const dealer = new Hand();
    const player = new Hand();

    this.setState((prevState) => ({
      betPlaced: true,
      funds: prevState.funds - prevState.bet,
      dealersHand: dealer,
      playersHands: [player],
      // showModal: false,
      modalMode: undefined,
    }), () => { this.dealNewRound(); });
  }

  dealNewRound() {
    const index = this.state.activeHand;
    this.dealCard(index)
      .then(() => {
        return this.dealCard();
      }).then(() => {
        return this.dealCard(index);
      }).then(() => {
        return this.dealCard();
      })
      .then(() => {
        return this.setState({
          isPlayersTurn: true,
        });
      });
  }

  dealersTurn() {
    const dealersHand = _.cloneDeep(this.state.dealersHand);

    if (!dealerShouldHit(dealersHand, this.state.options)) {
      dealersHand.stand = true;
      this.setState({
        dealersHand,
        dealersTurn: false,
      });
    } else {
      this.dealCard().then(
        () => {
          this.dealersTurn();
        }
      );
    }
  }

  canHit() {
    // verify a modal isn't open
    if(!_.isNil(this.state.modalMode)) {
      return false;
    }

    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&              // it is the players turn
      !this.state.inhibitPlayerAction &&            // they are not in the middle of an action
      this.state.playersHands.length > 0 &&         // the player has been dealt cards
      !this.state.playersHands[handIndex].bust &&   // current hand is not bust
      !this.state.playersHands[handIndex].stand;    // current hand is not standing either
  }

  hit() {
    const index = this.state.activeHand;
    this.dealCard(index);
  }

  canStand() {
    // verify a modal isn't open
    if(!_.isNil(this.state.modalMode)) {
      return false;
    }

    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&
      !this.state.inhibitPlayerAction &&            // they are not in the middle of an action
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
    // verify a modal isn't open
    if(!_.isNil(this.state.modalMode)) {
      return false;
    }

    const handIndex = this.state.activeHand;

    return this.state.isPlayersTurn &&
      !this.state.inhibitPlayerAction &&            // they are not in the middle of an action
      this.state.playersHands.length > 0 &&                 // the player has been dealt cards
      this.state.playersHands[handIndex].length() === 2 &&  // the player has their first two cards
      this.state.funds > this.state.bet &&
      !this.state.playersHands[handIndex].bust &&           // current hand is not busted
      !this.state.playersHands[handIndex].stand;            // current hand is not standing either
  }

  double() {
    const index = this.state.activeHand;
    const funds = this.state.funds - this.state.bet;
    const bet = this.state.bet * 2;

    this.setState(
      {
        bet,
        funds,
      },
      () => {
        this.dealCard(index).then(
          () => {
            const playersHands = _.cloneDeep(this.state.playersHands);
            playersHands[index].stand = true;

            this.setState({ playersHands: playersHands });
          }
        );
      }
    );
  }

  canSplit() {
    // verify a modal isn't open
    if(!_.isNil(this.state.modalMode)) {
      return false;
    }

    const handIndex = this.state.activeHand;

    if (!this.state.playersHands[handIndex] || !this.state.playersHands[handIndex]) {
      return false;
    }

    const firstCard = this.state.playersHands[handIndex].cards[0];
    const secondCard = this.state.playersHands[handIndex].cards[1];

    return this.state.isPlayersTurn &&                              // it is the player's turn
      !this.state.inhibitPlayerAction &&            // they are not in the middle of an action
      this.state.playersHands.length < 2 &&                         // single splits for now
      this.state.playersHands[handIndex].cards.length === 2 &&      // hand has not hit
      firstCard.cardValue() === secondCard.cardValue();             // the cards are of equal value
  }

  // TODO remove some of this hard coding to support resplitting
  split() {
    const handIndex = this.state.activeHand;
    const funds = this.state.funds - this.state.bet;
    // const bet = this.state.bet * 2;

    // get card 1 and 2 from the current hand to be split
    const card1 = this.state.playersHands[handIndex].cards[0];
    const card2 = this.state.playersHands[handIndex].cards[1];

    // create two new hands
    const hand1 = new Hand();
    const hand2 = new Hand();

    // insert card 1 and card 2 into hand 1 and hand 2 respectively
    hand1.insert(card1);
    hand2.insert(card2);

    // push the new hands into the player's new hands array
    const playersHands = [];
    playersHands.push(hand1);
    playersHands.push(hand2);

    // update state
    this.setState({
      playersHands,
      funds,
    }, () => {
      this.dealCard(0).then(() => {
        this.dealCard(1);
      });
    });
  }

  updateCustomOptions(options) {
    // this method will end the current game and begin a new one with custom passed options.
    const newState = createNewState(options);

    this.setState(newState);
  }

  render() {
    return (
      <div className="blackjack">
        <GameHeader
          disableMenu={this.state.modalMode && this.state.modalMode !== OPTIONS}
          toggleOptions={() => { this.toggleModal(OPTIONS); }}
          funds={this.state.funds}
        />
        <GameTable
          bet={this.state.bet}
          betPlaced={this.state.betPlaced}
          closeModal={() => { this.toggleModal(undefined); }}
          modalMode={this.state.modalMode}
          clickToSelectHand={this.clickToSelectHand}
          clickToStartNextRound={this.clickToStartNextRound}
          dealersHand={this.state.dealersHand}
          decrementBet={() => { this.decrementBet(); }}
          highlightIndex={this.state.activeHand}
          incrementBet={() => { this.incrementBet(); }}
          isDealersTurn={this.state.isDealersTurn}
          placeBet={() => { this.placeBet(); }}
          playersHands={this.state.playersHands}
          shouldHighlight={this.state.isPlayersTurn && this.state.playersHands.length > 1}
          waitForPlayerClick={this.state.waitForPlayerClick}
          options={this.state.options}
          updateCustomOptions={this.updateCustomOptions}
        />
        <Controls
          canDouble={this.canDouble()}
          canHit={this.canHit()}
          canSplit={this.canSplit()}
          canStand={this.canStand()}
          double={this.double}
          hit={this.hit}
          split={this.split}
          stand={this.stand}
        />
      </div>
    );
  }
}

export default BlackJack;
