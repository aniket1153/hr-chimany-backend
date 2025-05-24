const express = require('express');
const { register, login } = require('../controller/Authcontroller');
const { authenticate } = require('../middleawre/AuthMIddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/validate', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
