import BlackJackEngine from "./blackJackEngine.js";
import Shoe from "./shoe/shoe.js";
import _ from "lodash";


beforeEach(() => {
  localStorage.clear();
});

test("BlackJackEngine Initiates With A Clean State On First Visit.", () => {
  expect(localStorage.getItem("gameState")).toBe(null);

  const engine = new BlackJackEngine();

  expect(engine.funds).toEqual(1000);
  expect(engine.bet).not.toBeDefined();
  expect(engine.shoe instanceof Shoe).toEqual(true);
});

test("BlackJackEngine Initiates With Existing State From localStorage", () => {
  localStorage.setItem("funds", "100");
  localStorage.setItem("bet", "20");
  localStorage.setItem("shoe", '{"suit":"hearts","value":"2"},{"suit":"hearts","value":"3"}'); // eslint-disable-line quotes

  const engine = new BlackJackEngine();

  expect(engine.funds).toEqual(100);
  expect(engine.bet).toEqual(20);
  expect(engine.shoe instanceof Shoe).toEqual(true);
});

test("BlackJackEngine Overwrites Existing GameState. ", () => {
  const engine = new BlackJackEngine();

  engine.bet = 10;
  engine.funds = 333;
  engine.shoe = new Shoe();

  engine.writeGameStateToLocalStorage();

  expect(localStorage.getItem("bet")).toEqual("10");
  expect(localStorage.getItem("funds")).toEqual("333");
  expect(localStorage.getItem("shoe")).toEqual(engine.shoe.toString());
});
