const express = require('express');
const router = express.Router();

// Bring in the user & profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//auth to protect route
const auth = require('../../middleware/auth');

// @route     GET api/profile/me
// @desc      Get current user's profile
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const Profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name', 'avatar']);

        if(!profile) {
            res.status().json({ msg: 'There is no profile for this user' })
        }

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
