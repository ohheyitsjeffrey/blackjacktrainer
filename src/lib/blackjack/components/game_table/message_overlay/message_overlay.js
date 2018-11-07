import React from "react";
import PropTypes from "prop-types";

import "./message_overlay.css";

const MessageOverlay = (props) => {
  return (
    <div className="message-overlay" onClick={props.clickAction}>
      <div className="message-pane">
        {props.message}
      </div>
    </div>
  );
};

MessageOverlay.propTypes = {
  message: PropTypes.string.isRequired,
  clickAction: PropTypes.func
};

export default MessageOverlay;