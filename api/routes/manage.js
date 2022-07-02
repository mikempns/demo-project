const express = require('express');
const router = express.Router();

const CashBook = require('../models/cashbook');

router.post('/save', async (req, res) => {
    const { list, type, amount, date, user } = req.body;
    const caskbook = new CashBook({
      list,
      type,
      amount,
      date,
      user
    });
    await caskbook.save();
    res.status(200);
    res.json({
      result: 'success'
    });
  });

module.exports = router;