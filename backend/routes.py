# backend/routes.py

from flask import Blueprint, jsonify, request # type: ignore
from database import db
from models import User, Organization, OrganizationMember, OrganizationResource, Partner, Project, ProjectActivity, ProjectTransaction, ProjectFeedback, ProjectPartnerLink, Messaging, LegalDocTemplate, LegalNotification, UserActivityLog
import jwt
import datetime
from flask import current_app # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

main_bp = Blueprint('main', __name__)

# Endpoint de santé pour tester la connexion
@main_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Backend API fonctionnel",
        "version": "1.0.0"
    })

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'error': 'Token manquant'}), 401
        try:
            data = jwt.decode(token, current_app.config.get('SECRET_KEY', 'devsecret'), algorithms=['HS256'])
            current_user_id = data['user_id']
        except Exception as e:
            return jsonify({'error': 'Token invalide'}), 401
        return f(*args, **kwargs)
    return decorated

@main_bp.route('/')
def index():
    return jsonify({"message": "Bienvenue sur l'API Écosystème Communautaire (Flask)"})

# ======= AUTHENTIFICATION =======

@main_bp.route('/auth/register', methods=['POST'])
def register():
    """Inscription d'un nouvel utilisateur"""
    try:
        data = request.json
        
        # Validation des données requises
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email et mot de passe requis'}), 400
            
        # Vérifier si l'utilisateur existe déjà
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'error': 'Un utilisateur avec cet email existe déjà'}), 409
            
        # Créer le nouvel utilisateur
        hashed_password = generate_password_hash(data.get('password'))
        user = User(
            nom=data.get('nom', ''),
            prenom=data.get('prenom', ''),
            email=data.get('email'),
            password_hash=hashed_password,
            role=data.get('role', 'user'),
            statut='actif',
            date_creation=datetime.datetime.utcnow(),
            telephone=data.get('telephone', ''),
            photo_profil_url=data.get('photo_profil_url', '')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'Utilisateur créé avec succès',
            'user_id': user.id,
            'email': user.email
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erreur lors de la création: {str(e)}'}), 500

@main_bp.route('/auth/login', methods=['POST'])
def login():
    """Connexion utilisateur"""
    try:
        data = request.json
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email et mot de passe requis'}), 400
            
        # Rechercher l'utilisateur
        user = User.query.filter_by(email=data.get('email')).first()
        
        if not user or not check_password_hash(user.password_hash, data.get('password')):
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
            
        if user.statut != 'actif':
            return jsonify({'error': 'Compte désactivé'}), 401
            
        # Générer le token JWT
        token = jwt.encode({
            'user_id': user.id,
            'email': user.email,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, current_app.config.get('SECRET_KEY', 'devsecret'), algorithm='HS256')
        
        return jsonify({
            'message': 'Connexion réussie',
            'token': token,
            'user': {
                'id': user.id,
                'nom': user.nom,
                'prenom': user.prenom,
                'email': user.email,
                'role': user.role
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la connexion: {str(e)}'}), 500

@main_bp.route('/auth/profile', methods=['GET'])
@token_required
def get_profile():
    """Récupérer le profil de l'utilisateur connecté"""
    try:
        # Extraire l'ID utilisateur du token
        token = request.headers['Authorization'].split(' ')[1]
        data = jwt.decode(token, current_app.config.get('SECRET_KEY', 'devsecret'), algorithms=['HS256'])
        user_id = data['user_id']
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        return jsonify({
            'user': {
                'id': user.id,
                'nom': user.nom,
                'prenom': user.prenom,
                'email': user.email,
                'role': user.role,
                'telephone': user.telephone,
                'date_creation': user.date_creation.isoformat() if user.date_creation else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la récupération du profil: {str(e)}'}), 500

# ======= GESTION DES UTILISATEURS =======
@main_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(
        name=data.get('name'),
        email=data.get('email'),
        password_hash=data.get('password'),
        role=data.get('role'),
        status='active',
        creation_date=data.get('creation_date'),
        phone=data.get('phone'),
        profile_photo_url=data.get('profile_photo_url')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id, "name": user.name, "email": user.email}), 201

# Endpoint pour lister les utilisateurs
@main_bp.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([
        {"id": u.id, "name": u.name, "email": u.email, "role": u.role} for u in users
    ])

# Endpoint pour créer une organisation
@main_bp.route('/organizations', methods=['POST'])
def create_organization():
    data = request.json
    org = Organization(
        name=data.get('name'),
        type=data.get('type'),
        legal_status=data.get('legal_status'),
        address=data.get('address'),
        contact_email=data.get('contact_email'),
        contact_tel=data.get('contact_tel'),
        description=data.get('description'),
        website=data.get('website'),
        logo_url=data.get('logo_url'),
        active_status=True
    )
    db.session.add(org)
    db.session.commit()
    return jsonify({"id": org.id, "name": org.name}), 201

# Endpoint pour lister les organisations
@main_bp.route('/organizations', methods=['GET'])
def list_organizations():
    orgs = Organization.query.all()
    return jsonify([
        {"id": o.id, "nom": o.nom, "type": o.type} for o in orgs
    ])

# Endpoint CRUD Organimember
@main_bp.route('/organimembers', methods=['POST'])
def create_organimember():
    data = request.json
    member = OrganizationMember(
        organization_id=data.get('organization_id'),
        user_id=data.get('user_id'),
        role=data.get('role'),
        date_joined=data.get('date_joined'),
        date_left=data.get('date_left'),
        statut=data.get('statut'),
        observations=data.get('observations')
    )
    db.session.add(member)
    db.session.commit()
    return jsonify({"id": member.id, "role": member.role}), 201

@main_bp.route('/organimembers', methods=['GET'])
def list_organimembers():
    members = OrganizationMember.query.all()
    return jsonify([
        {"id": m.id, "organization_id": m.organization_id, "user_id": m.user_id, "role": m.role} for m in members
    ])

# Endpoint CRUD ProjectActivity
@main_bp.route('/projectactivities', methods=['POST'])
def create_projectactivity():
    data = request.json
    activity = ProjectActivity(
        project_id=data.get('project_id'),
        titre=data.get('titre'),
        description=data.get('description'),
        date_debut=data.get('date_debut'),
        date_fin=data.get('date_fin'),
        statut=data.get('statut'),
        responsable_id=data.get('responsable_id'),
        ressources_utilisees=data.get('ressources_utilisees')
    )
    db.session.add(activity)
    db.session.commit()
    return jsonify({"id": activity.id, "title": activity.title}), 201

@main_bp.route('/projectactivities', methods=['GET'])
def list_projectactivities():
    activities = ProjectActivity.query.all()
    return jsonify([
        {"id": a.id, "project_id": a.project_id, "titre": a.titre} for a in activities
    ])

# Endpoint CRUD Partner
@main_bp.route('/partners', methods=['POST'])
def create_partner():
    data = request.json
    partner = Partner(
        nom=data.get('nom'),
        type=data.get('type'),
        contact_email=data.get('contact_email'),
        contact_tel=data.get('contact_tel'),
        adresse=data.get('adresse'),
        site_web=data.get('site_web'),
        description=data.get('description'),
        statut_actif=True
    )
    db.session.add(partner)
    db.session.commit()
    return jsonify({"id": partner.id, "name": partner.name}), 201

@main_bp.route('/partners', methods=['GET'])
def list_partners():
    partners = Partner.query.all()
    return jsonify([
        {"id": p.id, "nom": p.nom, "type": p.type} for p in partners
    ])

# Endpoint CRUD ProjectPartnerLink
@main_bp.route('/projectpartnerlinks', methods=['POST'])
def create_projectpartnerlink():
    data = request.json
    link = ProjectPartnerLink(
        project_id=data.get('project_id'),
        partner_id=data.get('partner_id'),
        statut_demande=data.get('statut_demande'),
        date_demande=data.get('date_demande'),
        date_reponse=data.get('date_reponse'),
        commentaires=data.get('commentaires')
    )
    db.session.add(link)
    db.session.commit()
    return jsonify({"id": link.id, "project_id": link.project_id, "partner_id": link.partner_id}), 201

@main_bp.route('/projectpartnerlinks', methods=['GET'])
def list_projectpartnerlinks():
    links = ProjectPartnerLink.query.all()
    return jsonify([
        {"id": l.id, "project_id": l.project_id, "partner_id": l.partner_id, "statut_demande": l.statut_demande} for l in links
    ])

# Endpoint CRUD LegalDocTemplate
@main_bp.route('/legaldocuments', methods=['POST'])
def create_legaldocument():
    data = request.json
    doc = LegalDocTemplate(
        type_doc=data.get('type_doc'),
        contenu=data.get('contenu'),
        date_creation=data.get('date_creation'),
        date_modification=data.get('date_modification'),
        auteur_id=data.get('auteur_id'),
        statut_actif=True
    )
    db.session.add(doc)
    db.session.commit()
    return jsonify({"id": doc.id, "doc_type": doc.doc_type}), 201

@main_bp.route('/legaldocuments', methods=['GET'])
def list_legaldocuments():
    docs = LegalDocTemplate.query.all()
    return jsonify([
        {"id": d.id, "type_doc": d.type_doc, "auteur_id": d.auteur_id} for d in docs
    ])

# Endpoint CRUD LegalNotification
@main_bp.route('/legalnotifications', methods=['POST'])
def create_legalnotification():
    data = request.json
    notif = LegalNotification(
        organization_id=data.get('organization_id'),
        type_notif=data.get('type_notif'),
        message=data.get('message'),
        date_envoi=data.get('date_envoi'),
        statut=data.get('statut'),
        niveau_urgence=data.get('niveau_urgence')
    )
    db.session.add(notif)
    db.session.commit()
    return jsonify({"id": notif.id, "notif_type": notif.notif_type}), 201

@main_bp.route('/legalnotifications', methods=['GET'])
def list_legalnotifications():
    notifs = LegalNotification.query.all()
    return jsonify([
        {"id": n.id, "type_notif": n.type_notif, "organization_id": n.organization_id} for n in notifs
    ])

# Endpoint CRUD UserActivityLog
@main_bp.route('/useractivitylogs', methods=['POST'])
def create_useractivitylog():
    data = request.json
    log = UserActivityLog(
        user_id=data.get('user_id'),
        action=data.get('action'),
        details=data.get('details'),
        date=data.get('date'),
        ip_address=data.get('ip_address'),
        device=data.get('device')
    )
    db.session.add(log)
    db.session.commit()
    return jsonify({"id": log.id, "action": log.action}), 201

@main_bp.route('/useractivitylogs', methods=['GET'])
def list_useractivitylogs():
    logs = UserActivityLog.query.all()
    return jsonify([
        {"id": l.id, "user_id": l.user_id, "action": l.action, "date": l.date} for l in logs
    ])

# Endpoint CRUD OrganizationResource
@main_bp.route('/organizationresources', methods=['POST'])
def create_organizationresource():
    data = request.json
    resource = OrganizationResource(
        organization_id=data.get('organization_id'),
        type=data.get('type'),
        description=data.get('description'),
        quantite=data.get('quantite'),
        statut=data.get('statut'),
        localisation=data.get('localisation'),
        date_acquisition=data.get('date_acquisition'),
        valeur_estimee=data.get('valeur_estimee')
    )
    db.session.add(resource)
    db.session.commit()
    return jsonify({"id": resource.id, "type": resource.type}), 201

@main_bp.route('/organizationresources', methods=['GET'])
def list_organizationresources():
    resources = OrganizationResource.query.all()
    return jsonify([
        {"id": r.id, "organization_id": r.organization_id, "type": r.type} for r in resources
    ])

# Endpoint CRUD Project
@main_bp.route('/projects', methods=['POST'])
def create_project():
    data = request.json
    project = Project(
        organization_id=data.get('organization_id'),
        titre=data.get('titre'),
        description=data.get('description'),
        objectif=data.get('objectif'),
        statut=data.get('statut'),
        budget_total=data.get('budget_total'),
        budget_utilise=data.get('budget_utilise'),
        date_debut=data.get('date_debut'),
        date_fin=data.get('date_fin'),
        localisation=data.get('localisation'),
        categorie=data.get('categorie'),
        priorite=data.get('priorite'),
        risques_identifies=data.get('risques_identifies')
    )
    db.session.add(project)
    db.session.commit()
    return jsonify({"id": project.id, "titre": project.titre}), 201

@main_bp.route('/projects', methods=['GET'])
def list_projects():
    projects = Project.query.all()
    return jsonify([
        {"id": p.id, "titre": p.titre, "organization_id": p.organization_id} for p in projects
    ])

# Endpoint CRUD ProjectTransaction
@main_bp.route('/projecttransactions', methods=['POST'])
def create_projecttransaction():
    data = request.json
    transaction = ProjectTransaction(
        project_id=data.get('project_id'),
        montant=data.get('montant'),
        type=data.get('type'),
        date=data.get('date'),
        justificatif_url=data.get('justificatif_url'),
        mode_paiement=data.get('mode_paiement'),
        statut_validation=data.get('statut_validation'),
        utilisateur_enregistrement=data.get('utilisateur_enregistrement')
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({"id": transaction.id, "montant": transaction.montant}), 201

@main_bp.route('/projecttransactions', methods=['GET'])
def list_projecttransactions():
    transactions = ProjectTransaction.query.all()
    return jsonify([
        {"id": t.id, "montant": t.montant, "project_id": t.project_id} for t in transactions
    ])

# Endpoint CRUD ProjectFeedback
@main_bp.route('/projectfeedbacks', methods=['POST'])
def create_projectfeedback():
    data = request.json
    feedback = ProjectFeedback(
        project_id=data.get('project_id'),
        user_id=data.get('user_id'),
        note=data.get('note'),
        commentaire=data.get('commentaire'),
        date=data.get('date'),
        type_feedback=data.get('type_feedback')
    )
    db.session.add(feedback)
    db.session.commit()
    return jsonify({"id": feedback.id, "note": feedback.note}), 201

@main_bp.route('/projectfeedbacks', methods=['GET'])
def list_projectfeedbacks():
    feedbacks = ProjectFeedback.query.all()
    return jsonify([
        {"id": f.id, "note": f.note, "project_id": f.project_id, "user_id": f.user_id} for f in feedbacks
    ])

# Endpoint CRUD Messaging
@main_bp.route('/messages', methods=['POST'])
def create_message():
    data = request.json
    message = Messaging(
        sender_id=data.get('sender_id'),
        receiver_id=data.get('receiver_id'),
        project_id=data.get('project_id'),
        message=data.get('message'),
        date=data.get('date'),
        lu=data.get('lu', False),
        type_message=data.get('type_message')
    )
    db.session.add(message)
    db.session.commit()
    return jsonify({"id": message.id, "message": message.message}), 201

@main_bp.route('/messages', methods=['GET'])
def list_messages():
    messages = Messaging.query.all()
    return jsonify([
        {"id": m.id, "sender_id": m.sender_id, "receiver_id": m.receiver_id, "project_id": m.project_id, "lu": m.lu} for m in messages
    ])
