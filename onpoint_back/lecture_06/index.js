const express = require("express");
const app = express();
const port = 3000; //TODO запуск на любом порту
const booksRouter = require("./routes/books");
const userRouter = require("./routes/user");

app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
