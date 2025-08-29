// src/components/Home.jsx - Page d'accueil temporaire
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ 
            padding: '40px', 
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <h1 style={{ color: '#2c5282', marginBottom: '20px' }}>
                🌐 EcoSystem OC
            </h1>
            <h2 style={{ color: '#4a5568', marginBottom: '30px' }}>
                Plateforme Écosystème Communautaire
            </h2>
            
            <p style={{ 
                fontSize: '18px', 
                lineHeight: '1.6', 
                marginBottom: '40px',
                color: '#2d3748'
            }}>
                Plateforme numérique pour la gestion transparente des interactions entre 
                organisations communautaires et partenaires (collectivités, entreprises, ONG).
            </p>

            <div style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center',
                marginBottom: '40px'
            }}>
                <Link 
                    to="/test" 
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold'
                    }}
                >
                    🔧 Test de Connexion
                </Link>
                
                <Link 
                    to="/login" 
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#2c5282',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold'
                    }}
                >
                    🔐 Se Connecter
                </Link>
            </div>

            <div style={{
                backgroundColor: '#f7fafc',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px'
            }}>
                <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>
                    👥 Comptes de Test Disponibles
                </h3>
                <div style={{ textAlign: 'left', display: 'inline-block' }}>
                    <p><strong>Administrateur OC:</strong> admin@oc.com / password123</p>
                    <p><strong>Partenaire:</strong> partenaire@test.com / password123</p>
                    <p><strong>Citoyen:</strong> citoyen@test.com / password123</p>
                </div>
            </div>

            <div style={{
                backgroundColor: '#e6fffa',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #38b2ac'
            }}>
                <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>
                    ✅ Statut de la Plateforme
                </h3>
                <div style={{ textAlign: 'left', display: 'inline-block' }}>
                    <p>✅ Backend Flask API - Port 5000</p>
                    <p>✅ Frontend React - Port 3000</p>
                    <p>✅ Base de données PostgreSQL peuplée</p>
                    <p>✅ 4 projets, 3 organisations, 6 transactions</p>
                    <p>✅ Configuration CORS optimisée</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
