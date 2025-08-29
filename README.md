# 🌐 EcoSystem OC - Plateforme Écosystème Communautaire

> **Plateforme numérique pour la gestion transparente des interactions entre organisations communautaires et partenaires**

Cette plateforme permet de gérer les interactions et partenariats entre les associations/organisations communautaires/ONG d'une part et les collectivités locales/autorités/entreprises/sponsors d'autre part, en mettant l'accent sur la **transparence** dans toutes les interactions.

## 🎯 Objectif du Projet

Créer un écosystème numérique qui facilite et sécurise les relations entre :
- **Acteurs de développement** : Associations, ONG, organisations communautaires
- **Partenaires/Sponsors** : Collectivités locales, entreprises, autorités, investisseurs

## 🏗️ Architecture de la Solution

### **Backend - API Flask**
- **Framework** : Flask 3.1.1
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)
- **API** : REST avec 14 entités de données
- **Port** : 5000

### **Frontend - Interface React**
- **Framework** : React 18+ avec Vite
- **Routage** : React Router Dom
- **Authentification** : Contexte React + JWT
- **Styling** : CSS modules
- **Port** : 3000

### **Base de Données**
- **Type** : PostgreSQL
- **Entités** : 14 modèles (User, Organization, Project, Partner, etc.)
- **Données de test** : Organisations, projets, transactions, utilisateurs

## 🚀 Installation et Démarrage

### Prérequis
- Python 3.12+
- Node.js 18+
- PostgreSQL
- Git

### 1. Cloner le repository
```bash
git clone https://github.com/opentech221/codespaces-react.git
cd codespaces-react
```

### 2. Configuration Backend (Flask)
```bash
cd backend

# Installer les dépendances Python
pip install flask flask-sqlalchemy flask-cors python-dotenv psycopg2-binary pyjwt werkzeug

# Configurer PostgreSQL (créer la base 'plateforme_db')
createdb plateforme_db

# Lancer le serveur Flask
python3 app.py
```

### 3. Configuration Frontend (React)
```bash
# À la racine du projet
npm install

# Lancer le serveur de développement
npm start
```

## 🔐 Comptes de Test

| Rôle | Email | Mot de passe | Description |
|------|-------|--------------|-------------|
| **Admin OC** | admin@oc.com | password123 | Administrateur de la plateforme |
| **Partenaire** | partenaire@test.com | password123 | Sponsor/Investisseur |
| **Citoyen** | citoyen@test.com | password123 | Bénéficiaire/Membre communauté |

## 📊 Données de Test Disponibles

- **4 utilisateurs** avec différents rôles
- **3 organisations** : Association Éducation, ONG Santé, Coopérative Agricole
- **4 projets** : École Numérique, Vaccination Mobile, Marché Bio, Bibliothèque
- **6 transactions financières** avec traçabilité complète
- **Messages et feedbacks** pour démonstration des interactions

## 🌟 Fonctionnalités Principales

### ✅ **Gestion des Organisations**
- Profils complets des associations/ONG
- Statuts juridiques et certifications
- Ressources et membres

### ✅ **Gestion des Projets**
- Création et suivi de projets
- Budgets et financements
- Activités et livrables

### ✅ **Gestion des Partenariats**
- Profils des sponsors/partenaires
- Historique des collaborations
- Évaluations et feedbacks

### ✅ **Transparence Financière**
- Traçabilité des transactions
- Rapports de dépenses
- Justificatifs et documents

### ✅ **Communication Sécurisée**
- Messagerie interne
- Notifications automatiques
- Historique des échanges

## 🛠️ Structure du Projet

```
codespaces-react/
├── backend/                 # API Flask
│   ├── app.py              # Point d'entrée Flask
│   ├── models.py           # Modèles SQLAlchemy
│   ├── routes.py           # Endpoints API
│   ├── database.py         # Configuration DB
│   ├── populate_db.py      # Script de peuplement
│   └── create_test_users.py
├── src/                    # Application React
│   ├── components/         # Composants React
│   ├── contexts/          # Contextes (Auth)
│   ├── services/          # Services API
│   └── App.jsx            # Composant principal
├── public/                # Fichiers statiques
└── docs/                  # Documentation PDF
```

## 🔧 API Endpoints Principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/auth/login` | Authentification utilisateur |
| `POST` | `/auth/register` | Inscription utilisateur |
| `GET` | `/organizations` | Liste des organisations |
| `GET` | `/projects` | Liste des projets |
| `GET` | `/partners` | Liste des partenaires |
| `GET` | `/transactions` | Historique financier |
| `GET` | `/health` | Statut de l'API |

## 🔗 Accès à la Plateforme

- **Interface utilisateur** : http://localhost:3000
- **API Backend** : http://localhost:5000
- **Test de connexion** : http://localhost:3000/test
- **Page de connexion** : http://localhost:3000/login

## 📚 Documentation

La documentation complète du projet inclut :
- **Cahier des charges** détaillé
- **MVP** (Minimum Viable Product)
- **Schéma de base de données**
- **Maquettes d'interface**
- **Stratégie de lancement**
- **Plan de suivi**

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement** : OpenTech221
- **Conception** : Équipe EcoSystem OC
- **Support** : GitHub Copilot

---

### 🚀 **Status : Production Ready**

La plateforme est entièrement fonctionnelle avec backend Flask, frontend React, base de données peuplée et prête pour déploiement en production.

**Repository** : https://github.com/opentech221/codespaces-react
