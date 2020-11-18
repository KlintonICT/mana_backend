const express = require("express");
const line = require("@line/bot-sdk");
const request = require("request"); //asd
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

    if(text == "ส่งบิล"){
      reply(replyToken);
    }
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


function reply(replytoken) {
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {Y2BO2H4Sa3jkv5SRF2cDBvrf0LBb+cJwVjWTMwVaox7F0gXU3VqjT/PpLvCWaZteD1rew1Ae9XtGpsZR+6DNXva0qxwp4Fs3Tq+z4mQhCvoCwOd0YkmJKoVhhgg6dbfzRXlmfz2VqDyqntc4z3Pu9AdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
      replyToken: replytoken,
      messages: [{
        "type": "bubble", // ①
        "body": { // ②
          "type": "box", // ③
          "layout": "horizontal", // ④
          "contents": [ // ⑤
            {
              "type": "text", // ⑥
              "text": "Hello,"
            },
            {
              "type": "text", // ⑥
              "text": "World!"
            }
          ]
        }
      }
      ]
  })
  request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode);
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});