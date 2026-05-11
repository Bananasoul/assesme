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

### P1 — Anamnèse pré-séance + Examen clinique (vision principale post-MVP)

**Sources** (PDFs fournis par Phil, dossier `Ressources PT/EXAM CLIN AI/`) :
- *Anamnèse OMT understanding* (LBP) — structure pratique
- *Questionnaire de Raisonnement Clinique* (ULg/UGent, adapté de Jones et al.)
- *Examen clinique 2.0* — formulaire papier complet
- *OMT raisonnement clinique* — synthèse mind-map du raisonnement
- *LOMBALGIE-ALGORITHME-2025-Diagnostic-FR* (The Spine Physio) — algorithme diagnostique
- *GLEK HERC RC* — Cahier raisonnement clinique en kinésithérapie

#### A. Cadres théoriques à digitaliser

- **CIF (OMS 2001)** : Problèmes de santé → Fonctions/structures (déficiences) ↔ Activités (limitations) ↔ Participation (restrictions) + facteurs contextuels (environnementaux/personnels)
- **Modèle planétaire (Danneels 2011)** :
  - **Centre** = Dysfonction de mouvement : Myofascial · Sensorimotor control · Articular · Neurogenic
  - **Haut** = Impairment of structure : Red flags · Tissue mechanisms
  - **Bas** = Restriction in activity/participation
  - **Orbites** = Pain mechanisms · Psychological factors
- **Processus CIPIE** : Collecte → Interprétation → Planification → Intervention → Évaluation
- **HSOAPIER** (Québec) : Histoire, Subjectif relaté, Objectif observé/mesuré, Analyse, Plan, Intervention, Évaluation, Recommandations
- **Mark Jones** : Wall of Bricks · Make Features Fit · Confirmation of Hypotheses
- **Modèle de Chamberland** : interaction thérapeute (connaissances) ↔ patient (caractéristiques biopsychosociales) → représentation progressive du problème → hypothèses → diagnostic différentiel → diagnostic de qualité → prise en charge optimale
- **Modèle de Montréal (Charlin)** : étapes cognitives (1→2→3→6→7) + métacognitives (4, 5, 8)

#### B. Anamnèse pré-séance (C/O) — structure à digitaliser

- [ ] **Identité + contexte** : Nom, Prénom, Âge, Date · Métier (AT/STOP/WORK) · Hobbies · Sports · Charge familiale
- [ ] **Problème principal** (3 questions clés)
  - « Quel est votre problème principal ? »
  - « Dans quel type d'activité l'absence de douleur va vous soulager ? » (objectif décentré de la douleur)
  - « Qu'attendez-vous de moi ? » (attentes thérapeutiques → étude psycho: si on fait ce que le patient attend, il ira mieux)
- [ ] **Body chart numéroté** (zones 1, 2, 3…) avec qualificatifs par zone:
  - Local / Diffus
  - Profond / Superficiel
  - Irradiation vers ___
  - Continu / Intermittent
  - Qualificatif (douleur / picotement / fourmillement / engourdissement / paresthésie)
  - Lien entre les zones
- [ ] **Schémas cliniques** indiqués par localisation (pour LBP) :
  - P centrale → discale
  - P latérale → facettes
  - P latérale → MI : neuro / facettes / SI
  - P MI > P dos → sciatalgie
- [ ] **Onset** (apparition)
  - Mode : spontané / progressif / trauma
  - Quand ? (timeframe 4-6 sem pour estimation phase de guérison)
  - Type de douleur : Ischémique / Mécanique / Inflammatoire
- [ ] **Evolution dans le temps** (graphique X/Y intensité/temps — possibilité que le patient le trace)
- [ ] **Provocation** : « Quel mouvement provoque vos symptômes ? » + démo fonctionnelle (mouvement test reproductible)
- [ ] **Diminution** : « Qu'est-ce qui vous soulage ? »
- [ ] **Schéma 24h** (clé pour différencier les mécanismes) :
  - NUIT : Spontanée sans mvt → Red Flag · Au mvt → Mécanique
  - MATIN : Dérouillage 1h+ → Ischémique
  - JOURNEE : à certains mvts / activités
  - SOIR : fatigue · contrôle moteur ?
