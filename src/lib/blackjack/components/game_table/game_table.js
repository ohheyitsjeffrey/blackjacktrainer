import React from "react";
import PropTypes from "prop-types";

import Hand from "../hand/hand.js";
import MessageOverlay from "./message_overlay/message_overlay.js";
import TableModal from "./table-modal";

import { MODALMODES } from "../../engine/game-utils";
import {
  PlaceBetPrompt,
  GameMenu,
  InsurancePrompt,
} from "./table-modal-prompts";

import "./game_table.css";

// constants for determining which fragment to load in modal
const INSURANCE = MODALMODES.INSURANCE;
const OPTIONS = MODALMODES.OPTIONS;
const PLACEBET = MODALMODES.PLACEBET;


const GameTable = (props) => {
  const getModalBody = (mode) => {
    const modalMap = {};
    modalMap[INSURANCE] = {
      component: InsurancePrompt,
      props: {
        acceptInsurance: props.acceptInsurance,
        declineInsurance: props.declineInsurance,
      },
    };
    modalMap[OPTIONS] = {
      component: GameMenu,
      props: {
        options: props.options,
        closeModal: props.closeModal,
        updateCustomOptions: props.updateCustomOptions,
      },
    };
    modalMap[PLACEBET] = {
      component: PlaceBetPrompt,
      props: {
        bet: props.bet,
        incrementBet: props.incrementBet,
        decrementBet: props.decrementBet,
        placeBet: props.placeBet,
      },
    };

    if (mode && Object.keys(modalMap).includes(mode)) {
      const Component = modalMap[mode].component;
      const modalProps = modalMap[mode].props;

      return (
        <Component {...modalProps} />
      );
    }
  };

  const highlight = (index) => {
    return props.shouldHighlight && props.highlightIndex === index;
  };

  const selectHand = (index) => {
    props.clickToSelectHand(index);
  };

  return (
    <div className="game-table game-table-container">
      <div className="game-table game-table-inner">
        <TableModal
          show={props.modalMode !== undefined}
          size={props.modalMode === OPTIONS ? "large" : undefined }>
          {getModalBody(props.modalMode)}
        </TableModal>
        {
          props.waitForPlayerClick &&
          <MessageOverlay
            message="Click To Start Next Round"
            clickAction={props.clickToStartNextRound}
          />
        }
        <div className="game-table game-table-dealer">
          {props.dealersHand
            ? <Hand
              cards={props.dealersHand.cards}
              isDealer={true}
              isDealersTurn={props.isDealersTurn}
            />
            : <div />
          }
        </div>
        <div className="game-table game-table-player">
          {props.playersHands
            ? props.playersHands.map((hand, index) => {
              return (
                <Hand
                  onClick={() => { selectHand(index); }}
                  cards={hand.cards}
                  key={`player-hand-${index}`}
                  isDealer={false}
                  isDealersTurn={false}
                  highlightActive={highlight(index)}
                  handIndex={index}
                  clickToSelectHand={props.clickToSelectHand}
                />
              );
            })
            : <div />
          }
        </div>
      </div>
    </div>
  );
};

GameTable.propTypes = {
  modalMode: PropTypes.string,
  closeModal: PropTypes.func,
  bet: PropTypes.number,
  betPlaced: PropTypes.bool,
  incrementBet: PropTypes.func,
  decrementBet: PropTypes.func,
  placeBet: PropTypes.func,
  dealersHand: PropTypes.object,
  playersHands: PropTypes.array,
  shouldHighlight: PropTypes.bool,
  highlightIndex: PropTypes.number,
  isDealersTurn: PropTypes.bool,
  clickToStartNextRound: PropTypes.func,
  waitForPlayerClick: PropTypes.bool,
  clickToSelectHand: PropTypes.func,
  options: PropTypes.object,
  updateCustomOptions: PropTypes.func,
  acceptInsurance: PropTypes.func,
  declineInsurance: PropTypes.func,
};

export default GameTable;
