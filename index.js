const express = require("express");
const app = express();
const port = 4000;
const configFile = require("./LineToken.json");

app.post("/callback", middleware(configFile), async (req, res) => {
    const bodyEvents = req.body.events[0];
    var userData = lineFunction.callback(bodyEvents);
    console.log(bodyEvents)
    res.json(bodyEvents); // req.body will be webhook event object
  });
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json());
// console.log("helo");
// app.get('/', (req, res) => res.json({message: "Hello World"}))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))