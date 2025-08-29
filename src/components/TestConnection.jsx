// src/components/TestConnection.jsx - Composant de test de connexion API
import React, { useState, useEffect } from 'react';

const TestConnection = () => {
    const [backendStatus, setBackendStatus] = useState('Vérification...');
    const [loginTest, setLoginTest] = useState('Non testé');
    const [organizations, setOrganizations] = useState([]);
    const [projects, setProjects] = useState([]);

    // URL de l'API backend via proxy
    const API_BASE_URL = '/api';

    useEffect(() => {
        testBackendConnection();
    }, []);

    const testBackendConnection = async () => {
        try {
            // Test de connexion basique
            const response = await fetch(`${API_BASE_URL}/health`);
            if (response.ok) {
                setBackendStatus('✅ Backend connecté');
            } else {
                setBackendStatus('❌ Backend déconnecté');
            }
        } catch (error) {
            setBackendStatus('❌ Erreur de connexion: ' + error.message);
        }
    };

    const testLogin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'admin@oc.com',
                    password: 'password123'
                })
            });

            if (response.ok) {
                const data = await response.json();
                setLoginTest('✅ Connexion réussie - Token reçu');
                
                // Test des organisations avec le token
                const orgsResponse = await fetch(`${API_BASE_URL}/organizations`, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                
                if (orgsResponse.ok) {
                    const orgsData = await orgsResponse.json();
                    setOrganizations(orgsData);
                }

                // Test des projets avec le token
                const projectsResponse = await fetch(`${API_BASE_URL}/projects`, {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json();
                    setProjects(projectsData);
                }
            } else {
                setLoginTest('❌ Échec de connexion');
            }
        } catch (error) {
            setLoginTest('❌ Erreur: ' + error.message);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>🔧 Test de Connexion API</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>État Backend</h3>
                <p>{backendStatus}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Test d'Authentification</h3>
                <button onClick={testLogin} style={{ padding: '10px 20px', marginRight: '10px' }}>
                    Tester la connexion
                </button>
                <p>{loginTest}</p>
            </div>

            {organizations.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>📋 Organisations ({organizations.length})</h3>
                    <ul>
                        {organizations.map(org => (
                            <li key={org.id}>{org.nom} ({org.type})</li>
                        ))}
                    </ul>
                </div>
            )}

            {projects.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>🚀 Projets ({projects.length})</h3>
                    <ul>
                        {projects.map(project => (
                            <li key={project.id}>{project.titre}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
                <h4>✅ Instructions de test</h4>
                <ol>
                    <li>Vérifiez que le statut backend est vert</li>
                    <li>Cliquez sur "Tester la connexion"</li>
                    <li>Vérifiez que les organisations et projets s'affichent</li>
                </ol>
            </div>
        </div>
    );
};

export default TestConnection;
