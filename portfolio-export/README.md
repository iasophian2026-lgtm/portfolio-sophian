# Portfolio — Sophian Abdessadok

Site portfolio statique (HTML/CSS/JS pur, zéro dépendance).

## Lancer en local
Il faut un serveur local (le composant image charge `.image-slots.state.json` via fetch) :

    python3 -m http.server 8000

Puis ouvrir http://localhost:8000

## Mettre en ligne
Déposer tout le dossier sur un hébergeur statique : Netlify, Vercel,
GitHub Pages ou Cloudflare Pages.

## Structure
- index.html              : page principale
- assets/styles.css       : styles
- assets/data.js          : contenu du portfolio
- assets/engine.js        : moteur d'interaction
- assets/image-slot.js    : composant image (drop + persistance)
- .image-slots.state.json : visuels projets + logo
