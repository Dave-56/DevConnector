const express = require('express');
const router = express.Router();
//middleware for auth token
const auth = require('../../middleware/auth');
//User schema
const User = require('../../models/User');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, async (req, res) => res.send('Auth good'){
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
