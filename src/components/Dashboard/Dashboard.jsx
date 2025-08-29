// src/components/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    organizations: 0,
    projects: 0,
    users: 0,
    transactions: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const endpoints = [
        'http://localhost:5000/organizations',
        'http://localhost:5000/projects',
        'http://localhost:5000/users',
        'http://localhost:5000/projecttransactions'
      ];

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const promises = endpoints.map(url => 
        fetch(url, { headers }).then(res => res.json())
      );

      const [orgs, projects, users, transactions] = await Promise.all(promises);

      setStats({
        organizations: orgs.length || 0,
        projects: projects.length || 0,
        users: users.length || 0,
        transactions: transactions.length || 0
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Tableau de bord - Plateforme Écosystème</h1>
          <div className="user-info">
            <span>Bonjour, {user.prenom} {user.nom}</span>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.organizations}</div>
            <div className="stat-label">Organisations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.projects}</div>
            <div className="stat-label">Projets</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.users}</div>
            <div className="stat-label">Utilisateurs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.transactions}</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>

        <div className="dashboard-actions">
          <div className="action-card">
            <h3>Gestion des organisations</h3>
            <p>Administrez les organisations communautaires, leurs membres et ressources</p>
            <button 
              onClick={() => navigate('/org-dashboard')}
              className="action-btn primary"
            >
              Accéder
            </button>
          </div>
          
          <div className="action-card">
            <h3>Projets et transparence</h3>
            <p>Consultez les projets, leur avancement et les transactions financières</p>
            <button 
              onClick={() => navigate('/projects')}
              className="action-btn primary"
            >
              Voir les projets
            </button>
          </div>
          
          <div className="action-card">
            <h3>Messagerie</h3>
            <p>Communiquez avec les partenaires et organisations</p>
            <button className="action-btn secondary">
              Ouvrir
            </button>
          </div>
          
          <div className="action-card">
            <h3>Assistant juridique IA</h3>
            <p>Obtenez de l'aide pour vos obligations légales et administratives</p>
            <button className="action-btn secondary">
              Consulter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
