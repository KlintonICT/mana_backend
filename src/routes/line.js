import express from "express";

import { middleware } from "@line/bot-sdk";
import Line from "../controller/line";

// import { lineToken } from "../token/line";

const lineToken = {
  channelSecret: "ddb0c4650713e7335687225ad58f9d50",
  channelAccessToken:
    "Y2BO2H4Sa3jkv5SRF2cDBvrf0LBb+cJwVjWTMwVaox7F0gXU3VqjT/PpLvCWaZteD1rew1Ae9XtGpsZR+6DNXva0qxwp4Fs3Tq+z4mQhCvoCwOd0YkmJKoVhhgg6dbfzRXlmfz2VqDyqntc4z3Pu9AdB04t89/1O/w1cDnyilFU=",
};

const router = express.Router();

router.post("/callback", middleware(lineToken), Line.lineCallback);

export default router;
