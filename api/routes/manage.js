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

router.put('/editCashBookByUser/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    const data = await CashBook.findByIdAndUpdate(id, { $set: payload });
    res.status(200);
    res.json({
      result: 'success',
      data
    });
  });

router.delete('/deleteCashBook/:id', async (req, res) => {
    const { id } = req.params;
  
    await CashBook.findByIdAndDelete(id);
    res.status(204).end;
  });

module.exports = router;