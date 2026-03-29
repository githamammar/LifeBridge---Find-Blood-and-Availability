const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('./models/Listing');
const NGO = require('./models/NGO');
const User = require('./models/User');

dotenv.config();

const listingsData = [
    {
        type: "organ",
        title: "Kidney (Donor match available)",
        bloodGroupReq: "O+",
        city: "Mumbai",
        ngo: "GiftOfLife Foundation",
        contact: "+91 98765 43210",
        expiry: "Urgent - 5 days",
        status: "available"
    },
    {
        type: "organ",
        title: "Liver (Deceased donor)",
        bloodGroupReq: "A+",
        city: "Delhi",
        ngo: "Transplant India Trust",
        contact: "+91 11 4567 8901",
        expiry: "Available now",
        status: "available"
    },
    {
        type: "blood",
        title: "Blood Bag - A+ (3 units)",
        bloodGroupReq: "A+",
        city: "Pune",
        ngo: "Pune Blood Bank",
        contact: "+91 20 2660 1234",
        expiry: "Expires in 12 days",
        status: "available"
    },
    {
        type: "blood",
        title: "Blood Bag - O- (2 units, universal)",
        bloodGroupReq: "O-",
        city: "Mumbai",
        ngo: "Red Cross Mumbai",
        contact: "+91 22 2496 7788",
        expiry: "Ready for pickup",
        status: "available"
    }
];

const ngosData = [
    {
        name: "GiftOfLife Foundation",
        registrationNumber: "NGO-2015-001",
        city: "Mumbai",
        address: "Andheri East, Mumbai",
        phone: "+91 98765 43210",
        email: "contact@giftoflife.org",
        verified: true,
        status: "approved"
    },
    {
        name: "Transplant India Trust",
        registrationNumber: "NGO-2010-002",
        city: "Delhi",
        address: "South Extension, New Delhi",
        phone: "+91 11 4567 8901",
        email: "info@transplantindia.org",
        verified: true,
        status: "approved"
    },
    {
        name: "Pune Blood Bank",
        registrationNumber: "NGO-2008-003",
        city: "Pune",
        address: "Koregaon Park, Pune",
        phone: "+91 20 2660 1234",
        email: "pune@bloodbank.org",
        verified: true,
        status: "approved"
    },
    {
        name: "Red Cross Mumbai",
        registrationNumber: "NGO-1920-004",
        city: "Mumbai",
        address: "Worli, Mumbai",
        phone: "+91 22 2496 7788",
        email: "mumbai@redcross.org",
        verified: true,
        status: "approved"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Listing.deleteMany({});
        await NGO.deleteMany({});
        
        // Insert new data
        await Listing.insertMany(listingsData);
        await NGO.insertMany(ngosData);
        
        console.log('✅ Database seeded successfully!');
        console.log(`📊 Added ${listingsData.length} listings`);
        console.log(`📊 Added ${ngosData.length} NGOs`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();