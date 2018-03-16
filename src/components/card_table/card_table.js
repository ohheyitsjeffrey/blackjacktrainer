import React, { Component } from "react";
import  "./card_table.css";
// import PropTypes from "prop-types";
// import Card from "../card/card.jsx";

class CardTable extends Component {

  render() {
    return (
      <div className="card-table card-table-container">
        <div className="card-table card-table-dealer">
          dealer
        </div>
        <div className="card-table card-table-player">
          player
        </div>
      </div>
    );
  }
}

export default CardTable;