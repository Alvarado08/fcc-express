require("dotenv").config();
let express = require("express");
let app = express();

console.log("Hello, World");

// app.get("/", (req, res) => {
//   res.send("Hello, Express");
// });

// Logger middleware
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

/**
 * Middleware to add the current time to the request object
 */
// Method 1
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Method 2
// const middleware = (req, res, next) => {
//   req.time = new Date().toString();
//   next();
// };

// app.get("/now", middleware, (req, res) => {
//   res.send({
//     time: req.time
//   });
// });

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

module.exports = app;
