import axios from "axios";
import { responseMessage } from "../data/responseMessage";
import { greetingMessage } from "../data/greetingMessage";

const lineCallback = async (req, res) => {
  const bodyEvents = req.body.events[0];
  console.log("Body          : ", bodyEvents);

  if(bodyEvents.source.userId != null){
    console.log("User ID       : ", bodyEvents.source.userId);
  }  
  if(bodyEvents.message != null){
    const replyToken = bodyEvents.replyToken;
    const text = bodyEvents.message.text
    console.log("Text Received : ", text);
    console.log("Chat ID       : ", bodyEvents.message.id);
    if (text === "ส่งบิล") reply(replyToken,responseMessage);
  }

  if(bodyEvents.type != null){
    if(bodyEvents.type == "join"){
      const replyToken = bodyEvents.replyToken;
      console.log("Yay joinin");
      reply(replyToken,greetingMessage);
    }
  }

  // req.body will be webhook event object
  res.json(bodyEvents);

};

const reply = (replyToken,responseMessage) => {
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
      console.log("Bot reply error: ", error.data);
    });
};

export default { lineCallback };
