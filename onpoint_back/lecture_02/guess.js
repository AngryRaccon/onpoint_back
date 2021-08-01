#!/usr/bin/env node
const readline = require("readline");

class Game {
  constructor() {
    this.IsGameOver = false;
    this.IsGameTerminated = false;
  }

  startNew() {
    this.maxDigit = Math.floor(Math.random() * 100) + 50;
    this.randomDigit = Math.floor(Math.random() * this.maxDigit);
    this.IsGameOver = false;
    return `Загадано число в диапозоне от 0 до ${this.maxDigit}`;
  }

  handleGameCommand(cmd) {
    if (isNaN(cmd))
      return "Так нечестно, ты ввел не число. Давай попробуем еще раз.";

    if (Number(cmd) === this.randomDigit) {
      this.IsGameOver = true;
      return "Ура, ты угадал! \nХочешь начать новую игру? (да/нет)";
    }
    const isBigger = Boolean(Number(cmd) > this.randomDigit);
    return `Твое число ${isBigger ? "больше" : "меньше"} загаданного`;
  }

  handleOutgameCommand(cmd) {
    if (cmd === "да") {
      return this.startNew();
    }
    if (cmd == "нет") {
      this.IsGameTerminated = true;
      return "Спасибо за игру :)";
    }
    return 'Неизвестная команда, введи "да" или "нет"';
  }

  handleCommand(cmd) {
    if (this.IsGameTerminated) {
      throw new Error("Game is terminated");
    }
    if (this.IsGameOver) {
      return this.handleOutgameCommand(cmd);
    }
    return this.handleGameCommand(cmd);
  }
}

const game = new Game();
console.log(game.startNew());
const input = readline.createInterface(process.stdin);
input.on("line", (data) => {
  try {
    console.log(game.handleCommand(data));
  } catch (err) {
    console.log(`fatal error: ${err}`);
    process.exit(1);
  }
  if (game.IsGameTerminated) {
    process.exit(0);
  }
});
input.on("close", () => console.log("End"));
