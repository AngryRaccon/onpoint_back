const fs = require("fs");
const { finished } = require("stream/promises");

const saveBooks = async (books) => {
  const writerStream = fs.createWriteStream("books.json");
  writerStream.write(JSON.stringify(books), "UTF8");
  writerStream.end();
  writerStream.on("finish", () => {
    console.log("Запись завершена");
  });
  writerStream.on("close", () => {
    console.log("Запись close");
  });
  writerStream.on("error", (err) => {
    console.log(err.stack);
  });
  await finished(writerStream);
};

module.exports = { saveBooks };
