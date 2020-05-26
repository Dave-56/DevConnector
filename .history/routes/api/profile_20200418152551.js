const express = require('express');
const router = express.Router();

// Bring in profile model
const Profile = require('../../models/Profile');

//auth to protect route
const auth = require('../../middleware/auth');

// @route     GET api/profile/me
// @desc      Get current user's profile
// @access    Private
router.get('/', auth, async (req, res) => {
    try {

    } catch(err) {
        console.error(err.message);
        res.stat
    }
});

module.exports = router;
