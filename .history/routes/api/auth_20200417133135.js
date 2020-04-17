const express = require('express');
const router = express.Router();

//middleware for auth token
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, async (req, res) => {
    try {
        const 
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

module.exports = router;
