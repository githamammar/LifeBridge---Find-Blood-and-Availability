const express = require('express');
const router = express.Router();
const {
    getListings,
    getListing,
    createListing,
    updateListing,
    deleteListing,
    getListingsByNGO
} = require('../controllers/listingController');
const { protect, ngoAdmin } = require('../middleware/auth');
const { validateListing, handleValidationErrors } = require('../middleware/validation');

router.get('/', getListings);
router.get('/:id', getListing);
router.get('/ngo/:ngoId', getListingsByNGO);
router.post('/', protect, ngoAdmin, validateListing, handleValidationErrors, createListing);
router.put('/:id', protect, ngoAdmin, updateListing);
router.delete('/:id', protect, ngoAdmin, deleteListing);

module.exports = router;