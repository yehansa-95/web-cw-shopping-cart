const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateAdminRegisterInput = require("../../validation/admin-register");
const validateAdminLoginInput = require("../../validation/admin-login");
const validateAddItemInput = require("../../validation/add-item");

const validateUpdateItemInput = require("../../validation/edit-item");
const Admin = require("../../models/Admin");
const Item = require("../../models/Item");
const upload = require('../../middleware/upload');

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
          username: admin.username
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


router.route("/items/add").post(upload.single('imageData'),(req, res) => {
 // console.log(req.body)
  const { errors, isValid } = validateAddItemInput(req.body,req.file);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageData: req.file.path,
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));

});

router.get('/items/all', (req, res) => {
  Item.find({}).then(items => {
      if (items) {
          return res.status(200).send(items);
      }
  });
});

router.delete('/items/delete', (req, res) => {
  console.log(req.body)
  Item.deleteOne({ _id: req.body._id}).then(item => {
      if (item) {
          return res.status(200).json({message: 'Item deleted successfully.', success: true})
      }
  });
});

router.route('/items/update').put(upload.single('imageData'), (req, res) => {
  console.log(req.body.id)
  const { errors, isValid } = validateUpdateItemInput(req.body);
  if (!isValid) {
    console.log(errors)
      return res.status(400).json(errors);
  }
  const _id = req.body.id;
  Item.findOne({ _id }).then(item => {
      if (item) { 
        var update = {}
        if (req.body.imageData == 'undefined'){
          update = {'name': req.body.name, 'description': req.body.description, 'price': req.body.price};
        }else{
          update = {'name': req.body.name, 'description': req.body.description, 'price': req.body.price, 'imageData': req.file.path};
        }
          Item.updateOne({ _id: _id}, {$set: update}, function(err, result) {
              if (err) {
                  return res.status(400).json({ message: 'Unable to update Item.' });
              } else {
                  return res.status(200).json({ message: 'item updated successfully.', success: true });
              }
          });
      } else {
          return res.status(400).json({ message: 'Item Not available.' });
      }
  });
});

router.get("/items/getById", (req, res) => {
  console.log(req.query)
  Item.findOne({ _id: req.query.id }).then(item => { 
    if (item) {
      return res.status(200).send(item);
    }else{
      return res.status(400).json({ message: 'Item Not available.' });
    }
  });
});


router.get("/items/all", (req, res) => {
  Item.find({}).then(items => {
      if (items) {
          return res.status(200).send(items);
      }
  });
});

module.exports = router;