#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("y", { alias: "year" })
  .option("m", { alias: "month" })
  .option("d", { alias: "date" })
  .check((argv, options) => {
    const action = argv._;
    if (action.length > 1) throw new Error("Упс, я так пока не умею :(");
    return true;
  }).argv;
// console.log(argv);

const { _: action, date, month, year } = argv;

const currTime = new Date();
const currDate = currTime.getDate();
const currMonth = currTime.getMonth();
const currMonthName = currTime.toLocaleString("default", { month: "long" });
const currYear = currTime.getFullYear();

const ISODate = (ms) => new Date(ms).toISOString();

const calculateNewDate = (action) => {
  const [actionType] = action;
  if (actionType === "add") {
    return ISODate(
      currTime.setFullYear(
        currYear + Number(year ? year : 0),
        currMonth + Number(month ? month : 0),
        currDate + Number(date ? date : 0)
      )
    );
  }
  //TODO как объединить?
  if (actionType === "sub") {
    return ISODate(
      currTime.setFullYear(
        currYear - Number(year ? year : 0),
        currMonth - Number(month ? month : 0),
        currDate - Number(date ? date : 0)
      )
    );
  }
};

const result = () => {
  if (!(action && action.length)) {
    const answer = [];
    if (date) answer.push(`Число: ${currDate}`);
    if (month) answer.push(`Месяц: ${currMonthName}`);
    if (year) answer.push(`Год: ${currYear}`);
    return date || month || year
      ? answer.join(". ")
      : new Date(currTime.toISOString());
  }
  return calculateNewDate(action);
};

console.log(result());
