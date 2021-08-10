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

module.exports = argv;
