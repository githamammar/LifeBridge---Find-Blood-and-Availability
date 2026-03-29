const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'LifeBridge API is running!',
        version: '1.0.0',
        status: 'online'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API endpoints (mock data for now)
app.get('/api/listings', (req, res) => {
    // Return mock listings data
    const mockListings = [
        { id: 1, type: "organ", title: "Kidney (Donor match available)", bloodGroupReq: "O+", city: "Mumbai", ngo: "GiftOfLife Foundation", contact: "+91 98765 43210", expiry: "Urgent - 5 days", status: "available" },
        { id: 2, type: "organ", title: "Liver (Deceased donor)", bloodGroupReq: "A+", city: "Delhi", ngo: "Transplant India Trust", contact: "+91 11 4567 8901", expiry: "Available now", status: "available" },
        { id: 3, type: "blood", title: "Blood Bag - A+ (3 units)", bloodGroupReq: "A+", city: "Pune", ngo: "Pune Blood Bank", contact: "+91 20 2660 1234", expiry: "Expires in 12 days", status: "available" },
        { id: 4, type: "blood", title: "Blood Bag - O- (2 units)", bloodGroupReq: "O-", city: "Mumbai", ngo: "Red Cross Mumbai", contact: "+91 22 2496 7788", expiry: "Ready for pickup", status: "available" }
    ];
    
    res.json({
        success: true,
        count: mockListings.length,
        data: mockListings
    });
});

app.get('/api/ngos', (req, res) => {
    const mockNGOs = [
        { id: 1, name: "GiftOfLife Foundation", city: "Mumbai", verified: true, phone: "+91 98765 43210", email: "contact@giftoflife.org" },
        { id: 2, name: "Transplant India Trust", city: "Delhi", verified: true, phone: "+91 11 4567 8901", email: "info@transplantindia.org" },
        { id: 3, name: "Pune Blood Bank", city: "Pune", verified: true, phone: "+91 20 2660 1234", email: "pune@bloodbank.org" }
    ];
    
    res.json({
        success: true,
        count: mockNGOs.length,
        data: mockNGOs
    });
});

// POST endpoint for donations
app.post('/api/donations', (req, res) => {
    console.log('Donation received:', req.body);
    res.json({
        success: true,
        message: 'Donation registered successfully',
        data: req.body
    });
});

// POST endpoint for inquiries
app.post('/api/inquiries', (req, res) => {
    console.log('Inquiry received:', req.body);
    res.json({
        success: true,
        message: 'Inquiry sent successfully',
        data: req.body
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: `Route ${req.url} not found` 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`\n✅ Available endpoints:`);
    console.log(`   GET  /           - API info`);
    console.log(`   GET  /health     - Health check`);
    console.log(`   GET  /api/listings - Get all listings`);
    console.log(`   GET  /api/ngos   - Get all NGOs`);
    console.log(`   POST /api/donations - Submit donation`);
    console.log(`   POST /api/inquiries - Submit inquiry`);
    console.log(`\n💡 Press Ctrl+C to stop the server\n`);
});
