# Site SRTF

Site vitrine statique de la Société Réalisations Travaux et Formations.

## Structure

- `index.html` : page principale, styles et interactions
- `assets/images/` : photographies du site
- `vercel.json` : configuration de déploiement et en-têtes HTTP

## Tester localement

Depuis la racine du projet :

```powershell
npx serve .
```

Le site peut aussi être ouvert directement avec `index.html`.

## Déployer sur Vercel

### Depuis Git

1. Publier ce dossier dans un dépôt GitHub, GitLab ou Bitbucket.
2. Importer le dépôt dans Vercel.
3. Conserver le preset **Other** et le dossier racine `.`.
4. Laisser les commandes de build et le dossier de sortie vides.
5. Lancer le déploiement.

### Depuis la ligne de commande

```powershell
npx vercel
```

Pour publier ensuite en production :

```powershell
npx vercel --prod
```

Avant la mise en production définitive, compléter les coordonnées de contact et connecter le formulaire à un service d'envoi.
