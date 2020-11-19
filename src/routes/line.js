import express from "express";

import { middleware } from "@line/bot-sdk";
import Line from "../controller/line";

import { config } from '../config/line';

const router = express.Router();

router.post("/callback", middleware(config), Line.lineCallback);

export default router;
