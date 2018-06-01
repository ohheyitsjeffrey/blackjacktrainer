import BlackJackEngine from "./blackJackEngine.js";

beforeEach(() => {
  localStorage.clear();
});

test("BlackJackEngine Initiates With New GameState If None Exists", () => {
  expect(localStorage.getItem("gameState")).not.toBe();
  const engine = new BlackJackEngine();
  expect(engine.gameState).toBeDefined();
});

test("BlackJackEngine Initiates With Existing GameState If One Exists", () => {
  localStorage.setItem("gameState", "hello");

  const engine = new BlackJackEngine();
  expect(engine.gameState).toEqual("hello");
});

test("writeCurrentGameState Overwrites Existing GameState. ", () => {
  const testMessage = "I was written by writeCurrentGameState()";
  // localStorage.setItem("gameState", testMessage);

  const engine = new BlackJackEngine();
  engine.gameState = testMessage;
  engine.writeCurrentGameState();

  expect(localStorage.getItem("gameState")).toEqual(testMessage);

});
