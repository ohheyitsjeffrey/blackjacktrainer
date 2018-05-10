import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import Card from "../card/card.js";
import Hand from "./hand.js";

import "./game_table.css";

class GameTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggleModal = this.toggleModal.bind(this);
    this.renderModal = this.renderModal.bind(this);

    this.state = {
      showModal: false
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
          insert modal message plz
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const thisHand = [
      {
        suit: "hearts",
        value: "9"
      },
      {
        suit: "diamonds",
        value: "2"
      },
      {
        suit: "clubs",
        value: "4"
      }
    ];

    const thisHand2 = [
      {
        suit: "clubs",
        value: "3"
      },
      {
        suit: "clubs",
        value: "3"
      },
      {
        suit: "clubs",
        value: "3"
      },
      {
        suit: "clubs",
        value: "3"
      },
      {
        suit: "clubs",
        value: "3"
      },
      {
        suit: "clubs",
        value: "3"
      },

    ];

    const thisHand3 = [
      {
        suit: "hearts",
        value: "ace"
      }
    ];


    return (
      <div className="modal-container" >
        <div className="game-table game-table-container">
          <div className="game-table game-table-inner">
            <div className="game-table game-table-dealer">
              <Hand
                cards={thisHand}
                collapsed={false}
              />
            </div>
            <div className="game-table game-table-player">
              <Hand
                cards={thisHand2}
                collapsed={true}
              />
              <Hand
                cards={thisHand3}
                collapsed={true}
              />
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default GameTable;