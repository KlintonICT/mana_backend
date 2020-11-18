import express from "express";

import line from "@line/bot-sdk";
import Line from "../controller/line";

import { lineToken } from "../token/line";

const router = express.Router();

router.post("/callback", line.middleware(lineToken), Line.lineCallback);

export default router;
