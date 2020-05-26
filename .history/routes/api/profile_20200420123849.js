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

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //Build profile object
    const profileField = {};
    profileField.user = 

  }
);

module.exports = router;
