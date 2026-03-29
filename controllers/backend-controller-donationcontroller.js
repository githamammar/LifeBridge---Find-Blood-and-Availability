const Donation = require('../models/Donation');

exports.createDonation = async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        
        res.status(201).json({
            success: true,
            data: donation,
            message: 'Donation registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const { status, type, ngoId } = req.query;
        const filter = {};
        
        if (status) filter.status = status;
        if (type) filter.type = type;
        if (ngoId) filter.ngoId = ngoId;
        
        const donations = await Donation.find(filter)
            .sort({ date: -1 })
            .limit(100);
        
        res.json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ email: req.user.email })
            .sort({ date: -1 });
        
        res.json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        
        donation.status = req.body.status;
        if (req.body.scheduledDate) {
            donation.scheduledDate = req.body.scheduledDate;
        }
        if (req.body.notes) {
            donation.notes = req.body.notes;
        }
        
        await donation.save();
        
        res.json({
            success: true,
            data: donation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};