const express = require('express');
const router = express.Router();
const {
    createInquiry,
    getInquiries,
    respondInquiry
} = require('../controllers/inquiryController');
const { protect, ngoAdmin } = require('../middleware/auth');

router.post('/', createInquiry);
router.get('/', protect, ngoAdmin, getInquiries);
router.post('/:id/respond', protect, ngoAdmin, respondIn