- [ ] **Traitements déjà faits** (masso / ostéo / infiltration / médecins) — apporte éléments provocation/diminution. Attention dissonance entre dires médicaux.
- [ ] **Imagerie** : explication que c'est une photo, hernie est un diagnostic banal
- [ ] **VOMIT** (Victim Of Medical Imaging Technology) — sur-diagnostic radiologique
- [ ] **Médication actuelle**
- [ ] **ATCD / Santé** (CV, TA, polyarthrite, asthme, diabète, ostéoporose, virus récents, cancer)
- [ ] **Perte de poids involontaire** (red flag)
- [ ] **Facteurs prédisposants — 5 USES** : NEW USE · MISUSE · OVERUSE · ABUSE · DISUSE / NON USE
- [ ] **Facteurs SG / Utilisation des mouvements / Résistance au stress** :
  - SG (signes généraux), virus, grippe, fatigue, "slow healer"
  - Stress, anxiété, soucis, beaucoup sollicité / peu de repos
  - Déconditionnement physique
  - Utilisation comportementale des mvts (évitement de la douleur)
  - État de base des structures (ex: ostéoporose)

#### C. Drapeaux rouges (Red Flags) — checklist automatique

1. Trauma important (ou léger si ostéoporotique)
2. Longue histoire de corticostéroïdes
3. Antécédents de cancer (sein, prostate, poumon, rein, thyroïde)
4. Douleurs constantes, progressives, non-mécaniques
5. Inflammation +++
6. Fièvre, sudation nocturne, signes généraux à la baisse
7. Infection bactérienne (cystite)
8. Perte de poids inexpliquée
9. Drogue par IV
10. Immunodépression (SIDA)
11. P thoracique ++ au repos / nocturne
12. Anesthésie en selle, dysfonction vessie, incontinence fécale → urgence
13. Dérangement fonctions sexuelles, vésicales, intestinales
14. Troubles marche, équilibre
15. Faiblesse, sensations, sensibilité anormales mains/pieds
16. Déformations structurelles
17. Déficits neuro +++

**Prudence particulière** (≠ red flag mais nécessite vigilance) : instabilité, foramen très envahi, ostéoporose, P origine inconnue, atteinte aiguë racines nerveuses, maladies neurologiques, spondylarthrite ankylosante, PR, hémophilie, diabète, spondylolisthèses sévères, corticostéroïdes prolongés, maladies systémiques.

#### D. Drapeaux jaunes (Yellow Flags) — ABCDEFW

