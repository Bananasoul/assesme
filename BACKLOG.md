# AssesMe — Backlog produit

Ce document capture toutes les idées différées et la vision long terme.
Il vit avec le projet : chaque session, on enrichit, on priorise, on retire ce qui est livré.

**Statut actuel (2026-05-10)** : MVP fonctionnel, 32 questionnaires validés, bibliothèque + body chart, lien praticien-patient via codes anonymes AM-XXXX.

---

## 🧭 Vision produit

AssesMe n'est plus seulement un **outil de mesure** (envoyer un questionnaire, recevoir un score).
La direction visée est une **plateforme de continuité thérapeutique numérique** :

- **Avant la séance** : anamnèse + questionnaires validés + carnet d'auto-observation
- **Pendant la séance** : examen clinique guidé selon le modèle planétaire
- **Entre les séances** : prescription d'exercices, suivi NPRS/PSFS quotidien
- **Après le cycle** : bilan exportable (PDF), courbes T0 → T1 → T2

Le produit vend du **temps thérapeutique récupéré**, pas des questionnaires.

---

## 🪐 Modèle planétaire (Danneels et coll., 2011) — concept structurant

Référence : Demoulin et coll., *Revue Médicale de Liège*, 2017, vol. 72(3):126-131
(Danneels L. et al. *J Musculoskeletal Pain*, 2011, 19, 218-224)

Le modèle organise le raisonnement clinique de la TMO autour de **3 niveaux CIF** + **2 dimensions modulatrices** :

```
                ┌──────────────────────────────┐
                │   ALTÉRATION STRUCTURELLE    │  ← niveau anatomique
                │   • Drapeaux Rouges          │
                │   • Mécanismes Tissulaires   │
                └──────────────┬───────────────┘
                               │
                ┌──────────────▼───────────────┐
    Mécanismes  │   DYSFONCTION DE MOUVEMENT   │   Facteurs
    de la       │   • Myofascial               │   Psycho-
    douleur ────┤   • Articulaire              ├── sociaux
                │   • Neurogénique             │
                │   • Contrôle sensorimoteur   │
                └──────────────┬───────────────┘
                               │
                ┌──────────────▼───────────────┐
                │   LIMITATION DE L'ACTIVITÉ   │  ← niveau CIF fonctionnel
                │   RESTRICTION PARTICIPATION  │
                └──────────────────────────────┘
```

### Mapping initial AssesMe ↔ Modèle planétaire

| Planète / niveau                 | Questionnaires AssesMe associés                                  |
| -------------------------------- | ----------------------------------------------------------------- |
| **Drapeaux rouges**              | À construire (screening anamnèse)                                |
| **Mécanismes tissulaires**       | Examen clinique (à construire, hors questionnaires)               |
| **Articulaire / Myofascial**     | Examen clinique (à construire)                                    |
| **Neurogénique**                 | **DN4** (4/10 = neuropathique probable)                          |
| **Contrôle sensorimoteur**       | **TUG**, **BBS**, **Tinetti**, 6MWT                              |
| **Mécanismes de la douleur**     | **NPRS**, **PCS**, **DN4**, OREBRO (composante centrale)         |
| **Facteurs psychosociaux**       | **TAMPA**, **HADS**, **FABQ**, **PCS**, **START Back**, **OREBRO** |
| **Activité / participation**     | **NDI**, **ODI**, **SPADI**, **RMDQ**, **KOOS**, **HOOS**, **FAOS**, **LEFS**, **QuickDASH**, **PRWE**, **IKDC**, **Constant**, **VISA-A/P**, **PSFS**, **DHI**, **MRS** |

### Vision UI

L'examen clinique deviendra un **dashboard planétaire interactif** où chaque planète est cliquable, montre les outils disponibles pour ce niveau, et permet de saisir les résultats. Le bilan final affiche un **mandala patient** indiquant les points de friction selon le modèle.

---

## 📋 Backlog priorisé

### P0 — Sécurité / production (Phase B)
Pré-requis avant **toute** utilisation avec de vrais patients.

