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
    this.setState(prevState => {
      return {
        isFlipped: !prevState.isFlipped
      };
    });
  }

  getCardStyles() {
    return this.props.collapsedStyles
      ? {
        zIndex: this.props.zIndex,
        height: this.props.height,
        // transform: `translate(-${(this.props.zIndex - 1) * 82}%)`,
        // transform: `translate(-${(this.props.zIndex - 1) * 50}%)`,
        position: "absolute",


        // position: 'absolute',

      }
      : {
        zIndex: this.props.zIndex,
        padding: '3px',
        height: this.props.height,
      };
    // height: this.props.height,
    // height: '100%',
    // position: "absolute",
    // transform: `translate(-${(this.props.zIndex - 1) * 82}%)`,
    // position: 'relative',

    // height: 'auto',
    // display: 'flex',
  }

  render() {
    const cardSVG = `${this.props.value}_of_${this.props.suit}`
    const cardName = `${this.props.value} of ${this.props.suit}`

    return (
      // <div className="playing-card">
      <object
        height="100%"
        data={this.props.isFlipped
          ? "svg/card_back.svg"
          : `svg/${cardSVG}.svg`
        }
        alt={this.props.isFlipped
          ? "flipped playing card"
          : cardName
        }
        style={this.getCardStyles()}
        viewBox="0 0 20 10"
      />
      // </div>
    );
  }
}

Card.propTypes = {
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  collapsedStyles: PropTypes.bool.isRequired,

};

export default Card;