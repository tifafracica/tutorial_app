const express = require("express");
const cors = require("cors");
const tutorialRouter = require('./app/routes/tutorialRoutes');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/tutorials', tutorialRouter)

module.exports = app;