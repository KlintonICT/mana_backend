import express from "express";
import Bill from "../controller/bill";

const router = express.Router();

router.get("/get", Bill.get);
router.post("/send", Bill.send);
router.put("/update", Bill.update);

export default router;
