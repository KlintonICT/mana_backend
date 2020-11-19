import axios from "axios";
import { responseMessage } from "../data/responseMessage";

const lineCallback = async (req, res) => {
  const bodyEvents = req.body.events[0];

  const text = bodyEvents.message.text;
  const replyToken = bodyEvents.replyToken;

  console.log("Body          : ", bodyEvents);
  console.log("Text Received : ", text);
  console.log("User ID       : ", bodyEvents.source.userId);
  console.log("Chat ID       : ", bodyEvents.message.id);
  console.log("Reply Token   : ", replyToken);

  // req.body will be webhook event object
  res.json(bodyEvents);

  if (text === "ส่งบิล") reply(replyToken);
};

const reply = (replyToken) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AUTHORIZATION}`,
  };

  const data = {
    replyToken: replyToken,
    message: responseMessage,
  };

  // request
  //   .post(`${process.env.LINE_HOST}/bot/message/reply`, data, { headers })
  //   .then((response) => {
  //     console.log("Bot reply: ", response);
  //   })
  //   .catch((error) => {
  //     console.log("Bot reply error: ", error);
  //   });

  request.post({
    url: `${process.env.LINE_HOST}/bot/message/reply`,
    headers: headers,
    body: JSON.stringify(data)
  }).then((response) => {
    console.log("Bot reply: ", response);
  }).catch((error) => {
    console.log("Bot reply error: ", error);
  })

  //   request.post({
  //     url: 'https://api.line.me/v2/bot/message/reply',
  //     headers: headers,
  //     body: body
  // }, (err, res, body) => {
  //     console.log('status = ' + res.statusCode);
  // });
};

export default { lineCallback };
