import express from "express";
import bodyParser from "body-parser";

import Line from "./routes/line";

const app = express();

app.use("/", Line);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
