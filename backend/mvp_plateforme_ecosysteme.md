MVP – Plateforme Écosystème Communautaire

---

## 1️⃣ Objectif du MVP

Le MVP doit permettre :
- aux **OC** : gérer leurs membres, projets, finances, ressources humaines et matérielles, et publier des informations transparentes ;
- aux **partenaires / sponsors** : consulter les projets, suivre les fonds et interagir avec les OC ;
- à la **population / citoyens** : observer la transparence et donner un feedback simple.

---

## 2️⃣ Modules inclus dans le MVP

| Module | Fonctionnalités essentielles pour le MVP | Priorité |
|--------|----------------------------------------|----------|
| **Gestion interne OC** | - Gestion des membres et rôles<br>- Gestion des projets et activités<br>- Suivi simplifié des finances (recettes/dépenses)<br>- **Gestion des ressources (humaines & matérielles)**<br>- Rapports financiers et d’activité automatiques | Haute |
| **Transparence et redevabilité** | - Publication des projets et état d’avancement<br>- Historique des transactions financières (avec justificatifs uploadés)<br>- Feedback / notation simple des bénéficiaires | Haute |
| **Mise en relation OC ↔ partenaires** | - Catalogue / vitrine des projets<br>- Demande de financement simple (soumission → validation/refus)<br>- Messagerie basique entre OC et partenaires | Moyenne |
| **Assistant juridique IA (version light)** | - FAQ basique sur obligations légales<br>- Notifications pour échéances importantes (AG, déclarations) | Moyenne |
| **Interopérabilité minimale** | - Export CSV ou PDF des projets et transactions pour partenaires / autorités | Basse |

---

## 3️⃣ Technologies prioritaires pour le MVP

| Composant | Technologie recommandée | Justification |
|-----------|-----------------------|---------------|
| Frontend | React | Interface moderne et réactive, développement rapide |
| Backend | Django (Python) | Compatible avec OpenCommunityManager2, bonne gestion multi-org |
| Base de données | PostgreSQL | Relationnel fiable pour gestion multi-OC et transactions |
| Authentification | OAuth2 / SSO simplifié | Sécurisation des accès, gestion multi-acteurs |
| Stockage fichiers | Serveur + S3 / cloud storage | Pour justificatifs et documents transparents |

---

## 4️⃣ Livrables du MVP
1. Interface OC fonctionnelle pour gestion interne et gestion des ressources.
2. Tableau de transparence des projets et finances.
3. Interface partenaire pour consultation et validation des projets.
4. Messagerie basique pour communication OC ↔ partenaires.
5. FAQ et notifications IA pour obligations légales.
6. Export des rapports (PDF/CSV) pour autorités et sponsors.

