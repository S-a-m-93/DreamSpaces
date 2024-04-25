// models/propertyReport.js

const mongoose = require('mongoose');

// Define the schema for PropertyReport
const propertyReportSchema = new mongoose.Schema({
    issue: {
        type: String,
        required: true
    },
    reportedBy: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
});

// Create and export the PropertyReport model
const PropertyReport = mongoose.model('PropertyReport', propertyReportSchema);

module.exports = PropertyReport;
