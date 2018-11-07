import React from "react";
import PropTypes from "prop-types";

import "./options.css";

const OptionsPrompt = (props) => {

  const AboutPage = () => {
    return (
      <React.Fragment>
        <p>
          Blackjacktrainer.info is an open sourced blackjack game written in
          javascript.  The source code is available on
          <a href="https://github.com/ohheyitsjeffrey/blackjacktrainer">github</a>.
        </p>
        <p>
          To report bugs,

        </p>
      </React.Fragment>
    );

  };

  return (
    <React.Fragment>
      <div className="menu-modal-header">
        <div className="menu-modal-header-tab">Options</div>
        <div className="menu-modal-header-tab">About</div>
      </div>
      <div className="menu-modal-body">
        <AboutPage />

      </div>
    </React.Fragment >
  );

};

export default OptionsPrompt;