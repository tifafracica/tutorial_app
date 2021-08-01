const express = require("express");
const cors = require("cors");
const tutorialRouter = require('./app/routes/tutorialRoutes');
const path = require("path");
const app = express();


if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "./client/build", "index.html"));

  });
  // app.get('/*', function (req, res) {
  //   res.sendFile(path.join(__dirname, 'index.html'), function (err) {
  //     if (err) {
  //       res.status(500).send(err)
  //     }
  //   })
  // })
};

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://tifa-tutorial-app.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/tutorials', tutorialRouter)

module.exports = app;