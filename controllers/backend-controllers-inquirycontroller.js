const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        
        res.status(201).json({
            success: true,
            data: inquiry,
            message: 'Inquiry sent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const filter = {};
        
        if (req.user.role === 'ngo_admin') {
            filter.ngoId = req.user.ngoId;
        }
        
        const inquiries = await Inquiry.find(filter)
            .sort({ date: -1 });
        
        res.json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.respondInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        
        inquiry.response = req.body.response;
        inquiry.status = 'responded';
        inquiry.respondedAt = Date.now();
        await inquiry.save();
        
        res.json({
            success: true,
            data: inquiry,
            message: 'Response sent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};