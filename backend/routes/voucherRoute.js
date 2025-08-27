const express = require('express');
const router = express.Router();

const {
    getVoucher,
    addVoucher
} = require('../controllers/voucherController');

router.post('/get-voucher', getVoucher);
router.post('/add-voucher', addVoucher);

module.exports = router;