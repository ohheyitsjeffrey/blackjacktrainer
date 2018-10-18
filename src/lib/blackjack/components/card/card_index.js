import React from "react";

// import the card back
import { ReactComponent as SvgCardBack } from "./svg/card_back.svg";

// import the face card
import { ReactComponent as Svg10OfClubs } from "./svg/10_of_clubs.svg";
import { ReactComponent as Svg10OfDiamonds } from "./svg/10_of_diamonds.svg";
import { ReactComponent as Svg10OfHearts } from "./svg/10_of_hearts.svg";
import { ReactComponent as Svg10OfSpades } from "./svg/10_of_spades.svg";
import { ReactComponent as Svg2OfClubs } from "./svg/2_of_clubs.svg";
import { ReactComponent as Svg2OfDiamonds } from "./svg/2_of_diamonds.svg";
import { ReactComponent as Svg2OfHearts } from "./svg/2_of_hearts.svg";
import { ReactComponent as Svg2OfSpades } from "./svg/2_of_spades.svg";
import { ReactComponent as Svg3OfClubs } from "./svg/3_of_clubs.svg";
import { ReactComponent as Svg3OfDiamonds } from "./svg/3_of_diamonds.svg";
import { ReactComponent as Svg3OfHearts } from "./svg/3_of_hearts.svg";
import { ReactComponent as Svg3OfSpades } from "./svg/3_of_spades.svg";
import { ReactComponent as Svg4OfClubs } from "./svg/4_of_clubs.svg";
import { ReactComponent as Svg4OfDiamonds } from "./svg/4_of_diamonds.svg";
import { ReactComponent as Svg4OfHearts } from "./svg/4_of_hearts.svg";
import { ReactComponent as Svg4OfSpades } from "./svg/4_of_spades.svg";
import { ReactComponent as Svg5OfClubs } from "./svg/5_of_clubs.svg";
import { ReactComponent as Svg5OfDiamonds } from "./svg/5_of_diamonds.svg";
import { ReactComponent as Svg5OfHearts } from "./svg/5_of_hearts.svg";
import { ReactComponent as Svg5OfSpades } from "./svg/5_of_spades.svg";
import { ReactComponent as Svg6OfClubs } from "./svg/6_of_clubs.svg";
import { ReactComponent as Svg6OfDiamonds } from "./svg/6_of_diamonds.svg";
import { ReactComponent as Svg6OfHearts } from "./svg/6_of_hearts.svg";
import { ReactComponent as Svg6OfSpades } from "./svg/6_of_spades.svg";
import { ReactComponent as Svg7OfClubs } from "./svg/7_of_clubs.svg";
import { ReactComponent as Svg7OfDiamonds } from "./svg/7_of_diamonds.svg";
import { ReactComponent as Svg7OfHearts } from "./svg/7_of_hearts.svg";
import { ReactComponent as Svg7OfSpades } from "./svg/7_of_spades.svg";
import { ReactComponent as Svg8OfClubs } from "./svg/8_of_clubs.svg";
import { ReactComponent as Svg8OfDiamonds } from "./svg/8_of_diamonds.svg";
import { ReactComponent as Svg8OfHearts } from "./svg/8_of_hearts.svg";
import { ReactComponent as Svg8OfSpades } from "./svg/8_of_spades.svg";
import { ReactComponent as Svg9OfClubs } from "./svg/9_of_clubs.svg";
import { ReactComponent as Svg9OfDiamonds } from "./svg/9_of_diamonds.svg";
import { ReactComponent as Svg9OfHearts } from "./svg/9_of_hearts.svg";
import { ReactComponent as Svg9OfSpades } from "./svg/9_of_spades.svg";
import { ReactComponent as SvgAceOfClubs } from "./svg/ace_of_clubs.svg";
import { ReactComponent as SvgAceOfDiamonds } from "./svg/ace_of_diamonds.svg";
import { ReactComponent as SvgAceOfHearts } from "./svg/ace_of_hearts.svg";
import { ReactComponent as SvgAceOfSpades } from "./svg/ace_of_spades.svg";
import { ReactComponent as SvgJackOfClubs } from "./svg/jack_of_clubs.svg";
import { ReactComponent as SvgJackOfDiamonds } from "./svg/jack_of_diamonds.svg";
import { ReactComponent as SvgJackOfHearts } from "./svg/jack_of_hearts.svg";
import { ReactComponent as SvgJackOfSpades } from "./svg/jack_of_spades.svg";
import { ReactComponent as SvgKingOfClubs } from "./svg/king_of_clubs.svg";
import { ReactComponent as SvgKingOfDiamonds } from "./svg/king_of_diamonds.svg";
import { ReactComponent as SvgKingOfHearts } from "./svg/king_of_hearts.svg";
import { ReactComponent as SvgKingOfSpades } from "./svg/king_of_spades.svg";
import { ReactComponent as SvgQueenOfClubs } from "./svg/queen_of_clubs.svg";
import { ReactComponent as SvgQueenOfDiamonds } from "./svg/queen_of_diamonds.svg";
import { ReactComponent as SvgQueenOfHearts } from "./svg/queen_of_hearts.svg";
import { ReactComponent as SvgQueenOfSpades } from "./svg/queen_of_spades.svg";

