const express = require('express');
const router = express.Router();

const request = require('request');
const config = require('config');
// Bring in the user & profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//validator
const { check, validationResult } = require('express-validator');

//auth to protect route
const auth = require('../../middleware/auth');

// @route     GET api/profile/me
// @desc      Get current user's profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile/me
// @desc      Create or Update a user's profile
// @access    Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.webiste = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create if no profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/profile/
// @desc      Get all profiles
// @access    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/profile/user/user_id
// @desc      Get profile by user id
// @access    Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    //Check to make sure profile exists
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    //console.log(err);
    //Check if user id is valid
    if (err.name == 'CastError') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/profile/
// @desc      Delete profile, user & post profiles
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo remove user's posts

    //remove profile
    const profile = await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    const user = await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/profile/experience
// @desc      Add current user's profile experience
// @access    Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty(),
      //.custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      to,
      from,
      current,
      description,
    } = req.body;

    const newExp = {
      title: title,
      company: company,
      location: location,
      to: to,
      from: from,
      current: current,
      description: description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/profile/education
// @desc      Add current user's profile education
// @access    Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty(),
      //.custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school: school,
      degree: degree,
      fieldofstudy: fieldofstudy,
      from: from,
      to: to,
      current: current,
      description: description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/profile/experience/:exp_id
// @desc      Delete experience from profile
// @access    Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    res.status(200).json(foundProfile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
          sort=created:asc&client_id=${config.get(
            'githubClientId'
          )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { user_agent: 'node_js' },
    };

    request(options, (error, response, body) => {
        if(error) console.log(error);
        
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
module.exports = router;
