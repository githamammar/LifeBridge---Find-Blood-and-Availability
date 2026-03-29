const { body, validationResult } = require('express-validator');

const validateListing = [
    body('type').isIn(['organ', 'blood']).withMessage('Invalid listing type'),
    body('title').notEmpty().withMessage('Title is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('ngo').notEmpty().withMessage('NGO name is required'),
    body('contact').notEmpty().withMessage('Contact is required'),
];

const validateNGO = [
    body('name').notEmpty().withMessage('NGO name is required'),
    body('registrationNumber').notEmpty().withMessage('Registration number is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
];

const validateDonation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 18, max: 100 }).withMessage('Age must be between 18 and 100'),
    body('bloodGroup').notEmpty().withMessage('Blood group is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateListing,
    validateNGO,
    validateDonation,
    handleValidationErrors
};