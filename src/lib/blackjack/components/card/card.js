import React, { Component } from "react";
import PropTypes from "prop-types";
import cardSvgs from "./card_index.js";

import "./card.css";

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
    return (
      <div
        className={this.props.dontAnimate ? "playing-card" : "animated-playing-card"}
        style={this.getCardStyles()}
      >
        {this.props.isFlipped
          ? cardSvgs.getCardBack(this.props.height)
          : cardSvgs.getCardSvg(this.props.value, this.props.suit, this.props.height)
        }
      </div>
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
  dontAnimate: PropTypes.bool,
};

export default Card;