- **A** — Attitude & Beliefs (croyances sur la douleur, kinésiophobie)
- **B** — Behavior (comportements d'évitement, hypervigilance)
- **C** — Compensation (statut compensation, secondary gain)
- **D** — Diagnosis (multiplicité des diagnostics antérieurs)
- **E** — Emotion (anxiété, dépression, catastrophisme)
- **F** — Family (dynamique familiale, soutien)
- **W** — Work (insatisfaction professionnelle, conflit hiérarchie, retour au travail)

Outils app : **TAMPA**, **PCS**, **HADS**, **FABQ**, **START Back**, **OREBRO** déjà disponibles → à intégrer dans la saisie anamnèse contextuelle.

#### E. Grille Prêt-CHAPCHA (psycho-social — questions à intégrer)

- **Préoccupations** : catastrophisme, pensées négatives, évitement
- **Auto-efficacité** : capacité à continuer malgré la douleur
- **Coping** : stratégies d'adaptation, évitement
- **Hypervigilance** : focalisation sur la douleur
- **Croyances** : représentations de la douleur
- **Humeur** : ressenti émotionnel face à la douleur
- **Attentes** : par rapport au traitement
- **Prêt au changement** : motivation, observance prévue (échelle 1-10)

#### F. Mécanismes de la douleur (théorie Input/Processing/Output)

| Catégorie               | Sous-type        | Signes |
| ----------------------- | ---------------- | ------ |
| **NOCICEPTIVE** (Input dominant) | Mécanique  | Fin de course, On/Off, seuil P haut, P physiologique = pas de dommage tissulaire |
|                         | Ischémique       | Position statique (manque O2/glucose), réversible par mvt, seuil P haut |
|                         | Inflammatoire    | P spontanée + évoquée, zone P diffuse, seuil P bas (allodynie), **P pathologique = dommage tissulaire** |
| **NEUROGÈNE**           | Neuropathie périph. | Territoire cutané nerf périph, P typique (aigu, brûlure, électrique) |
|                         | Radiculopathie   | Territoire dermatome, P typique + fourmillements |
|                         | Central (anat.)  | Dommage SNC, symptômes persistants après régénération cellulaire |
| **CENTRAL** (Processing dominant) | Neuroplastique | ONSET disproportionné aux symptômes, variable, beaucoup de facteurs psychosociaux, P diffus/étendu |
| **OUTPUT dominant**     | Moteur, autonome | Élément important des performances motrices musculo-squelettiques, type de mouvements explique symptômes |

Adaptive vs Maladaptive :
- **Adaptive** : sans kiné = OK, plus sensoriel
- **Maladaptive** : sans kiné = NON OK, plus émotionnel

Outils app : **DN4** (≥ 4/10 = neuropathique probable), **OREBRO**, **PCS**, **TAMPA**.

#### G. Phases de réparation tissulaire (timing important pour pronostic)

| Phase            | Timing               | Caractéristiques |
| ---------------- | -------------------- | ---------------- |
| Saignement       | 2-3 heures           | Vascularisation tissulaire |
| Inflammation     | qq heures - jours    | Dépôt fibrine, sensibilisation, formation nouveaux nerfs |
| Prolifération    | 24-48h → 4-6 mois (max 2-3 sem) | Fibroplasie + angiogenèse, collagène type 3 → type 1 |
| Remodelage       | 2-3 sem → 1-12 mois  | Production cicatrice organisée, résistance max 80% initiale |

**Mnémo** : OS aime COMPRESSION · Collagène aime TENSION

#### H. SIN (Catégorie clinique) — détermine comment "charger" le patient

- **S — Sévère** : activité légère → P↑ → stop activité = P stop
- **I — Irritable** : activité légère → P↑ → stop activité = **P reste**
- **N — Nature** : red flags · précautions · contre-indications

Patterns détaillés :
- **Momentary P** : intermittent, lié à mvt/activité précise
- **Latence P** : P après l'arrêt de l'activité
- **ROM P** : arc P pendant l'amplitude
- **End Of Range** : possibilité grande activité, P uniquement en fin de course

#### I. Hypothèses (synthèse par symptôme — sortie de l'anamnèse)

Pour chaque symptôme (Sy1, Sy2, Sy3) :
- Mécanisme de douleur : nociceptif / neuropathique / central · input/processing/output · adaptif/maladaptif
- Drapeaux jaunes ABCDEFW présents
- Schéma clinique identifié (ou hypothèses concurrentes)
- Précautions, contre-indications
- Stratégie pour l'examen physique : réduction / reproduction totale / reproduction partielle / pas de reproduction des symptômes

#### J. Examen clinique (P/E) — 14 étapes à digitaliser

1. **PP** (Problème principal au moment de l'examen) — site symptômes + EVA
2. **Observation** : posture, position antalgique, relief musculaire, asymétries, corrections/surcorrections
3. **Démo fonctionnelle** : mvt symptomatique, différencier mvt et structure, paramètres de réévaluation (astérisques *)
4. **Repenser la planification** : affinement hypothèses, anticipation résultats, dosage examen
5. **MVTS Actifs** : qualité / amplitude / symptômes · différenciation
6. **Tests si appropriés** : suppression fin mvt actif, mvts maintenus/répétés/rapides/avec charge, mvts combinés 2D/3D, quadrants Lx et Cx
7. **Tests supplémentaires** : examens neuro (sensibilité, force, réflexes, clonus, sens. profonde → SNC), tests d'instabilité, tests vasculaires
8. **Tests neurodynamiques** : ULNT (Upper Limb Neural Test), PNF (Passive Neck Flexion), SLR (Straight Leg Raise), PKB (Prone Knee Bend), Slump
9. **Palpation** : peau (T° / sudation / mobilité), muscle (tonus / trigger point / atrophie), os (alignement / insertions)
10. **MVTS passifs accessoires (PAIVM's)** : 2 paramètres de réévaluation, recherche du P/R/S, PA/AP/UPA/Trans/Comp/Distrac, comparaison G/D ou étages sus/sous-jacents, diagramme de mvt
11. **MVTS passifs physiologiques (PPIVM's)** : hyper/hypo mobilité, sensation fin de course, position neutre, P/R/S, comparaison, diagramme
12. **1er Rx et réévaluation** : application directe d'une technique pour valider hypothèses
13. **Screening-test autres articulations** (2ème séance)
14. **Consignes au patient** : programme exercices, évolution possible, observation à faire

#### K. Algorithme diagnostique LBP (Spine Physio) à digitaliser

Décision en cascade :
1. Exclure pathologies graves (fracture, cancer, infection, queue de cheval, AxSpa)
2. La douleur vient-elle du dos ou de la jambe ?
3. Douleur réagit-elle à l'intensité du mouvement et à l'amplitude ?
4. Source musculo-squelettique : disques · zygapophyses · myofascial · hanche · sacro-iliaque
5. Source nerveuse : provocation nerveuse positive (Lasègue ± différenciation), trajet logique
6. Source viscérale : nociceptif logique mais sensation profonde, lien système urinaire
7. Source vasculaire : douleur à l'activité non au repos, signes vasculaires
8. Tests spécifiques : Spurling, FADER-R, ADD-R, Cluster Grimaldi, Cluster Laslett/Van der Wuff

**Diagnostic biopsychosocial radar** (8 dimensions à scorer 0-5) :
- Patho-anatomique · Sensori-moteur · Système nerveux · Cognitif · Émotionnel · Contexte travail/social · Comorbidités · Style de vie

#### L. Traitement (Rx) — types et paramètres

Types de Rx :
- **MOB articulaire** (mvts accessoires, physiologiques, combinaison)
- **MOB neurodynamique** (indirect articulaire/musculaire, mobilisation neurale directe, mvts accessoires)
- **Rééducation musculaire** (contrôle moteur, renfo, endurance, coordination, proprio, étirements)
- **Thérapie comportementale** (travail yellow flags, correction du coping, kinésiophobie, douleur chronique)
- **Automatisation** (informations, conseils, planning d'exercices)

Paramètres techniques :
- Mvts passifs : accessoires / physiologiques / combinaison
- Application : technique directe / indirecte
- Position de départ : patient + articulaire
- Vitesse : 1/2 sec · 1/sec · 2/sec
- Grade I à V : angulation, compression, distraction
- Modalité : oscillant · doux · rapide avec variation · maintenu
- Symptômes : sans P · avec P léger/moyen/élevé
- Durée : 30 sec à 5 min · répétitions

#### M. Pronostic — critères à intégrer

- Mécanisme méca/infla
- Irritabilité
- Degré d'handicap
- Importance trauma + comportement
- Durée de l'histoire, évolution
- Antécédents
- Attentes du patient
- Aspect cognitif
- Expérience clinique du OMT

#### N. Modules à construire (architecture cible)

- [ ] **Module anamnèse pré-séance** : workflow patient guidé, body chart cliquable, graphique évolution interactif, dérouillage matinal, screening red flags automatique
- [ ] **Module examen clinique P/E** : 14 étapes navigables, saisie structurée par étape, paramètres de réévaluation marqués d'astérisques pour réutilisation
- [ ] **Module modèle planétaire interactif** : SVG cliquable, score par planète, mandala synthèse
- [ ] **Module Rx** : structuré par type + paramètres, lié aux astérisques pour réévaluation directe
- [ ] **Module raisonnement clinique guidé** : pour étudiants/stagiaires, expliciter les hypothèses (style modèle de Montréal — verbaliser la pensée)
- [ ] **Module bilan évolutif** : graphiques par paramètre de réévaluation entre séances
- [ ] **Module export PDF** : compte-rendu structuré (HSOAPIER) pour communication médecin traitant / mutuelle

**Valeur** : positionnement défendable, gain de temps réel, expérience patient supérieure, **outil pédagogique pour stagiaires** (modèle de rôle clinicien + formateur).

### P1 — Synthèse visuelle "Mandala patient" (différenciateur produit)

- [ ] Visualisation finale post-examen : chaque axe du modèle planétaire est noté/coloré selon l'importance clinique
- [ ] Diagnostic biopsychosocial radar 8 axes (cf. Spine Physio)
- [ ] Hypothèses concurrentes affichées (raisonnement diagnostique vs narratif)
- [ ] Algorithme suggère les approches TMO pertinentes : Cyriax · Maitland · Kaltenborn-Evjenth · Mulligan · McKenzie · neurodynamique · cognitivo-comportementale
- [ ] Export "bilan complet" exportable (PDF) pour médecin / mutuelle

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

## 📚 Sources & références (à conserver pour intégration produit)

### Modèles théoriques

- **CIF / ICF** : Classification Internationale du Fonctionnement (OMS 2001) — *Interactions entre les composants de la CIF*, p18
- **Modèle planétaire** : Danneels L. et al. (2011). *A Didactical Approach for Musculoskeletal Physiotherapy: The Planetary Model*. Journal of Musculoskeletal Pain, 19(4), 218-224.
- **Modèle de Chamberland** (2006) : interaction thérapeute ↔ patient (biopsychosocial + contextuel)
- **Modèle de Montréal** : Charlin B. et al. (2012). *Clinical reasoning processes: unravelling complexity through graphical representation*. Medical Education, 46, 454-463.
- **Raisonnement clinique en kinésithérapie** : Nendaz, M., Charlin, B., Leblanc, V., Bordage, G. (2005). *Le raisonnement clinique; données issues de la recherche et implications pour l'enseignement*. Pédagogie Médicale, 6, 235-254.
- **Mark Jones — Clinical Reasoning in Manual Therapy** : Jones MA (1992). Phys Ther, 72, 875-884.
- **Mark Jones — Cognitive Mapping** : adapté dans HE Vinci, méthodologie NM 2011-2012
- **Pallot A.** (2019). *Evidence Based Practice en rééducation, démarche pour une pratique raisonnée*. Elsevier Masson, p321.
- **Audétat M.C., Rieder A., Sommer J.** (2017). *Comment enseigner le raisonnement clinique : un fascinant travail de détective*. Revue Médicale Suisse, 562.
- **Système 1 / 2** : Daniel Kahneman, Prix Nobel d'économie 2002
- **Système 3 (mixte / inhibition)** : Olivier Houdé 2011 — "La capacité d'inhibition est la clé de notre intelligence"
- **Habiletés de pensée** : Richard A. (2021). Université Laval. Thèse de doctorat.

### Méthodes cliniques

- **HSOAPIER** : Méthode québécoise standardisée — Ordre professionnel des physiothérapeutes du Québec
- **CIPIE** : Collecte · Interprétation · Planification · Intervention · Évaluation
- **Approches TMO** : Cyriax · Mennell · Kaltenborn-Evjenth · Maitland · McKenzie · Mulligan · neurodynamique (Shacklock, Elvey)
- **IFOMPT** : International Federation of Orthopaedic Manipulative Physical Therapists — standards éducatifs (Beeton K. et al. 2013)
- **TMO en Belgique** : Demoulin et coll. *La thérapie manuelle orthopédique*. Revue Médicale de Liège 2017, 72(3):126-131.

### Documents internes (`Ressources PT/EXAM CLIN AI/`)

- `Anamnèse OMT understanding.pdf` — guide pratique LBP
- `Questionnaire de Raisonnement Clinique.pdf` — formulaire ULg / UGent
- `Examen clinique 2.0 (1).pdf` — formulaire papier complet utilisé par Phil
- `OMT raisonnement clinique.pdf` — mind-map complet
- `LOMBALGIE-ALGORITHME-2025-Diagnostic-FR.pdf` — The Spine Physio (algorithme diagnostique)
- `GLEK HERC RC - Cahier du participant 1.pdf` — Pestiaux, Standaert, Couvreur (HE Vinci)

### MOOC

- MOOC Processus de raisonnement clinique — Université de Montréal : https://fr.coursera.org/lecture/supervision-raisonnement-clinique/le-processus-de-raisonnement-clinique-prc-explicite-RdLjT
- MOOC Supervision du raisonnement clinique : https://fr.coursera.org/learn/supervision-raisonnement-clinique

---

## 📜 Historique des sessions

- **2026-05-09 → 2026-05-10** : MVP fonctionnel, sécurisation API, suppression Capacitor, PWA câblée, library + body chart, 32 questionnaires validés et conformes au standard, onboarding checklist, empty states. Backlog créé.
- **2026-05-11** : Enrichissement majeur du backlog avec le détail complet de l'anamnèse OMT et de l'examen clinique selon le modèle planétaire (6 PDFs analysés). Cadres théoriques CIF + planétaire + Mark Jones + Chamberland + Montréal + HSOAPIER + CIPIE intégrés. Drapeaux rouges/jaunes ABCDEFW, mécanismes de douleur Input/Processing/Output, phases de réparation tissulaire, SIN, P/E 14 étapes, paramètres Rx, algorithme LBP Spine Physio capturés.
