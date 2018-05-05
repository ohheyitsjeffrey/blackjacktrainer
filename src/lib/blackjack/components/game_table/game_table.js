import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

import Card from "../card/card.js";

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

  renderHand() {
    return (
      <div className="hand">
        <Card
          svgName="9_of_hearts"
          isFlipped={true}
        />
        <Card
          suit="hearts"
          value="9"
          isFlipped={false}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="modal-container" >
        <div className="game-table game-table-container">
          <div className="game-table game-table-inner">
            <div className="game-table game-table-dealer">
              {this.renderHand()}
            </div>
            <div className="game-table game-table-player">
              {this.renderHand()}
            </div>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default GameTable;