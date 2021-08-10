#!/usr/bin/env node
const readline = require("readline");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const Game = require("./game");

const argv = yargs(hideBin(process.argv)).check((argv, options) => {
  const action = argv._;
  if (action.length !== 1)
    throw new Error(
      "Что-то пошло не так :( Ожидаю один аргумент, он же путь до файла"
    );
  return true;
}).argv;

const game = new Game(fs.createWriteStream(argv._[0]));

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
