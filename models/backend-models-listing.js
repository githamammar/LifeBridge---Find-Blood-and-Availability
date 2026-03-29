const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['organ', 'blood']
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    bloodGroupReq: {
        type: String,
        default: 'N/A'
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    ngo: {
        type: String,
        required: true
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO'
    },
    contact: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        default: 'Available'
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'completed', 'expired'],
        default: 'available'
    },
    dateListed: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

listingSchema.index({ title: 'text', city: 'text', ngo: 'text' });

module.exports = mongoose.model('Listing', listingSchema);