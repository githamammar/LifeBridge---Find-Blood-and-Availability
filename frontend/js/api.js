class APIClient {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.token = localStorage.getItem('authToken');
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Listings API
    async getListings(filters = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                queryParams.append(key, value);
            }
        });
        
        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.request(`/listings${query}`);
    }

    async getListing(id) {
        return this.request(`/listings/${id}`);
    }

    async createListing(listingData) {
        return this.request('/listings', {
            method: 'POST',
            body: JSON.stringify(listingData)
        });
    }

    async updateListing(id, listingData) {
        return this.request(`/listings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(listingData)
        });
    }

    async deleteListing(id) {
        return this.request(`/listings/${id}`, {
            method: 'DELETE'
        });
    }

    // NGOs API
    async getNGOs(filters = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                queryParams.append(key, value);
            }
        });
        
        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.request(`/ngos${query}`);
    }

    async getNGO(id) {
        return this.request(`/ngos/${id}`);
    }

    async registerNGO(ngoData, file) {
        const formData = new FormData();
        Object.entries(ngoData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (file) {
            formData.append('registrationDoc', file);
        }

        return fetch(`${this.baseURL}/ngos`, {
            method: 'POST',
            body: formData
        }).then(res => res.json());
    }

    async verifyNGO(id) {
        return this.request(`/ngos/${id}/verify`, {
            method: 'PATCH'
        });
    }

    // Donations API
    async createDonation(donationData) {
        return this.request('/donations', {
            method: 'POST',
            body: JSON.stringify(donationData)
        });
    }

    async getDonations() {
        return this.request('/donations');
    }

    // Inquiries API
    async createInquiry(inquiryData) {
        return this.request('/inquiries', {
            method: 'POST',
            body: JSON.stringify(inquiryData)
        });
    }

    async getInquiries() {
        return this.request('/inquiries');
    }

    // Admin API
    async adminLogin(email, password) {
        const data = await this.request('/admin/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.token) {
            this.token = data.token;
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        return data;
    }

    async getAdminStats() {
        return this.request('/admin/stats');
    }

    logout() {
        this.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
}

// Initialize API client
const api = new APIClient();

// Make available globally
window.api = api;