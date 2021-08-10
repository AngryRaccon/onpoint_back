#!/usr/bin/env node
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).check((argv, options) => {
  const action = argv._;
  if (action.length !== 1)
    throw new Error(
      "Что-то пошло не так :( Ожидаю один аргумент, он же путь до файла"
    );
  return true;
}).argv;

let result = [];
const readerStream = fs.createReadStream(argv._[0]);
readerStream.setEncoding("UTF8");

readerStream.on(
  "data",
  (chunk) => (result = [...result, ...chunk.split("\n").filter((el) => el)])
);

readerStream.on("end", () => {
  const all = result.length;
  const isWin = result.filter((el) => el === "true").length;
  const isLoose = all - isWin;
  const winPercentage = Math.round((isWin / all) * 100);
  console.log(
    `Всего партий: ${all}; побед - ${isWin}, проигрышей - ${isLoose}; процент побед: ${winPercentage}%`
  );
});
