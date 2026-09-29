const router = require('express').Router();
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');

// This route lets me create a new user.
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
});

// This route lets me log a user in and return a token.
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error while logging in.' });
  }
});

module.exports = router;
