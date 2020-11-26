import express from "express";
import multer from 'multer'
import Bill from "../controller/bill";

const router = express.Router();

router.get("/get", Bill.get);
router.post("/send", Bill.send);
router.put("/update", Bill.update);

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
router.put("/upload-receipt", uploadStrategy, Bill.uploadReceipt);

export default router;
