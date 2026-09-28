const jwt = require('jsonwebtoken');

const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to do that.' });
    }

    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, {
        maxAge: expiration,
      });

      req.user = data;
    } catch (err) {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token.' });
    }

    next();
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign(
      { data: payload },
      process.env.JWT_SECRET,
      { expiresIn: expiration }
    );
  },
};
