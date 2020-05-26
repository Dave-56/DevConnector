const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route     POST api/posts
// @desc      Test route
// @access    Private
router.get(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');

    const newPost = {
        text: req.body.text;
        name: user.name,
        avatar: user.avatar,
        user: 
    }
  }
);

module.exports = router;
