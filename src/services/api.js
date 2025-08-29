// src/services/api.js - Service de communication avec l'API
const API_BASE_URL = '/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    // Configuration des en-têtes par défaut
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Méthode générique pour les requêtes
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== AUTHENTIFICATION =====
    
    async register(userData) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return response;
    }

    async login(credentials) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        
        if (response.token) {
            this.token = response.token;
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        return response;
    }

    async getProfile() {
        return await this.request('/auth/profile');
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // ===== ORGANISATIONS =====
    
    async getOrganizations() {
        return await this.request('/organizations');
    }

    async createOrganization(orgData) {
        return await this.request('/organizations', {
            method: 'POST',
            body: JSON.stringify(orgData),
        });
    }

    // ===== PROJETS =====
    
    async getProjects() {
        return await this.request('/projects');
    }

    async createProject(projectData) {
        return await this.request('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData),
        });
    }

    // Vérifier si l'utilisateur est connecté
    isAuthenticated() {
        return !!this.token;
    }

    // Récupérer l'utilisateur depuis le localStorage
    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

export default new ApiService();
