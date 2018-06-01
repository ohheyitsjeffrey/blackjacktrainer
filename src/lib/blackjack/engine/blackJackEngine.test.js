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
  expect(engine.gameState).toBe("hello");
});