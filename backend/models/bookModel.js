const { model, Schema } = require("mongoose");

booksShema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
  },
});
module.exports = model("Books", booksShema);
