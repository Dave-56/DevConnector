const express = require('express');
const router = express.Router();

//middleware for auth token
const auth = req

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', (req, res) => res.send('auth route'));

module.exports = router;
