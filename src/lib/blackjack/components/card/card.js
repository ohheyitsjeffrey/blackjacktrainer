import React, { Component } from "react";
import PropTypes from "prop-types";

import "./card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: this.props.isFlipped,
    };
    
    this.flipCard = this.flipCard.bind(this);
  }
  
  flipCard() {
    this.setState( prevState => {
      return {
        isFlipped: !prevState.isFlipped
      };
    });
  }
  
  render() {
    const cardSVG = `${this.props.value}_of_${this.props.suit}`
    const cardName = `${this.props.value} of ${this.props.suit}`
    
    return (
      <div className={`playing-card ${this.state.isFlipped ? "flipped" : ""}`}>
        {this.state.isFlipped
          ? <img src="svg/card_back.svg" alt="flipped card" />
          : <img src={`svg/${cardSVG}.svg`} alt={cardName} />
        }
      </div>
    );
  }
}

Card.propTypes =  {
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default Card;