const express = require('express');
const router = express.Router();

//middleware for auth token
const auth = require('../../middleware/auth');

const User = require('../../models/')

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, (req, res) => res.send('auth route'));

module.exports = router;
