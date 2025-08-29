// src/components/Login.js - Composant de connexion
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const { login, loading, error } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        
        if (!formData.password) {
            newErrors.password = 'Mot de passe requis';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await login(formData);
            // Redirection gérée par le composant parent
        } catch (err) {
            // L'erreur est déjà gérée par le contexte
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Connexion</h2>
                <p className="auth-subtitle">Accédez à votre espace communautaire</p>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="votre@email.com"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                
                <button 
                    type="submit" 
                    className="auth-button primary"
                    disabled={loading}
                >
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                
                <div className="auth-switch">
                    <p>
                        Pas encore de compte ?{' '}
                        <button 
                            type="button" 
                            className="link-button"
                            onClick={onSwitchToRegister}
                        >
                            Créer un compte
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
