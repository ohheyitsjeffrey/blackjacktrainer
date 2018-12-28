import React from "react";
import PropTypes from "prop-types";

import { Button } from "../../../common-ui";
import {
  TableModalFooter,
  TableModalBody
} from "../../table-modal";

import "./insurance-prompt.css";

const InsurancePrompt = (props) => {
  return (
    <React.Fragment>
      <TableModalBody>
        <div className="insurance-body">
          Insurance?
        </div>
      </TableModalBody>
      <TableModalFooter>
        <div className="modal-action-controls">
          <div className="modal-action-control-wrapper">
            <Button
              fullWidth
              onClick={props.declineInsurance}
            >
              No
            </Button>
          </div>
          <div className="modal-action-control-wrapper">
            <Button
              fullWidth
              onClick={props.acceptInsurance}
            >
              Yes
            </Button>
          </div>
        </div >
      </TableModalFooter>
    </React.Fragment>
  );
};

InsurancePrompt.propTypes = {
  acceptInsurance: PropTypes.func,
  declineInsurance: PropTypes.func,
};

export default InsurancePrompt;