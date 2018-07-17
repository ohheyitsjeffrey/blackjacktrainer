import React from "react";
import ReactTestUtils from "react-dom/test-utils";

import BlackJack from "../blackjack.js";
 
// Tests which render the full blackjack component live in this suite.


beforeEach(() => {
  localStorage.clear();
});

it("BlackJack Renders Without Crashing", () => {
  ReactTestUtils.renderIntoDocument(<BlackJack />);
});