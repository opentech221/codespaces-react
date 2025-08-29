# Backend - Plateforme Numérique Communautaire

## Vue d'ensemble

Ce backend implémente une API REST pour une plateforme de gestion des interactions entre organisations communautaires (OC/ONG) et partenaires/sponsors. Il utilise Flask, SQLAlchemy et Flask-Migrate pour la gestion de base de données.

## Architecture Technique

- **Framework**: Flask 3.1.1
- **ORM**: SQLAlchemy avec Flask-SQLAlchemy
- **Migrations**: Flask-Migrate
- **Base de données**: SQLite (développement) / PostgreSQL (production)
- **Authentification**: JWT (JSON Web Tokens)
- **CORS**: Flask-CORS pour les requêtes cross-origin

## Structure du Projet

```
backend/
├── app_main.py              # Point d'entrée principal de l'application
├── database.py              # Configuration de la base de données
├── models.py                # Modèles SQLAlchemy (tous les entities)
├── routes.py                # Routes API REST avec protection JWT
├── migrations/              # Dossier des migrations de base de données
├── start.sh                 # Script de démarrage
├── .flaskenv               # Variables d'environnement Flask
├── sql_schema_communautaire.sql  # Schéma SQL de référence
└── README.md               # Cette documentation
```

## Modèles de Données

Le backend implémente **14 entités** correspondant au schéma SQL :

### Entités Principales
1. **User** - Utilisateurs du système
2. **Organization** - Organisations communautaires (OC/ONG)
3. **Partner** - Partenaires et sponsors
4. **Project** - Projets collaboratifs

### Entités de Liaison et Gestion
5. **OrganizationMember** - Membres des organisations
6. **OrganizationResource** - Ressources des organisations
7. **ProjectActivity** - Activités des projets
8. **ProjectTransaction** - Transactions financières
9. **ProjectFeedback** - Retours et évaluations
10. **ProjectPartnerLink** - Liens entre projets et partenaires

### Entités de Communication et Conformité
11. **Messaging** - Système de messagerie
12. **LegalDocTemplate** - Modèles de documents légaux
13. **LegalNotification** - Notifications légales
14. **UserActivityLog** - Logs d'activité utilisateur

## API Endpoints

### Authentification
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/register` - Inscription utilisateur

### Endpoints CRUD (pour chaque entité)
- `GET /{entité}` - Liste de tous les éléments
- `POST /{entité}` - Création d'un nouvel élément
- `GET /{entité}/<id>` - Récupération d'un élément spécifique
- `PUT /{entité}/<id>` - Mise à jour d'un élément
- `DELETE /{entité}/<id>` - Suppression d'un élément

**Protection**: Tous les endpoints (sauf authentification) requièrent un token JWT valide.

## Installation et Configuration

### Prérequis
```bash
# Packages Python requis
pip install flask flask-sqlalchemy flask-migrate flask-cors python-dotenv PyJWT werkzeug psycopg2-binary
```

### Configuration de la Base de Données

#### Développement (SQLite)
```python
SQLALCHEMY_DATABASE_URI = 'sqlite:///plateforme.db'
```

#### Production (PostgreSQL)
```python
SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost:5432/plateforme_db'
```

## Utilisation

### Démarrage Rapide
```bash
# Option 1: Script automatique
./start.sh

# Option 2: Démarrage manuel
export PYTHONPATH=/workspaces/codespaces-react/backend
export FLASK_APP=app_main.py
python app_main.py
```

### Gestion des Migrations

```bash
# Variables d'environnement pour Flask CLI
export PYTHONPATH=/workspaces/codespaces-react/backend
export FLASK_APP=app_main.py

# Initialiser les migrations (fait une seule fois)
flask db init

# Créer une nouvelle migration
flask db migrate -m "Description de la migration"

# Appliquer les migrations
flask db upgrade

# Voir l'état actuel
flask db current

# Voir l'historique des migrations
flask db history

# Voir les routes disponibles
flask routes
```

### Test de l'API

```bash
# Test de base - Page d'accueil
curl http://localhost:5000/

# Test d'une route API (nécessite authentification)
curl -H "Authorization: Bearer <token>" http://localhost:5000/users
```

## Configuration de Production

Pour la production, modifiez `app_main.py` :

```python
# Configuration pour PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost:5432/plateforme_db'
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['DEBUG'] = False
```

## Correspondance avec le Schéma SQL

Ce backend est **entièrement aligné** avec le fichier `sql_schema_communautaire.sql` :

- ✅ **Noms des tables** : Correspondance exacte
- ✅ **Noms des champs** : Utilisation des noms français du schéma SQL
- ✅ **Types de données** : Mapping correct SQLAlchemy ↔ PostgreSQL
- ✅ **Contraintes** : Clés primaires, clés étrangères, contraintes d'unicité
- ✅ **Relations** : Relations many-to-many et foreign keys

## Logs et Débogage

L'application fonctionne en mode debug par défaut pour le développement. Les erreurs sont affichées dans la console.

## Sécurité

- **Authentification JWT** : Tous les endpoints protégés
- **Hachage des mots de passe** : Utilisation de Werkzeug
- **CORS configuré** : Pour les requêtes front-end
- **Validation des données** : Vérification des types et contraintes

## État des Migrations ✅

Le système de migration Flask-Migrate est **opérationnel** :

- ✅ Flask-Migrate installé et configuré
- ✅ Migrations initialisées (`flask db init`)
- ✅ Migration initiale créée (`flask db migrate`)
- ✅ Migration appliquée (`flask db upgrade`)
- ✅ Flask CLI fonctionnel pour les commandes de base de données

### Commandes de Migration Validées

```bash
# Configuration du PYTHONPATH et FLASK_APP
export PYTHONPATH=/workspaces/codespaces-react/backend
export FLASK_APP=app_main.py

# Commandes testées et fonctionnelles
flask routes          # ✅ Affiche toutes les routes API
flask db current      # ✅ Affiche l'état actuel des migrations
flask db migrate      # ✅ Crée de nouvelles migrations
flask db upgrade      # ✅ Applique les migrations
```

## Prochaines Étapes

1. **Tests unitaires** : Ajouter des tests pour les modèles et routes
2. **Documentation API** : Intégrer Swagger/OpenAPI
3. **Validation avancée** : Utiliser Marshmallow pour la sérialisation
4. **Cache** : Intégrer Redis pour les performances
5. **Monitoring** : Ajouter des logs structurés
6. **Production** : Configurer PostgreSQL et déploiement
