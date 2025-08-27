const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  voucherCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;