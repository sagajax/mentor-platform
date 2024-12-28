
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProfile,
  getProfile,
  updateProfile
} = require('../controllers/profileController');

router.post('/', auth, createProfile);
router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;

