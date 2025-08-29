// src/components/Projects/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import './Projects.css';

const ProjectList = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [projectsData, transactionsData] = await Promise.all([
        apiService.getProjects(),
        apiService.getTransactions()
      ]);
      setProjects(projectsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectTransactions = (projectId) => {
    return transactions.filter(t => t.project_id === projectId);
  };

  const calculateProjectBudget = (projectId) => {
    const projectTransactions = getProjectTransactions(projectId);
    const total = projectTransactions.reduce((sum, t) => {
      return t.type === 'recette' ? sum + t.montant : sum - t.montant;
    }, 0);
    return total;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Chargement des projets...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Projets et Transparence</h1>
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
        <div className="projects-section">
          <div className="section-header">
            <h2>Projets actifs</h2>
            <div className="filter-controls">
              <select className="filter-select">
                <option>Tous les statuts</option>
                <option>En cours</option>
                <option>Terminé</option>
                <option>En attente</option>
              </select>
              <select className="filter-select">
                <option>Toutes les catégories</option>
                <option>Éducation</option>
                <option>Santé</option>
                <option>Infrastructure</option>
                <option>Environnement</option>
              </select>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="empty-state">
              <p>Aucun projet trouvé.</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => {
                const projectBudget = calculateProjectBudget(project.id);
                const projectTransactions = getProjectTransactions(project.id);
                
                return (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h3>{project.titre}</h3>
                      <span className={`project-status ${project.statut}`}>
                        {project.statut}
                      </span>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-info">
                      <div className="info-item">
                        <strong>Catégorie:</strong> {project.categorie}
                      </div>
                      <div className="info-item">
                        <strong>Localisation:</strong> {project.localisation}
                      </div>
                      <div className="info-item">
                        <strong>Dates:</strong> {project.date_debut} → {project.date_fin}
                      </div>
                    </div>

                    <div className="project-budget">
                      <div className="budget-info">
                        <div className="budget-item">
                          <span className="budget-label">Budget total:</span>
                          <span className="budget-value">{project.budget_total}€</span>
                        </div>
                        <div className="budget-item">
                          <span className="budget-label">Budget utilisé:</span>
                          <span className="budget-value">{project.budget_utilise}€</span>
                        </div>
                        <div className="budget-item">
                          <span className="budget-label">Solde actuel:</span>
                          <span className={`budget-value ${projectBudget >= 0 ? 'positive' : 'negative'}`}>
                            {projectBudget}€
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="project-transparency">
                      <h4>Transparence financière</h4>
                      {projectTransactions.length === 0 ? (
                        <p className="no-transactions">Aucune transaction enregistrée</p>
                      ) : (
                        <div className="transactions-summary">
                          <div className="transaction-count">
                            {projectTransactions.length} transaction(s)
                          </div>
                          <button className="view-details-btn">
                            Voir détails →
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="project-actions">
                      <button className="action-btn secondary">
                        📊 Voir rapports
                      </button>
                      <button className="action-btn primary">
                        💬 Contacter
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
