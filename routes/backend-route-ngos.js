const express = require('express');
const router = express.Router();
const {
    getNGOs,
    getNGO,
    registerNGO,
    updateNGO,
    verifyNGO,
    getNGOStats
} = require('../controllers/ngoController');
const { protect, admin, ngoAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateNGO, handleValidationErrors } = require('../middleware/validation');

router.get('/', getNGOs);
router.get('/stats', getNGOStats);
router.get('/:id', getNGO);
router.post('/', upload.single('registrationDoc'), validateNGO, handleValidationErrors, registerNGO);
router.put('/:id', protect, ngoAdmin, updateNGO);
router.patch('/:id/verify', protect, admin, verifyNGO);

module.exports = router;