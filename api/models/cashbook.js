const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cashbookSchema = new Schema({
  list: String,
  type: String,
  amount: Number,
  date: String,
  user: String
},{ versionKey: false }
);

const CashBookModel = mongoose.model('CashBook', cashbookSchema);

module.exports = CashBookModel;