import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

import "./message_overlay.css";

class MessageOverlay extends Component {
  render() {
    return (
      <div className="message-overlay">
        <Alert>
          <strong>{this.props.message}</strong>
        </Alert>
      </div>
    );
  }
}

MessageOverlay.propTypes = {
  message: PropTypes.string.isRequired,
}

export default MessageOverlay;