#!/bin/bash
# backend/setup_postgres.sh - Script d'initialisation PostgreSQL pour Codespaces

echo "=== Configuration PostgreSQL pour la Plateforme Communautaire ==="

# Démarrer PostgreSQL si pas encore démarré
sudo service postgresql start

# Configurer l'authentification pour le développement
echo "Configuration de l'authentification PostgreSQL..."
sudo sed -i "s/local   all             all                                     peer/local   all             all                                     trust/" /etc/postgresql/12/main/pg_hba.conf
sudo sed -i "s/host    all             all             127.0.0.1\/32            md5/host    all             all             127.0.0.1\/32            trust/" /etc/postgresql/12/main/pg_hba.conf

# Redémarrer PostgreSQL
sudo service postgresql restart

# Attendre que PostgreSQL soit prêt
sleep 2

# Créer l'utilisateur et la base de données
echo "Création de l'utilisateur et de la base de données..."
sudo -u postgres psql postgres << EOF
CREATE USER codespace WITH PASSWORD 'codespace';
CREATE DATABASE plateforme_db OWNER codespace;
GRANT ALL PRIVILEGES ON DATABASE plateforme_db TO codespace;
\q
EOF

echo "✅ PostgreSQL configuré avec succès !"
echo "   - Utilisateur: codespace"
echo "   - Mot de passe: codespace"  
echo "   - Base de données: plateforme_db"
echo "   - URL de connexion: postgresql://codespace:codespace@localhost:5432/plateforme_db"