- [ ] **Validation Zod** sur toutes les Server Actions et l'API `/api/assessments`
- [ ] **Tests Vitest** sur les formules de scoring des 32 questionnaires (régression clinique = erreur de décision)
- [ ] **RLS Supabase** activée sur toutes les tables — durcir l'isolation cross-praticien
- [ ] **Rate-limiting** sur `/test/[code]` (Upstash ou Vercel KV) — brute-force du code anonyme
- [ ] **CI GitHub Actions** — lint + typecheck + tests + build sur chaque PR
- [ ] **RGPD** : page mentions légales, politique de confidentialité, durée de rétention, **droit à l'oubli** (action serveur de purge patient)
- [ ] **DPA** Supabase signé (hébergement EU confirmé)
- [ ] **Audit sécu** : `npm run security-review` sur les changements avant chaque release

### P1 — Anamnèse pré-séance (vision principale post-MVP)

**Idée** : à la prise de RDV, le praticien sélectionne le motif (cervicalgie, lombalgie, épaule…) et le patient reçoit une **triple action** à compléter avant le 1er RDV.

- [ ] **Anamnèse structurée** par motif de consultation
  - Début (date, mécanisme : accident / progressif / inconnu)
  - Topographie de la douleur (body chart cliquable, patient marque les zones)
  - Irradiations
  - Facteurs aggravants / calmants
  - Évolution dans le temps (24h, semaines)
  - Antécédents (chirurgies, traitements en cours, médication, imagerie)
  - Attentes du patient ("qu'est-ce qui changerait dans ta vie si tu allais mieux ?")
- [ ] **Screening drapeaux rouges automatique** (perte de poids, douleur nocturne, antécédents cancer, fièvre, troubles sphinctériens → alerte rouge dans la fiche praticien)
- [ ] **Questionnaires validés ciblés** par motif (cervicalgie → NDI + TAMPA + NPRS)
- [ ] **Carnet d'auto-observation** quotidien sur 3-7 jours avant la séance
  - NPRS matin / soir
  - Sommeil (heures, qualité)
  - Raideurs matinales (durée)
  - Déclencheurs constatés à la maison (ex: position prolongée, activité spécifique)
  - Photo/vidéo possible de la posture / mouvement difficile
- [ ] **Vue praticien pré-séance** : un écran qui consolide les 3 sources → le praticien arrive informé

**Valeur** : positionnement défendable, gain de temps réel, expérience patient supérieure. **Justifie la monétisation Pro/Cabinet.**

### P1 — Examen clinique guidé selon le modèle planétaire

Construit après l'anamnèse pré-séance.

- [ ] **Vue planétaire interactive** : représentation SVG du modèle, chaque planète cliquable
- [ ] **Saisie par planète** :
  - Drapeaux rouges (checklist automatique)
  - Mécanismes tissulaires (palpation, points gâchettes, mobilités tissulaires)
  - Articulaire (amplitudes actives/passives, sensations de fin de course Cyriax)
  - Myofascial (longueur musculaire, trigger points)
  - Neurogénique (tests neurodynamiques : SLR, slump, ULTT)
  - Contrôle sensorimoteur (tests fonctionnels)
  - Mécanismes de la douleur (calcul intégrant DN4 + indicateurs sensibilisation centrale)
  - Facteurs psychosociaux (intégration TAMPA + FABQ + PCS + HADS)
  - Activité/participation (intégration des PROMs déjà remplis)
- [ ] **Synthèse "mandala patient"** : visualisation finale des points de friction
- [ ] **Hypothèse clinique guidée** : algorithme suggère les approches TMO pertinentes selon les planètes activées (Cyriax / Mulligan / Maitland / McKenzie / neurodynamique / cognitivo-comportementale…)

**Valeur** : différentiateur fort vs concurrents (PhysiTrack, etc.). Outil pour kiné TMO certifié.

### P1 — Bibliothèque éditable par praticien (Lot 3 du plan initial)

- [ ] **Migration** des `QuestionnaireDef` du code vers la DB (table `Questionnaire`)
- [ ] **UI d'édition** dans la library : praticien peut ajouter ses propres notes, vidéos YouTube, références
- [ ] **Versioning** : si l'admin met à jour la définition canonique, les overrides du praticien restent
- [ ] **Champs personnalisables** : `youtubeUrl`, `customNotes`, `customDecisionAlgorithm`

### P1 — i18n (internationalisation)

