const fs = require("fs");
const { finished } = require("stream/promises");

const getBooks = async () => {
  console.log("get books");
  const readerStream = fs.createReadStream("books.json", { encoding: "UTF-8" });
  let data = "";
  readerStream.on("data", (chunk) => {
    data += chunk;
  });
  readerStream.on("end", () => {
    console.log("end", data);
  });
  await finished(readerStream);
  return JSON.parse(data);
};

module.exports = { getBooks };
