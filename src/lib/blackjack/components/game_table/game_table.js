import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import Hand from "../hand/hand.js";

import "./game_table.css";

class GameTable extends Component {
  constructor(props, context) {
    super(props, context);


    this.incrementBet = this.incrementBet.bind(this);
    this.decrementBet = this.decrementBet.bind(this);
    this.placeBet = this.placeBet.bind(this);

    this.showModal = this.showModal.bind(this);
    this.renderModal = this.renderModal.bind(this);

    this.state = {
      // showModal: true,
    };
  }

  placeBet() {
    this.props.placeBet();
    // this.toggleModal();
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


  render() {
    console.log(this.props)
    return (
      <div className="modal-container" >
        <div className="game-table game-table-container">
          <div className="game-table game-table-inner">
            <div className="game-table game-table-dealer">
              {this.props.dealersHand
                ? <Hand
                  cards={this.props.dealersHand.cards}
                  isDealer={true}
                  isDealersTurn={false}
                />
                : <div />
              }

            </div>
            <div className="game-table game-table-player">
              {this.props.playersHand
                ? this.props.playersHand.map((hand, index) => {
                  return (<Hand
                    cards={hand.cards}
                    key={`player-hand-${index}`}
                    isDealer={false}
                    isDealersTurn={false}
                  />);
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
  dealersHand: PropTypes.array,
  playersHand: PropTypes.array,
};

export default GameTable;
