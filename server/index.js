// Importing Node modules and initializing Express
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  router = require("./router"),
  mongoose = require("mongoose"),
  config = require("./config/main"),
  socketEvents = require("./socketEvents");

// Database Connection
mongoose.connect(config.database, { useNewUrlParser: true });

// Start the server
const server = app.listen(config.port);
console.log(`Express server is running on port ${config.port}.`);

const io = require("socket.io").listen(server);
socketEvents(io);

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); //Send JSON responses
app.use(logger("dev")); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Import routes to be served
router(app);

// Necessary for testing
module.exports = server;
