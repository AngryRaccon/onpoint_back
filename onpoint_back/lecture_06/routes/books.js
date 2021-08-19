const express = require("express");
const router = express.Router();

const Books = require("../template.json");

//GET all books
router.get("/", (req, res) => {
  res.send(Books);
});

//GET book by id
router.get("/:reqId", (req, res) => {
  const { reqId } = req.params;
  const book = Books.filter(({ id }) => id === reqId)[0];
  console.log(book);
  if (!book) {
    res.status(404);
    const content = "404 | not found";
    res.send(content);
  } else res.send(book);
});

//POST create new book
router.post("/", (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  Books.push(newBook);
  res.send(newBook);
});

//PUT to update existing book
router.put("/:reqId", (req, res) => {
  const { reqId } = req.params;
  const updParams = req.body;
  const book = Books.filter(({ id }) => id === reqId)[0];
  if (!book) {
    res.status(404);
    const content = `404 | book with id ${reqId} not found`;
    res.send(content);
  } else {
    console.log(updParams);
    const newBook = { ...book, ...updParams };
    res.send(newBook);
  }
});

//DELETE
router.delete("/:reqId", (req, res) => {
  const { reqId } = req.params;
  const book = Books.filter(({ id }) => id === reqId)[0];
  if (book) {
    //TODO здесь будет идти удаление
    res.send("OK | success");
  } else {
    res.status(500);
    res.send("Internal server error");
  }
});

module.exports = router;
