// free-map.js - Map showing blood banks with direct contact options (no request storage)

let map;
let markers = [];
let currentLocation = { lat: 28.6139, lng: 77.2090 }; // Default: Delhi
let currentBloodFilter = 'all';

// Blood bank data
const bloodBanks = [
    // Mumbai
    { name: "Red Cross Blood Bank", lat: 19.0760, lng: 72.8777, city: "Mumbai", address: "Worli, Mumbai", phone: "+91 22 2496 7788", website: "https://www.redcross.org.in", bloodStock: { "A+": 25, "O+": 30, "B+": 15, "AB+": 8, "A-": 5, "O-": 12, "B-": 3, "AB-": 2 } },
    { name: "J.J. Hospital Blood Bank", lat: 18.9667, lng: 72.8333, city: "Mumbai", address: "Byculla, Mumbai", phone: "+91 22 2373 5555", website: "", bloodStock: { "A+": 18, "O+": 22, "B+": 10, "AB+": 5, "A-": 3, "O-": 8, "B-": 2, "AB-": 1 } },
    { name: "KEM Hospital Blood Bank", lat: 19.0250, lng: 72.8667, city: "Mumbai", address: "Parel, Mumbai", phone: "+91 22 2413 6000", website: "https://www.kem.edu", bloodStock: { "A+": 30, "O+": 35, "B+": 20, "AB+": 10, "A-": 6, "O-": 15, "B-": 4, "AB-": 3 } },
    
    // Delhi
    { name: "AIIMS Blood Bank", lat: 28.5672, lng: 77.2100, city: "Delhi", address: "Ansari Nagar, New Delhi", phone: "+91 11 2659 4855", website: "https://www.aiims.edu", bloodStock: { "A+": 35, "O+": 40, "B+": 20, "AB+": 12, "A-": 8, "O-": 15, "B-": 5, "AB-": 4 } },
    { name: "Lok Nayak Hospital", lat: 28.6400, lng: 77.2300, city: "Delhi", address: "JLN Marg, New Delhi", phone: "+91 11 2323 4000", website: "", bloodStock: { "A+": 12, "O+": 18, "B+": 8, "AB+": 3, "A-": 2, "O-": 6, "B-": 1, "AB-": 1 } },
    { name: "Sir Ganga Ram Hospital", lat: 28.6340, lng: 77.2010, city: "Delhi", address: "Rajinder Nagar, New Delhi", phone: "+91 11 4225 2222", website: "https://www.sgrh.com", bloodStock: { "A+": 28, "O+": 32, "B+": 16, "AB+": 7, "A-": 4, "O-": 10, "B-": 3, "AB-": 2 } },
    
    // Bangalore
    { name: "St. John's Blood Bank", lat: 12.9352, lng: 77.6245, city: "Bangalore", address: "Koramangala, Bangalore", phone: "+91 80 2553 0000", website: "https://www.stjohns.in", bloodStock: { "A+": 28, "O+": 32, "B+": 16, "AB+": 7, "A-": 4, "O-": 10, "B-": 3, "AB-": 2 } },
    { name: "Jayadeva Hospital", lat: 12.9542, lng: 77.5972, city: "Bangalore", address: "Jayanagar, Bangalore", phone: "+91 80 2696 5000", website: "https://www.jayadevahospitals.com", bloodStock: { "A+": 22, "O+": 26, "B+": 14, "AB+": 6, "A-": 3, "O-": 9, "B-": 2, "AB-": 1 } },
    
    // Chennai
    { name: "Apollo Blood Bank", lat: 13.0389, lng: 80.2610, city: "Chennai", address: "Greams Road, Chennai", phone: "+91 44 2829 3333", website: "https://www.apollohospitals.com", bloodStock: { "A+": 22, "O+": 28, "B+": 14, "AB+": 6, "A-": 3, "O-": 9, "B-": 2, "AB-": 1 } },
    { name: "Government General Hospital", lat: 13.0827, lng: 80.2707, city: "Chennai", address: "Park Town, Chennai", phone: "+91 44 2530 5000", website: "", bloodStock: { "A+": 20, "O+": 25, "B+": 12, "AB+": 5, "A-": 3, "O-": 7, "B-": 2, "AB-": 1 } },
    
    // Kolkata
    { name: "SSKM Hospital", lat: 22.5280, lng: 88.3370, city: "Kolkata", address: "Bhowanipore, Kolkata", phone: "+91 33 2204 9000", website: "", bloodStock: { "A+": 25, "O+": 30, "B+": 15, "AB+": 8, "A-": 4, "O-": 11, "B-": 3, "AB-": 2 } },
    
    // Hyderabad
    { name: "Nizam's Institute", lat: 17.4140, lng: 78.4495, city: "Hyderabad", address: "Punjagutta, Hyderabad", phone: "+91 40 2348 5000", website: "https://www.nims.edu", bloodStock: { "A+": 30, "O+": 35, "B+": 18, "AB+": 8, "A-": 5, "O-": 11, "B-": 3, "AB-": 2 } },
    
    // Pune
    { name: "Ruby Hall Blood Bank", lat: 18.5364, lng: 73.8674, city: "Pune", address: "Sassoon Road, Pune", phone: "+91 20 2645 1000", website: "https://www.rubyhall.com", bloodStock: { "A+": 20, "O+": 25, "B+": 12, "AB+": 5, "A-": 3, "O-": 7, "B-": 2, "AB-": 1 } },
    
    // Ahmedabad
    { name: "Civil Hospital", lat: 23.0500, lng: 72.6200, city: "Ahmedabad", address: "Asarwa, Ahmedabad", phone: "+91 79 2268 1000", website: "", bloodStock: { "A+": 18, "O+": 22, "B+": 10, "AB+": 4, "A-": 2, "O-": 6, "B-": 1, "AB-": 1 } }
];

