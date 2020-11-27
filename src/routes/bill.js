import express from "express";
import multer from "multer";
import passport from "../utils/passport";
import Bill from "../controller/bill";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), Bill.get);
router.post("/", Bill.send);
router.put("/", passport.authenticate("jwt", { session: false }), Bill.update);

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
router.post("/upload-receipt", uploadStrategy, Bill.uploadReceipt);

export default router;
