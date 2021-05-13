const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./db/mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const item = require("./routes/api/item");
const order = require('./routes/api/oder')
require("./config/passport")(passport);
const path = require("path");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const app = express();


app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());  
 
app.use(passport.initialize()); 

app.use('/uploads', express.static('uploads'));
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/items", item);
app.use("/api/order", order);

const port = process.env.PORT || 5000;  

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));