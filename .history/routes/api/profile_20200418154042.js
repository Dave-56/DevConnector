const express = require('express');
const router = express.Router();

// Bring in the user & profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//validator
const { check, validationResult } = require('express-validator/check');

//auth to protect route
const auth = require('../../middleware/auth');

// @route     GET api/profile/me
// @desc      Get current user's profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile/me
// @desc      Create or Update a user's profile
// @access    Private

router.post('/', [auth, ], (req, res) => {

});


module.exports = router;
