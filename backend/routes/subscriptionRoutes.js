const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Subscribe to a plan
router.get('/subscribe', subscriptionController.createSubscription);

module.exports = router;
