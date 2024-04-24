// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving to database
adminSchema.pre('save', async function(next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(admin.password, 10); // Use bcrypt to hash the password
    admin.password = hash;
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