**Lot i18n-1 — Infrastructure** (faisable immédiatement)
- [ ] Setup `next-intl` (ou natif Next 16)
- [ ] Extraction de toutes les chaînes UI praticien en clés (`t('dashboard.title')`)
- [ ] Sélecteur de langue dans le header (drapeaux)
- [ ] Persistance préférence langue (cookie + champ `locale` sur `PractitionerProfile`)
- [ ] Structure DB pour stocker traductions des questionnaires (`QuestionnaireTranslation` table avec FK)

**Lot i18n-2 — UI praticien EN**
- [ ] Traduction des ~300 chaînes vers anglais
- [ ] Validation production

**Lot i18n-3 — Questionnaires multilingues**
- [ ] Politique de fallback : version FR/EN si langue cible non validée + bandeau explicite
- [ ] Sourcing par catégorie :
  - (a) Traductions libres : TSK, NDI, ODI, RMDQ, NPRS, DN4, FABQ — à intégrer manuellement
  - (b) Traductions sous copyright (MAPI, etc.) : HADS, SF-36 → **licences payantes à acquérir**
  - (c) Sans traduction validée : à signaler dans l'UI ("version non validée dans cette langue")

**Lot i18n-4 — Plus de langues UI**
- [ ] Priorité 1 : NL (Belgique), DE, ES
- [ ] Priorité 2 (selon marché) : PL, ZH, HI

### P1 — UX-2 : refactor design system et améliorations majeures

- [ ] **Migration Tailwind ou panda-css** — éliminer les ~3000 lignes d'inline styles
- [ ] **Dark mode** (option moderne, "gratuit" avec design system)
- [ ] **Accessibilité** : audit complet WCAG AA (contrastes, focus visible, ARIA, screen-reader)
- [ ] **Notifications** : un patient a complété un bilan → email + push (PWA)
- [ ] **Recherche globale Cmd+K** : patients, tests, fonctionnalités
- [ ] **Mobile-first praticien** : optimisation pour consultation entre 2 patients (iPhone/Android)
- [ ] **Cmd+K** + raccourcis clavier
- [ ] **Onglets sur fiche patient** : Bilans / Exercices / Notes / Évolution (au lieu de tout empilé verticalement)
- [ ] **Filtres / tri** sur liste patients
- [ ] **Loading states** propres partout
- [ ] **Empty states** illustrés (déjà commencé sur dashboard)
- [ ] **Onboarding** étendu : checklist actuelle ✅, ajouter un tour guidé interactif (ex: react-joyride)

### P2 — Body chart amélioré

- [ ] **Multi-sélection** de zones : "douleur cervicale + épaule droite" → intersection des tests recommandés
- [ ] **Drapeaux rouges contextuels** par zone (cervicalgie + perte poids + douleur nocturne → alerte)
- [ ] **Algorithme décisionnel visuel** : arbre cliquable au lieu du paragraphe texte
- [ ] **Comparateur de tests** : "ODI vs RMDQ" → table comparative side-by-side
- [ ] **Mode patient** : body chart utilisable en consultation, "montre où tu as mal"
- [ ] **Body chart antérieur ET postérieur** corps complet (actuellement zone lombaire uniquement en postérieur)
- [ ] **SVG anatomique** plus réaliste (au lieu de stylisé géométrique)

### P2 — Plus de questionnaires (vague 3+)

Tests prioritaires à ajouter pour combler les trous restants :

| Test                         | Zone              | Justification                                |
| ---------------------------- | ----------------- | -------------------------------------------- |
| **WOMAC**                    | hanche/genou      | Standard arthrose (alternative à KOOS/HOOS)  |
| **6MWT**                     | endurance générale | Déjà ajouté ✅                              |
| **PRTEE**                    | coude (épicondylite) | Spécifique épicondylalgie                |
| **EVA douleur (visuelle)**   | générique          | Référence francophone complémentaire NPRS  |
| **Cincinnati Knee**          | genou sportif     | Alternative à IKDC                           |
| **Lysholm**                  | genou sportif     | Référence ligamentaire genou                 |
| **PCS** ✅                   | psychologique     | Déjà ajouté                                  |
| **PSEQ** (Self-Efficacy)     | psychologique     | Confiance dans gestion douleur               |
| **MFIS**                     | fatigue (SEP)     | Modified Fatigue Impact Scale                |
| **NIHSS**                    | neuro AVC         | National Institutes Health Stroke Scale      |
| **Barthel Index**            | neuro AVC         | Alternative à mRS, plus détaillé             |
| **FIM**                      | neuro            | Functional Independence Measure              |
| **Beighton score**           | hyperlaxité       | Évaluation hypermobilité                     |
| **6MWT** + **Borg CR-10**    | endurance         | Borg complète 6MWT                           |

