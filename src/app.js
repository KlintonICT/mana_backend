import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import Bill from "./routes/bill";
import Line from "./routes/line";
import Admin from './routes/admin';

const app = express();

// cannot use this below bodyParser
app.use("/", Line);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/bill", Bill);
app.use("/api/v1/admin", Admin);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
