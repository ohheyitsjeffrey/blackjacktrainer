import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: this.props.isFlipped,
      renderedWidth: 0,
    };
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    this.setState(prevState => {
      return {
        isFlipped: !prevState.isFlipped,
      };
    });
  }

  getCardStyles() {
    /* Get card styles returns styles specific to whether or not the cards in
    the hand will overflow. */    
    const commonStyles = {
      zIndex: this.props.zIndex,
    };

    return this.props.willOverflow
      ? {
        ...commonStyles,
        position: "absolute",
        transform: `translate(${this.props.zIndex * 18}%)`,
      }
      : {
        ...commonStyles,
        padding: "3px",
      };
  }

  render() {
    const cardSVG = `${this.props.value}_of_${this.props.suit}`;
    const cardName = `${this.props.value} of ${this.props.suit}`;

    return (
      <img
        ref={(thisCard) => { this.thisCard = thisCard; }}
        height={this.props.height}
        src={this.props.isFlipped
          ? "svg/card_back.svg"
          : `svg/${cardSVG}.svg`
        }
        alt={this.props.isFlipped
          ? "flipped playing card"
          : cardName
        }
        style={this.getCardStyles()}
      />
    );
  }
}

Card.propTypes = {
  height: PropTypes.number.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  willOverflow: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,

};

export default Card;