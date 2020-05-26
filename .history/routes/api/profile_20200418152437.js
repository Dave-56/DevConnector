const express = require('express');
const router = express.Router();

// Bring in profile model
const Profile = require('../../models/Profile');

const auth = require('')

// @route     GET api/profile/me
// @desc      Get current user's profile
// @access    Private
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