Axes spécialisés à explorer (selon marché ciblé) :
- **Pédiatrie** : GMFM, PEDI-CAT
- **Pelvi-périnéal** : PFDI, PISQ (niche émergente)
- **Vestibulaire** : ABC Scale, DVA (compléter DHI)
- **Sport** : IKDC ✅, Cincinnati, Lysholm, WOSI

### P2 — Monétisation

**Modèle recommandé : Freemium + Pro + Cabinet**

| Plan         | Prix              | Limite                                           | Cible                       |
| ------------ | ----------------- | ------------------------------------------------ | --------------------------- |
| **Gratuit**  | 0 €               | 10 patients actifs · 3 tests/patient · bibliothèque entière en consultation | Étudiants, jeunes installés |
| **Pro**      | 19–29 €/mois     | Illimité · export PDF · notes & vidéos custom · historique permanent · branding | Praticien établi solo       |
| **Cabinet**  | 49–79 €/mois     | 3–5 praticiens · dashboard agrégé · facturation centralisée | Cabinets multi-thérapeutes  |

**Implémentation** : Stripe + webhooks → Supabase. ~1-2 jours de travail.

Pistes complémentaires :
- Sponsoring éthique (écoles de kiné)
- API pour intégration SIH (B2B)
- Marketplace de protocoles (ex: "post-LCA semaine 1-12")

### P3 — Long terme / exploratoire

- [ ] **Multi-praticiens / cabinet** (déjà préparé via plan Cabinet) : gestion équipe, transfert patient, dashboard agrégé
- [ ] **API publique** pour intégration SIH (HL7 FHIR si applicable)
- [ ] **Module formation** : la library devient un outil pédagogique pour étudiants en kiné
- [ ] **Communauté** : praticiens partagent leurs protocoles validés
- [ ] **IA d'aide à la décision** : à partir des PROMs + anamnèse, suggère le diagnostic différentiel (toujours sous responsabilité praticien)
- [ ] **Intégration objets connectés** : tensiomètre, podomètre, gyromètre pour 6MWT/TUG automatisés
- [ ] **Téléconsultation** : visio intégrée avec partage body chart et tests
- [ ] **Marketplace exercices** : vidéos pro réalisées par kinés certifiés, achetables ou en abonnement

---

## 🗒 Notes diverses

### Questions à trancher avant de continuer

- [ ] **Monétisation** : valider le modèle proposé (P2) ou définir une alternative
- [ ] **i18n cibles** : 7 langues annoncées (FR/EN/DE/ES/PL/ZH/HI) — est-ce vraiment le marché ? Recommandation : phase 1 FR/EN, phase 2 NL/DE/ES, le reste selon traction
- [ ] **Anamnèse pré-séance** : workflow détaillé à définir avec un kiné test (toi)
- [ ] **Examen clinique planétaire** : structure exacte à définir (probablement après l'anamnèse)

### Dépendances techniques

- L'anamnèse pré-séance et l'examen clinique nécessitent d'**étendre le modèle Prisma** (table `Anamnesis`, `ClinicalExam`, structure planétaire)
- Le multi-langue des questionnaires nécessite une **migration DB** (table `QuestionnaireTranslation`)
- Stripe webhooks nécessitent un **endpoint sécurisé** (Phase B sécurité doit être faite avant)

### Risques

- **Scope creep** : la vision est très ambitieuse. Tentation de tout faire en même temps. Discipliner les commits.
- **Copyright questionnaires** : HADS, SF-36, certains autres sont sous licence. À auditer avant traduction.
- **Données médicales en Belgique** : conformité RGPD + agrément éventuel comme dispositif médical (à clarifier avec un juriste).
- **Marché B2B kiné** : ticket moyen bas, acquisition longue. Préparer un plan d'acquisition (écoles kiné, congrès TMO).

---

## 📜 Historique des sessions

- **2026-05-09 → 2026-05-10** : MVP fonctionnel, sécurisation API, suppression Capacitor, PWA câblée, library + body chart, 32 questionnaires validés et conformes au standard, onboarding checklist, empty states. Backlog créé.
