# backend/__init__.py
from flask import Flask # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore
from flask_migrate import Migrate

# Instances globales
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost:5432/plateforme_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'dev-secret-key-change-in-production'
    
    # Initialiser les extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Importer les modèles APRÈS l'initialisation de db
    with app.app_context():
        from models import User, Organization, OrganizationMember, OrganizationResource, Partner, Project, ProjectActivity, ProjectTransaction, ProjectFeedback, ProjectPartnerLink, Messaging, LegalDocTemplate, LegalNotification, UserActivityLog
        
        # Importer et enregistrer les blueprints
        from routes import main_bp
        app.register_blueprint(main_bp)

    return app
