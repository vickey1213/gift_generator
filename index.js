require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const app = express();
const PORT = 3000;
const jsonData = require("./data/gifts.json");

app.use(express.json());

app.use(bodyParser.json());

//runCompletion();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  const data = {
    name: "Vickey",
    lName: "Kumar",
  };
  res.render("profile", { data });
});

app.get("/gifts", (req, res) => {
  res.render("gifts", { gifts: jsonData });
});

app.use("/chatgpt", require("./chatgpt"));

app.listen(PORT, () => {
  console.log("Server is running on PORT" + PORT);
});
