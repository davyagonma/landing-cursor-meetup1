<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Instructions pour les agents IA

## Rôles et permissions

Tout agent IA intervenant sur ce repo doit :

1. **Lire** `docs/CDC.md` et `docs/ARCHITECTURE.md` avant toute modification
2. **Consulter** `state.json` pour connaître l'état courant
3. **Vérifier** `TASKLIST.md` avant d'entamer une tâche
4. **Respecter** les règles suivantes

## Règles strictes

- Ne JAMAIS committer de secrets (clés API, tokens, mots de passe)
- Ne JAMAIS pousser `.env`, `.env.local`, fichiers de configuration locaux
- Respecter les commits conventionnels : `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- Toute nouvelle tâche doit être ajoutée à `TASKLIST.md` **avant** d'être développée
- `state.json` doit être mis à jour **après** chaque modification substantielle
- Pas de push direct sur `main` sans tests / CI verte

## Règles de sécurité — Déploiement

- Déploiement via **Vercel**
- Ne jamais committer de tokens Vercel / Supabase service role
- Variables sensibles uniquement via Vercel Env / `.env.local`

## Règles de sécurité — Data

- Pas d’auth utilisateur Phase 1
- Supabase : RLS stricte ; ne jamais exposer la `service_role` côté client
- Uploads : valider type/taille

## Règles produits

- Le **cahier des charges** est `docs/CDC.md`. Hors CDC → signaler à Cursor Community Bénin.
- Design : flyers = source de vérité (noir, blanc, orange accent). Wilson Summit = motion/layout seulement.
- Badges « J’y serai » et cartes animateurs : fidélité max aux templates.
- CTA inscription → Luma uniquement.

## Design (taste-skill)

- Event landing dark tech Cursor
- Dials : VARIANCE 7 / MOTION 6 / DENSITY 4
- Pas d’em-dash dans le copy visible

## Workflow

1. Branche `feat/<task>` ou `fix/<bug>`
2. Développer + lint/typecheck/build
3. PR → merge → Vercel
