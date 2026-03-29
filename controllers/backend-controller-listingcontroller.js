const Listing = require('../models/Listing');

exports.getListings = async (req, res) => {
    try {
        const { type, city, bloodGroupReq, status, search } = req.query;
        const filter = {};
        
        if (type && type !== 'all') filter.type = type;
        if (city && city !== 'all') filter.city = city;
        if (bloodGroupReq && bloodGroupReq !== 'all') filter.bloodGroupReq = bloodGroupReq;
        if (status && status !== 'all') filter.status = status;
        
        if (search) {
            filter.$text = { $search: search };
        }
        
        const listings = await Listing.find(filter)
            .sort({ dateListed: -1 })
            .limit(100);
        
        res.json({
            success: true,
            count: listings.length,
            data: listings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        res.json({
            success: true,
            data: listing
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createListing = async (req, res) => {
    try {
        const listing = new Listing({
            ...req.body,
            ngoId: req.user?.ngoId || null
        });
        
        await listing.save();
        
        res.status(201).json({
            success: true,
            data: listing
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        if (req.user.role !== 'admin' && listing.ngoId?.toString() !== req.user.ngoId?.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this listing' });
        }
        
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastUpdated: Date.now() },
            { new: true, runValidators: true }
        );
        
        res.json({
            success: true,
            data: updatedListing
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        if (req.user.role !== 'admin' && listing.ngoId?.toString() !== req.user.ngoId?.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this listing' });
        }
        
        await listing.deleteOne();
        
        res.json({
            success: true,
            message: 'Listing deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getListingsByNGO = async (req, res) => {
    try {
        const listings = await Listing.find({ ngoId: req.params.ngoId })
            .sort({ dateListed: -1 });
        
        res.json({
            success: true,
            count: listings.length,
            data: listings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};