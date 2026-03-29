// main.js - Blood bank listings only

let currentFilters = {
    searchQuery: "",
    bloodGroup: "all",
    city: "all"
};

let isLoading = false;

function renderBloodBankCard(bank) {
    const urgencyClass = bank.units > 20 ? "high" : bank.units > 10 ? "medium" : "low";
    const urgencyText = bank.units > 20 ? "Fresh stock" : bank.units > 10 ? "Available" : "Limited stock";
    
    return `
        <div class="card" data-id="${bank.id}">
            <div class="card-badge badge-blood">🩸 BLOOD BANK</div>
            <div class="card-title">${escapeHtml(bank.title)}</div>
            <div class="card-details">
                <div class="detail-row">
                    <span class="detail-icon">🩸</span>
                    <span>Blood Group: <strong>${bank.bloodGroupReq}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="detail-icon">📍</span>
                    <span>${escapeHtml(bank.city)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-icon">📦</span>
                    <span>${bank.units} units available</span>
                    <span class="urgency-badge urgency-${urgencyClass}">${urgencyText}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-icon">📞</span>
                    <span>${escapeHtml(bank.contact)}</span>
                </div>
            </div>
            <div class="ngo-name">🏥 ${escapeHtml(bank.ngo)}</div>
            <div class="contact-buttons" style="display: flex; gap: 10px; margin-top: 16px;">
                <a href="tel:${bank.contact.replace(/[^0-9]/g, '')}" class="contact-btn call-btn" style="flex: 1; text-align: center; background: #4caf50; color: white; padding: 10px; border-radius: 8px; text-decoration: none;">
                    📞 Call Now
                </a>
                <a href="mailto:${bank.email || 'info@' + bank.ngo.replace(/ /g, '').toLowerCase() + '.org'}" class="contact-btn email-btn" style="flex: 1; text-align: center; background: #2196f3; color: white; padding: 10px; border-radius: 8px; text-decoration: none;">
                    ✉️ Email
                </a>
            </div>
            <div style="margin-top: 10px; font-size: 0.7rem; color: #999; text-align: center;">
                ⚠️ Please call to confirm availability before visiting
            </div>
        </div>
    `;
}

function loadBloodBanks() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading();
    
    try {
        let banks = window.bloodBanksData || window.listingsData || [];
        
        if (banks.length === 0) {
            console.warn('No blood bank data found');
            updateUI([]);
            return;
        }
        
        let filtered = applyFilters(banks);
        updateUI(filtered);
        
    } catch (error) {
        console.error('Error loading blood banks:', error);
        showError('Failed to load blood bank data');
        updateUI([]);
    } finally {
        isLoading = false;
        hideLoading();
    }
}

function applyFilters(data) {
    let filtered = [...data];
    const searchLower = currentFilters.searchQuery.trim().toLowerCase();
    
    if (searchLower !== "") {
        filtered = filtered.filter(item => 
            (item.title && item.title.toLowerCase().includes(searchLower)) ||
            (item.city && item.city.toLowerCase().includes(searchLower)) ||
            (item.bloodGroupReq && item.bloodGroupReq.toLowerCase().includes(searchLower)) ||
            (item.ngo && item.ngo.toLowerCase().includes(searchLower))
        );
    }
    
    if (currentFilters.bloodGroup !== "all") {
        filtered = filtered.filter(item => item.bloodGroupReq === currentFilters.bloodGroup);
    }
    
    if (currentFilters.city !== "all") {
        filtered = filtered.filter(item => item.city === currentFilters.city);
    }
    
    return filtered;
}

function updateUI(bloodBanks) {
    const container = document.getElementById("listingsContainer");
    const resultSpan = document.getElementById("resultCount");
    const count = bloodBanks.length;
    
    resultSpan.innerHTML = `${count} blood bank${count !== 1 ? 's' : ''} available`;
    
    if (count === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🩸 No blood banks found</h3>
                <p>Try adjusting your search or filters to see more results.</p>
                <button class="btn-outline" id="emptyResetBtn" style="margin-top: 16px;">Clear all filters</button>
            </div>
        `;
        const emptyReset = document.getElementById("emptyResetBtn");
        if (emptyReset) {
            emptyReset.addEventListener("click", resetAllFilters);
        }
        return;
    }
    
    let cardsHtml = "";
    bloodBanks.forEach(bank => {
        cardsHtml += renderBloodBankCard(bank);
    });
    container.innerHTML = cardsHtml;
}

function resetAllFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("bloodGroupFilter").value = "all";
    document.getElementById("cityFilter").value = "all";
    
    currentFilters = {
        searchQuery: "",
        bloodGroup: "all",
        city: "all"
    };
    loadBloodBanks();
}

function applyFiltersFromUI() {
    const searchVal = document.getElementById("searchInput").value;
    const bloodVal = document.getElementById("bloodGroupFilter").value;
    const cityVal = document.getElementById("cityFilter").value;
    
    currentFilters = {
        searchQuery: searchVal,
        bloodGroup: bloodVal,
        city: cityVal
    };
    loadBloodBanks();
}

function showLoading() {
    const container = document.getElementById("listingsContainer");
    if (container && (!container.innerHTML || container.innerHTML === '')) {
        container.innerHTML = '<div class="loading-spinner"><div class="loader"></div><p>Loading blood banks...</p></div>';
    }
}

function hideLoading() {}

function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-error';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: #f44336;
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const style = document.createElement('style');
style.textContent = `
    .loading-spinner { text-align: center; padding: 50px; }
    .loader {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #c92a2a;
        border-radius: 50%;
        margin: 0 auto 20px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .toast-error { animation: slideIn 0.3s ease; }
    .urgency-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: 600;
        margin-left: 8px;
    }
    .urgency-high { background: #e8f5e9; color: #2e7d32; }
    .urgency-medium { background: #fff3e0; color: #e67700; }
    .urgency-low { background: #ffebee; color: #c92a2a; }
    .contact-btn { transition: all 0.3s; }
    .contact-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
    loadBloodBanks();
    
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const bloodGroupFilter = document.getElementById("bloodGroupFilter");
    const cityFilter = document.getElementById("cityFilter");
    const resetBtn = document.getElementById("resetFiltersBtn");
    const fakeRegisterBtn = document.getElementById("fakeRegisterBtn");
    
    if (searchBtn) searchBtn.addEventListener("click", applyFiltersFromUI);
    if (searchInput) searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") applyFiltersFromUI();
    });
    if (bloodGroupFilter) bloodGroupFilter.addEventListener("change", applyFiltersFromUI);
    if (cityFilter) cityFilter.addEventListener("change", applyFiltersFromUI);
    if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
    
    if (fakeRegisterBtn) {
        fakeRegisterBtn.addEventListener("click", () => {
            window.location.href = 'ngo.html';
        });
    }
});