const User = require('../models/Signup');
const Report = require('../models/report');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');


exports.renderAdminDashboard = async (req, res) => {
    try {
        // Fetch all users and reports from the database
        const users = await User.find({});
        const reports = await Report.find({});

        // Fetch property listings based on request parameters
        const { city, property_type, ad_type } = req.body;
        let property = [];

        switch (property_type) {
            case 'residential':
                if (ad_type === 'rent') {
                    property = await res_rent.find({ city: city });
                } else if (ad_type === 'buy') {
                    property = await res_buy.find({ city: city });
                } else if (ad_type === 'flatmates') {
                    property = await res_flat.find({ city: city });
                }
                break;
            case 'commercial':
                if (ad_type === 'rent') {
                    property = await com_rent.find({ city: city });
                } else if (ad_type === 'buy') {
                    property = await com_buy.find({ city: city });
                }
                break;
            case 'land':
                if (ad_type === 'buy') {
                    property = await land_buy.find({ city: city });
                } else if (ad_type === 'development') {
                    property = await land_dev.find({ city: city });
                }
                break;
            default:
                break;
        }

        const len = property.length;
        const owner = [];
        for (let i = 0; i < len; i++) {
            owner[i] = await User.findOne({ _id: property[i].ownerId });
        }

        // Render the admin dashboard view with users, reports, and property data
        res.render('admin_dashboard', { users: users, reports: reports, property: property, len: len, owner: owner });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Controller function to delete a user
// exports.deleteUser = async (req, res) => {
//     const userId = req.params.userId; // Extract userId from URL parameter

//     try {
//         // Find the user by _id and delete from the database
//         const deletedUser = await User.findByIdAndDelete(userId);

//         if (!deletedUser) {
//             // User not found, send 404 Not Found response
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // User deleted successfully, send 200 OK response
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         // Handle server error (e.g., database error)
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
