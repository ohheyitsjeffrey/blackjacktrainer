import React from "react";
import PropTypes from "prop-types";

import Hand from "../hand/hand.js";
import MessageOverlay from "./message_overlay/message_overlay.js";
import TableModal from "./table-modal";
import { PlaceBetPrompt } from "./table-modal-prompts";

import "./game_table.css";

const GameTable = (props) => {
  const highlight = (index) => {
    return props.shouldHighlight && props.highlightIndex === index;
  };

  const selectHand = (index) => {
    props.clickToSelectHand(index);
  };

  return (
    <div className="game-table game-table-container"
      onClick={props.clickToStartNextRound}
    >
      <div className="game-table game-table-inner">
        <TableModal show={!props.betPlaced}>
          <PlaceBetPrompt
            bet={props.bet}
            incrementBet={props.incrementBet}
            decrementBet={props.decrementBet}
            placeBet={props.placeBet}
          />
        </TableModal>
        {
          props.waitForPlayerClick &&
          <MessageOverlay message="Click To Start Next Round" />
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
  modalMode: PropTypes.bool.isRequired,
  showModal: PropTypes.string | undefined,
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
};

export default GameTable;
