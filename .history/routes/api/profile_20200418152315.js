const express = require('express');
const router = express.Router();

// Bring in user model
const Profile = require('../../models/User');

// @route     GET api/profile
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
