import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "../card/card.js";

import "./hand.css";

class Hand extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      containerHeight: 0,
      willOverflow: false,
    };

    this.updateDimensionsAndState = this.updateDimensionsAndState.bind(this);
  }

  componentDidMount() {
    /* give cards a static height relative to how large this container is.  This
    is necessary for giving them absolute positioning when rendering a collapsed
    hand. */
    this.updateDimensionsAndState();

    // update the height prop for cards in the event the game is resized
    window.addEventListener("resize", this.updateDimensionsAndState);
  }

  componentWillUpdate() {
    this.updateDimensionsAndState();
  }

  updateDimensionsAndState() {
    /*
    Here we want to update the height of the container to scale the card svgs
    accordingly.  Additionally, we want to estimate (roughly) if the cards will
    overflow so that we can inform the cards to change styles and fold on top of
    one another.  The correct way to do this is probably to get the actual width
    of a card, but here we estimate using a rough aspect ratio of the cards
    because it is easier (thus the clientHeight * .7).  As this is opensource
    by all means feel free to scold me with better ways to do this.  I would
    love to hear them.
    */

    if (this.thisHand) {
      if (this.thisHand.clientHeight !== this.state.containerHeight) {
        this.setState({
          containerHeight: this.thisHand.clientHeight,
        });
      }
      if (((this.thisHand.clientHeight * .75) * this.props.cards.length) > this.thisHand.clientWidth &&
       this.state.willOverflow !== true) {
        this.setState({
          willOverflow: true,
        });
      }
    }
  }

  render() {
    return (
      <div
        className="hand"
        onClick={this.props.onClick}
        ref={(thisHand) => { this.thisHand = thisHand; }}
        style={this.props.highlightActive
          ? {
            border: "solid gold",
            animation: "blink 1s step-end infinite alternate",
          }
          : {}}
      >
        {this.props.cards && this.state.containerHeight
          ? this.props.cards.map((card, index) => {
            return (
              <Card
                height={this.state.containerHeight - 10}
                isFlipped={this.props.isDealer && !this.props.isDealersTurn && index === 0}
                key={index}
                suit={card.suit}
                value={card.value}
                willOverflow={this.state.willOverflow}
                handSize={this.props.cards.length}
                zIndex={index + 1}
                dontAnimate={
                  this.props.handIndex &&
                  this.props.handIndex > 0 &&
                  index === 0
                }
              />
            );
          })
          : <div />
        }
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array.isRequired,
  highlightActive: PropTypes.bool,
  isDealer: PropTypes.bool,
  isDealersTurn: PropTypes.bool,
  onClick: PropTypes.func,
  handIndex: PropTypes.number,
};


export default Hand;