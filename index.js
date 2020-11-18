const express = require("express");
const line = require("@line/bot-sdk");
const bodyParser = require("body-parser");
const app = express();
const configFile = require("./LineToken.json");
var replyToken;
var text;

app.post("/callback", line.middleware(configFile), async (req, res) => {
    const bodyEvents = req.body.events[0];
    replyToken = bodyEvents.replyToken;
    text = bodyEvents.message.text;
    console.log("Body :"+bodyEvents)
    console.log("Text Received : "+text)
    console.log("User ID       : "+bodyEvents.source.userId)
    console.log("Chat Id       : "+bodyEvents.message.id)
    console.log("Reply Token   : "+bodyEvents.replyToken)
    res.json(bodyEvents); // req.body will be webhook event object
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("done");
console.log(text);
if(text == "ส่งบิล"){
  app.post("/reply", (req,res) => {
    const options =  {
      method: "POST",
      url: "https://api.line.me/v2/bot/message/reply",
      headers: {
        Authorization: "Bearer " + configFile.channelAccessToken,
        "Content-Type": "application/json",
      },
      body: {
        replyToken: replyToken,
        messages: [{
          "type":"text",
          "text":"Hello, user"
        }],
      },
      json: true,
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log("DATA : " + JSON.stringify(data));
      res.send(
        "Successfully send : " + options + " To : " + replyToken
      );
    });
  });
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});