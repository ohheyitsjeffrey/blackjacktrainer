import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

import Hand from "../hand/hand.js";
import ModalTemplates from "./modal-templates/modal_templates.js";

import "./game_table.css";

class GameTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggleModal = this.toggleModal.bind(this);
    this.renderModal = this.renderModal.bind(this);

    this.state = {
      showModal: true
    };
  }

  toggleModal() {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  }

  renderModal() {
    return (
      <Modal
        show={this.state.showModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Body>
          {ModalTemplates.bet.message()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <div className="modal-container" >
        <div className="game-table game-table-container">
          <div className="game-table game-table-inner">
            <div className="game-table game-table-dealer">
              {this.props.dealersHand
                ? <Hand cards={this.props.dealersHand} />
                : <div />
              }

            </div>
            <div className="game-table game-table-player">
              {this.props.playersHand
                ? this.props.playersHand.map((hand, index) => {
                  return (<Hand
                    cards={hand}
                    key={`player-hand-${index}`}
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

Hand.propTypes = {
  dealersHand: PropTypes.object,
  playersHands: PropTypes.array
};

export default GameTable;
