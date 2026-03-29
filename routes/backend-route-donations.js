const express = require('express');
const router = express.Router();
const {
    createDonation,
    getDonations,
    getUserDonations,
    updateDonation
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/auth');
const { validateDonation, handleValidationErrors } = require('../middleware/validation');

router.post('/', validateDonation, handleValidationErrors, createDonation);
router.get('/', protect, admin, getDonations);
router.get('/my-donations', protect, getUserDonations);
router.put('/:id', protect, admin, updateDonation);

module.exports = router;