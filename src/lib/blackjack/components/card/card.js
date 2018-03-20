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
    return (
      <div className={`playing-card ${this.state.isFlipped ? "flipped" : ""}`}>
        {this.state.isFlipped
          ? <img src="svg/card_back.svg" alt="card back" />
          : <img src={`svg/${this.props.svgName}.svg`} alt={this.props.svgName} />
        }
      </div>
    );
  }
}

Card.propTypes =  {
  svgName: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default Card;