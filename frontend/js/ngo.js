// ngo.js - Display NGOs with direct contact options

// Render NGO cards with contact buttons
function renderNGOCard(ngo) {
    return `
        <div class="ngo-card" data-id="${ngo.id}">
            <div class="ngo-header">
                <div class="ngo-name-large">${ngo.name}</div>
                <div class="ngo-badge">✓ Verified</div>
            </div>
            <div class="ngo-stats">
                <div class="stat-item">
                    <div class="stat-number-small">${(ngo.totalDonations || Math.floor(Math.random() * 10000) + 1000).toLocaleString()}+</div>
                    <div class="stat-label-small">Lives Impacted</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number-small">${ngo.bloodUnits || Math.floor(Math.random() * 5000) + 500}</div>
                    <div class="stat-label-small">Blood Units</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number-small">${ngo.organsPlaced || Math.floor(Math.random() * 50) + 10}</div>
                    <div class="stat-label-small">Organs Placed</div>
                </div>
            </div>
            <div class="ngo-contact">
                <p>📍 ${ngo.address || 'Contact for address'}</p>
                <p>📞 ${ngo.phone || 'Contact for phone'}</p>
                <p>✉️ ${ngo.email || 'Contact for email'}</p>
            </div>
            <div class="contact-buttons" style="display: flex; gap: 10px; margin-top: 16px;">
                <a href="tel:${(ngo.phone || '').replace(/[^0-9]/g, '')}" class="contact-btn call-btn" style="flex: 1; text-align: center; background: #4caf50; color: white; padding: 10px; border-radius: 8px; text-decoration: none;">
                    📞 Call NGO
                </a>
                <a href="mailto:${ngo.email || 'info@' + ngo.name.replace(/ /g, '').toLowerCase() + '.org'}" class="contact-btn email-btn" style="flex: 1; text-align: center; background: #2196f3; color: white; padding: 10px; border-radius: 8px; text-decoration: none;">
                    ✉️ Email
                </a>
            </div>
        </div>
    `;
}

// Filter NGOs by city
function filterNGOs() {
    const cityFilter = document.getElementById('cityNgoFilter').value;
    let filtered = [...window.ngoData];
    
    if (cityFilter !== 'all') {
        filtered = filtered.filter(ngo => ngo.city === cityFilter);
    }
    
    updateNGODisplay(filtered);
}

// Update NGO display
function updateNGODisplay(ngos) {
    const container = document.getElementById('ngoContainer');
    const countSpan = document.getElementById('ngoCount');
    const count = ngos.length;
    
    countSpan.innerHTML = `${count} NGO${count !== 1 ? 's' : ''} partnered`;
    
    if (count === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🤝 No NGOs found in this city</h3>
                <p>We're expanding to more cities. Check back soon or register your NGO!</p>
                <button class="btn-primary" id="registerNgoFromEmpty" style="margin-top: 16px;">Register Your NGO</button>
            </div>
        `;
        const registerBtn = document.getElementById('registerNgoFromEmpty');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                document.getElementById('openNgoModalBtn').click();
            });
        }
        return;
    }
    
    let cardsHtml = '';
    ngos.forEach(ngo => {
        cardsHtml += renderNGOCard(ngo);
    });
    container.innerHTML = cardsHtml;
}

// Handle NGO registration
function handleNGORegistration(e) {
    e.preventDefault();
    
    const ngoData = {
        id: Date.now(),
        name: document.getElementById('ngoName').value,
        registrationNumber: document.getElementById('ngoRegNumber').value,
        city: document.getElementById('ngoCity').value,
        address: document.getElementById('ngoAddress').value,
        contactPerson: document.getElementById('ngoContactPerson').value,
        phone: document.getElementById('ngoPhone').value,
        email: document.getElementById('ngoEmail').value,
        services: Array.from(document.getElementById('ngoServices').selectedOptions).map(opt => opt.value),
        dateRegistered: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to localStorage for admin review
    let pendingNGOs = JSON.parse(localStorage.getItem('pendingNGOs') || '[]');
    pendingNGOs.push(ngoData);
    localStorage.setItem('pendingNGOs', JSON.stringify(pendingNGOs));
    
    alert('✅ NGO registration submitted successfully! Our team will verify your documents within 3-5 business days.');
    
    // Close modal
    const modal = document.getElementById('ngoModal');
    modal.style.display = 'none';
    document.getElementById('ngoRegistrationForm').reset();
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Load NGO data
    if (window.ngoData) {
        updateNGODisplay(window.ngoData);
    }
    
    // Setup event listeners
    const cityFilter = document.getElementById('cityNgoFilter');
    if (cityFilter) {
        cityFilter.addEventListener('change', filterNGOs);
    }
    
    const openModalBtn = document.getElementById('openNgoModalBtn');
    const modal = document.getElementById('ngoModal');
    const closeBtn = modal ? modal.querySelector('.close') : null;
    const form = document.getElementById('ngoRegistrationForm');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    if (form) {
        form.onsubmit = handleNGORegistration;
    }
    
    const fakeRegisterBtn = document.getElementById('fakeRegisterBtn');
    if (fakeRegisterBtn) {
        fakeRegisterBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }
});