import React, { Component } from "react";
import PropTypes from "prop-types";

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
        {/* {this.state.isFlipped? "yes" : "no" } */}
        <img src={`svg/${this.props.svgName}.svg`} alt="card back" />
      </div>
    );
  }
}

Card.propTypes =  {
  svgName: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default Card;