// controllers/adminController.js
const Admin = require('../models/admin_login');
const bcrypt = require('bcrypt');

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            // Admin not found
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            // Incorrect password
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Admin authenticated - Redirect to admin_dashboard.ejs
        res.render('admin_dashboard');
    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
