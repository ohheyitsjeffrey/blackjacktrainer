import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../../common-ui";
import {
  TableModalHeader,
  TableModalFooter,
  TableModalBody
} from "../../table-modal";

import "./place-bet.css";

const PlaceBetPrompt = (props) => {
  return (
    <React.Fragment>
      <TableModalHeader>
        <div className="place-bet-title">
          Place Your Bet Please
        </div>
      </TableModalHeader>
      <TableModalBody>
        <div className="place-bet-body">
          <div>
            {props.bet}
          </div>
        </div>
      </TableModalBody>
      <TableModalFooter>
        <div className="modal-action-controls">
          <div className="modal-action-control-wrapper">
            <Button
              fullWidth
              onClick={props.decrementBet}
            >
              -
            </Button>
          </div>
          <div className="modal-action-control-wrapper">
            <Button
              fullWidth
              onClick={props.placeBet}
            >
              Place Bet
            </Button>
          </div>
          <div className="modal-action-control-wrapper">
            <Button
              fullWidth
              onClick={props.incrementBet}
            >
              +
            </Button>
          </div>
        </div >
      </TableModalFooter>
    </React.Fragment>
  );
};

PlaceBetPrompt.propTypes = {
  bet: PropTypes.number,
  incrementBet: PropTypes.func,
  decrementBet: PropTypes.func,
  placeBet: PropTypes.func,
};

export default PlaceBetPrompt;