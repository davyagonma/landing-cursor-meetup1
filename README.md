# cursor-benin-meetup

Landing + générateur de badges « J’y serai » pour le Cursor Bénin Meetup 2026.

| champs | valeur |
|---|---|
| App | cursor-benin-meetup |
| Sous-domaine | `TBD` |
| Repo | Cursor Community Bénin |
| Phase | Phase 1 — landing + badges |
| Stack | Next.js · Tailwind · Motion · Supabase (optionnel) |

## Rôle

Site public : programme, speakers, CTA Luma, badges sociaux fidèles aux flyers Cursor (noir / blanc / orange).

## Documentation

- `docs/CDC.md` — Cahier des charges
- `docs/ARCHITECTURE.md` — Architecture technique
- `docs/DEV.md` — Documentation développeur
- `docs/MANUEL.md` — Manuel utilisateur
- `state.json` · `TASKLIST.md` · `CHANGELOG.md` · `AGENTS.md`

## Démarrer

```bash
cp .env.example .env.local
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Rôle |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build prod |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Placeholder |

## Déploiement

Vercel + CI GitHub Actions. Inscription : [luma.com/cursor-benin-meetup](https://luma.com/cursor-benin-meetup).
