const express = require('express');

const router = express.Router();

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator');

// Bring in user model
const User = require('../../models/User');

// @route     POST api/users
// @desc      Register users
// @access    Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),

    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more chararcters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exits
      let user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(500)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user to db
      await user.save();

      // Return jsonwebtoken

      res.send('User registerd');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
