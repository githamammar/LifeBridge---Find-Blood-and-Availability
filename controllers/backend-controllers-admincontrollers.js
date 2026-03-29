const User = require('../models/User');
const Listing = require('../models/Listing');
const NGO = require('../models/NGO');
const Donation = require('../models/Donation');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized as admin' });
        }
        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        user.lastLogin = Date.now();
        await user.save();
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = {
            totalListings: await Listing.countDocuments(),
            activeListings: await Listing.countDocuments({ status: 'available' }),
            totalNGOs: await NGO.countDocuments(),
            verifiedNGOs: await NGO.countDocuments({ verified: true }),
            totalDonations: await Donation.countDocuments(),
            pendingDonations: await Donation.countDocuments({ status: 'pending' }),
            recentListings: await Listing.find().sort({ dateListed: -1 }).limit(5),
            recentDonations: await Donation.find().sort({ date: -1 }).limit(5)
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        
        const admin = new User({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });
        
        await admin.save();
        
        res.json({
            success: true,
            message: 'Admin user created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};