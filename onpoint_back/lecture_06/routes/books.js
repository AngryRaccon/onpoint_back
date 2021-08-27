const express = require("express");
const router = express.Router();
const { getBooks } = require("../streams/readStream");
const { saveBooks } = require("../streams/writeStream");
const { getMaxId } = require("../utils/getMaxId");

const Books = require("../books.json");

//GET all books
router.get("/", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

//GET book by id
router.get("/:reqId", async (req, res) => {
  const { reqId } = req.params;
  const books = await getBooks();
  const book = books.filter(({ id }) => id === reqId)[0];
  console.log(book);
  if (!book) {
    res.status(404);
    const content = "404 | not found";
    res.send(content);
  } else res.send(book);
});

//POST create new book
router.post("/", async (req, res) => {
  const newBook = req.body;
  const books = await getBooks();
  const maxId = getMaxId(books);
  const newBookWithId = { id: maxId + 1, ...newBook };
  books.push(newBookWithId);
  try {
    await saveBooks(books);
    res.send(newBookWithId);
  } catch (err) {
    res.status(500).send(`Error: internal ${err}`);
  }
});

//PUT to update existing book
router.put("/:reqId", async (req, res) => {
  const { reqId } = req.params;
  const updParams = req.body;
  const books = await getBooks();
  const idx = books.findIndex(({ id }) => id === Number(reqId));
  if (idx === -1) {
    const content = `404 | book with id ${reqId} not found`;
    res.status(404).send(content);
  } else {
    const currBook = books[idx];
    console.log(updParams);
    const newBook = { ...currBook, ...updParams };
    books[idx] = newBook;
    await saveBooks(books);
    res.send(newBook);
  }
});

//DELETE
router.delete("/:reqId", async (req, res) => {
  const { reqId } = req.params;
  const books = await getBooks();
  const idx = books.findIndex(({ id }) => id === Number(reqId));
  if (idx !== -1) {
    books.splice(idx, 1);
    await saveBooks(books);
    res.send("OK | success");
  } else {
    res.status(500);
    res.send("Internal server error");
  }
});

module.exports = router;
