const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    fromEmail: {
        type: String,
        required: true
    },
    toEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