// City coordinates for searching
const cityCoordinates = {
    "mumbai": { lat: 19.0760, lng: 72.8777 },
    "delhi": { lat: 28.6139, lng: 77.2090 },
    "bangalore": { lat: 12.9716, lng: 77.5946 },
    "chennai": { lat: 13.0827, lng: 80.2707 },
    "kolkata": { lat: 22.5726, lng: 88.3639 },
    "hyderabad": { lat: 17.3850, lng: 78.4867 },
    "pune": { lat: 18.5204, lng: 73.8567 },
    "ahmedabad": { lat: 23.0225, lng: 72.5714 }
};

// Initialize map
function initMap() {
    map = L.map('freeMap').setView([currentLocation.lat, currentLocation.lng], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    L.control.scale().addTo(map);
    loadBloodBanks();
    setupSearch();
}

// Load blood banks on map
function loadBloodBanks() {
    bloodBanks.forEach((bank, index) => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '🩸',
            iconSize: [30, 30],
            popupAnchor: [0, -15]
        });
        
        const marker = L.marker([bank.lat, bank.lng], { icon: customIcon }).addTo(map);
        
        // Create popup content with contact buttons (no request form)
        const stockHtml = Object.entries(bank.bloodStock)
            .filter(([_, units]) => units > 0)
            .map(([group, units]) => `<span class="blood-group available" style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:20px;font-size:0.7rem;margin:2px;">${group}: ${units}</span>`)
            .join('');
        
        const popupContent = `
            <div style="padding: 10px; max-width: 280px;">
                <h4 style="margin: 0 0 8px 0; color: #c92a2a;">${bank.name}</h4>
                <p style="margin: 5px 0; font-size: 0.85rem;">📍 ${bank.address}</p>
                <div style="margin: 10px 0;">
                    <strong>Available Blood:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
                        ${stockHtml}
                    </div>
                </div>
                <div class="contact-buttons" style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
                    <a href="tel:${bank.phone}" class="contact-btn call-btn" style="display: inline-flex; align-items: center; gap: 5px; padding: 8px 12px; background: #4caf50; color: white; text-decoration: none; border-radius: 20px; font-size: 0.75rem;">
                        📞 Call Now
                    </a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${bank.lat},${bank.lng}" target="_blank" class="contact-btn directions-btn" style="display: inline-flex; align-items: center; gap: 5px; padding: 8px 12px; background: #2196f3; color: white; text-decoration: none; border-radius: 20px; font-size: 0.75rem;">
                        🗺️ Get Directions
                    </a>
                    ${bank.website ? `<a href="${bank.website}" target="_blank" class="contact-btn website-btn" style="display: inline-flex; align-items: center; gap: 5px; padding: 8px 12px; background: #ff9800; color: white; text-decoration: none; border-radius: 20px; font-size: 0.75rem;">
                        🌐 Website
                    </a>` : ''}
                </div>
                <p style="margin: 10px 0 0 0; font-size: 0.7rem; color: #666; text-align: center;">
                    ⚠️ Please call to confirm availability before visiting
                </p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
            highlightBloodBank(index);
        });
        
        markers.push({ marker, bank, index });
    });
    
    updateBloodBanksList();
}

// Update blood banks list
function updateBloodBanksList() {
    const container = document.getElementById('bloodBanksList');
    
    let filteredBanks = bloodBanks;
    if (currentBloodFilter !== 'all') {
        filteredBanks = bloodBanks.filter(bank => 
            bank.bloodStock[currentBloodFilter] > 0
        );
    }
    
    filteredBanks = filteredBanks.map(bank => ({
        ...bank,
        distance: calculateDistance(currentLocation.lat, currentLocation.lng, bank.lat, bank.lng)
    })).sort((a, b) => a.distance - b.distance);
    
    if (filteredBanks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c878c;">No blood banks found with selected blood type</p>';
        return;
    }
    
    container.innerHTML = filteredBanks.map((bank, idx) => {
        const stockHtml = Object.entries(bank.bloodStock)
            .filter(([_, units]) => units > 0)
            .slice(0, 4)
            .map(([group, units]) => `<span class="blood-group available">${group}: ${units}</span>`)
            .join('');
        
        const originalIndex = bloodBanks.findIndex(b => b.name === bank.name);
        
        return `
            <div class="blood-bank-item" onclick="focusOnBank(${originalIndex})">
                <div class="blood-bank-name">
                    ${bank.name}
                    <span class="distance-badge">${bank.distance.toFixed(1)} km</span>
                </div>
                <div class="blood-bank-address">📍 ${bank.address}</div>
                <div class="blood-stock">${stockHtml}</div>
                <div class="contact-buttons" style="display: flex; gap: 8px; margin-top: 10px;">
                    <a href="tel:${bank.phone}" class="contact-btn call-btn" style="display: inline-flex; align-items: center; gap: 3px; padding: 4px 10px; background: #4caf50; color: white; text-decoration: none; border-radius: 20px; font-size: 0.7rem;">
                        📞 Call
                    </a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${bank.lat},${bank.lng}" target="_blank" class="contact-btn directions-btn" style="display: inline-flex; align-items: center; gap: 3px; padding: 4px 10px; background: #2196f3; color: white; text-decoration: none; border-radius: 20px; font-size: 0.7rem;">
                        🗺️ Directions
                    </a>
                </div>
                ${bank.bloodStock[currentBloodFilter] > 0 && currentBloodFilter !== 'all' ? 
                    `<div style="margin-top: 8px; color: #2e7d32; font-size: 0.7rem;">✓ ${currentBloodFilter} available</div>` : ''}
            </div>
        `;
    }).join('');
}

// Calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Focus on specific bank
function focusOnBank(index) {
    const bank = bloodBanks[index];
    map.setView([bank.lat, bank.lng], 15);
    markers[index].marker.openPopup();
    highlightBloodBank(index);
}

// Highlight selected bank
function highlightBloodBank(index) {
    const items = document.querySelectorAll('.blood-bank-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            item.classList.remove('selected');
        }
    });
}

// Get user location
function getUserLocation() {
    if (navigator.geolocation) {
        showLoading();
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                map.setView([currentLocation.lat, currentLocation.lng], 13);
                
                const userIcon = L.divIcon({
                    className: 'user-marker',
                    html: '📍',
                    iconSize: [30, 30]
                });
                
                L.marker([currentLocation.lat, currentLocation.lng], { icon: userIcon })
                    .addTo(map)
                    .bindPopup('You are here!')
                    .openPopup();
                
                updateBloodBanksList();
                hideLoading();
                showNotification('Location found! Showing blood banks near you.', 'success');
            },
            (error) => {
                hideLoading();
                showNotification('Unable to get your location. Showing default location.', 'error');
            }
        );
    } else {
        showNotification('Geolocation is not supported by your browser.', 'error');
    }
}

// Setup city search
function setupSearch() {
    const searchInput = document.getElementById('searchLocation');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.toLowerCase().trim();
            if (cityCoordinates[city]) {
                const coords = cityCoordinates[city];
                currentLocation = coords;
                map.setView([coords.lat, coords.lng], 12);
                updateBloodBanksList();
                showNotification(`Showing blood banks in ${city}`, 'success');
            } else {
                showNotification('City not found. Try: Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad', 'error');
            }
        }
    });
}

// Setup blood type filters
function setupFilters() {
    const filters = document.querySelectorAll('.filter-chip');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            currentBloodFilter = filter.getAttribute('data-blood');
            updateBloodBanksList();
        });
    });
}

// Helper functions
function showLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    overlay.innerHTML = '<div style="background: white; padding: 20px; border-radius: 16px;">Getting your location...</div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}

function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add styles
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: #c92a2a;
        border-radius: 50%;
        border: 2px solid white;
        text-align: center;
        line-height: 26px;
        font-size: 16px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s;
    }
    .custom-marker:hover {
        transform: scale(1.1);
    }
    .user-marker {
        background: #2196f3;
        border-radius: 50%;
        border: 2px solid white;
        text-align: center;
        line-height: 26px;
        font-size: 16px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupFilters();
    
    const locationBtn = document.getElementById('getLocationBtn');
    if (locationBtn) locationBtn.addEventListener('click', getUserLocation);
    
    const fakeRegisterBtn = document.getElementById('fakeRegisterBtn');
    if (fakeRegisterBtn) {
        fakeRegisterBtn.addEventListener('click', () => {
            window.location.href = 'ngo.html';
        });
    }
});

// Make functions global
window.focusOnBank = focusOnBank;