# Kinoki Detox Bouake

Landing page e-commerce statique, mobile-first et orientee conversion pour la vente des patchs `Kinoki Detox` depuis `Bouake`, avec validation de commande directe sur `WhatsApp`.

Le projet est concu pour etre simple, rapide a charger et facile a modifier, en particulier pour un usage mobile en Cote d'Ivoire.

## Apercu

La page contient :

- une section hero avec message commercial et visuel produit
- une galerie produit
- une section avantages
- une carte video "Comment ca marche ?"
- un formulaire de commande ultra simple
- une redirection automatique vers WhatsApp avec message pre-rempli
- un bouton sticky mobile en bas de l'ecran

## Objectif business

Cette landing page a ete pensee pour :

- rassurer rapidement le visiteur
- montrer le produit avec de vraies images
- simplifier la prise de commande
- pousser l'utilisateur vers WhatsApp au lieu d'un tunnel complexe
- rester tres legere et rapide sur mobile

## Stack technique

Le projet utilise :

- `index.html` comme point d'entree principal
- `Tailwind CSS` via CDN
- `JavaScript Vanilla` pour les interactions
- `Vite` comme serveur local de developpement

Important :

- la page marketing active est dans `index.html`
- il reste encore des fichiers React dans `src/`, mais la landing page actuelle repose sur `index.html`

## Lancer le projet en local

### Prerequis

- `Node.js` installe

### Installation

```bash
npm install
```

### Demarrage

Sous PowerShell, selon la configuration du systeme, `npm` peut etre bloque. Si c'est le cas, utilisez :

```bash
npm.cmd run dev
```

Sinon :

```bash
npm run dev
```

Le site sera disponible sur :

```txt
http://localhost:3000
```

## Structure du projet

```txt
Kinoki/
├── index.html
├── k1.jpg
├── k2.jpg
├── k3.jpg
├── k4.jpg
├── k5.jpg
├── k6.png
├── package.json
├── package-lock.json
├── src/
└── README.md
```

## Role des images

Les images actuellement branchees dans la landing page sont :

- `k1.jpg` a `k4.jpg` : galerie produit et visuel principal
- `k5.jpg` : image/logo dans le header
- `k6.png` : favicon de l'onglet navigateur

## Personnalisation rapide

### 1. Modifier le texte commercial

Editez directement `index.html`.

Les zones principales a personnaliser sont :

- le titre hero
- le sous-titre
- les avantages
- la section video
- les textes de reassurance
- le formulaire

### 2. Modifier le numero WhatsApp

Dans `index.html`, recherchez :

```js
https://wa.me/2250709905419
```

Remplacez `2250709905419` par le numero voulu au format international sans `+`.

Exemple :

```txt
2250700000000
```

### 3. Modifier le message WhatsApp envoye

Le message est genere dans le script en bas de `index.html`.

Format actuel :

```txt
Bonjour ! Je souhaite commander [Quantite] boite(s) de Kinoki Detox. 📍 Livraison a : [Ville] / [Quartier]. 👤 Client : [Nom]. Merci de me confirmer le montant total avec l'expedition depuis Bouake.
```

Vous pouvez le raccourcir, le rendre plus commercial, ou ajouter des informations comme :

- moyen de paiement
- heure souhaitee
- mode de livraison

### 4. Modifier les images

Vous pouvez remplacer les fichiers existants :

- `k1.jpg`
- `k2.jpg`
- `k3.jpg`
- `k4.jpg`
- `k5.jpg`
- `k6.png`

Si vous gardez les memes noms, aucun autre changement n'est necessaire.

### 5. Modifier la video TikTok

Dans `index.html`, recherchez :

```txt
https://vm.tiktok.com/ZMAnDNQvK/
```

Remplacez ce lien par votre nouvelle URL TikTok.

## Fonctionnement du formulaire

Le formulaire collecte :

- nom complet
- ville
- quartier precis
- quantite de boites

Quand l'utilisateur clique sur `Valider ma commande` :

1. les valeurs sont recuperees
2. un message WhatsApp est construit automatiquement
3. le message est encode
4. une nouvelle fenetre ou un nouvel onglet WhatsApp s'ouvre

## Sections principales de la page

### Header

- logo image avec `k5.jpg`
- bouton rapide `Commander`

### Hero

- promesse marketing principale
- mise en avant du stock limite
- CTA principal
- bouton de video
- visuel produit principal

### Galerie produit

- affiche les photos `k1.jpg` a `k4.jpg`
- sert a rassurer et montrer le produit reel

### Comment ca marche

- bloc explicatif
- bouton visible vers la video TikTok

### Commande

- formulaire de commande
- message WhatsApp pre-rempli
- informations logistiques

### Sticky mobile button

- visible en bas de l'ecran sur mobile
- permet de revenir vite a la section commande

## Animations

Des animations legeres ont ete ajoutees pour garder un rendu moderne sans ralentir la page :

- apparition douce du hero
- flottement leger du bloc visuel principal
- pulsation du bouton principal
- animation d'entree de la galerie

Un support `prefers-reduced-motion` est present pour limiter les animations sur les appareils ou l'utilisateur prefere moins de mouvement.

## SEO et performance

Le projet est volontairement simple pour rester rapide :

- une seule page
- pas de backend
- pas de base de donnees
- pas de framework frontend requis pour la page active
- peu de JavaScript
- images locales

Pour aller plus loin :

- compresser les images en `webp`
- reduire la taille des fichiers `jpg/png`
- ajouter les balises Open Graph
- ajouter une meta description encore plus commerciale

## Deploiement

Comme il s'agit d'une page statique, vous pouvez la deployer facilement sur :

- Vercel
- Netlify
- GitHub Pages
- un hebergement statique classique

### Build

Si votre environnement local accepte la commande :

```bash
npm.cmd run build
```

ou

```bash
npm run build
```

Note :

dans certains environnements PowerShell ou sandbox, `vite build` peut echouer a cause de restrictions systeme sur `npm.ps1` ou `esbuild`. Ce n'est pas forcement un probleme du code.

## Maintenance

Pour garder la page propre dans le temps :

- remplacez les anciennes photos par des photos reelles et nettes
- gardez un texte simple et direct
- verifiez regulierement que le lien TikTok fonctionne
- verifiez regulierement le numero WhatsApp
- testez la page sur telephone apres chaque modification

## Prochaines ameliorations possibles

- miniatures cliquables sous l'image principale
- carrousel mobile leger
- section temoignages clients
- compteur de stock
- integration Facebook Pixel ou Meta Pixel
- integration Google Analytics
- bouton d'appel direct en plus de WhatsApp

## Nettoyage technique possible

Le projet contient encore des fichiers issus d'une ancienne structure React, notamment dans `src/`.

Ils ne sont pas indispensables au fonctionnement actuel de la landing page si vous utilisez seulement `index.html`.

Un nettoyage futur peut consister a :

- retirer le code React inutilise
- simplifier `package.json`
- garder uniquement le minimum pour servir la page

## Auteur / usage

Projet de landing page pour vente locale de `Kinoki Detox` a `Bouake`, avec prise de commande directe via `WhatsApp`.

---

Si vous voulez aller plus loin, la meilleure suite logique est :

1. optimiser les images
2. ajouter des miniatures interactives
3. supprimer l'ancien code React inutile
4. preparer un deploiement propre
