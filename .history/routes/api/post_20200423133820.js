const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

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

    const user = await 
  }
);

module.exports = router;
