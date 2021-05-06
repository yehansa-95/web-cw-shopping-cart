const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateAdminRegisterInput = require("../../validation/admin-register");
const validateAdminLoginInput = require("../../validation/admin-login");
const Admin = require("../../models/Admin");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateAdminRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Admin.findOne({ username: req.body.username }).then(admin => {
    if (admin) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


router.post("/login", (req, res) => {
  const { errors, isValid } = validateAdminLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne({ username }).then(admin => {

    if (!admin) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }

    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {

        const payload = {
          id: admin.id,
          name: admin.name,
          username:admin.username
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;