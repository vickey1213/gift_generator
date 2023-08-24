// require("dotenv").config();
// const express = require("express");
// const OpenAI = require("openai");

// app.use(express.json());
// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.APIKEY,
// });
// const openai = new OpenAIApi(configuration);
// async function runCompletion() {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "How are you today?",
//   });
//   console.log(completion.data.choices[0].text);
// }

// runCompletion();

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();
const { apiKey } = require("./config");

const configuration = new Configuration({
  apiKey: apiKey,
});
// console.log("OPENAI_API_KEY, ", process.env.APIKEY);
const openai = new OpenAIApi(configuration);

router.post("/gifts", async (req, res, next) => {
  try {
    const body = req.body;
    let prompt = `I want to buy a gift for my ${body.relationship} of age ${body.age}. For the occasion ${body.occasion}. Based on their interests in ${body.interests}, and my budget is ${body.budget}.`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });

    const generatedText = completion.choices[0].text;

    console.log(generatedText);

    res.redirect("/gifts");
  } catch (error) {
    res.redirect("/gifts");
  }
});

router.get("/v1", (req, res, next) => {
  res.send("Hi VIckey");
});

module.exports = router;
