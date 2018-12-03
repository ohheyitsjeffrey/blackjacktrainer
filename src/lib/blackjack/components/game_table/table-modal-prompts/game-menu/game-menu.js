import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Button } from "../../../common-ui";

import "./game-menu.css";

const OPTIONSMENU = "options";
const ABOUTMENU = "about";

const AboutMenu = (props) => {
  return (
    <React.Fragment>
      <p>
        Blackjacktrainer.info is an open sourced blackjack game written in
        javascript.  The source code is available on <a
          href="https://github.com/ohheyitsjeffrey/blackjacktrainer">
          github</a>.
      </p>
      <p>
        To report bugs, ...

      </p>
      <Button
        fullWidth
        onClick={props.closeModal}
      >
        Close
      </Button>
    </React.Fragment>
  );
};

const OptionsMenu = (props) => {
  return (
    <React.Fragment>
      <div className="option-row">
        <div className="option-label">
          hit on soft 17
        </div>
        <div className="option-input-wrapper">
          <Button
            onClick={() => { props.toggleValue("hitOnSoft17"); }}
          >
            {props.options.hitOnSoft17 === true ? "on" : "off"}
          </Button>
        </div>
      </div>
      <div className="option-row">
        <div className="option-label">
          shoe size
        </div>
        <div className="option-input-wrapper">
          <Button
            onClick={() => { props.decrementValue("shoeSize", 1, 1); }}
          >
            -
          </Button>
          <div className="option-number-value">{props.options.shoeSize}</div>
          <Button
            onClick={() => { props.incrementValue("shoeSize", 1, 12); }}
          >
            +
          </Button>
        </div>
      </div>
      <div className="option-row">
        <div className="option-label">
          minimum bet
        </div>
        <div className="option-input-wrapper">
          <Button
            onClick={() => { props.decrementValue("minimumBet", 10, 10); }}
          >
            -
          </Button>
          <div className="option-number-value">{props.options.minimumBet}</div>
          <Button
            onClick={() => { props.incrementValue("minimumBet", 10, 250); }}
          >
            +
          </Button>
        </div>
      </div>
      <p>
        Please note, saving options will end your current game and start a new one.  If you would
        prefer to continue your current game, hit cancel.
      </p>
      <div className="option-footer">
        <div className="cancel-button-wrapper">
          <Button
            fullWidth
            onClick={props.closeModal}
          >
            Close
          </Button>
        </div>
        <div className="save-button-wrapper">
          <Button
            fullWidth
            onClick={() => { props.updateCustomOptions(props.options); }}
          >
            Save
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

const MenuTab = (props) => {
  return (
    <div
      className={props.isSelected ? "menu-modal-header-tab selected-tab" : "menu-modal-header-tab"}
      onClick={props.setActive}
    >
      {props.children}
    </div>);
};

const CurrentMenu = (props) => {
  return props.page === ABOUTMENU
    ? (<AboutMenu
      closeModal={props.closeModal}
    />)
    : (<OptionsMenu
      options={props.options}
      toggleValue={props.toggleValue}
      incrementValue={props.incrementValue}
      decrementValue={props.decrementValue}
      updateCustomOptions={props.updateCustomOptions}
      closeModal={props.closeModal}
    />);
};

class GameMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: _.cloneDeep(this.props.options),
      currentMenu: OPTIONSMENU,
    };

    this.setActive = this.setActive.bind(this);
    this.isActive = this.isActive.bind(this);

    this.incrementValue = this.incrementValue.bind(this);
    this.decrementValue = this.decrementValue.bind(this);
    this.toggleValue = this.toggleValue.bind(this);
  }

  setActive(menuLabel) {
    this.setState({ currentMenu: menuLabel });
  }

  isActive(option) {
    return this.state.currentMenu === option;
  }

  incrementValue(key, step, max) {
    const newValues = _.cloneDeep(this.state.options);
    newValues[key] += step;

    if (max && newValues[key] <= max) {
      this.setState({ options: newValues });
    }
  }

  decrementValue(key, step, min) {
    const newValues = _.cloneDeep(this.state.options);
    newValues[key] -= step;

    if (min && newValues[key] >= min) {
      this.setState({ options: newValues });
    }
  }

  toggleValue(key) {
    // not the traditional previous state toggle because objects can't handle variable keys
    const newValues = _.cloneDeep(this.state.options);
    newValues[key] = !newValues[key];

    this.setState({ options: newValues });
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu-modal-header">
          <MenuTab isSelected={this.isActive(OPTIONSMENU)} setActive={() => { this.setActive(OPTIONSMENU); }}>Options</MenuTab>
          <MenuTab isSelected={this.isActive(ABOUTMENU)} setActive={() => { this.setActive(ABOUTMENU); }}>About</MenuTab>
        </div>
        <div className="menu-modal-body">
          <CurrentMenu
            page={this.state.currentMenu}
            options={this.state.options}
            closeModal={this.props.closeModal}
            // options menu props
            toggleValue={this.toggleValue}
            incrementValue={this.incrementValue}
            decrementValue={this.decrementValue}
            updateCustomOptions={this.props.updateCustomOptions}
          />
        </div>
      </React.Fragment >
    );
  }
}

GameMenu.propTypes = {
  options: PropTypes.object,
  closeModal: PropTypes.func,
  updateCustomOptions: PropTypes.func,
};

export default GameMenu;