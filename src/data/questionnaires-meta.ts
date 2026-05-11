/**
 * Méta-données enrichies pour la bibliothèque clinique.
 *
 * Ce fichier complète QuestionnaireDef avec :
 * - bodyParts        : zones du body chart (clés normalisées)
 * - languages        : langues de validation publiées
 * - psychometrics    : propriétés psychométriques (valeurs publiées en littérature)
 * - clinicalQuestions: questions cliniques auxquelles le test répond
 * - youtubeUrl       : tutoriel vidéo (à renseigner par le praticien si manquant)
 *
 * Politique de remplissage:
 *   - On ne remplit que les valeurs vérifiables en littérature.
 *   - Champs marqués `undefined` = à compléter (l'UI affiche "Non renseigné").
 *   - Les MCID/ICC peuvent varier selon la population : valeurs indicatives.
 */

export type BodyPartKey =
  | 'cervical'
  | 'shoulder'
  | 'elbow'
  | 'wrist-hand'
  | 'lumbar'
  | 'hip'
  | 'knee'
  | 'ankle-foot'
  | 'general'
  | 'neuro'
  | 'vestibular';

export const BODY_PART_LABELS: Record<BodyPartKey, string> = {
  cervical: 'Cervical',
  shoulder: 'Épaule',
  elbow: 'Coude',
  'wrist-hand': 'Poignet / Main',
  lumbar: 'Lombaire',
  hip: 'Hanche',
  knee: 'Genou',
  'ankle-foot': 'Cheville / Pied',
  general: 'Général / Psycho-social',
  neuro: 'Neurologique',
  vestibular: 'Vestibulaire',
};

export type Psychometrics = {
  internalConsistency?: string; // Cronbach alpha
  testRetest?: string; // ICC
  mcid?: string; // Minimal Clinically Important Difference
  validity?: string; // construct / criterion validity
  sensitivity?: string; // responsiveness, AUC, etc.
  populations?: string; // populations validées
};

export type QuestionnaireMeta = {
  bodyParts: BodyPartKey[];
  languages?: string[]; // ISO 639-1 ou nom court
  psychometrics?: Psychometrics;
  clinicalQuestions?: string[];
  youtubeUrl?: string;
};

