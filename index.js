const express = require("express");
const line = require("@line/bot-sdk");
const bodyParser = require("body-parser");
const app = express();
const configFile = require("./LineToken.json");

app.post("/callback", line.middleware(configFile), async (req, res) => {
    const bodyEvents = req.body.events[0];
    console.log("Text Received : "+bodyEvents.message.text)
    console.log("User ID       : "+bodyEvents.source.userId)
    console.log("Chat Id       : "+bodyEvents.message.id)
    res.json(bodyEvents); // req.body will be webhook event object
  });
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});