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

router.post('/getCashBookByUser', async (req, res) => {
    const { user } = req.body;
    const data = await CashBook.find({user:user});
    res.status(200);
    res.json({
      data
    });
  });

module.exports = router;