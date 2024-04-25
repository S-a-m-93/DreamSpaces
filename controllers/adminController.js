const Admin = require('../models/admin_login');
exports.admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            // Admin not found
            res.render('index');
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Compare passwords (plaintext comparison)
        if (password !== admin.password) {
            // Incorrect password
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // Admin authenticated - Redirect to admin_dashboard.ejs
        console.log("Logged in Admin")
        res.render('admin_dashboard');
    } catch (error) {
        res.render('/index')
        console.error('Admin login error:', error);
        return res.status(500).json({ message: 'Internal server error' }); 
    }
};
