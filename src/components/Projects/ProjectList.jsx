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
  const [filter, setFilter] = useState('all');

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

  const calculateProjectTotal = (projectId) => {
    const projectTransactions = getProjectTransactions(projectId);
    const total = projectTransactions.reduce((sum, t) => {
      return t.type === 'recette' ? sum + t.montant : sum - t.montant;
    }, 0);
    return total;
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.statut === filter;
  });

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
        <div className="section-header">
          <h2>Tous les projets</h2>
          <div className="filter-controls">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="suspendu">Suspendu</option>
            </select>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <p>Aucun projet trouvé pour ce filtre.</p>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const projectTransactions = getProjectTransactions(project.id);
              const totalAmount = calculateProjectTotal(project.id);
              
              return (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.titre}</h3>
                    <span className={`project-status ${project.statut}`}>
                      {project.statut}
                    </span>
                  </div>
                  
                  <p className="project-description">
                    {project.description}
                  </p>
                  
                  <div className="project-meta">
                    <div className="meta-item">
                      <span className="label">Budget :</span>
                      <span className="value">{project.budget_total || 0} €</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Utilisé :</span>
                      <span className="value">{project.budget_utilise || 0} €</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Solde :</span>
                      <span className={`value ${totalAmount >= 0 ? 'positive' : 'negative'}`}>
                        {totalAmount} €
                      </span>
                    </div>
                  </div>
                  
                  <div className="project-dates">
                    <div>Début : {project.date_debut}</div>
                    <div>Fin : {project.date_fin}</div>
                  </div>
                  
                  <div className="transparency-section">
                    <h4>Transparence financière</h4>
                    <div className="transactions-summary">
                      <div>Transactions : {projectTransactions.length}</div>
                      <div>Dernière mise à jour : {
                        projectTransactions.length > 0 
                          ? projectTransactions[projectTransactions.length - 1].date 
                          : 'Aucune'
                      }</div>
                    </div>
                  </div>
                  
                  <div className="project-actions">
                    <button className="action-btn secondary">
                      Voir transactions
                    </button>
                    <button className="action-btn primary">
                      Détails projet
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
