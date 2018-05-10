import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "../card/card.js";

import "./hand.css";

class Hand extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cardHeight: 0,
      cardRenderedWidth: 0,
      handWidth: 0,
    };
  }

  componentDidMount() {
    // To avoid bugs related to percentage height and chrome, give the cards a 
    // static height based on the rendered height of the hand.  Hand width is 
    // used to determine styles based on potential card overflow, which is calculated 
    // with cardRenderedWidth.

    // console.log(this.thisHand)
    this.setDimensionsInState();

    // if(this.thisHand){
    //   console.log(this.thisHand.clientHeight);
    // }

    const getNewCardDimensions = () => {
      this.setDimensionsInState();
    };

    window.addEventListener("resize", getNewCardDimensions);

    // console.log(this.handWillOverflow());
  }

  handWillOverflow() {
    if (this.props.cards && (this.props.cards.length * this.thisHand.firstChild.clientWidth > this.thisHand.clientWidth)) {
      return true;
    } else {
      return false;
    }
  }

  setDimensionsInState() {
    if (this.thisHand) {
      this.setState({
        containerHeight: this.thisHand.clientHeight,
        containerWidth: this.thisHand.clientWidth,
      });
    }
  }

  render() {
    console.log('render');

    return (
      <div
        className="hand"
        ref={(thisHand) => { this.thisHand = thisHand; }}
      >
        {/* <div className="hand-inner"> */}
        {this.props.cards && this.state.containerHeight
          ? this.props.cards.map((card, index) => {
            return (
              <Card
                suit={card.suit}
                value={card.value}
                isFlipped={false}
                key={index}
                height={this.state.containerHeight}
                zIndex={index + 1}
                collapsedStyles={this.handWillOverflow()}
              />
            );
          })
          : <div />
        }
        {/* </div> */}
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array.isRequired,
  collapsed: PropTypes.bool.isRequired,
};


export default Hand;