const ASPECTRATIO = .69;

// map the face card components by suit and value
const faceCardMap = {
  "2": {
    "hearts": Svg2OfHearts,
    "diamonds": Svg2OfDiamonds,
    "clubs": Svg2OfClubs,
    "spades": Svg2OfSpades,
  },
  "3": {
    "hearts": Svg3OfHearts,
    "diamonds": Svg3OfDiamonds,
    "clubs": Svg3OfClubs,
    "spades": Svg3OfSpades,
  },
  "4": {
    "hearts": Svg4OfHearts,
    "diamonds": Svg4OfDiamonds,
    "clubs": Svg4OfClubs,
    "spades": Svg4OfSpades,
  },
  "5": {
    "hearts": Svg5OfHearts,
    "diamonds": Svg5OfDiamonds,
    "clubs": Svg5OfClubs,
    "spades": Svg5OfSpades,
  },
  "6": {
    "hearts": Svg6OfHearts,
    "diamonds": Svg6OfDiamonds,
    "clubs": Svg6OfClubs,
    "spades": Svg6OfSpades,
  },
  "7": {
    "hearts": Svg7OfHearts,
    "diamonds": Svg7OfDiamonds,
    "clubs": Svg7OfClubs,
    "spades": Svg7OfSpades,
  },
  "8": {
    "hearts": Svg8OfHearts,
    "diamonds": Svg8OfDiamonds,
    "clubs": Svg8OfClubs,
    "spades": Svg8OfSpades,
  },
  "9": {
    "hearts": Svg9OfHearts,
    "diamonds": Svg9OfDiamonds,
    "clubs": Svg9OfClubs,
    "spades": Svg9OfSpades,
  },
  "10": {
    "hearts": Svg10OfHearts,
    "diamonds": Svg10OfDiamonds,
    "clubs": Svg10OfClubs,
    "spades": Svg10OfSpades,
  },
  "jack": {
    "hearts": SvgJackOfHearts,
    "diamonds": SvgJackOfDiamonds,
    "clubs": SvgJackOfClubs,
    "spades": SvgJackOfSpades,
  },
  "queen": {
    "hearts": SvgQueenOfHearts,
    "diamonds": SvgQueenOfDiamonds,
    "clubs": SvgQueenOfClubs,
    "spades": SvgQueenOfSpades,
  },
  "king": {
    "hearts": SvgKingOfHearts,
    "diamonds": SvgKingOfDiamonds,
    "clubs": SvgKingOfClubs,
    "spades": SvgKingOfSpades,
  },
  "ace": {
    "hearts": SvgAceOfHearts,
    "diamonds": SvgAceOfDiamonds,
    "clubs": SvgAceOfClubs,
    "spades": SvgAceOfSpades,
  },
};

const calcCardWidth = (height) => {
  return height * ASPECTRATIO;
};

const cardSvgs = {
  getCardSvg: (value, suit, height) => {
    const Component = faceCardMap[value][suit];
    return (<Component
      height={height}
      width={calcCardWidth(height)}
    />);

  },
  getCardBack: (height) => {
    return (<SvgCardBack
      height={height}
      width={calcCardWidth(height)}
    />);
  },
};


export default cardSvgs;


