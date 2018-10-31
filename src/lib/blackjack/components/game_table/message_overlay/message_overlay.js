import React, { Component } from "react";
import PropTypes from "prop-types";

import "./message_overlay.css";

class MessageOverlay extends Component {
  render() {
    return (
      <div className="message-overlay">
        <div className="message-pane">
          {this.props.message}
        </div>
      </div>
    );
  }
}

MessageOverlay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MessageOverlay;