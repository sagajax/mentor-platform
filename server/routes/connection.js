
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  sendRequest,
  updateConnectionStatus
} = require('../controllers/connectionController');

router.post('/request', auth, sendRequest);
router.put('/status', auth, updateConnectionStatus);

module.exports = router;