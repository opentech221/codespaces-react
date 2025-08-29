# backend/app_main.py - Application Flask principale
from flask import Flask
from flask_cors import CORS
from database import db, migrate, init_db

# Configuration de l'application
app = Flask(__name__)

# Configuration PostgreSQL (comme spécifié dans le cahier des charges)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5432/plateforme_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key-change-in-production'

print("✅ Configuration PostgreSQL activée - Base: plateforme_db")

# Initialisation des extensions
init_db(app)

# Configuration CORS permissive pour le développement
CORS(app, 
     origins='*',
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'])

# Import des modèles pour enregistrer les tables
import models

# Import des routes
from routes import main_bp
app.register_blueprint(main_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
