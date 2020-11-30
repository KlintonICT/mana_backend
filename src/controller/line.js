import axios from "axios";
import { responseMessage } from "../data/responseMessage";

const lineCallback = async (req, res) => {
  const bodyEvents = req.body.events[0];

  // if(bodyEvents.message.text != null){
  //   const text = bodyEvents.message.text
  //   console.log("Text Received : ", text);;
  // }
  
  // const replyToken = bodyEvents.replyToken;

  console.log("All :"+req);
  console.log("Body          : ", bodyEvents);
  //console.log("User ID       : ", bodyEvents.source.userId);
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
    messages: responseMessage,
  };

  axios
    .post(`${process.env.LINE_HOST}/bot/message/reply`, data, {
      headers: headers,
    })
    .then((response) => {
      console.log("Bot reply data: ", response.data);
      console.log("Bot reply code: ", response.statusCode);
    })
    .catch((error) => {
      console.log("Bot reply error: ", error);
    });
};

export default { lineCallback };
