const NGO = require('../models/NGO');
const User = require('../models/User');

exports.getNGOs = async (req, res) => {
    try {
        const { city, verified, status } = req.query;
        const filter = {};
        
        if (city && city !== 'all') filter.city = city;
        if (verified === 'true') filter.verified = true;
        if (status) filter.status = status;
        
        const ngos = await NGO.find(filter)
            .sort({ name: 1 });
        
        res.json({
            success: true,
            count: ngos.length,
            data: ngos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getNGO = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);
        
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        
        res.json({
            success: true,
            data: ngo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.registerNGO = async (req, res) => {
    try {
        const ngoData = req.body;
        
        const existingNGO = await NGO.findOne({
            $or: [
                { name: ngoData.name },
                { registrationNumber: ngoData.registrationNumber }
            ]
        });
        
        if (existingNGO) {
            return res.status(400).json({ message: 'NGO already registered' });
        }
        
        const ngo = new NGO(ngoData);
        await ngo.save();
        
        res.status(201).json({
            success: true,
            data: ngo,
            message: 'NGO registration submitted successfully. Awaiting verification.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateNGO = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);
        
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        
        if (req.user.role !== 'admin' && req.user.ngoId?.toString() !== req.params.id) {
            return res.status(403).json({ message: 'Not authorized to update this NGO' });
        }
        
        const updatedNGO = await NGO.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.json({
            success: true,
            data: updatedNGO
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.verifyNGO = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id);
        
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        
        ngo.verified = true;
        ngo.status = 'approved';
        ngo.verifiedAt = Date.now();
        await ngo.save();
        
        res.json({
            success: true,
            data: ngo,
            message: 'NGO verified successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getNGOStats = async (req, res) => {
    try {
        const totalNGOs = await NGO.countDocuments();
        const verifiedNGOs = await NGO.countDocuments({ verified: true });
        const pendingNGOs = await NGO.countDocuments({ status: 'pending' });
        
        res.json({
            success: true,
            data: {
                total: totalNGOs,
                verified: verifiedNGOs,
                pending: pendingNGOs
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};