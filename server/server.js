const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./db/mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
require("./config/passport")(passport);

const app = express(); 

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());  
 
app.use(passport.initialize()); 

app.use("/api/users", users);

const port = process.env.PORT || 5000;  

app.listen(port, () => console.log(`Server up and running on port ${port} !`));