import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import _ from "lodash";

import Card from "./card.js";
import suitsAndValues from "../../engine/game-utils/suitsAndValues";

const suits = suitsAndValues.suits;
const values = suitsAndValues.values;

it("Card Renders For Each Suit And Value", () => {
  _.forEach(values, (value) => {
    _.forEach(suits, (suit) => {
      ReactTestUtils.renderIntoDocument(
        <Card
          height={200}
          isFlipped={false}
          willOverflow={false}
          handSize={1}
          zIndex={1}
          value={value}
          suit={suit}
        />);
    });
  });
});

it("Card Renders When Flipped For Each Suit And Value", () => {
  _.forEach(values, (value) => {
    _.forEach(suits, (suit) => {
      ReactTestUtils.renderIntoDocument(
        <Card
          height={200}
          isFlipped={true}
          willOverflow={false}
          handSize={1}
          zIndex={1}
          value={value}
          suit={suit}
        />);
    });
  });
});
