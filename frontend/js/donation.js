// Donation form modal handling
let currentDonationType = '';

function openDonateForm(type) {
    currentDonationType = type;
    const modal = document.getElementById('donationModal');
    const modalTitle = document.getElementById('modalTitle');
    
    let titleText = '';
    switch(type) {
        case 'blood':
            titleText = 'Blood Donation Registration';
            break;
        case 'organ':
            titleText = 'Organ Donor Registration';
            break;
        case 'platelets':
            titleText = 'Platelet Donation Registration';
            break;
        default:
            titleText = 'Donation Registration';
    }
    modalTitle.textContent = titleText;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'none';
    document.getElementById('donationForm').reset();
}

// Save donation to localStorage
function saveDonation(formData, type) {
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const newDonation = {
        id: Date.now(),
        type: type,
        date: new Date().toISOString(),
        ...formData
    };
    donations.push(newDonation);
    localStorage.setItem('donations', JSON.stringify(donations));
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('donationModal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('donationForm');
    const fakeRegisterBtn = document.getElementById('fakeRegisterBtn');
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Handle form submission
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('input[type="text"]').value,
                age: form.querySelector('input[type="number"]').value,
                bloodGroup: form.querySelector('select').value,
                city: form.querySelectorAll('input[type="text"]')[1]?.value || '',
                phone: form.querySelector('input[type="tel"]').value,
                email: form.querySelector('input[type="email"]').value,
                preferredDate: form.querySelector('input[type="date"]').value
            };
            
            // Save to localStorage
            saveDonation(formData, currentDonationType);
            
            // Show success message based on donation type
            let successMessage = '';
            switch(currentDonationType) {
                case 'blood':
                    successMessage = '✅ Thank you for registering to donate blood! A representative will contact you within 24 hours to schedule your donation.';
                    break;
                case 'organ':
                    successMessage = '✅ Thank you for registering as an organ donor! You\'ve taken a heroic step. Our team will guide you through the registration process with NOTTO.';
                    break;
                case 'platelets':
                    successMessage = '✅ Thank you for registering to donate platelets! Your donation will help cancer patients and trauma victims. We\'ll contact you soon.';
                    break;
                default:
                    successMessage = '✅ Registration successful! We\'ll contact you shortly.';
            }
            
            alert(successMessage);
            closeModal();
            
            // Track donation count
            let donationCount = localStorage.getItem('donationCount') || 0;
            donationCount = parseInt(donationCount) + 1;
            localStorage.setItem('donationCount', donationCount);
        };
    }
    
    // NGO registration button
    if (fakeRegisterBtn) {
        fakeRegisterBtn.addEventListener('click', () => {
            window.location.href = 'ngo.html';
        });
    }
    
    // Add some animation to donate cards
    const donateCards = document.querySelectorAll('.donate-card');
    donateCards.forEach(card => {
        card.addEventListener('click', () => {
            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
});

// Function to show donation history (optional - can be called from console or future feature)
window.showDonationHistory = function() {
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    if (donations.length === 0) {
        alert('No donation registrations found.');
        return;
    }
    
    let historyText = 'Your Donation History:\n\n';
    donations.forEach(donation => {
        historyText += `📅 ${new Date(donation.date).toLocaleDateString()}\n`;
        historyText += `Type: ${donation.type.toUpperCase()}\n`;
        historyText += `Name: ${donation.name}\n`;
        historyText += `Blood Group: ${donation.bloodGroup}\n`;
        historyText += `Status: Pending confirmation\n`;
        historyText += `------------------------\n`;
    });
    
    alert(historyText);
};