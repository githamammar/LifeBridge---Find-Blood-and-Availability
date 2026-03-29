// Mock dataset for organs and blood listings
const listingsData = [
    // ORGAN listings
    { id: 1, type: "organ", title: "Kidney (Donor match available)", bloodGroupReq: "O+", city: "Mumbai", ngo: "GiftOfLife Foundation", contact: "+91 98765 43210", expiry: "Urgent - 5 days", dateListed: "2025-03-20" },
    { id: 2, type: "organ", title: "Liver (Deceased donor)", bloodGroupReq: "A+", city: "Delhi", ngo: "Transplant India Trust", contact: "+91 11 4567 8901", expiry: "Available now", dateListed: "2025-03-22" },
    { id: 3, type: "organ", title: "Heart (Urgent listing)", bloodGroupReq: "AB+", city: "Bangalore", ngo: "Bangalore Heart Alliance", contact: "+91 80 2211 3344", expiry: "Critical timeline", dateListed: "2025-03-21" },
    { id: 4, type: "organ", title: "Pancreas (Compatible B+ needed)", bloodGroupReq: "B+", city: "Chennai", ngo: "Chennai Organ Share", contact: "+91 44 4321 9876", expiry: "2 weeks", dateListed: "2025-03-19" },
    { id: 5, type: "organ", title: "Lungs (Double lobe)", bloodGroupReq: "O-", city: "Kolkata", ngo: "Eastern Lifeline", contact: "+91 33 2456 7890", expiry: "Available", dateListed: "2025-03-18" },
    // BLOOD listings
    { id: 6, type: "blood", title: "Blood Bag - A+ (3 units)", bloodGroupReq: "A+", city: "Pune", ngo: "Pune Blood Bank", contact: "+91 20 2660 1234", expiry: "Expires in 12 days", dateListed: "2025-03-23" },
    { id: 7, type: "blood", title: "Blood Bag - O- (2 units, universal)", bloodGroupReq: "O-", city: "Mumbai", ngo: "Red Cross Mumbai", contact: "+91 22 2496 7788", expiry: "Ready for pickup", dateListed: "2025-03-24" },
    { id: 8, type: "blood", title: "Platelets & Plasma - B+ (4 units)", bloodGroupReq: "B+", city: "Hyderabad", ngo: "Hyderabad Lifeline", contact: "+91 40 3456 1234", expiry: "Fresh stock", dateListed: "2025-03-22" },
    { id: 9, type: "blood", title: "Blood Bag - AB- (Rare)", bloodGroupReq: "AB-", city: "Ahmedabad", ngo: "Ahmedabad Blood Hub", contact: "+91 79 2678 9900", expiry: "Limited stock", dateListed: "2025-03-21" },
    { id: 10, type: "blood", title: "Blood Bag - O+ (10 units)", bloodGroupReq: "O+", city: "Delhi", ngo: "Delhi Blood Connect", contact: "+91 11 4900 1122", expiry: "High availability", dateListed: "2025-03-20" },
    { id: 11, type: "organ", title: "Cornea (Eyesight restoration)", bloodGroupReq: "N/A", city: "Bangalore", ngo: "Sight Savers Forum", contact: "+91 80 4123 6789", expiry: "Immediate need", dateListed: "2025-03-23" },
    { id: 12, type: "blood", title: "Blood Bag - A- (1 unit)", bloodGroupReq: "A-", city: "Chennai", ngo: "Chennai Voluntary Blood", contact: "+91 44 2815 7766", expiry: "Expires soon", dateListed: "2025-03-19" }
];

// Mock NGO data
const ngoData = [
    { id: 1, name: "GiftOfLife Foundation", city: "Mumbai", established: 2015, verified: true, totalDonations: 12450, bloodUnits: 8450, organsPlaced: 125, phone: "+91 98765 43210", email: "contact@giftoflife.org", address: "Andheri East, Mumbai" },
    { id: 2, name: "Transplant India Trust", city: "Delhi", established: 2010, verified: true, totalDonations: 28750, bloodUnits: 15200, organsPlaced: 342, phone: "+91 11 4567 8901", email: "info@transplantindia.org", address: "South Extension, New Delhi" },
    { id: 3, name: "Bangalore Heart Alliance", city: "Bangalore", established: 2018, verified: true, totalDonations: 8900, bloodUnits: 4200, organsPlaced: 98, phone: "+91 80 2211 3344", email: "help@bha.org", address: "Indiranagar, Bangalore" },
    { id: 4, name: "Chennai Organ Share", city: "Chennai", established: 2012, verified: true, totalDonations: 15670, bloodUnits: 9800, organsPlaced: 187, phone: "+91 44 4321 9876", email: "chennai@organshare.org", address: "Adyar, Chennai" },
    { id: 5, name: "Eastern Lifeline", city: "Kolkata", established: 2014, verified: true, totalDonations: 11230, bloodUnits: 7650, organsPlaced: 89, phone: "+91 33 2456 7890", email: "east@lifeline.org", address: "Salt Lake City, Kolkata" },
    { id: 6, name: "Pune Blood Bank", city: "Pune", established: 2008, verified: true, totalDonations: 23450, bloodUnits: 19800, organsPlaced: 0, phone: "+91 20 2660 1234", email: "pune@bloodbank.org", address: "Koregaon Park, Pune" },
    { id: 7, name: "Red Cross Mumbai", city: "Mumbai", established: 1920, verified: true, totalDonations: 98760, bloodUnits: 87650, organsPlaced: 234, phone: "+91 22 2496 7788", email: "mumbai@redcross.org", address: "Worli, Mumbai" },
    { id: 8, name: "Hyderabad Lifeline", city: "Hyderabad", established: 2016, verified: true, totalDonations: 6780, bloodUnits: 5430, organsPlaced: 45, phone: "+91 40 3456 1234", email: "hyd@lifeline.org", address: "Banjara Hills, Hyderabad" },
    { id: 9, name: "Ahmedabad Blood Hub", city: "Ahmedabad", established: 2017, verified: true, totalDonations: 5430, bloodUnits: 4980, organsPlaced: 12, phone: "+91 79 2678 9900", email: "ahmedabad@bloodhub.org", address: "Navrangpura, Ahmedabad" },
    { id: 10, name: "Delhi Blood Connect", city: "Delhi", established: 2015, verified: true, totalDonations: 18760, bloodUnits: 16540, organsPlaced: 56, phone: "+91 11 4900 1122", email: "delhi@bloodconnect.org", address: "Connaught Place, New Delhi" },
    { id: 11, name: "Sight Savers Forum", city: "Bangalore", established: 2013, verified: true, totalDonations: 4560, bloodUnits: 0, organsPlaced: 234, phone: "+91 80 4123 6789", email: "blore@sightsavers.org", address: "Whitefield, Bangalore" },
    { id: 12, name: "Chennai Voluntary Blood", city: "Chennai", established: 2011, verified: true, totalDonations: 12430, bloodUnits: 11200, organsPlaced: 32, phone: "+91 44 2815 7766", email: "chennaiblood@voluntary.org", address: "T Nagar, Chennai" }
];