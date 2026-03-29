const express = require('express');
const router = express.Router();
const {
    login,
    getStats,
    createAdmin
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Public route for login
router.post('/login', login);

// Protected admin routes
router.get('/stats', protect, admin, getStats);
router.post('/setup', createAdmin);

module.exports = router;