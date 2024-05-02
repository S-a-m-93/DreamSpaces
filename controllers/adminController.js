const bcrypt = require('bcrypt');
const Admin = require('../models/admin_login');

exports.admin_login = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    try {
        // Find admin by email
        const admin = await Admin.findOne({ email: adminEmail });
        console.log(admin);
        if (!admin) {
            // Admin not found
            console.log('hi');
            res.render('error', {error: 'You do not have access this page' });
        }
        // Compare passwords using bcrypt
        const passwordMatch = await bcrypt.compare(adminPassword, admin.password);
        if (!passwordMatch) {
            // Incorrect password
            res.render('error', {error: 'Password incorrect' });
        }
        // Admin authenticated - Redirect to admin_dashboard.ejs
        console.log("Logged in Admin")
        res.render('admin_dashboard');
    } catch (error) {
        console.error('Admin login error:', error);
        res.render('error', {error: 'You do not have access this page' });
    }
};
