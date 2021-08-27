const express = require("express");
const app = express();
const port = 3000; //TODO запуск на любом порту
const api = express();
const booksRouter = require("./routes/books");
const userRouter = require("./routes/user");

app.use(express.json());
api.use("/books", booksRouter);
api.use("/user", userRouter);

app.use("/api", api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
