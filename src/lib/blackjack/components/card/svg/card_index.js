import svg_10_of_clubs from "./10_of_clubs.svg";
import svg_10_of_diamonds from "./10_of_diamonds.svg";
import svg_10_of_hearts from "./10_of_hearts.svg";
import svg_10_of_spades from "./10_of_spades.svg";
import svg_2_of_clubs from "./2_of_clubs.svg";
import svg_2_of_diamonds from "./2_of_diamonds.svg";
import svg_2_of_hearts from "./2_of_hearts.svg";
import svg_2_of_spades from "./2_of_spades.svg";
import svg_3_of_clubs from "./3_of_clubs.svg";
import svg_3_of_diamonds from "./3_of_diamonds.svg";
import svg_3_of_hearts from "./3_of_hearts.svg";
import svg_3_of_spades from "./3_of_spades.svg";
import svg_4_of_clubs from "./4_of_clubs.svg";
import svg_4_of_diamonds from "./4_of_diamonds.svg";
import svg_4_of_hearts from "./4_of_hearts.svg";
import svg_4_of_spades from "./4_of_spades.svg";
import svg_5_of_clubs from "./5_of_clubs.svg";
import svg_5_of_diamonds from "./5_of_diamonds.svg";
import svg_5_of_hearts from "./5_of_hearts.svg";
import svg_5_of_spades from "./5_of_spades.svg";
import svg_6_of_clubs from "./6_of_clubs.svg";
import svg_6_of_diamonds from "./6_of_diamonds.svg";
import svg_6_of_hearts from "./6_of_hearts.svg";
import svg_6_of_spades from "./6_of_spades.svg";
import svg_7_of_clubs from "./7_of_clubs.svg";
import svg_7_of_diamonds from "./7_of_diamonds.svg";
import svg_7_of_hearts from "./7_of_hearts.svg";
import svg_7_of_spades from "./7_of_spades.svg";
import svg_8_of_clubs from "./8_of_clubs.svg";
import svg_8_of_diamonds from "./8_of_diamonds.svg";
import svg_8_of_hearts from "./8_of_hearts.svg";
import svg_8_of_spades from "./8_of_spades.svg";
import svg_9_of_clubs from "./9_of_clubs.svg";
import svg_9_of_diamonds from "./9_of_diamonds.svg";
import svg_9_of_hearts from "./9_of_hearts.svg";
import svg_9_of_spades from "./9_of_spades.svg";
import svg_ace_of_clubs from "./ace_of_clubs.svg";
import svg_ace_of_diamonds from "./ace_of_diamonds.svg";
import svg_ace_of_hearts from "./ace_of_hearts.svg";
import svg_ace_of_spades from "./ace_of_spades.svg";
import svg_jack_of_clubs from "./jack_of_clubs.svg";
import svg_jack_of_diamonds from "./jack_of_diamonds.svg";
import svg_jack_of_hearts from "./jack_of_hearts.svg";
import svg_jack_of_spades from "./jack_of_spades.svg";
import svg_king_of_clubs from "./king_of_clubs.svg";
import svg_king_of_diamonds from "./king_of_diamonds.svg";
import svg_king_of_hearts from "./king_of_hearts.svg";
import svg_king_of_spades from "./king_of_spades.svg";
import svg_queen_of_clubs from "./queen_of_clubs.svg";
import svg_queen_of_diamonds from "./queen_of_diamonds.svg";
import svg_queen_of_hearts from "./queen_of_hearts.svg";
import svg_queen_of_spades from "./queen_of_spades.svg";

import svg_card_back from "./card_back.svg";

const svgMap =  {
  svg_10_of_clubs: svg_10_of_clubs,
  svg_10_of_diamonds: svg_10_of_diamonds,
  svg_10_of_hearts: svg_10_of_hearts,
  svg_10_of_spades: svg_10_of_spades,
  svg_2_of_clubs: svg_2_of_clubs,
  svg_2_of_diamonds: svg_2_of_diamonds,
  svg_2_of_hearts: svg_2_of_hearts,
  svg_2_of_spades: svg_2_of_spades,
  svg_3_of_clubs: svg_3_of_clubs,
  svg_3_of_diamonds: svg_3_of_diamonds,
  svg_3_of_hearts: svg_3_of_hearts,
  svg_3_of_spades: svg_3_of_spades,
  svg_4_of_clubs: svg_4_of_clubs,
  svg_4_of_diamonds: svg_4_of_diamonds,
  svg_4_of_hearts: svg_4_of_hearts,
  svg_4_of_spades: svg_4_of_spades,
  svg_5_of_clubs: svg_5_of_clubs,
  svg_5_of_diamonds: svg_5_of_diamonds,
  svg_5_of_hearts: svg_5_of_hearts,
  svg_5_of_spades: svg_5_of_spades,
  svg_6_of_clubs: svg_6_of_clubs,
  svg_6_of_diamonds: svg_6_of_diamonds,
  svg_6_of_hearts: svg_6_of_hearts,
  svg_6_of_spades: svg_6_of_spades,
  svg_7_of_clubs: svg_7_of_clubs,
  svg_7_of_diamonds: svg_7_of_diamonds,
  svg_7_of_hearts: svg_7_of_hearts,
  svg_7_of_spades: svg_7_of_spades,
  svg_8_of_clubs: svg_8_of_clubs,
  svg_8_of_diamonds: svg_8_of_diamonds,
  svg_8_of_hearts: svg_8_of_hearts,
  svg_8_of_spades: svg_8_of_spades,
  svg_9_of_clubs: svg_9_of_clubs,
  svg_9_of_diamonds: svg_9_of_diamonds,
  svg_9_of_hearts: svg_9_of_hearts,
  svg_9_of_spades: svg_9_of_spades,
  svg_ace_of_clubs: svg_ace_of_clubs,
  svg_ace_of_diamonds: svg_ace_of_diamonds,
  svg_ace_of_hearts: svg_ace_of_hearts,
  svg_ace_of_spades: svg_ace_of_spades,
  svg_jack_of_clubs: svg_jack_of_clubs,
  svg_jack_of_diamonds: svg_jack_of_diamonds,
  svg_jack_of_hearts: svg_jack_of_hearts,
  svg_jack_of_spades: svg_jack_of_spades,
  svg_king_of_clubs: svg_king_of_clubs,
  svg_king_of_diamonds: svg_king_of_diamonds,
  svg_king_of_hearts: svg_king_of_hearts,
  svg_king_of_spades: svg_king_of_spades,
  svg_queen_of_clubs: svg_queen_of_clubs,
  svg_queen_of_diamonds: svg_queen_of_diamonds,
  svg_queen_of_hearts: svg_queen_of_hearts,
  svg_queen_of_spades: svg_queen_of_spades,
};


const cardSvgs = {
  getCardSvg: (value, suit) => {
    const card = svgMap[`svg_${value}_of_${suit}`];
    return card;
  },
  getCardBack: () => {
    return svg_card_back;
  }
};

export default cardSvgs;


