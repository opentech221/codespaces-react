# backend/populate_db.py - Script pour peupler la base de données avec des données de test
from app import app
from database import db
from models import *
from datetime import datetime, date
import json

def populate_database():
    with app.app_context():
        # Créer les tables si elles n'existent pas
        db.create_all()
        
        print("🚀 Début du peuplement de la base de données...")
        
        # 1. Créer des utilisateurs de test
        users_data = [
            {
                'nom': 'Dupont', 'prenom': 'Jean', 'email': 'jean.dupont@oc1.com',
                'password_hash': 'hashed_password_123', 'role': 'admin_oc',
                'telephone': '+33123456789', 'date_creation': datetime.now()
            },
            {
                'nom': 'Martin', 'prenom': 'Sophie', 'email': 'sophie.martin@partenaire.com',
                'password_hash': 'hashed_password_456', 'role': 'partenaire',
                'telephone': '+33123456790', 'date_creation': datetime.now()
            },
            {
                'nom': 'Diallo', 'prenom': 'Amadou', 'email': 'amadou.diallo@oc2.com',
                'password_hash': 'hashed_password_789', 'role': 'admin_oc',
                'telephone': '+33123456791', 'date_creation': datetime.now()
            },
            {
                'nom': 'Benali', 'prenom': 'Fatima', 'email': 'fatima.benali@citoyen.com',
                'password_hash': 'hashed_password_012', 'role': 'citoyen',
                'telephone': '+33123456792', 'date_creation': datetime.now()
            }
        ]
        
        users = []
        for user_data in users_data:
            user = User(**user_data)
            db.session.add(user)
            users.append(user)
        
        db.session.commit()
        print(f"✅ {len(users)} utilisateurs créés")
        
        # 2. Créer des organisations
        organizations_data = [
            {
                'nom': 'Association Éducation Pour Tous',
                'type': 'association',
                'statut_juridique': 'Association loi 1901',
                'date_creation': date(2020, 1, 15),
                'adresse': '123 Rue de l\'Éducation, 75001 Paris',
                'contact_email': 'contact@education-pour-tous.org',
                'contact_tel': '+33142345678',
                'description': 'Association dédiée à l\'amélioration de l\'accès à l\'éducation dans les communautés défavorisées.',
                'site_web': 'https://education-pour-tous.org',
                'statut_actif': True
            },
            {
                'nom': 'ONG Santé Communautaire',
                'type': 'ong',
                'statut_juridique': 'ONG reconnue d\'utilité publique',
                'date_creation': date(2018, 6, 10),
                'adresse': '456 Avenue de la Santé, 69000 Lyon',
                'contact_email': 'info@sante-communautaire.org',
                'contact_tel': '+33478901234',
                'description': 'ONG spécialisée dans les programmes de santé préventive et l\'accès aux soins.',
                'site_web': 'https://sante-communautaire.org',
                'statut_actif': True
            },
            {
                'nom': 'Coopérative Agricole du Sud',
                'type': 'cooperative',
                'statut_juridique': 'SCOP',
                'date_creation': date(2019, 3, 22),
                'adresse': '789 Chemin des Champs, 13000 Marseille',
                'contact_email': 'contact@coop-agricole-sud.fr',
                'contact_tel': '+33491123456',
                'description': 'Coopérative d\'agriculteurs locaux pour la production et commercialisation de produits bio.',
                'site_web': 'https://coop-agricole-sud.fr',
                'statut_actif': True
            }
        ]
        
        organizations = []
        for org_data in organizations_data:
            org = Organization(**org_data)
            db.session.add(org)
            organizations.append(org)
        
        db.session.commit()
        print(f"✅ {len(organizations)} organisations créées")
        
        # 3. Créer des membres d'organisations
        org_members_data = [
            {
                'organization_id': 1, 'user_id': 1, 'role': 'Président',
                'date_joined': date(2020, 2, 1), 'statut': 'actif'
            },
            {
                'organization_id': 2, 'user_id': 3, 'role': 'Directeur',
                'date_joined': date(2018, 7, 1), 'statut': 'actif'
            },
            {
                'organization_id': 3, 'user_id': 1, 'role': 'Membre',
                'date_joined': date(2019, 4, 1), 'statut': 'actif'
            }
        ]
        
        for member_data in org_members_data:
            member = OrganizationMember(**member_data)
            db.session.add(member)
        
        db.session.commit()
        print(f"✅ {len(org_members_data)} membres d'organisations créés")
        
        # 4. Créer des ressources organisationnelles
        resources_data = [
            {
                'organization_id': 1, 'type': 'humaine', 'description': 'Enseignants bénévoles',
                'quantite': 15, 'statut': 'disponible', 'localisation': 'Paris'
            },
            {
                'organization_id': 1, 'type': 'matérielle', 'description': 'Ordinateurs portables',
                'quantite': 25, 'statut': 'en_cours_utilisation', 'localisation': 'Paris',
                'valeur_estimee': 12500.0
            },
            {
                'organization_id': 2, 'type': 'humaine', 'description': 'Personnel médical',
                'quantite': 8, 'statut': 'disponible', 'localisation': 'Lyon'
            },
            {
                'organization_id': 2, 'type': 'matérielle', 'description': 'Équipements médicaux',
                'quantite': 50, 'statut': 'disponible', 'localisation': 'Lyon',
                'valeur_estimee': 45000.0
            }
        ]
        
        for resource_data in resources_data:
            resource = OrganizationResource(**resource_data)
            db.session.add(resource)
        
        db.session.commit()
        print(f"✅ {len(resources_data)} ressources créées")
        
        # 5. Créer des partenaires
        partners_data = [
            {
                'nom': 'Mairie de Paris 15e',
                'type': 'collectivite',
                'contact_email': 'partenariats@mairie15.paris.fr',
                'contact_tel': '+33145678901',
                'adresse': '31 Rue Peclet, 75015 Paris',
                'description': 'Collectivité locale engagée dans le soutien aux associations éducatives',
                'statut_actif': True
            },
            {
                'nom': 'Fondation Entreprise Solidaire',
                'type': 'fondation',
                'contact_email': 'contact@entreprise-solidaire.org',
                'contact_tel': '+33156789012',
                'adresse': '123 Boulevard Haussmann, 75008 Paris',
                'description': 'Fondation d\'entreprise dédiée au financement de projets sociaux',
                'statut_actif': True
            },
            {
                'nom': 'Région Auvergne-Rhône-Alpes',
                'type': 'collectivite',
                'contact_email': 'subventions@auvergnerhonealpes.fr',
                'contact_tel': '+33472345678',
                'adresse': '1 Esplanade François Mitterrand, 69000 Lyon',
                'description': 'Conseil régional soutenant l\'innovation sociale et la santé',
                'statut_actif': True
            }
        ]
        
        partners = []
        for partner_data in partners_data:
            partner = Partner(**partner_data)
            db.session.add(partner)
            partners.append(partner)
        
        db.session.commit()
        print(f"✅ {len(partners)} partenaires créés")
        
        # 6. Créer des projets
        projects_data = [
            {
                'organization_id': 1,
                'titre': 'École Numérique Communautaire',
                'description': 'Création d\'un centre de formation numérique dans le 19e arrondissement pour réduire la fracture numérique',
                'objectif': 'Former 200 personnes aux outils numériques en 1 an',
                'statut': 'en_cours',
                'budget_total': 85000.0,
                'budget_utilise': 32000.0,
                'date_debut': date(2024, 9, 1),
                'date_fin': date(2025, 8, 31),
                'localisation': 'Paris 19e',
                'categorie': 'Education',
                'priorite': 'haute'
            },
            {
                'organization_id': 2,
                'titre': 'Campagne Vaccination Mobile',
                'description': 'Déploiement d\'unités mobiles de vaccination dans les zones rurales',
                'objectif': 'Vacciner 5000 personnes dans 20 communes rurales',
                'statut': 'en_cours',
                'budget_total': 120000.0,
                'budget_utilise': 78000.0,
                'date_debut': date(2024, 6, 1),
                'date_fin': date(2025, 5, 31),
                'localisation': 'Auvergne-Rhône-Alpes',
                'categorie': 'Sante',
                'priorite': 'haute'
            },
            {
                'organization_id': 3,
                'titre': 'Marché Bio Local',
                'description': 'Création d\'un marché de producteurs locaux bio chaque semaine',
                'objectif': 'Promouvoir l\'agriculture locale et circuits courts',
                'statut': 'termine',
                'budget_total': 45000.0,
                'budget_utilise': 44500.0,
                'date_debut': date(2024, 1, 15),
                'date_fin': date(2024, 12, 15),
                'localisation': 'Marseille',
                'categorie': 'Agriculture',
                'priorite': 'moyenne'
            },
            {
                'organization_id': 1,
                'titre': 'Bibliothèque Communautaire',
                'description': 'Aménagement d\'une bibliothèque dans un local associatif',
                'objectif': 'Créer un espace de lecture et d\'étude accessible à tous',
                'statut': 'en_attente',
                'budget_total': 25000.0,
                'budget_utilise': 0.0,
                'date_debut': date(2025, 1, 1),
                'date_fin': date(2025, 6, 30),
                'localisation': 'Paris 20e',
                'categorie': 'Culture',
                'priorite': 'moyenne'
            }
        ]
        
        projects = []
        for project_data in projects_data:
            project = Project(**project_data)
            db.session.add(project)
            projects.append(project)
        
        db.session.commit()
        print(f"✅ {len(projects)} projets créés")
        
        # 7. Créer des transactions financières
        transactions_data = [
            {
                'project_id': 1, 'montant': 50000.0, 'type': 'recette',
                'date': date(2024, 9, 15), 'mode_paiement': 'virement',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 1,
                'justificatif_url': '/uploads/subvention_mairie_paris.pdf'
            },
            {
                'project_id': 1, 'montant': 15000.0, 'type': 'depense',
                'date': date(2024, 10, 5), 'mode_paiement': 'carte',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 1,
                'justificatif_url': '/uploads/achat_materiel_informatique.pdf'
            },
            {
                'project_id': 1, 'montant': 17000.0, 'type': 'depense',
                'date': date(2024, 11, 12), 'mode_paiement': 'cheque',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 1,
                'justificatif_url': '/uploads/amenagement_local.pdf'
            },
            {
                'project_id': 2, 'montant': 80000.0, 'type': 'recette',
                'date': date(2024, 6, 10), 'mode_paiement': 'virement',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 3,
                'justificatif_url': '/uploads/subvention_region.pdf'
            },
            {
                'project_id': 2, 'montant': 35000.0, 'type': 'depense',
                'date': date(2024, 7, 20), 'mode_paiement': 'virement',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 3,
                'justificatif_url': '/uploads/achat_vehicules_medicaux.pdf'
            },
            {
                'project_id': 2, 'montant': 43000.0, 'type': 'depense',
                'date': date(2024, 9, 30), 'mode_paiement': 'virement',
                'statut_validation': 'valide', 'utilisateur_enregistrement': 3,
                'justificatif_url': '/uploads/salaires_personnel_medical.pdf'
            }
        ]
        
        for transaction_data in transactions_data:
            transaction = ProjectTransaction(**transaction_data)
            db.session.add(transaction)
        
        db.session.commit()
        print(f"✅ {len(transactions_data)} transactions créées")
        
        # 8. Créer des liens projet-partenaire
        project_partner_links_data = [
            {
                'project_id': 1, 'partner_id': 1, 'statut_demande': 'accepte',
                'date_demande': date(2024, 8, 15), 'date_reponse': date(2024, 8, 25),
                'commentaires': 'Projet approuvé - Subvention accordée'
            },
            {
                'project_id': 2, 'partner_id': 3, 'statut_demande': 'accepte',
                'date_demande': date(2024, 5, 10), 'date_reponse': date(2024, 5, 20),
                'commentaires': 'Financement régional accordé pour projet de santé'
            },
            {
                'project_id': 4, 'partner_id': 2, 'statut_demande': 'en_cours',
                'date_demande': date(2024, 12, 1),
                'commentaires': 'Demande en cours d\'évaluation'
            }
        ]
        
        for link_data in project_partner_links_data:
            link = ProjectPartnerLink(**link_data)
            db.session.add(link)
        
        db.session.commit()
        print(f"✅ {len(project_partner_links_data)} liens projet-partenaire créés")
        
        # 9. Créer des feedbacks
        feedbacks_data = [
            {
                'project_id': 1, 'user_id': 4, 'note': 5,
                'commentaire': 'Excellent projet ! Ma fille a pu apprendre l\'informatique grâce à vous.',
                'date': date(2024, 11, 15), 'type_feedback': 'citoyen'
            },
            {
                'project_id': 2, 'user_id': 2, 'note': 4,
                'commentaire': 'Bon déploiement, quelques améliorations possibles sur la communication.',
                'date': date(2024, 10, 8), 'type_feedback': 'partenaire'
            },
            {
                'project_id': 3, 'user_id': 4, 'note': 5,
                'commentaire': 'Le marché bio a transformé notre quartier ! Merci.',
                'date': date(2024, 12, 20), 'type_feedback': 'citoyen'
            }
        ]
        
        for feedback_data in feedbacks_data:
            feedback = ProjectFeedback(**feedback_data)
            db.session.add(feedback)
        
        db.session.commit()
        print(f"✅ {len(feedbacks_data)} feedbacks créés")
        
        # 10. Créer quelques messages
        messages_data = [
            {
                'sender_id': 2, 'receiver_id': 1, 'project_id': 1,
                'message': 'Bonjour, pouvez-vous nous envoyer le rapport d\'avancement du projet École Numérique ?',
                'date': datetime(2024, 11, 20, 14, 30), 'lu': True, 'type_message': 'texte'
            },
            {
                'sender_id': 1, 'receiver_id': 2, 'project_id': 1,
                'message': 'Bien sûr ! Je vous envoie le rapport cette semaine. Le projet avance très bien.',
                'date': datetime(2024, 11, 21, 9, 15), 'lu': False, 'type_message': 'texte'
            }
        ]
        
        for message_data in messages_data:
            message = Messaging(**message_data)
            db.session.add(message)
        
        db.session.commit()
        print(f"✅ {len(messages_data)} messages créés")
        
        print("\n🎉 Base de données peuplée avec succès !")
        print("\n📊 Résumé des données créées :")
        print(f"   - {len(users)} utilisateurs")
        print(f"   - {len(organizations)} organisations") 
        print(f"   - {len(org_members_data)} membres d'organisations")
        print(f"   - {len(resources_data)} ressources")
        print(f"   - {len(partners)} partenaires")
        print(f"   - {len(projects)} projets")
        print(f"   - {len(transactions_data)} transactions")
        print(f"   - {len(project_partner_links_data)} liens projet-partenaire")
        print(f"   - {len(feedbacks_data)} feedbacks")
        print(f"   - {len(messages_data)} messages")
        
        print("\n🔑 Comptes de test disponibles :")
        print("   - admin_oc: jean.dupont@oc1.com / password123")
        print("   - partenaire: sophie.martin@partenaire.com / password123") 
        print("   - admin_oc: amadou.diallo@oc2.com / password123")
        print("   - citoyen: fatima.benali@citoyen.com / password123")

if __name__ == "__main__":
    populate_database()
