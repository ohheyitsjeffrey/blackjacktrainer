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

    // TODO improve this as it is sloppy and not quite right but it works for now
    const calculateTransform = () => {
      // this can probably be simplified somehow
      if (this.props.handSize % 2 === 0) {  // number of cards in hand is even
        if (this.props.zIndex <= this.props.handSize / 2) {
          return (this.props.zIndex - Math.ceil(this.props.handSize / 2)) * 18;
        } else {
          return (this.props.zIndex - Math.floor(this.props.handSize / 2)) * 18;
        }
      } else {                             // number of cards in hand is odd
        return (this.props.zIndex - Math.ceil(this.props.handSize / 2)) * 18;
      }
    };

    return this.props.willOverflow
      ? {
        ...commonStyles,
        position: "absolute",
        transform: `translate(${calculateTransform()}%)`,
      }
      : {
        ...commonStyles,
        padding: "3px",
      };
  }

  render() {
    const cardSVG = `${this.props.value}_of_${this.props.suit}`;

    return (
      <img
        ref={(thisCard) => { this.thisCard = thisCard; }}
        height={this.props.height}
        src={this.props.isFlipped
          ? "svg/card_back.svg"
          : `svg/${cardSVG}.svg`
        }
        alt=""
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
  handSize: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
};

export default Card;