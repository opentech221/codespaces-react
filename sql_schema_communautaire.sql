-- SQL Schema for Community Platform
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50),
    statut VARCHAR(50),
    date_creation TIMESTAMP,
    dernier_login TIMESTAMP,
    telephone VARCHAR(50),
    photo_profil_url TEXT
);

CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200),
    type VARCHAR(100),
    statut_juridique VARCHAR(100),
    date_creation DATE,
    adresse TEXT,
    contact_email VARCHAR(100),
    contact_tel VARCHAR(50),
    description TEXT,
    site_web TEXT,
    logo_url TEXT,
    statut_actif BOOLEAN DEFAULT TRUE
);

CREATE TABLE organization_members (
    id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(id),
    user_id INT REFERENCES user(id),
    role VARCHAR(100),
    date_joined DATE,
    date_left DATE,
    statut VARCHAR(50),
    observations TEXT
);

CREATE TABLE organization_resources (
    id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(id),
    type VARCHAR(50),
    description TEXT,
    quantite INT,
    statut VARCHAR(50),
    localisation TEXT,
    date_acquisition DATE,
    valeur_estimee NUMERIC
);

CREATE TABLE partner (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(200),
    type VARCHAR(100),
    contact_email VARCHAR(100),
    contact_tel VARCHAR(50),
    adresse TEXT,
    site_web TEXT,
    description TEXT,
    statut_actif BOOLEAN DEFAULT TRUE
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(id),
    titre VARCHAR(200),
    description TEXT,
    objectif TEXT,
    statut VARCHAR(50),
    budget_total NUMERIC,
    budget_utilise NUMERIC,
    date_debut DATE,
    date_fin DATE,
    localisation TEXT,
    categorie VARCHAR(100),
    priorite VARCHAR(50),
    risques_identifies TEXT
);

CREATE TABLE project_activity (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES project(id),
    titre VARCHAR(200),
    description TEXT,
    date_debut DATE,
    date_fin DATE,
    statut VARCHAR(50),
    responsable_id INT REFERENCES user(id),
    ressources_utilisees TEXT
);

CREATE TABLE project_transaction (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES project(id),
    montant NUMERIC,
    type VARCHAR(50),
    date DATE,
    justificatif_url TEXT,
    mode_paiement VARCHAR(50),
    statut_validation VARCHAR(50),
    utilisateur_enregistrement INT REFERENCES user(id)
);

CREATE TABLE project_feedback (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES project(id),
    user_id INT REFERENCES user(id),
    note NUMERIC,
    commentaire TEXT,
    date TIMESTAMP,
    type_feedback VARCHAR(50)
);

CREATE TABLE project_partner_link (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES project(id),
    partner_id INT REFERENCES partner(id),
    statut_demande VARCHAR(50),
    date_demande DATE,
    date_reponse DATE,
    commentaires TEXT
);

CREATE TABLE messaging (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES user(id),
    receiver_id INT REFERENCES user(id),
    project_id INT REFERENCES project(id),
    message TEXT,
    date TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    type_message VARCHAR(50)
);

CREATE TABLE legal_doc_templates (
    id SERIAL PRIMARY KEY,
    type_doc VARCHAR(100),
    contenu TEXT,
    date_creation TIMESTAMP,
    date_modification TIMESTAMP,
    auteur_id INT REFERENCES user(id),
    statut_actif BOOLEAN DEFAULT TRUE
);

CREATE TABLE legal_notifications (
    id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(id),
    type_notif VARCHAR(100),
    message TEXT,
    date_envoi TIMESTAMP,
    statut VARCHAR(50),
    niveau_urgence VARCHAR(50)
);

CREATE TABLE user_activity_log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user(id),
    action VARCHAR(200),
    details TEXT,
    date TIMESTAMP,
    ip_address VARCHAR(50),
    device VARCHAR(100)
);
