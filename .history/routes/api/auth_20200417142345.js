const express = require('express');
const router = express.Router();
//middleware for auth token
const auth = require('../../middleware/auth');
//User schema
const User = require('../../models/User');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});


//
// @route     POST api/auth
// @desc      Authen users
// @access    Public
router.post(
    '/',
    [
      check('name', 'name is required').not().isEmpty(),
  
      check('email', 'Please include a valid email address').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more chararcters'
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
        // See if user exits
        let user = await User.findOne({ email: email });
  
        if (user) {
          return res
            .status(500)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        // Get users gravatar
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
  
        user = new User({
          name,
          email,
          avatar,
          password,
        });
  
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        //save user to db
        await user.save();
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
  
        //res.send('User registerd');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );



module.exports = router;
