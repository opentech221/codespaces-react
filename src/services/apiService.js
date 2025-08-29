// src/services/api.js
const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur API');
      }
      
      return data;
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Organizations
  async getOrganizations() {
    return this.request('/organizations');
  }

  async createOrganization(orgData) {
    return this.request('/organizations', {
      method: 'POST',
      body: JSON.stringify(orgData)
    });
  }

  async getOrganization(id) {
    return this.request(`/organizations/${id}`);
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  // Transactions
  async getTransactions() {
    return this.request('/projecttransactions');
  }

  async createTransaction(transactionData) {
    return this.request('/projecttransactions', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    });
  }

  // Messages
  async getMessages() {
    return this.request('/messages');
  }

  async sendMessage(messageData) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }
}

export default new ApiService();
