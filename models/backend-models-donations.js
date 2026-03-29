const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['blood', 'organ', 'platelets']
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
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
    preferredDate: {
        type: Date
    },
    medicalHistory: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed', 'cancelled'],
        default: 'pending'
    },
    scheduledDate: {
        type: Date
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO'
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);