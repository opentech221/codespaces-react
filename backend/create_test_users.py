# backend/create_test_users.py - Script pour créer des utilisateurs de test avec authentification
from app import app
from database import db
from models import User
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_test_users():
    with app.app_context():
        print("🔐 Création des utilisateurs de test avec mots de passe hashés...")
        
        test_users = [
            {
                'nom': 'Admin',
                'prenom': 'Test',
                'email': 'admin@oc.com',
                'password_hash': generate_password_hash('password123'),
                'role': 'admin_oc',
                'statut': 'actif',
                'telephone': '+33123456789',
                'date_creation': datetime.now()
            },
            {
                'nom': 'Partenaire',
                'prenom': 'Demo',
                'email': 'partenaire@test.com',
                'password_hash': generate_password_hash('password123'),
                'role': 'partenaire',
                'statut': 'actif',
                'telephone': '+33123456790',
                'date_creation': datetime.now()
            },
            {
                'nom': 'Citoyen',
                'prenom': 'Lambda',
                'email': 'citoyen@test.com',
                'password_hash': generate_password_hash('password123'),
                'role': 'citoyen',
                'statut': 'actif',
                'telephone': '+33123456791',
                'date_creation': datetime.now()
            }
        ]
        
        created_users = []
        for user_data in test_users:
            # Vérifier si l'utilisateur existe déjà
            existing_user = User.query.filter_by(email=user_data['email']).first()
            if existing_user:
                print(f"   ⚠️  Utilisateur {user_data['email']} existe déjà")
                continue
                
            user = User(**user_data)
            db.session.add(user)
            created_users.append(user)
        
        db.session.commit()
        
        print(f"✅ {len(created_users)} utilisateurs de test créés avec succès !")
        print("\n🔑 Comptes de connexion disponibles :")
        print("   📧 admin@oc.com / 🔑 password123 (Administrateur OC)")
        print("   📧 partenaire@test.com / 🔑 password123 (Partenaire)")
        print("   📧 citoyen@test.com / 🔑 password123 (Citoyen)")
        print("\n🌐 Accédez à l'application : http://localhost:3000")

if __name__ == "__main__":
    create_test_users()
