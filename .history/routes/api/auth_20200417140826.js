const express = require('express');
const router = express.Router();
//middleware for auth token
const auth = require('../../middleware/auth');
//User schema
const User = require('../../models/User');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, (req, res) => {

});

module.exports = router;

// {
//     
//   });
