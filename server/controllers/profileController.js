const Profile = require('../models/Profile');

exports.createProfile = async (req, res) => {
  try {
    const { name, bio, skills, interests, experience, availability } = req.body;
    
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    profile = new Profile({
      user: req.user.id,
      name,
      bio,
      skills,
      interests,
      experience,
      availability
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};