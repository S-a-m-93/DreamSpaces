const mongoose = require('mongoose');

const savePropertySchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    savedProperties: { type: [String], required: true }
});

module.exports = mongoose.model('SavedProperty', savePropertySchema);
