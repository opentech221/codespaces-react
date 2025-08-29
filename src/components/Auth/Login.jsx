// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setMessage(result.message);
      }
    } else {
      const result = await register(formData);
      if (result.success) {
        setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setIsLogin(true);
      } else {
        setMessage(result.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Plateforme Écosystème Communautaire</h1>
          <p>Gérer les interactions et partenariats en toute transparence</p>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={isLogin ? 'tab active' : 'tab'}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <button 
            className={!isLogin ? 'tab active' : 'tab'}
            onClick={() => setIsLogin(false)}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin_oc">Administrateur OC</option>
                  <option value="partenaire">Partenaire</option>
                  <option value="citoyen">Citoyen</option>
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {message && (
            <div className={`message ${message.includes('réussie') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
