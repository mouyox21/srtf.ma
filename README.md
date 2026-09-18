# 🏗️ SRTF — Site Vitrine & Plateforme de Contact

> **Société Réalisations Travaux et Formations (SRTF)**  
> Site web institutionnel statique et hautement performant pour l'entreprise SRTF, basée à Mohammédia, Maroc.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)

---

## 📑 Sommaire

- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités principales](#-fonctionnalités-principales)
- [Structure du projet](#-structure-du-projet)
- [Prérequis & Installation locale](#-prérequis--installation-locale)
- [Variables d'environnement](#-variables-denvironnement)
- [Déploiement sur Vercel](#-déploiement-sur-vercel)
- [Sécurité & Performance](#-sécurité--performance)
- [Contact & Support](#-contact--support)

---

## ℹ️ À propos du projet

Ce dépôt contient le code source du site officiel de **SRTF (Société Réalisations Travaux et Formations)**.  
SRTF accompagne les entreprises industrielles à Mohammédia et au Maroc dans :
- **Travaux industriels & Maintenance**
- **Conformité & Conseil QHSE**
- **Formations professionnelles certifiantes**
- **Fourniture d'équipements & Matériaux de protection**

Le site a été conçu pour offrir des temps de chargement ultra-rapides, une sécurité renforcée et un référencement naturel (SEO) optimal sans la lourdeur d'un CMS traditionnel.

---

## ✨ Fonctionnalités principales

- 📱 **Interface responsive & Moderne** : Design soigné avec la typographie Oswald, IBM Plex Mono & Inter.
- ⚡ **Performances maximales** : Assets optimisés (WebP + JPEG fallback, mise en cache immutable).
- ✉️ **Formulaire de Contact Serverless** : Traitement sécurisé des messages via une fonction Serverless Vercel (`/api/contact`) intégrée avec l'API [Resend](https://resend.com).
- 🔍 **SEO Avancé & Données Structurées** : Graph JSON-LD (`LocalBusiness`), cartes OpenGraph, Twitter Cards, `sitemap.xml` et `robots.txt`.
- 🛡️ **Sécurité renforcée** : En-têtes HTTP de sécurité (CSP strict, HSTS, X-Frame-Options, Referrer-Policy, etc.) configurés dans `vercel.json`.

---

## 📁 Structure du projet

```text
srtf/
├── api/
│   └── contact.js          # Fonction Serverless Vercel pour l'envoi d'e-mails (Resend)
├── assets/
│   ├── images/             # Photographies d'illustrations (WebP + JPEG)
│   ├── srtf-favicon.png    # Favicon du site
│   ├── srtf-logo-full.jpeg # Logo complet (OpenGraph & Schema.org)
│   └── srtf-logo-header.*  # Logo d'en-tête (WebP & JPEG)
├── index.html              # Page unique (HTML, styles CSS embarqués & interactions JS)
├── robots.txt              # Directives d'indexation pour les moteurs de recherche
├── sitemap.xml             # Carte du site pour le référencement naturel
├── vercel.json             # Configuration Vercel (URLs propres, headers HTTP & cache)
└── .env.example            # Modèle de configuration des variables d'environnement
```

---

## 🚀 Prérequis & Installation locale

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- Un compte [Vercel](https://vercel.com) (optionnel, pour tester l'API localement)

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-compte/srtf.git
cd srtf
```

### 2. Tester l'interface (Site statique)
Pour prévisualiser le site visuellement sans la fonction de contact :
```bash
npx serve .
```
Le site sera accessible sur `http://localhost:3000`.

### 3. Tester avec la fonction Serverless (Formulaire de contact)
Pour tester l'envoi réel de mails via l'API `/api/contact` :
```bash
npx vercel dev
```
Cela lancera l'environnement de développement Vercel intégrant l'exécution des fonctions serverless Node.js localement.

---

## 🔑 Variables d'environnement

Pour exécuter le formulaire de contact, créez un fichier `.env.local` à la racine du projet en vous basant sur `.env.example` :

```bash
cp .env.example .env.local
```

Remplissez les variables suivantes :

| Variable | Obligatoire | Description |
| :--- | :---: | :--- |
| `RESEND_API_KEY` | **Oui** | Clé d'API obtenue sur [Resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | **Oui** | Adresse e-mail destinataire qui recevra les messages des clients |
| `CONTACT_FROM_EMAIL` | Non | Expéditeur du mail (ex: `onboarding@resend.dev` ou domaine vérifié) |

> ⚠️ **Note** : Sans ces variables, la route `/api/contact` renverra un code HTTP `503 Service Unavailable`.

---

## 🌐 Déploiement sur Vercel

### Option 1 : Déploiement via Git (Recommandé)

1. Poussez le code sur votre dépôt Git (GitHub, GitLab, ou Bitbucket).
2. Connectez le dépôt à votre tableau de bord **Vercel**.
3. Dans **Project Settings > Environment Variables**, ajoutez :
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (si applicable)
4. Conserver le Preset **Other** et laissez la commande de build vide. Vercel détectera automatiquement la fonction `/api/contact.js`.
5. Validez le déploiement.

### Option 2 : Déploiement en ligne de commande (Vercel CLI)

Déploiement en environnement de Preview :
```bash
npx vercel
```

Déploiement direct en Production :
```bash
npx vercel --prod
```

---

## 🛡️ Sécurité & Performance

Les en-têtes HTTP de sécurité et de mise en cache suivants sont configurés dans `vercel.json` :

- **Content-Security-Policy (CSP)** : Restriction stricte des sources de scripts et de contenus autorisés.
- **Strict-Transport-Security (HSTS)** : Injonction HTTPS sur 2 ans avec sous-domaines et préchargement.
- **X-Frame-Options** : `DENY` pour prévenir les attaques par Clickjacking.
- **X-Content-Type-Options** : `nosniff` pour éviter la mauvaise interprétation du MIME-type.
- **Cache-Control** : Gestion fine avec `public, max-age=31536000, immutable` pour les ressources statiques (`/assets/`).

---

## 📞 Contact & Support

**Société Réalisations Travaux et Formations (SRTF)**  
📍 Mohammédia, Maroc  
🌐 Site Web : [www.srtf.ma](https://www.srtf.ma/)  
👤 Directeur Général : Wissame Rifak  

---
*Développé avec soin pour SRTF.*
