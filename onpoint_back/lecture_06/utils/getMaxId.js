const getMaxId = (booksArr) =>
  booksArr.reduce((maxId, book) => {
    return book.id > maxId ? book.id : maxId;
  }, 0);

module.exports = { getMaxId };
