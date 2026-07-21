# Ajout d’images speakers / badges (Cursor Bénin Meetup)

Quand tu fournis les photos ici dans le chat :

## Intervenants (flyers designer)

- **Pas de génération de cartes** : on affiche les JPG fournis par le designer.
- Placeholder actuel : `public/templates/flyer-animateur.jpg` pour tous (`src/data/speakers.ts`).
- Section **commentée** sur la home (`src/app/page.tsx`) tant que tous les flyers ne sont pas livrés.
- Pour publier : décommenter `SpeakersSection` + lien nav `#intervenants`, et remplacer chaque `flyerSrc`.

## Badges manuels (`meetup_badges` + bucket `meetup-badges`)
Upload PNG + `is_public = true` pour afficher dans la galerie.

## Flux participant (app)
1. Génère + télécharge le badge
2. Popup : afficher sur le site ?
3. `is_public = true|false` en base ; seuls les `true` apparaissent en galerie
