# Cursor Bénin Meetup 2026 — Cahier des charges

> Repo : `cursor-benin-meetup` · Sous-domaine : `TBD`  
> App : Landing événement + générateur de badges « J’y serai »

---

## 1. Objectif

Offrir une page de capture publique pour le Cursor Bénin Meetup 2026 : présenter le programme, les intervenants, permettre l’inscription via Luma, et laisser chaque participant générer / télécharger un badge social « J’y serai » fidèle au flyer officiel.

## 2. Rôles

| Rôle | Périmètre |
|---|---|
| Public (visiteur / participant) | Naviguer, consulter programme & speakers, générer badge, télécharger, voir galerie exemples |
| Organisateur (hors app Phase 1) | Fournit assets, URLs sociales, valide contenu ; pas de back-office |

## 3. Périmètre fonctionnel

### 3.1 Phase 1

| Module | Fonctionnalités |
|---|---|
| Landing | Hero, sections événement, CTA inscription Luma, footer réseaux |
| Programme | Contenu PDF officiel ; timeline avec photos ; ligne animée entre panels |
| Speakers / invités | Cartes statiques (JSON) au design flyer animateur |
| Badge J’y serai | Upload photo → aperçu live → téléchargement (SVG/PNG) fidèle au template |
| Galerie badges | Exemples pré-générés (placeholders + templates) ; option persistée Supabase |
| Design system event | Noir / blanc / orange accent ; motion type summit (positions/animations) |

### 3.2 Hors scope Phase 1

- Billetterie / paiement custom (Luma)
- Auth / admin CMS speakers
- Éditeur de design avancé
- App mobile native
- Notifications email transactionnelles custom

## 4. Interactions / intégrations

| Intégration | Usage |
|---|---|
| Luma | Inscription : `https://luma.com/cursor-benin-meetup` (CTA + QR) |
| Supabase | Optionnel léger : Storage assets/badges + table `badges` minimale |
| Vercel | Hébergement + previews |
| GitHub Actions | CI lint / typecheck / build |
| LinkedIn / Facebook | Liens footer (URLs TBD placeholders) |

## 5. Contraintes techniques

| Élément | Choix |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind |
| Animation | Motion (`motion/react`) |
| Data speakers/programme | JSON / contenu statique dans le repo |
| Badges | Composition client (SVG prioritaire) ; download local |
| Backend | Aucune API métier lourde ; Supabase si galerie persistée |
| Auth | Aucune Phase 1 |
| Deploy | Vercel |
| CI | GitHub Actions |
| Domaine | TBD |

### Endpoints / contrats (si API)

| Endpoint | Méthode | Rôle |
|---|---|---|
| Supabase REST `badges` | GET | Lister galerie publique (si activé) |
| Supabase REST `badges` | POST | Publier badge optionnel (si activé + RLS) |
| Supabase Storage | upload | Assets / SVG badges (si activé) |

Sinon : 100 % client + assets locaux.

## 6. Livrables Phase 1

- Site Next déployable sur Vercel
- Specs MD + tracking (ce repo)
- Templates flyers intégrés (références design)
- CI GitHub Actions verte
- `.env.example` sans secrets

## 7. Critères d’acceptation

- [ ] Landing responsive (mobile + desktop), palette Cursor respectée (orange non abusif)
- [ ] Programme affiché selon le PDF ; timeline avec ligne animée entre panels
- [ ] Cartes invités/animateurs fidèles au flyer animateur (données JSON)
- [ ] Générateur J’y serai : upload → preview live → download, fidèle au flyer participant
- [ ] Galerie d’exemples visible (placeholders OK)
- [ ] CTA / QR pointent vers Luma
- [ ] CI lint + typecheck + build OK ; preview Vercel possible
