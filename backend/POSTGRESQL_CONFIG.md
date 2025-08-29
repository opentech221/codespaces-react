# Configuration PostgreSQL - Plateforme Communautaire

## ✅ PostgreSQL Opérationnel

La plateforme utilise maintenant **PostgreSQL** comme spécifié dans le cahier des charges.

### Configuration Actuelle

- **SGBD**: PostgreSQL 12
- **Base de données**: `plateforme_db`
- **Utilisateur**: `postgres`
- **Authentification**: Trust (local development)
- **URL de connexion**: `postgresql://postgres@localhost:5432/plateforme_db`

### Tables Créées (15 au total)

```sql
-- Tables principales (14 entités métier)
user                    -- Utilisateurs
organization           -- Organisations communautaires
partner                -- Partenaires/sponsors
project                -- Projets
organization_member     -- Membres des organisations
organization_resource   -- Ressources des organisations
project_activity        -- Activités des projets
project_transaction     -- Transactions financières
project_feedback        -- Retours sur les projets
project_partner_link    -- Liens projets-partenaires
messaging              -- Messages
legal_doc_template     -- Modèles de documents légaux
legal_notification     -- Notifications légales
user_activity_log      -- Logs d'activité

-- Table système
alembic_version        -- Gestion des migrations
```

### Migrations Fonctionnelles

```bash
# Variables d'environnement
export PYTHONPATH=/workspaces/codespaces-react/backend
export FLASK_APP=app.py

# Commandes de migration
flask db init           # ✅ Initialisé
flask db migrate        # ✅ Migration créée
flask db upgrade        # ✅ Migration appliquée
flask routes           # ✅ 30 endpoints disponibles
```

### Correspondance Cahier des Charges

- ✅ **PostgreSQL** (requis) : Utilisé au lieu de SQLite
- ✅ **14 entités** : Toutes les tables créées selon le schéma SQL
- ✅ **Relations**: Clés étrangères et contraintes respectées
- ✅ **Noms français**: Champs utilisant la nomenclature du schéma SQL
- ✅ **Migrations**: Système de versioning opérationnel

### Commandes de Vérification

```bash
# Vérifier les tables PostgreSQL
psql -U postgres -d plateforme_db -c "\dt"

# Tester la connexion application
python -c "import app; print('✅ PostgreSQL OK')"

# Démarrer l'application
./start.sh
```

### Production

Pour la production, modifier la chaîne de connexion dans `app.py` :

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@host:port/database'
```

### Résolution des Problèmes

1. **PostgreSQL non démarré** :
   ```bash
   sudo service postgresql start
   ```

2. **Base manquante** :
   ```bash
   psql -U postgres -c "CREATE DATABASE plateforme_db;"
   ```

3. **Authentification** :
   ```bash
   # Vérifier /etc/postgresql/12/main/pg_hba.conf
   sudo service postgresql restart
   ```
