const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.status(201).send({ id: 1, mail: "test@mail.ru" });
});

module.exports = router;
