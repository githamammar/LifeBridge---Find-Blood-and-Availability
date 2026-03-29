const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    established: {
        type: Number
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    website: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    services: [{
        type: String,
        enum: ['blood_donation', 'organ_donation', 'platelet_donation', 'transplant_support', 'awareness']
    }],
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    totalDonations: {
        type: Number,
        default: 0
    },
    bloodUnits: {
        type: Number,
        default: 0
    },
    organsPlaced: {
        type: Number,
        default: 0
    },
    registrationDoc: {
        type: String,
        default: ''
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

ngoSchema.index({ name: 'text', city: 'text' });

module.exports = mongoose.model('NGO', ngoSchema);