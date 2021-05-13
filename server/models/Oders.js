const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  pid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product ID',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageData: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  qty: {
    type: Number
  }
});
module.exports = Oders = mongoose.model("oders", ItemSchema);