import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "../card/card.js";

import "./hand.css";

class Hand extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cardHeight: 0,
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

  updateDimensionsAndState() {
    /*
    Here we want to update the height of the container to scale the card svgs
    accordingly.  Additionally, we want to estimate (roughly) if the cards will
    overflow so that we can inform the cards to change styles and fold on top of
    one another.  The correct way to do this is probably to get the actual width
    of a card, but here we estimate using a rough aspect ratio of the cards
    because it is easier (thus the clientHeight * .7).  As this is opensource 
    by all means feel free to scold me with better ways to do this.  I would 
    love to hear them : D.
    */

    if (this.thisHand) {
      (((this.thisHand.clientHeight * .7) * this.props.cards.length) > this.thisHand.clientWidth)
        ? this.setState({
          containerHeight: this.thisHand.clientHeight,
          willOverflow: true,
        })
        : this.setState({
          containerHeight: this.thisHand.clientHeight,
          willOverflow: false,
        });
    }
  }

  render() {
    return (
      <div
        className="hand"
        ref={(thisHand) => { this.thisHand = thisHand; }}
        style={this.state.willOverflow ? { justifyContent: "flex-start" } : {}}
      >
        {this.props.cards && this.state.containerHeight
          ? this.props.cards.map((card, index) => {
            return (
              <Card
                height={this.state.containerHeight}
                isFlipped={false}
                key={index}
                suit={card.suit}
                value={card.value}
                willOverflow={this.state.willOverflow}
                zIndex={index + 1}
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
};


export default Hand;