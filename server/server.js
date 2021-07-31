const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
dotenv.config({ path: './.env' })
const express = require("express");

const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(database, {
  // Handle Deprecation Warnings
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(
  () => console.log('Database connection sucessful!')
).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});