const express = require('express');
const router = express.Router();
//middleware for auth token
const auth = require('../../middleware/auth');
//User schema
const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});


//
// @route     POST api/auth
// @desc      Authenticate users & get token
// @access    Public
router.post(
    '/',
    [
      check('email', 'Please include a valid email address').isEmail(),
      check(
        'password',
        'Password is required'
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // See if user exits
        let user = await User.findOne({ email: email });
  
        if (!user) {
          return res
            .status(500)
            .json({ errors: [{ msg: 'Invalid credentials' }] });
        }
        
        //Compare user password to see if it matches
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)

        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
  
        //res.send('User registerd');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );



module.exports = router;
