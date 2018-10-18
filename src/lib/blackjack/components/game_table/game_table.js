import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import Hand from "../hand/hand.js";
import MessageOverlay from "./message_overlay/message_overlay.js";

import "./game_table.css";

class GameTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.incrementBet = this.incrementBet.bind(this);
    this.decrementBet = this.decrementBet.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.showModal = this.showModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  placeBet() {
    this.props.placeBet();
  }

  incrementBet() {
    this.props.incrementBet();
  }

  decrementBet() {
    this.props.decrementBet();
  }

  showModal() {
    return !this.props.betPlaced;
  }

  renderModal() {
    return (
      <Modal
        show={this.showModal()}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header>
          <Modal.Title>Place Your Bet Please</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.bet}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="modal-action-controls">
              <div className="modal-action-control-wrapper">
                <Button block
                  onClick={this.decrementBet}
                > - </Button>
              </div>
              <div className="modal-action-control-wrapper">
                <Button
                  onClick={this.placeBet}
                  block>Place Bet</Button>
              </div>
              <div className="modal-action-control-wrapper">
                <Button block
                  onClick={this.incrementBet}
                > + </Button>
              </div>
            </div >
          </div >
        </Modal.Footer>
      </Modal>
    );
  }

  betActions() {
    return (
      <div>
        <div className="modal-action-controls">
          <div className="modal-action-control-wrapper">
            <Button block
              onClick={this.props.decrementBet}
            > - </Button>
          </div>
          <div className="modal-action-control-wrapper">
            <Button block
              onClick={this.props.placeBet}
            >Place Bet</Button>
          </div>
          <div className="modal-action-control-wrapper">
            <Button block
              onClick={this.props.incrementBet}
            > + </Button>
          </div>
        </div >
      </div>
    );
  }

  highlight(index) {
    return this.props.shouldHighlight && this.props.highlightIndex === index;
  }

  selectHand(index) {
    this.props.clickToSelectHand(index);
  }

  render() {
    return (
      <div className="modal-container" >
        <div className="game-table game-table-container"
          onClick={this.props.clickToStartNextRound}
        >
          <div className="game-table game-table-inner">
            {
              this.props.waitForPlayerClick &&
              <MessageOverlay message="Click To Start Next Round" />
            }
            <div className="game-table game-table-dealer">
              {this.props.dealersHand
                ? <Hand
                  cards={this.props.dealersHand.cards}
                  isDealer={true}
                  isDealersTurn={this.props.isDealersTurn}
                />
                : <div />
              }
            </div>
            <div className="game-table game-table-player">
              {this.props.playersHands
                ? this.props.playersHands.map((hand, index) => {
                  return (
                    <Hand
                      onClick={()=> {this.selectHand(index);}}
                      cards={hand.cards}
                      key={`player-hand-${index}`}
                      isDealer={false}
                      isDealersTurn={false}
                      highlightActive={this.highlight(index)}
                      handIndex={index}
                      clickToSelectHand={this.props.clickToSelectHand}
                    />
                  );
                })
                : <div />
              }
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

GameTable.propTypes = {
  bet: PropTypes.number,
  betPlaced: PropTypes.bool,
  incrementBet: PropTypes.func,
  decrementBet: PropTypes.func,
  placeBet: PropTypes.func,
  dealersHand: PropTypes.object,
  playersHands: PropTypes.array,
  shouldHighlight: PropTypes.bool,
  highlightIndex: PropTypes.number,
  isDealersTurn: PropTypes.bool,
  clickToStartNextRound: PropTypes.func,
  waitForPlayerClick: PropTypes.bool,
  clickToSelectHand: PropTypes.func,
};

export default GameTable;
