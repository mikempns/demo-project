const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      username,
      password: passwordHash
    });
    await user.save();
    res.status(200);
    res.json({
      result: true
    });
  });
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      username
    });
    if (user) {
      const isCorrect = bcrypt.compareSync(password, user.password);
      if (isCorrect) {
        res.json({
          result: true
        });
      } else {
        res.json({
          result: false,
          message: 'Username or Password incorrect'
        });
      }
    } else {
      res.json({
        result: false,
        message: 'Username does not exist'
      });
    }
  });

module.exports = router;