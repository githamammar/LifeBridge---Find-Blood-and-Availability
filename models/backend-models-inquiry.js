const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NGO',
        required: true
    },
    ngoName: {
        type: String,
        required: true
    },
    name: {
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
    message: {
        type: String,
        required: true
    },
    contactMethod: {
        type: String,
        enum: ['phone', 'email', 'whatsapp'],
        default: 'email'
    },
    inquiryType: {
        type: String,
        enum: ['donation', 'receive', 'partnership', 'general'],
        default: 'general'
    },
    status: {
        type: String,
        enum: ['new', 'read', 'responded', 'closed'],
        default: 'new'
    },
    response: {
        type: String
    },
    respondedAt: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);