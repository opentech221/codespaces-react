// src/components/Dashboard/OrganizationDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import './Dashboard.css';

const OrganizationDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newOrg, setNewOrg] = useState({
    nom: '',
    type: '',
    description: '',
    contact_email: '',
    contact_tel: '',
    adresse: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrganizations();
  }, [user, navigate]);

  const fetchOrganizations = async () => {
    try {
      const data = await apiService.getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des organisations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    try {
      await apiService.createOrganization(newOrg);
      setNewOrg({
        nom: '',
        type: '',
        description: '',
        contact_email: '',
        contact_tel: '',
        adresse: ''
      });
      setShowCreateForm(false);
      fetchOrganizations();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Gestion des Organisations</h1>
          <div className="user-info">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              ← Retour
            </button>
            <span>Bonjour, {user.prenom} {user.nom}</span>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-header">
          <h2>Organisations communautaires</h2>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="action-btn primary"
          >
            + Nouvelle organisation
          </button>
        </div>

        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Créer une nouvelle organisation</h3>
              <form onSubmit={handleCreateOrganization}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nom de l'organisation"
                    value={newOrg.nom}
                    onChange={(e) => setNewOrg({...newOrg, nom: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    value={newOrg.type}
                    onChange={(e) => setNewOrg({...newOrg, type: e.target.value})}
                    required
                  >
                    <option value="">Type d'organisation</option>
                    <option value="association">Association</option>
                    <option value="ong">ONG</option>
                    <option value="gie">GIE</option>
                    <option value="cooperative">Coopérative</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Description"
                    value={newOrg.description}
                    onChange={(e) => setNewOrg({...newOrg, description: e.target.value})}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email de contact"
                    value={newOrg.contact_email}
                    onChange={(e) => setNewOrg({...newOrg, contact_email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={newOrg.contact_tel}
                    onChange={(e) => setNewOrg({...newOrg, contact_tel: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Adresse"
                    value={newOrg.adresse}
                    onChange={(e) => setNewOrg({...newOrg, adresse: e.target.value})}
                    rows="2"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setShowCreateForm(false)} className="action-btn secondary">
                    Annuler
                  </button>
                  <button type="submit" className="action-btn primary">
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="organizations-grid">
          {organizations.length === 0 ? (
            <div className="empty-state">
              <p>Aucune organisation trouvée. Créez la première !</p>
            </div>
          ) : (
            organizations.map((org) => (
              <div key={org.id} className="org-card">
                <div className="org-header">
                  <h3>{org.nom}</h3>
                  <span className={`org-type ${org.type}`}>{org.type}</span>
                </div>
                <p className="org-description">{org.description}</p>
                <div className="org-contact">
                  <div>📧 {org.contact_email}</div>
                  <div>📱 {org.contact_tel}</div>
                </div>
                <div className="org-actions">
                  <button className="action-btn secondary">Voir détails</button>
                  <button className="action-btn primary">Gérer</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default OrganizationDashboard;