export const QUESTIONNAIRE_META: Record<string, QuestionnaireMeta> = {
  tampa: {
    bodyParts: ['general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'FI'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,76 – 0,82',
      testRetest: 'ICC 0,80 (test-retest 1 semaine)',
      mcid: '5 à 6 points (douleur lombaire chronique)',
      validity: 'Validité de construit confirmée vs FABQ et catastrophisme (PCS)',
      sensitivity: 'Effect size modéré sur prises en charge cognitivo-comportementales',
      populations: 'Lombalgie chronique, douleur musculo-squelettique chronique, fibromyalgie',
    },
    clinicalQuestions: [
      'Le patient évite-t-il certains mouvements par peur de se blesser ?',
      'La douleur est-elle interprétée comme le signe d\'une lésion grave ?',
      "L'appréhension psychologique est-elle un frein à la rééducation active ?",
    ],
  },

  'start-back': {
    bodyParts: ['lumbar'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'NO', 'DA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,74 (sous-échelle psycho-sociale)',
      testRetest: 'Kappa pondéré 0,73 (re-test 1 à 14 jours)',
      mcid: 'Outil de stratification (pas de MCID au sens strict)',
      validity: 'Validité prédictive : AUC ≈ 0,70 pour pronostic à 6 mois',
      sensitivity: 'Stratifie le risque de chronicisation en 3 catégories',
      populations: 'Lombalgie aiguë, sub-aiguë (consultation primaire)',
    },
    clinicalQuestions: [
      "Quel est le risque que cette lombalgie devienne chronique ?",
      'Faut-il orienter d\'emblée vers une approche multidisciplinaire ?',
      'Une approche purement biomécanique sera-t-elle suffisante ?',
    ],
  },

  ndi: {
    bodyParts: ['cervical'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,86 – 0,92',
      testRetest: 'ICC 0,89 – 0,94',
      mcid: '7 points (cervicalgie mécanique) ; 7 à 14 % selon les études',
      validity: 'Corrélations fortes avec EVA douleur (r ≈ 0,60 – 0,70) et SF-36',
      sensitivity: 'Bonne réactivité aux changements (effect size > 0,8)',
      populations: 'Cervicalgie mécanique, whiplash, spondylose cervicale',
    },
    clinicalQuestions: [
      'La cervicalgie limite-t-elle les activités de la vie quotidienne ?',
      'La douleur perturbe-t-elle la conduite, le sommeil, la lecture ?',
      'Le patient peut-il porter ou soulever une charge sans aggraver ?',
    ],
  },

  odi: {
    bodyParts: ['lumbar'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA', 'RU'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,71 – 0,87',
      testRetest: 'ICC 0,83 – 0,94',
      mcid: '6 à 12 points selon contexte (10 % le plus utilisé)',
      validity: 'Référence (gold standard) pour la lombalgie chronique',
      sensitivity: 'Très bonne réactivité après chirurgie ou rééducation',
      populations: 'Lombalgie aiguë et chronique, post-opératoire rachidien',
    },
    clinicalQuestions: [
      "L'incapacité fonctionnelle justifie-t-elle un arrêt prolongé ?",
      'Quelle est la sévérité globale du retentissement quotidien ?',
      "Le patient répond-il à la rééducation (suivi T0 → T1 → T2) ?",
    ],
  },

  spadi: {
    bodyParts: ['shoulder'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'TR', 'AR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,86 – 0,95',
      testRetest: 'ICC 0,89 – 0,94',
      mcid: '8 à 13 points (épaule rééducation conservatrice ou post-op)',
      validity: 'Bonne corrélation avec QuickDASH et Constant-Murley',
      sensitivity: 'Effect size > 1 sur capsulite, conflit sous-acromial',
      populations: 'Pathologies de l\'épaule (coiffe, capsulite, conflit, post-op)',
    },
    clinicalQuestions: [
      "La douleur ou la raideur d'épaule limite-t-elle l'autonomie ?",
      "Le patient peut-il atteindre une étagère, dormir sur le côté, se coiffer ?",
      "Quelle composante prime : douleur, incapacité, ou les deux ?",
    ],
  },

  rmdq: {
    bodyParts: ['lumbar'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'NO', 'DA', 'SV'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,84 – 0,93',
      testRetest: 'ICC 0,72 – 0,91',
      mcid: '2 à 3 points (lombalgie aiguë), 5 points (chronique)',
      validity: 'Très bonne corrélation avec ODI (r ≈ 0,80)',
      sensitivity: 'Plus sensible que l\'ODI sur lombalgie aiguë / sub-aiguë',
      populations: 'Lombalgie aiguë et sub-aiguë principalement',
    },
    clinicalQuestions: [
      'Quelles activités quotidiennes sont concrètement perturbées ?',
      "Le patient évite-t-il certains mouvements à cause du dos ?",
      'Le retentissement est-il cohérent avec l\'examen clinique ?',
    ],
  },

  hoos: {
    bodyParts: ['hip'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,82 – 0,98 (selon sous-échelle)',
      testRetest: 'ICC 0,75 – 0,93',
      mcid: '8 à 10 points (post-PTH, conflit fémoro-acétabulaire)',
      validity: 'Validité de construit confirmée (corrélation SF-36, WOMAC)',
      sensitivity: 'Bonne réactivité à 3 et 6 mois post-arthroplastie',
      populations: 'Coxarthrose, conflit fémoro-acétabulaire, post-PTH, jeunes adultes',
    },
    clinicalQuestions: [
      "La douleur de hanche perturbe-t-elle la marche, l'escalier, le sommeil ?",
      'Quel est le retentissement sur les loisirs / sports ?',
      "Le patient est-il candidat à une arthroplastie (sévérité fonctionnelle) ?",
    ],
  },

  koos: {
    bodyParts: ['knee'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'AR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,77 – 0,95 (selon sous-échelle)',
      testRetest: 'ICC 0,75 – 0,93',
      mcid: '8 à 10 points (sous-échelles douleur/ADL post-PTG)',
      validity: 'Bien corrélé à WOMAC, IKDC',
      sensitivity: 'Effect size élevé après reconstruction LCA et arthroplastie',
      populations: 'Gonarthrose, post-LCA, ménisque, post-PTG',
    },
    clinicalQuestions: [
      "Quelles activités spécifiques (sport / pivot) sont perdues ?",
      'La douleur est-elle proportionnelle à la limitation rapportée ?',
      "Le suivi T0 → T1 → T2 montre-t-il une trajectoire favorable ?",
    ],
  },

  hads: {
    bodyParts: ['general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA', 'RU'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,78 – 0,89',
      testRetest: 'ICC > 0,80 (1 à 2 semaines)',
      mcid: '1,5 point par sous-échelle (HADS-A, HADS-D)',
      validity: 'Sensibilité 0,80 / spécificité 0,72 pour seuil de 8',
      sensitivity: 'Réactif aux interventions psychologiques',
      populations: 'Patients en hospitalisation, douleur chronique, oncologie',
    },
    clinicalQuestions: [
      "Y a-t-il un drapeau jaune (anxiété / dépression) co-existant ?",
      "L'orientation vers un soutien psychologique est-elle indiquée ?",
      "L'humeur explique-t-elle un blocage de la rééducation ?",
    ],
  },

  quickdash: {
    bodyParts: ['shoulder', 'elbow', 'wrist-hand'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,92 – 0,95',
      testRetest: 'ICC 0,90 – 0,94',
      mcid: '8 à 15,9 points (selon population et auteur)',
      validity: 'Très bonne corrélation avec le DASH complet (r > 0,95)',
      sensitivity: 'Réactif sur épaule, coude (épicondylalgie), main',
      populations: 'Toute pathologie du membre supérieur (multi-articulaire)',
    },
    clinicalQuestions: [
      "Le retentissement fonctionnel touche-t-il plutôt l'épaule, le coude ou la main ?",
      "Le patient peut-il accomplir ses tâches professionnelles ?",
      "Le test global est-il préférable à un test articulaire (SPADI, PRWE) ?",
    ],
  },

  lefs: {
    bodyParts: ['hip', 'knee', 'ankle-foot'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'TR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,93 – 0,96',
      testRetest: 'ICC 0,86 – 0,94',
      mcid: '9 points (réhabilitation MI variée)',
      validity: 'Corrélation SF-36 et WOMAC élevée',
      sensitivity: 'Très réactif après chirurgie MI et rééducation',
      populations: 'Toute pathologie du membre inférieur (multi-articulaire)',
    },
    clinicalQuestions: [
      'Quel est le niveau fonctionnel global du membre inférieur ?',
      "Le patient peut-il monter / descendre les escaliers, marcher 1 km, s'accroupir ?",
      "Le test global complète-t-il les outils articulaires (KOOS, HOOS) ?",
    ],
  },

  mrs: {
    bodyParts: ['neuro'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA', 'RU'],
    psychometrics: {
      internalConsistency: 'Non applicable (échelle unidimensionnelle hétéro-évaluée)',
      testRetest: 'Kappa inter-évaluateurs 0,56 – 0,78',
      mcid: '1 niveau (clinique : passage d\'un grade)',
      validity: 'Référence en post-AVC, validée vs Barthel et NIHSS',
      sensitivity: 'Sensible aux gros changements (autonomie globale)',
      populations: 'Post-AVC, sclérose en plaques, traumatismes crâniens',
    },
    clinicalQuestions: [
      "Quel est le degré global d'autonomie après l'événement neurologique ?",
      "Le patient peut-il vivre sans assistance ?",
      "Quelle évolution sur 3 / 6 / 12 mois ?",
    ],
  },

  bbs: {
    bodyParts: ['neuro', 'general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,96',
      testRetest: 'ICC 0,98 (intra), 0,95 (inter-évaluateurs)',
      mcid: '6 à 8 points (personnes âgées, post-AVC)',
      validity: 'Référence pour l\'équilibre fonctionnel',
      sensitivity: 'Effet plafond chez les personnes très autonomes',
      populations: 'Personnes âgées, post-AVC, Parkinson, SEP',
    },
    clinicalQuestions: [
      'Quel est le risque de chute du patient ?',
      'Le patient peut-il rester debout sans appui, se retourner, ramasser un objet ?',
      "Faut-il prescrire une aide technique à la marche ?",
    ],
  },

  dhi: {
    bodyParts: ['vestibular', 'neuro'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'TR', 'AR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,89',
      testRetest: 'ICC 0,92 – 0,97',
      mcid: '11 à 18 points',
      validity: 'Trois sous-échelles : physique, fonctionnelle, émotionnelle',
      sensitivity: 'Réactif après rééducation vestibulaire',
      populations: 'Vertige paroxystique bénin, névrite vestibulaire, Ménière',
    },
    clinicalQuestions: [
      "Le vertige a-t-il un retentissement émotionnel ou social ?",
      'Le patient évite-t-il certaines situations à cause du vertige ?',
      "La rééducation vestibulaire est-elle indiquée ?",
    ],
  },

  'visa-a': {
    bodyParts: ['ankle-foot'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,82',
      testRetest: 'ICC 0,93 – 0,98',
      mcid: '6,5 à 17 points (selon stade et population)',
      validity: 'Référence pour la tendinopathie achilléenne',
      sensitivity: 'Réactif aux protocoles excentriques (Alfredson)',
      populations: 'Tendinopathie achilléenne (corps tendineux, insertion)',
    },
    clinicalQuestions: [
      'Le patient peut-il courir, sauter, marcher en montée sans douleur ?',
      "L'évolution suit-elle un protocole excentrique de 12 semaines ?",
      "Le score différencie-t-il une atteinte du corps vs insertion ?",
    ],
  },

  'visa-p': {
    bodyParts: ['knee'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,80',
      testRetest: 'ICC 0,95 – 0,97',
      mcid: '13 points (basket, volleyball)',
      validity: 'Référence pour la tendinopathie patellaire ("jumper\'s knee")',
      sensitivity: 'Réactif aux protocoles excentriques sur plan incliné',
      populations: 'Tendinopathie patellaire (sports avec sauts)',
    },
    clinicalQuestions: [
      'Le patient peut-il sauter, accroupir, monter/descendre les escaliers ?',
      "Quel est le niveau de pratique sportive maintenu malgré la douleur ?",
      "Le protocole excentrique est-il efficace (suivi T0 → T1 → T2) ?",
    ],
  },

  tug: {
    bodyParts: ['neuro', 'general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'JA'],
    psychometrics: {
      internalConsistency: 'Non applicable (test chronométré)',
      testRetest: 'ICC 0,97 – 0,99',
      mcid: '0,8 à 1,4 secondes (selon population)',
      validity: 'Cut-off ≥ 13,5 s = risque élevé de chute (personne âgée)',
      sensitivity: 'Sensible au déconditionnement, parkinsonisme',
      populations: 'Personnes âgées, Parkinson, post-AVC, post-arthroplastie',
    },
    clinicalQuestions: [
      'Quel est le risque de chute (cut-off 13,5 s) ?',
      "Le patient est-il autonome pour les transferts assis-debout ?",
      "L'évolution chronométrée objective-t-elle le progrès ?",
    ],
  },

  fabq: {
    bodyParts: ['lumbar', 'general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'TR', 'NO', 'DA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,77 – 0,88',
      testRetest: 'ICC 0,72 – 0,88',
      mcid: '4 points (FABQ-Work), 3 points (FABQ-Phys)',
      validity: 'Validité prédictive forte sur le retour au travail',
      sensitivity: 'Réactif aux thérapies cognitivo-comportementales',
      populations: 'Lombalgie chronique, retour au travail',
    },
    clinicalQuestions: [
      "Les croyances d'évitement freinent-elles le retour au travail ?",
      'Le patient a-t-il peur que l\'activité physique aggrave sa douleur ?',
      'Faut-il une approche éducative avant la mise en charge progressive ?',
    ],
  },

  psfs: {
    bodyParts: ['general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR'],
    psychometrics: {
      internalConsistency: 'Non applicable (3 activités auto-choisies)',
      testRetest: 'ICC 0,84 – 0,97',
      mcid: '2 points (sur l\'échelle 0–10)',
      validity: 'Validité de contenu : centré patient, individualisé',
      sensitivity: 'Plus sensible que les outils génériques sur les buts personnels',
      populations: 'Toutes pathologies — outil d\'objectifs personnalisés',
    },
    clinicalQuestions: [
      "Quels sont les 3 buts fonctionnels du patient ?",
      "L'évolution de SES activités-cibles s'aligne-t-elle avec les autres tests ?",
      'Le PSFS sert-il de support à l\'éducation thérapeutique ?',
    ],
  },

  nprs: {
    bodyParts: ['general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'AR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'Non applicable (item unique)',
      testRetest: 'ICC 0,86 – 0,95',
      mcid: '2 points sur 10 (douleur musculo-squelettique)',
      validity: 'Corrélation forte avec EVA (r > 0,9). Recommandé par IMMPACT.',
      sensitivity: 'Très réactif aux changements aigus comme chroniques',
      populations: 'Toute douleur (aiguë, chronique, péri-opératoire)',
    },
    clinicalQuestions: [
      "Quel est le niveau actuel de la douleur ?",
      "L'intensité a-t-elle changé depuis la dernière séance ?",
      "Le dosage de l'exercice doit-il être adapté à la douleur du jour ?",
    ],
  },

  pcs: {
    bodyParts: ['general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'FI', 'TR', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,87 – 0,95',
      testRetest: 'ICC 0,75 – 0,84',
      mcid: '9 points (douleur chronique)',
      validity: 'Validité de construit : 3 dimensions (rumination, magnification, impuissance)',
      sensitivity: 'Réactif aux interventions cognitivo-comportementales et PNE',
      populations: 'Douleur chronique MSK, fibromyalgie, lombalgie, post-op',
    },
    clinicalQuestions: [
      "Le patient amplifie-t-il sa douleur dans ses pensées (catastrophisme) ?",
      "Doit-on intégrer une approche cognitivo-comportementale au plan de soin ?",
      "Quelle dimension est dominante : rumination, amplification ou impuissance ?",
    ],
  },

  dn4: {
    bodyParts: ['general', 'neuro'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'AR', 'TR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,76',
      testRetest: 'Kappa > 0,80 (inter-évaluateurs)',
      mcid: 'Seuil clinique ≥ 4/10 (pas de MCID au sens strict)',
      validity: 'Sensibilité 83 %, spécificité 90 % pour le diagnostic neuropathique',
      sensitivity: 'Outil diagnostique catégorisant — pas de score de changement',
      populations: 'Douleurs chroniques avec composante possiblement neuropathique',
    },
    clinicalQuestions: [
      "La douleur a-t-elle une composante neuropathique ?",
      "Une orientation médicale pour traitement spécifique est-elle requise ?",
      "Faut-il adapter la rééducation (désensibilisation, GMI) ?",
    ],
    youtubeUrl: undefined,
  },

  orebro: {
    bodyParts: ['lumbar', 'general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'FI'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,71 – 0,84',
      testRetest: 'ICC 0,82 – 0,89',
      mcid: 'Cut-offs : 50 (modéré), 60 (haut risque)',
      validity: 'AUC 0,74 – 0,80 pour pronostic d\'arrêt de travail prolongé à 6 mois',
      sensitivity: 'Outil de stratification — non utilisé pour mesurer le changement',
      populations: 'Douleur musculo-squelettique aiguë / sub-aiguë (en consultation primaire)',
    },
    clinicalQuestions: [
      "Quel est le risque de chronicisation de cette douleur MSK ?",
      "Une approche multidisciplinaire précoce est-elle indiquée ?",
      "Quels facteurs psycho-sociaux dominent (peurs, humeur, retour au travail) ?",
    ],
  },

  prwe: {
    bodyParts: ['wrist-hand'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR', 'AR', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,93 – 0,95',
      testRetest: 'ICC 0,90 – 0,96',
      mcid: '11,5 points (fracture radius distal, post-op)',
      validity: 'Référence du poignet — meilleure réactivité que le DASH pour cette articulation',
      sensitivity: 'Effect size > 1,2 après chirurgie ou rééducation post-traumatique',
      populations: 'Fracture radius distal, De Quervain, tunnel carpien, post-arthrodèse',
    },
    clinicalQuestions: [
      "La douleur ou la limitation fonctionnelle prédomine-t-elle ?",
      "Les activités spécifiques de la main (préhensions fines) sont-elles touchées ?",
      "L'évolution suit-elle le pronostic attendu (T0 → T1 → T2) ?",
    ],
  },

  '6mwt': {
    bodyParts: ['general', 'neuro'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'JA', 'AR'],
    psychometrics: {
      internalConsistency: 'Non applicable (test chronométré)',
      testRetest: 'ICC 0,93 – 0,99',
      mcid: '50 m (BPCO), 30 m (insuffisance cardiaque), 14–30,5 m (gériatrie)',
      validity: 'Corrélation forte avec VO2max sous-maximal (r = 0,73)',
      sensitivity: 'Très réactif aux programmes de réhabilitation cardio-pulmonaire',
      populations: 'BPCO, insuffisance cardiaque, post-AVC, Parkinson, gériatrie',
    },
    clinicalQuestions: [
      "Quelle est la capacité d'endurance actuelle ?",
      "Le patient se déconditionne-t-il ou progresse-t-il (suivi T0 → T1) ?",
      "Faut-il prescrire un réentraînement à l'effort supervisé ?",
    ],
  },

  ikdc: {
    bodyParts: ['knee'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR', 'ZH', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,91 – 0,93',
      testRetest: 'ICC 0,93 – 0,95',
      mcid: '11,5 points (post-LCA, post-arthroplastie)',
      validity: 'Référence du genou sportif. Bonne corrélation avec KOOS et Lysholm.',
      sensitivity: 'Effect size > 1,5 après reconstruction LCA',
      populations: 'LCA, ménisque, instabilité fémoro-patellaire, post-arthroscopie',
    },
    clinicalQuestions: [
      "Le patient peut-il reprendre les pivots et changements de direction ?",
      "La douleur ou l'instabilité prédomine-t-elle ?",
      "Les critères objectifs de retour au sport sont-ils atteints ?",
    ],
  },

  constant: {
    bodyParts: ['shoulder'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR', 'AR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,68 – 0,93',
      testRetest: 'ICC 0,80 – 0,96',
      mcid: '10,4 points (post-arthroplastie, coiffe)',
      validity: 'Référence post-opératoire épaule. Bonne corrélation avec SPADI et DASH.',
      sensitivity: 'Effect size > 1 après chirurgie de la coiffe',
      populations: 'Pathologies de la coiffe, capsulite, post-arthroplastie',
    },
    clinicalQuestions: [
      "La douleur ou la fonction prédomine-t-elle ?",
      "À quelle hauteur le patient peut-il utiliser son bras sans douleur ?",
      "L'évolution post-op suit-elle la courbe attendue ?",
    ],
  },

  faos: {
    bodyParts: ['ankle-foot'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,85 – 0,90',
      testRetest: 'ICC 0,89 – 0,94',
      mcid: '9 points (instabilité chronique cheville, post-arthroscopie)',
      validity: 'Version courte validée du FAOS. Plus spécifique que LEFS pour la cheville/pied.',
      sensitivity: 'Bonne réactivité aux interventions de stabilisation',
      populations: 'Entorse cheville, instabilité chronique, fasciite plantaire, post-op cheville',
    },
    clinicalQuestions: [
      "La marche sur terrain inégal est-elle limitée ?",
      "Le patient peut-il reprendre la course / les sauts ?",
      "Quels facteurs prédominent : douleur, instabilité, raideur ?",
    ],
  },

  tinetti: {
    bodyParts: ['neuro', 'general'],
    languages: ['FR', 'EN', 'NL', 'DE', 'ES', 'IT', 'PT', 'SV', 'NO', 'DA', 'TR', 'AR', 'JA'],
    psychometrics: {
      internalConsistency: 'α de Cronbach 0,85 – 0,90',
      testRetest: 'ICC 0,93 – 0,97 (inter-évaluateurs)',
      mcid: '4–5 points (gériatrie). Cut-off : < 19 = risque élevé, 19–24 = modéré, ≥ 25 = faible.',
      validity: 'Sensibilité 0,68 / spécificité 0,86 pour prédire les chutes',
      sensitivity: 'Effet plafond chez les patients très autonomes',
      populations: 'Personnes âgées, Parkinson, post-AVC, sclérose en plaques',
    },
    clinicalQuestions: [
      "Quel est le risque de chute ?",
      "Le déficit est-il plutôt sur l'équilibre statique ou sur la marche ?",
      "Une aide à la marche est-elle indiquée ?",
    ],
  },
};

export function getMeta(id: string): QuestionnaireMeta | undefined {
  return QUESTIONNAIRE_META[id];
}
