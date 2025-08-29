// src/context/AuthContext.js - Contexte d'authentification
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Vérifier si l'utilisateur est connecté au chargement
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                if (apiService.isAuthenticated()) {
                    const currentUser = apiService.getCurrentUser();
                    setUser(currentUser);
                    
                    // Optionnel: vérifier la validité du token avec le serveur
                    try {
                        const profileData = await apiService.getProfile();
                        setUser(profileData.user);
                    } catch (err) {
                        // Token invalide, déconnecter
                        apiService.logout();
                        setUser(null);
                    }
                }
            } catch (err) {
                console.error('Erreur d\'initialisation auth:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Fonction de connexion
    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiService.login(credentials);
            setUser(response.user);
            
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Fonction d'inscription
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiService.register(userData);
            
            // Connexion automatique après inscription
            if (response.user_id) {
                await login({
                    email: userData.email,
                    password: userData.password
                });
            }
            
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        apiService.logout();
        setUser(null);
        setError(null);
    };

    // Vérifier si l'utilisateur est connecté
    const isAuthenticated = () => {
        return !!user && apiService.isAuthenticated();
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
