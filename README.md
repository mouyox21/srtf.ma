# Site SRTF

Site vitrine statique de la Société Réalisations Travaux et Formations.

## Structure

- `index.html` : page principale, styles et interactions
- `assets/images/` : photographies du site (JPEG + WebP)
- `api/contact.js` : fonction serverless Vercel qui relaie le formulaire de contact par e-mail (Resend)
- `robots.txt`, `sitemap.xml` : SEO technique
- `vercel.json` : configuration de déploiement et en-têtes HTTP (sécurité, cache)
- `.env.example` : variables d'environnement nécessaires au formulaire de contact

## Tester localement

Le site étant statique, un simple serveur suffit pour l'aperçu visuel :

```powershell
npx serve .
```

Pour tester également le formulaire de contact (fonction serverless `/api/contact`), utiliser la CLI Vercel :

```powershell
npx vercel dev
```

Le site peut aussi être ouvert directement avec `index.html`, mais le formulaire de contact ne fonctionnera pas sans serveur (route `/api/contact` indisponible).

## Variables d'environnement

Copier `.env.example` vers `.env.local` puis renseigner :

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com) utilisée par `/api/contact` pour envoyer les messages par e-mail. |
| `CONTACT_TO_EMAIL` | Adresse e-mail qui reçoit les demandes du formulaire. |
| `CONTACT_FROM_EMAIL` | (optionnel) Adresse/expéditeur affiché, doit être un domaine vérifié dans Resend. |

Sans ces variables, `/api/contact` répond `503` et le site affiche un message d'indisponibilité — aucune information n'est perdue mais l'e-mail n'est pas envoyé.

À configurer dans **Vercel → Project → Settings → Environment Variables** pour les environnements Production et Preview.

## Déployer sur Vercel

### Depuis Git

1. Publier ce dossier dans un dépôt GitHub, GitLab ou Bitbucket.
2. Importer le dépôt dans Vercel.
3. Conserver le preset **Other** et le dossier racine `.`.
4. Laisser les commandes de build et le dossier de sortie vides (site statique, `api/contact.js` est détecté automatiquement comme fonction serverless).
5. Renseigner les variables d'environnement ci-dessus.
6. Lancer le déploiement.

### Depuis la ligne de commande

```powershell
npx vercel
```

Pour publier ensuite en production :

```powershell
npx vercel --prod
```

Avant la mise en production définitive, compléter les coordonnées de contact directes (e-mail, téléphone, LinkedIn) dans la section Contact de `index.html`, actuellement en attente (voir commentaire dans le code).
