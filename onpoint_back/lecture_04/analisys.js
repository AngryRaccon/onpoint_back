#!/usr/bin/env node
const fs = require("fs");
const argv = require("./path");

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
