const express = require('express');
const router = express.Router();

const {check, validationResult}

// @route     POST api/posts
// @desc      Test route
// @access    Private
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;
