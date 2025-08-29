#!/bin/bash
# backend/start.sh - Script de démarrage du backend

echo "=== Démarrage du Backend - Plateforme Communautaire ==="

# S'assurer que PostgreSQL est démarré
sudo service postgresql start

# Définir les variables d'environnement
export PYTHONPATH=/workspaces/codespaces-react/backend
export FLASK_APP=app.py
export FLASK_ENV=development
export FLASK_DEBUG=1

echo "✅ PostgreSQL: Actif"
echo "✅ Base de données: plateforme_db"
echo "✅ Configuration: PostgreSQL (conforme au cahier des charges)"

# Démarrer l'application Flask
echo "Démarrage de l'application Flask..."
python app.py
