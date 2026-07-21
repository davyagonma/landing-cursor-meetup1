# Cursor Bénin Meetup 2026 — Documentation développeur

## Pré-requis

- Node.js 20+ (LTS)
- npm (ou pnpm/yarn si adopté plus tard)
- Compte Vercel (deploy)
- Projet Supabase (optionnel, galerie persistée)
- Git

## Installation

```bash
git clone <repo-url> cursor-benin-meetup
cd cursor-benin-meetup
cp .env.example .env.local
# Après scaffold :
npm install
npm run dev
```

## Scripts

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production local |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Placeholder / tests unitaires si ajoutés |

*(Scripts exacts créés au scaffold Phase 4.)*

## Routes prévues (Phase 1)

| Route | Contenu |
|---|---|
| `/` | Landing complète (hero, programme, speakers, badges, CTA) |
| `/#programme` | Ancre programme / timeline |
| `/#speakers` | Ancre invités |
| `/#badge` | Ancre générateur J’y serai |
| `/#galerie` | Ancre galerie exemples |

Pas de routes auth.

## Rôles & accès

- Aucun RBAC applicatif Phase 1
- Supabase : politiques RLS documentées dans `ARCHITECTURE.md`

## Assets de référence

| Fichier source | Usage |
|---|---|
| `FlyerJ'yserai.jpg.jpeg` | Template badge participant |
| `Flyer animateur.jpg.jpeg` | Template carte speaker |
| `Cursor Benin Meetup Programme 2026.pdf` | Contenu programme |

À placer sous `public/templates/` ou `docs/references/` au scaffold (copie depuis Downloads).

## Notes

- Reproduire les flyers au pixel près autant que possible (formes coins photo, couleurs, footer blanc, QR).
- Inspiration motion : [wilsonbotoyiyesummit.com](https://www.wilsonbotoyiyesummit.com/) — positions / reveals / rythme, pas la palette.
- Orange en accent uniquement.
- Contenu FR.
