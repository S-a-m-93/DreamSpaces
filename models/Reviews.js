const mongoose = require('mongoose');

const review = new mongoose.Schema({
    comment_input: { type: String, required: true },
    propertyId: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Reviews', review);
