// admin.js - Admin dashboard functionality

// Load all data from localStorage
function loadAdminData() {
    // Load inquiries (donation requests)
    let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    
    // Load donations (donor registrations)
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    
    // Load pending NGOs
    let pendingNGOs = JSON.parse(localStorage.getItem('pendingNGOs') || '[]');
    
    // Update stats
    updateStats(inquiries, donations, pendingNGOs);
    
    // Render tables
    renderInquiriesTable(inquiries);
    renderDonationsTable(donations);
    renderNGOsTable(pendingNGOs);
}

// Update statistics cards
function updateStats(inquiries, donations, pendingNGOs) {
    const totalRequests = inquiries.length;
    const pendingRequests = inquiries.filter(i => i.status === 'pending' || !i.status).length;
    const approvedRequests = inquiries.filter(i => i.status === 'approved').length;
    const completedRequests = inquiries.filter(i => i.status === 'completed').length;
    
    document.getElementById('totalRequests').textContent = totalRequests;
    document.getElementById('pendingRequests').textContent = pendingRequests;
    document.getElementById('approvedRequests').textContent = approvedRequests;
    document.getElementById('completedRequests').textContent = completedRequests;
}

// Render inquiries table
function renderInquiriesTable(inquiries) {
    const tbody = document.getElementById('inquiriesTableBody');
    
    if (inquiries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No requests yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = inquiries.map(inquiry => `
        <tr>
            <td>${inquiry.id || 'N/A'}</td>
            <td>${new Date(inquiry.date).toLocaleString()}</td>
            <td>${inquiry.inquiryType || 'Donation'}</td>
            <td>${inquiry.ngoName || inquiry.itemTitle || 'Blood'}</td>
            <td>${inquiry.name || 'N/A'}</td>
            <td>${inquiry.phone || 'N/A'}</td>
            <td>${inquiry.email || 'N/A'}</td>
            <td>${inquiry.bloodGroup || 'N/A'}</td>
            <td>
                <span class="status-badge status-${inquiry.status || 'pending'}">
                    ${inquiry.status || 'pending'}
                </span>
            </td>
            <td>
                <button class="action-btn btn-approve" onclick="updateInquiryStatus(${inquiry.id}, 'approved')">Approve</button>
                <button class="action-btn btn-complete" onclick="updateInquiryStatus(${inquiry.id}, 'completed')">Complete</button>
                <button class="action-btn btn-delete" onclick="deleteInquiry(${inquiry.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Render donations table
function renderDonationsTable(donations) {
    const tbody = document.getElementById('donationsTableBody');
    
    if (donations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center;">No donor registrations yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = donations.map(donation => `
        <tr>
            <td>${donation.id || 'N/A'}</td>
            <td>${new Date(donation.date).toLocaleString()}</td>
            <td>${donation.type || 'Blood'}</td>
            <td>${donation.name || 'N/A'}</td>
            <td>${donation.age || 'N/A'}</td>
            <td>${donation.bloodGroup || 'N/A'}</td>
            <td>${donation.city || 'N/A'}</td>
            <td>${donation.phone || 'N/A'}</td>
            <td>${donation.email || 'N/A'}</td>
            <td>
                <span class="status-badge status-${donation.status || 'pending'}">
                    ${donation.status || 'pending'}
                </span>
            </td>
            <td>
                <button class="action-btn btn-approve" onclick="updateDonationStatus(${donation.id}, 'scheduled')">Schedule</button>
                <button class="action-btn btn-complete" onclick="updateDonationStatus(${donation.id}, 'completed')">Complete</button>
                <button class="action-btn btn-delete" onclick="deleteDonation(${donation.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Render NGOs table
function renderNGOsTable(ngos) {
    const tbody = document.getElementById('ngosTableBody');
    
    if (ngos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No pending NGO registrations</td></tr>';
        return;
    }
    
    tbody.innerHTML = ngos.map(ngo => `
        <tr>
            <td>${ngo.id || 'N/A'}</td>
            <td>${new Date(ngo.dateRegistered || ngo.registrationDate).toLocaleString()}</td>
            <td>${ngo.name || 'N/A'}</td>
            <td>${ngo.registrationNumber || 'N/A'}</td>
            <td>${ngo.city || 'N/A'}</td>
            <td>${ngo.contactPerson || 'N/A'}</td>
            <td>${ngo.phone || 'N/A'}</td>
            <td>${ngo.email || 'N/A'}</td>
            <td>
                <span class="status-badge status-${ngo.status || 'pending'}">
                    ${ngo.status || 'pending'}
                </span>
            </td>
            <td>
                <button class="action-btn btn-approve" onclick="approveNGO(${ngo.id})">Verify</button>
                <button class="action-btn btn-delete" onclick="deleteNGO(${ngo.id})">Reject</button>
            </td>
        </tr>
    `).join('');
}

// Update inquiry status
function updateInquiryStatus(id, status) {
    let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const index = inquiries.findIndex(i => i.id == id);
    
    if (index !== -1) {
        inquiries[index].status = status;
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        alert(`✅ Request marked as ${status}`);
        loadAdminData(); // Refresh table
    }
}

// Delete inquiry
function deleteInquiry(id) {
    if (confirm('Are you sure you want to delete this request?')) {
        let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries = inquiries.filter(i => i.id != id);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        alert('✅ Request deleted');
        loadAdminData();
    }
}

// Update donation status
function updateDonationStatus(id, status) {
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const index = donations.findIndex(d => d.id == id);
    
    if (index !== -1) {
        donations[index].status = status;
        localStorage.setItem('donations', JSON.stringify(donations));
        alert(`✅ Donation marked as ${status}`);
        loadAdminData();
    }
}

// Delete donation
function deleteDonation(id) {
    if (confirm('Are you sure you want to delete this donation registration?')) {
        let donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations = donations.filter(d => d.id != id);
        localStorage.setItem('donations', JSON.stringify(donations));
        alert('✅ Donation deleted');
        loadAdminData();
    }
}

// Approve NGO
function approveNGO(id) {
    let pendingNGOs = JSON.parse(localStorage.getItem('pendingNGOs') || '[]');
    const index = pendingNGOs.findIndex(n => n.id == id);
    
    if (index !== -1) {
        const approvedNGO = pendingNGOs[index];
        approvedNGO.status = 'approved';
        approvedNGO.verified = true;
        
        // Move to approved NGOs list
        let approvedNGOs = JSON.parse(localStorage.getItem('approvedNGOs') || '[]');
        approvedNGOs.push(approvedNGO);
        localStorage.setItem('approvedNGOs', JSON.stringify(approvedNGOs));
        
        // Remove from pending
        pendingNGOs.splice(index, 1);
        localStorage.setItem('pendingNGOs', JSON.stringify(pendingNGOs));
        
        alert('✅ NGO verified and approved!');
        loadAdminData();
    }
}

// Delete NGO
function deleteNGO(id) {
    if (confirm('Are you sure you want to reject this NGO registration?')) {
        let pendingNGOs = JSON.parse(localStorage.getItem('pendingNGOs') || '[]');
        pendingNGOs = pendingNGOs.filter(n => n.id != id);
        localStorage.setItem('pendingNGOs', JSON.stringify(pendingNGOs));
        alert('❌ NGO registration rejected');
        loadAdminData();
    }
}

// Export data to CSV
function exportToCSV() {
    let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    
    // Create CSV content
    let csvContent = "=== DONATION REQUESTS ===\n";
    csvContent += "ID,Date,Type,Item,Name,Phone,Email,Blood Group,Status\n";
    inquiries.forEach(i => {
        csvContent += `${i.id || ''},${i.date || ''},${i.inquiryType || ''},${i.ngoName || ''},${i.name || ''},${i.phone || ''},${i.email || ''},${i.bloodGroup || ''},${i.status || 'pending'}\n`;
    });
    
    csvContent += "\n=== DONOR REGISTRATIONS ===\n";
    csvContent += "ID,Date,Type,Name,Age,Blood Group,City,Phone,Email,Status\n";
    donations.forEach(d => {
        csvContent += `${d.id || ''},${d.date || ''},${d.type || ''},${d.name || ''},${d.age || ''},${d.bloodGroup || ''},${d.city || ''},${d.phone || ''},${d.email || ''},${d.status || 'pending'}\n`;
    });
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lifebridge-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('✅ Data exported to CSV!');
}

// Tab switching
function setupTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Hide all tabs
            document.getElementById('inquiriesTab').style.display = 'none';
            document.getElementById('donationsTab').style.display = 'none';
            document.getElementById('ngosTab').style.display = 'none';
            
            // Show selected tab
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).style.display = 'block';
        });
    });
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (simple password protection)
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
        } else {
            alert('Invalid password');
            window.location.href = 'index.html';
            return;
        }
    }
    
    loadAdminData();
    setupTabs();
    
    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        window.location.href = 'index.html';
    });
});