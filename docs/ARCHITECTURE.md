# Cursor Bénin Meetup 2026 — Architecture technique

## Stack

- **Framework** : Next.js App Router + TypeScript
- **UI** : Tailwind CSS ; tokens noir / blanc / orange accent (`#FF6600` ou teinte flyer)
- **Motion** : `motion/react` (sections, timeline, révélations)
- **Icons** : Phosphor ou Tabler (une seule famille)
- **Fonts** : `next/font` — sans-serif bold type meetup + script pour « J’y serai » / « Animateur »
- **Data** : JSON statique (`content/` ou `src/data/`) pour programme & speakers
- **Badges** : composition SVG/DOM → export SVG ou canvas PNG côté client
- **Supabase** (optionnel Phase 1) : Storage + table `badges` minimale
- **Deploy** : Vercel
- **CI** : GitHub Actions (`lint`, `typecheck`, `build`)

## Décisions

| Date | Décision |
|---|---|
| 2026-07-21 | Initialisation repo + cadrage CDC |
| 2026-07-21 | Frontend-first ; pas de billetterie custom (Luma) |
| 2026-07-21 | Badges générés client-side (SVG) pour fidélité + download immédiat |
| 2026-07-21 | Speakers/programme en JSON statique |
| 2026-07-21 | Supabase très simple si galerie persistée ; sinon placeholders locaux |
| 2026-07-21 | Design flyers = source de vérité visuelle ; Wilson Summit = référence motion/layout seulement |
| 2026-07-21 | Deploy Vercel + CI GH Actions (pas Docker obligatoire Phase 1) |

## Structure

```
cursor-benin-meetup/
├── AGENTS.md
├── CHANGELOG.md
├── README.md
├── TASKLIST.md
├── state.json
├── .env.example
├── .gitignore
├── .github/workflows/ci.yml
├── docs/
│   ├── CDC.md
│   ├── ARCHITECTURE.md
│   ├── DEV.md
│   └── MANUEL.md
├── public/                 # (après scaffold) assets, QR, templates
├── src/                    # (après scaffold)
│   ├── app/
│   ├── components/
│   ├── data/               # programme, speakers JSON
│   ├── lib/                # badge svg, supabase client
│   └── styles/
└── package.json            # (après scaffold)
```

## Modèle données Supabase (si activé)

Table `badges` (minimale) :

| Colonne | Type | Notes |
|---|---|---|
| id | uuid | PK |
| display_name | text | nullable |
| image_url | text | URL Storage (SVG/PNG) |
| created_at | timestamptz | default now() |

RLS : `SELECT` public ; `INSERT` selon politique (ouvert limité ou désactivé Phase 1 si galerie manuelle seulement).

## Build & déploiement

- Local : `npm run dev`
- CI : push PR / main → lint → typecheck → build
- Vercel : link projet ; preview sur PR ; production sur `main`
- Pas d’exigence Docker Phase 1

## Variables d’environnement

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (TBD) |
| `NEXT_PUBLIC_LUMA_URL` | `https://luma.com/cursor-benin-meetup` |
| `NEXT_PUBLIC_SUPABASE_URL` | Projet Supabase (si activé) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (si activé) |
| `NEXT_PUBLIC_LINKEDIN_URL` | TBD |
| `NEXT_PUBLIC_FACEBOOK_URL` | TBD |
