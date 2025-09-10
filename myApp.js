require("dotenv").config();
let express = require("express");
let app = express();

console.log("Hello, World");

// app.get("/", (req, res) => {
//   res.send("Hello, Express");
// });
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use(logger);
// Normal usage
//app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
  });
});

module.exports = app;
