#!/usr/bin/env node
require("dotenv").config();
const readline = require("readline");
const getHTTPRes = require("./http");

const SECRET_KEY = process.env.ACCESS_KEY;

const input = readline.createInterface(process.stdin);
console.log(
  "Please, enter the name of the city or just press Enter on keyboard to see information about Moscow weather"
);
input.on("line", (data) => {
  try {
    let city = "Moscow";
    if (data.trim() !== "") city = data;
    console.log(`You enter: ${city}`);
    getHTTPRes(
      `http://api.weatherstack.com/current?access_key=${SECRET_KEY}&query=${city}`
    );
  } catch (err) {
    console.log(`fatal error: ${err}`);
    process.exit(1);
  }
});
input.on("close", () => console.log("End"));
