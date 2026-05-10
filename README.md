# AssesMe

Plateforme PWA de métrologie clinique pour la kinésithérapie. Le praticien envoie à ses patients des liens sécurisés vers des questionnaires validés (TAMPA, ODI, NDI, SPADI, KOOS, HOOS, RMDQ, HADS, QuickDASH, LEFS, MRS, START Back, PSFS, etc.) et suit l'évolution de leurs scores.

**Stack** : Next.js 16 (App Router) · React 19 · Prisma 6 · Supabase (Auth + Postgres) · Recharts · @ducanh2912/next-pwa.

---

## Démarrage local

### 1. Pré-requis

- Node.js ≥ 20
- Un projet Supabase (gratuit suffit) — https://supabase.com

### 2. Installation

```bash
npm install
cp .env.example .env.local
# remplir .env.local avec tes credentials Supabase (voir .env.example)
```

### 3. Schéma de base de données

```bash
npm run db:push       # synchronise le schema Prisma avec Supabase
npm run db:seed       # peuple avec 3 patients de démo (idempotent)
```

> Le seed est **idempotent** : il ne crée que les patients démo manquants, jamais ne supprime. Pour reset, utiliser `npm run db:seed -- --force` (ne touche qu'aux emails démo).

### 4. Premier compte praticien

L'app utilise Supabase Auth. Soit tu inscris ton compte via la page `/practitioner/login` (signup), soit via le dashboard Supabase → Authentication → Users → Add user.

### 5. Lancer

```bash
npm run dev
# http://localhost:3000
```

---

## Scripts

| Script                    | Action                                                    |
| ------------------------- | --------------------------------------------------------- |
| `npm run dev`             | Serveur de dev Next.js                                    |
| `npm run build`           | Build de production (génère le client Prisma + Next)      |
| `npm run start`           | Serveur de production                                     |
| `npm run lint`            | ESLint                                                    |
| `npm run typecheck`       | `tsc --noEmit`                                            |
| `npm run db:push`         | Synchroniser le schema Prisma avec la DB (dev/prototype)  |
| `npm run db:migrate:dev`  | Créer une migration locale                                |
| `npm run db:migrate:deploy` | Appliquer les migrations en production                  |
| `npm run db:seed`         | Peupler la DB avec 3 patients de démo (idempotent)        |
| `npm run db:studio`       | Ouvrir Prisma Studio (UI de la DB)                        |

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                    Page d'accueil (choix Praticien / Patient)
│   ├── portal/                     Portail patient (lien nominatif)
│   ├── fill/                       Formulaire patient (par requestId)
│   ├── test/[code]/                Lien anonyme patient (code AM-XXXX)
│   ├── questionnaire/[id]/         Page démo "essai d'un questionnaire" (sans sauvegarde)
│   ├── practitioner/
│   │   ├── page.tsx                Tableau de bord praticien
│   │   ├── login/                  Connexion / signup Supabase
│   │   ├── settings/               Profil praticien
│   │   └── patient-history/        Détail patient + historique
│   ├── api/assessments/route.ts    POST résultats (auth via token ou Supabase)
│   └── actions/                    Server Actions
├── components/                     Composants client
├── data/questionnaires.ts          Définitions des 14 questionnaires
├── lib/                            Helpers (Prisma, data)
├── proxy.ts                        Middleware Next 16 (auth)
└── utils/supabase/                 Clients Supabase (server/client)
```

### Modèle de données

- `PractitionerProfile` — profil du praticien (lié à un user Supabase)
- `PatientVault` — PII (nom, email, DOB)
- `ClinicalRecord` — données pseudonymisées (assessments, exercices, notes)
- `Assessment` + `QuestionnaireResult` — résultats des bilans
- `AssessmentRequest` — demande de bilan envoyée à un patient (lien nominatif)
- `AnonymousSession` — session avec code anonyme `AM-XXXX` (ne nécessite pas l'identification du patient)
- `SessionNote` — journal des séances
- `Exercise` — prescription d'exercices

### Flux de soumission de questionnaire

L'API `POST /api/assessments` exige soit :

- un `submissionToken` (code anonyme `AM-XXXX` ou ID d'`AssessmentRequest`) — le serveur dérive le `recordId` du token, jamais du client.
- soit un user Supabase authentifié + header `x-record-id` vérifié contre la propriété du practitioner.

---

## Déploiement Vercel

Le projet est déjà connecté à Vercel (`assesme-sigma.vercel.app`).

Variables d'environnement à configurer dans Vercel (Settings → Environment Variables) :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

Les migrations doivent être appliquées **avant** le déploiement (manuellement via `npm run db:migrate:deploy` localement, ou via une étape de CI dédiée).

---

## Sécurité

- Auth praticien : Supabase (email + password)
- Patient : pas de compte, accès via lien signé (token = AssessmentRequest.id ou anonymousCode unique)
- Codes anonymes : 4 caractères dans un alphabet sans ambiguïté (`23456789ABCDEFGHJKLMNPQRSTUVWXYZ`) → ≈ 1M combinaisons
- Pseudonymisation : `ClinicalRecord` ne contient aucune PII, lien vers `PatientVault` uniquement par UUID

### À faire pour un usage médical réel

- Activation RLS Supabase (en cours)
- Rate-limiting sur `/test/[code]`
- Politique de rétention RGPD + export + droit à l'oubli
- Tests unitaires sur les formules de score (régression clinique)
- Séparation physique des bases PII / clinique (architecture cible mentionnée dans le schema)
