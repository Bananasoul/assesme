/**
 * Interprétation automatique des scores de questionnaires.
 *
 * Pour chaque type de test, on définit des "zones cliniques" avec cut-offs
 * publiés en littérature. Étant donné un score réel patient, renvoie :
 * - severity : niveau (none/mild/moderate/severe/critical)
 * - label    : étiquette courte ("Modéré", "Risque élevé"…)
 * - tone     : couleur (vert / ambre / rouge)
 * - summary  : 1 phrase qui résume ce que ça veut dire cliniquement
 * - actions  : 2-3 implications thérapeutiques concrètes
 *
 * NB: les cut-offs sont les références internationales les plus utilisées.
 * Cf. BACKLOG.md "F. Mécanismes de la douleur" pour les sources.
 */

export type Severity = 'none' | 'mild' | 'moderate' | 'severe' | 'critical';
export type Tone = 'green' | 'amber' | 'red' | 'neutral';

export type Interpretation = {
  severity: Severity;
  label: string;
  tone: Tone;
  summary: string;
  actions: string[];
};

const TONE_BY_SEVERITY: Record<Severity, Tone> = {
  none: 'green',
  mild: 'green',
  moderate: 'amber',
  severe: 'red',
  critical: 'red',
};

/**
 * Définit les zones d'interprétation par type de test.
 * `interpret` : fonction (score, maxScore) → Interpretation.
 */
const INTERPRETERS: Record<string, (score: number, maxScore: number) => Interpretation> = {
  // ============ DOULEUR / INTENSITÉ ============
  NPRS: (score) => {
    if (score <= 3) return mk('none', 'Douleur légère', 'green',
      'Intensité douloureuse faible. Rééducation active sans restriction.',
      ['Maintenir la mise en charge progressive', 'Pas d\'antalgique requis']);
    if (score <= 6) return mk('moderate', 'Douleur modérée', 'amber',
      'Adaptation du dosage de l\'exercice. Antalgiques au besoin.',
      ['Réduire l\'intensité, augmenter la fréquence', 'Surveiller la latence post-effort', 'TENS/thermothérapie en complément']);
    return mk('severe', 'Douleur sévère', 'red',
      'Prioriser le contrôle de la douleur avant la mise en charge.',
      ['Antalgiques + repos relatif', 'Mobilisation infra-douloureuse', 'Éducation à la douleur']);
  },

  // ============ LOMBAIRE ============
  ODI: (_, __) => undefined as any, // override below using percentages
  RMDQ: (score) => {
    if (score <= 7) return mk('mild', 'Incapacité légère', 'green',
      'Retentissement fonctionnel limité.',
      ['Exercices actifs en progressivité', 'Encouragement au mouvement']);
    if (score <= 13) return mk('moderate', 'Incapacité modérée', 'amber',
      'Limitations fonctionnelles présentes au quotidien.',
      ['Renforcement progressif lombo-pelvien', 'Reconditionnement aérobie', 'Travail postural']);
    return mk('severe', 'Incapacité sévère', 'red',
      'Retentissement majeur sur les AVQ. Approche multidisciplinaire envisageable.',
      ['Approche cognitivo-comportementale', 'Prise en charge psychosociale associée', 'Reprise progressive de l\'activité']);
  },
  START_BACK: (score) => {
    // score sur 9, sous-échelle psy non disponible ici → on est conservateur
    if (score < 4) return mk('mild', 'Risque faible', 'green',
      'Bon pronostic. Évolution naturelle généralement favorable.',
      ['Réassurance + encouragement au mouvement', 'Auto-gestion privilégiée', 'Intervention minimale']);
    return mk('severe', 'Risque modéré à élevé', 'amber',
      'Risque de chronicisation. Surveiller la sous-échelle psychosociale (items 5-9).',
      ['Kinésithérapie standard si moyen risque', 'CBT + rééducation intensive si haut risque psy', 'Réévaluer à 3 mois']);
  },
  FABQ: (score, maxScore) => {
    // Score global FABQ (16 items × 0-6 = 0-96). On regarde le pourcentage.
    const pct = (score / maxScore) * 100;
    if (pct < 35) return mk('mild', 'Peurs/évitement faibles', 'green',
      'Croyances peu limitantes.',
      ['Information évidence-based', 'Reprise normale des activités']);
    if (pct < 60) return mk('moderate', 'Peurs/évitement modérés', 'amber',
      'Présence de croyances d\'évitement à surveiller.',
      ['Exposition graduelle (Graded Exposure)', 'Éducation à la douleur (PNE)', 'Recadrage des croyances']);
    return mk('severe', 'Peurs/évitement élevés', 'red',
      'Drapeau jaune majeur. Forte kinésiophobie liée au travail/activité.',
      ['CBT prioritaire', 'Exposition très graduelle', 'Co-prise en charge psychologique envisageable']);
  },
  OREBRO: (score) => {
    if (score < 50) return mk('mild', 'Risque faible', 'green',
      'Bon pronostic. Prise en charge standard.',
      ['Rééducation active classique', 'Éducation à la douleur de base']);
    if (score <= 60) return mk('moderate', 'Risque modéré', 'amber',
      'Surveillance renforcée nécessaire.',
      ['Composante éducative renforcée', 'Suivi rapproché', 'Réévaluer à 6 semaines']);
    return mk('severe', 'Risque élevé de chronicisation', 'red',
      'Prise en charge multidisciplinaire indiquée d\'emblée.',
      ['Approche bio-psycho-sociale', 'Psychologue / médecin du travail', 'CBT + reprise activité progressive']);
  },

  // ============ CERVICAL ============
  NDI: (_, __) => undefined as any, // override below

  // ============ ÉPAULE ============
  SPADI: (_, __) => undefined as any, // override below

  // ============ GENOU ============
  KOOS: (_, __) => undefined as any, // override below (higher = better)
  IKDC: (_, __) => undefined as any, // override below

  // ============ HANCHE ============
  HOOS: (_, __) => undefined as any, // override below

  // ============ MEMBRE INF ============
  LEFS: (score) => {
    // Score 0-80, higher = better
    if (score >= 64) return mk('mild', 'Fonction conservée', 'green',
      'Bonne autonomie fonctionnelle du membre inférieur.',
      ['Reprise progressive du sport', 'Pliométrie / agilité']);
    if (score >= 40) return mk('moderate', 'Fonction limitée', 'amber',
      'Restrictions sur certaines activités.',
      ['Renforcement progressif', 'Travail proprioceptif', 'Reconditionnement aérobie']);
    return mk('severe', 'Fonction très limitée', 'red',
      'Retentissement majeur. Activités quotidiennes affectées.',
      ['Aide technique à envisager', 'Chaîne ouverte initialement', 'Mise en charge graduée']);
  },

  // ============ POIGNET/MAIN ============
  QUICKDASH: (score) => {
    // Score 0-100, higher = worse
    if (score < 15) return mk('mild', 'Retentissement léger', 'green',
      'Atteinte fonctionnelle limitée.',
      ['Reprise activité, prévention récidive']);
    if (score < 40) return mk('moderate', 'Retentissement modéré', 'amber',
      'Limitations sur les activités quotidiennes ou professionnelles.',
      ['Rééducation ciblée + ergonomie', 'Renforcement progressif', 'Adaptations au poste de travail']);
    return mk('severe', 'Retentissement sévère', 'red',
      'Incapacité fonctionnelle importante.',
      ['Décharge progressive', 'Aides techniques', 'Suivi médical associé']);
  },
  PRWE: (score) => {
    if (score < 20) return mk('mild', 'Retentissement léger', 'green',
      'Récupération avancée. Travail de précision possible.',
      ['Mobilisation fine, dextérité', 'Reprise activités spécifiques']);
    if (score < 50) return mk('moderate', 'Retentissement modéré', 'amber',
      'Limitation des activités manuelles fines.',
      ['Renforcement progressif fléchisseurs/extenseurs', 'Mobilisation analytique', 'Reprogrammation neuro-motrice']);
    return mk('severe', 'Retentissement sévère', 'red',
      'Activités basiques limitées.',
      ['Contrôle douleur prioritaire', 'Auto-mobilisations 3×/jour', 'Économie articulaire stricte']);
  },

  // ============ PSYCHO-SOCIAL / DOULEUR ============
  TAMPA: (score) => {
    if (score < 37) return mk('mild', 'Kinésiophobie faible', 'green',
      'Peu de peur du mouvement. Approche mécanique classique adaptée.',
      ['Renforcement progressif', 'Mise en charge normale']);
    return mk('severe', 'Kinésiophobie élevée', 'red',
      'Drapeau jaune. La peur du mouvement freine la rééducation.',
      ['Exposition graduelle (Graded Exposure)', 'Éducation à la douleur (Douleur ≠ Lésion)', 'Désensibilisation verbale + encouragement']);
  },
  PCS: (score) => {
    if (score < 20) return mk('mild', 'Catastrophisme faible', 'green',
      'Pas de pensée catastrophiste dominante.',
      ['Pas d\'intervention spécifique requise']);
    if (score < 30) return mk('moderate', 'Catastrophisme modéré', 'amber',
      'Présence de pensées catastrophistes à adresser.',
      ['Éducation à la douleur dès les 1res séances', 'Reformulation cognitive', 'Renforcement de l\'auto-efficacité']);
    return mk('severe', 'Catastrophisme élevé', 'red',
      'Drapeau jaune majeur. Profil à haut risque de chronicisation.',
      ['Approche cognitivo-comportementale prioritaire', 'Co-prise en charge psychologique', 'Imagerie motrice graduée']);
  },
  HADS: (score, maxScore) => {
    // Score total HADS sur 42 (anxiété 21 + dépression 21)
    // Cut-off par sous-échelle : ≥11 = clinique
    if (score < 16) return mk('mild', 'Niveau normal', 'green',
      'Pas de signe d\'anxiété ni de dépression significatif.',
      ['Pas de réorientation nécessaire']);
    if (score < 22) return mk('moderate', 'Niveau limite', 'amber',
      'Symptômes psychologiques à surveiller.',
      ['Communication transparente avec le patient', 'Vérifier l\'évolution dans le temps']);
    return mk('severe', 'Niveau clinique probable', 'red',
      'Symptômes anxiodépressifs probables (≥11/21 sur une sous-échelle).',
      ['Réorientation vers médecin traitant ou psychologue', 'Activité physique aérobie modérée', 'Éducation bio-psycho-sociale']);
  },
  DN4: (score) => {
    if (score < 4) return mk('mild', 'Composante nociceptive', 'green',
      'Profil douloureux principalement mécanique/nociceptif.',
      ['Approche mécanique classique', 'Mobilisations, renforcement']);
    return mk('severe', 'Neuropathie probable', 'red',
      'Composante neuropathique probable (sensibilité 83 % / spécificité 90 %).',
      ['Orienter vers médecin pour traitement spécifique', 'Désensibilisation graduée', 'Éviter les techniques douloureuses', 'Imagerie motrice graduée (GMI)']);
  },

  // ============ TENDONS ============
  'VISA-A': (score) => {
    if (score >= 80) return mk('mild', 'Tendinopathie peu sévère', 'green',
      'Reprise sportive progressive possible.',
      ['Pliométrie, sauts contrôlés', 'Reprise course graduelle']);
    if (score >= 50) return mk('moderate', 'Tendinopathie modérée', 'amber',
      'Phase de renforcement lourd indiquée.',
      ['Heavy Slow Resistance (HSR) excentrique', 'Gestion de la charge en compétition', 'Reprise course interval']);
    return mk('severe', 'Tendinopathie sévère', 'red',
      'Atteinte douloureuse importante limitant l\'activité.',
      ['Phase isométrique (5×45s)', 'Repos relatif', 'Gestion stricte de la charge']);
  },
  'VISA-P': (score) => {
    if (score >= 80) return mk('mild', 'Tendinopathie peu sévère', 'green',
      'Reprise sportive en cours.',
      ['Pliométrie : drop jumps, box jumps', 'Reprise compétition']);
    if (score >= 50) return mk('moderate', 'Tendinopathie modérée', 'amber',
      'Renforcement excentrique lourd indiqué.',
      ['Decline Squat HSR', 'Suspension momentanée des sauts', 'Décélérations contrôlées']);
    return mk('severe', 'Tendinopathie sévère', 'red',
      'Douleur limite fortement les activités.',
      ['Isométriques quadriceps 45s ×4', 'Repos sport avec sauts', 'Éducation à la charge']);
  },

  // ============ NEUROLOGIQUE / ÉQUILIBRE ============
  BBS: (score) => {
    if (score >= 45) return mk('mild', 'Risque chute faible', 'green',
      'Équilibre conservé. Suivi endurance/force.',
      ['Travail endurance', 'Renforcement global']);
    if (score >= 40) return mk('moderate', 'Risque chute modéré', 'amber',
      'Surveillance équilibre, aide à la marche à discuter.',
      ['Travail proprioceptif', 'Réduction base de sustentation', 'Audit domicile']);
    return mk('severe', 'Risque chute élevé', 'red',
      'Aide technique à la marche fortement recommandée.',
      ['Aide à la marche (canne/déambulateur)', 'Rééducation équilibre prioritaire', 'Sécurisation domicile']);
  },
  TINETTI: (score) => {
    if (score >= 25) return mk('mild', 'Risque chute faible', 'green',
      'Équilibre et marche conservés.',
      ['Travail endurance et force', 'Activité physique régulière']);
    if (score >= 19) return mk('moderate', 'Risque chute modéré', 'amber',
      'Vigilance + aide à la marche à envisager.',
      ['Aide technique selon contexte', 'Travail tâches doubles', 'Adaptation domicile']);
    return mk('severe', 'Risque chute élevé', 'red',
      'Aide technique indispensable.',
      ['Déambulateur indispensable', 'Rééducation intensive équilibre', 'Sécurisation domicile complète']);
  },
  MRS: (score) => {
    if (score <= 1) return mk('mild', 'Pas/peu de handicap', 'green',
      'Retour vie normale.',
      ['Réintégration sociale/professionnelle']);
    if (score <= 3) return mk('moderate', 'Handicap modéré', 'amber',
      'Indépendance pour la marche possible.',
      ['Rééducation à la marche et équilibre', 'Travail des AVQ']);
    return mk('severe', 'Handicap sévère', 'red',
      'Dépendance importante.',
      ['Prévention complications de décubitus', 'Verticalisation', 'Formation des aidants']);
  },
};

// ============================================================
// Variantes higher-is-worse calculées sur le pourcentage
// ============================================================
function pctHigherWorse(score: number, maxScore: number, mildMax = 20, modMax = 40, severeMax = 60): Interpretation {
  const pct = (score / maxScore) * 100;
  if (pct <= mildMax) return mk('mild', 'Incapacité légère', 'green',
    'Retentissement fonctionnel limité.',
    ['Reprise progressive, prévention récidive']);
  if (pct <= modMax) return mk('moderate', 'Incapacité modérée', 'amber',
    'Limitations fonctionnelles présentes.',
    ['Rééducation active ciblée', 'Reconditionnement progressif']);
  if (pct <= severeMax) return mk('severe', 'Incapacité sévère', 'red',
    'Retentissement majeur sur les AVQ.',
    ['Approche multidisciplinaire', 'Suivi rapproché']);
  return mk('critical', 'Incapacité majeure', 'red',
    'Retentissement extrême. Réévaluation médicale conseillée.',
    ['Bilan médical complémentaire', 'Aides techniques nécessaires']);
}

// Higher = better (KOOS, HOOS, IKDC)
function higherBetter(score: number, maxScore: number): Interpretation {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return mk('mild', 'Fonction excellente', 'green',
    'Bonne récupération fonctionnelle.',
    ['Maintien activité, prévention récidive']);
  if (pct >= 60) return mk('moderate', 'Fonction modérée', 'amber',
    'Limitations résiduelles, progression possible.',
    ['Rééducation ciblée', 'Renforcement progressif']);
  if (pct >= 40) return mk('severe', 'Fonction limitée', 'red',
    'Retentissement important sur les AVQ.',
    ['Approche intensive', 'Aide technique éventuelle']);
  return mk('critical', 'Fonction très altérée', 'red',
    'Atteinte sévère.',
    ['Décharge progressive', 'Discussion chirurgicale envisageable']);
}

// Patch: tests utilisant les helpers
INTERPRETERS.ODI = (s, m) => pctHigherWorse(s, m, 20, 40, 60);
INTERPRETERS.NDI = (s, m) => pctHigherWorse(s, m, 15, 35, 60);
INTERPRETERS.SPADI = (s, m) => pctHigherWorse(s, m, 30, 50, 70);
INTERPRETERS.KOOS = (s, m) => higherBetter(s, m);
INTERPRETERS.HOOS = (s, m) => higherBetter(s, m);
INTERPRETERS.IKDC = (s, m) => higherBetter(s, m);
INTERPRETERS['HOOS-FULL'] = (s, m) => higherBetter(s, m);
INTERPRETERS['KOOS-FULL'] = (s, m) => higherBetter(s, m);
INTERPRETERS['FAOS-FULL'] = (s, m) => higherBetter(s, m);
INTERPRETERS.FAOS = (s, m) => higherBetter(s, m);
INTERPRETERS.CONSTANT = (s, m) => higherBetter(s, m); // version patient-rated /35

function mk(severity: Severity, label: string, tone: Tone, summary: string, actions: string[]): Interpretation {
  return { severity, label, tone, summary, actions };
}

export function interpretScore(type: string, score: number, maxScore: number): Interpretation | null {
  const upper = type.toUpperCase();
  const interpreter = INTERPRETERS[upper] ?? INTERPRETERS[type];
  if (!interpreter) return null;
  try {
    const result = interpreter(score, maxScore);
    return result ?? null;
  } catch {
    return null;
  }
}

// ============================================================
// COMPARAISON T0 → Tn  (significance clinique via MCID)
// ============================================================

/**
 * MCID (Minimal Clinically Important Difference) par type de test.
 * Valeurs issues de la littérature standard (cf. BACKLOG.md F.).
 * Une variation ≥ MCID dans le bon sens = changement cliniquement significatif.
 */
const MCID_BY_TEST: Record<string, number> = {
  NPRS: 2,
  ODI: 10,          // 10 points (10 %)
  NDI: 7,
  SPADI: 10,
  RMDQ: 3,
  KOOS: 9,
  HOOS: 9,
  'KOOS-FULL': 9,
  'HOOS-FULL': 9,
  'FAOS-FULL': 9,
  FAOS: 9,
  IKDC: 11.5,
  LEFS: 9,
  QUICKDASH: 10,
  PRWE: 11.5,
  TAMPA: 5.5,
  PCS: 9,
  HADS: 1.5,        // par sous-échelle
  DN4: 1,           // critère catégoriel (cut-off 4)
  FABQ: 4,
  OREBRO: 10,
  'VISA-A': 12,
  'VISA-P': 13,
  BBS: 7,
  TINETTI: 4,
  MRS: 1,
  CONSTANT: 10,
  '6MWT': 30,       // mètres
  DHI: 14,
};

/** Tests où un score plus HAUT = meilleur. Le reste = plus haut = pire. */
const HIGHER_IS_BETTER = new Set([
  'KOOS', 'HOOS', 'KOOS-FULL', 'HOOS-FULL', 'FAOS', 'FAOS-FULL',
  'LEFS', 'IKDC', 'CONSTANT',
  'BBS', 'TINETTI',
  'VISA-A', 'VISA-P',
  '6MWT',
]);

export type EvolutionDirection = 'improvement' | 'deterioration' | 'stable';
export type EvolutionSignificance = 'significant' | 'sub-mcid' | 'stable' | 'unknown';

export type Evolution = {
  delta: number;
  baselineScore: number;
  direction: EvolutionDirection;
  significance: EvolutionSignificance;
  mcid: number | null;
  label: string;
  short: string;
  tone: Tone;
};

/**
 * Compare le score actuel au score baseline (T0 ou premier bilan trouvé).
 * Renvoie un Evolution avec direction / significance clinique.
 */
export function compareToBaseline(type: string, current: number, baseline: number): Evolution | null {
  const upper = type.toUpperCase();
  const mcid = MCID_BY_TEST[upper] ?? null;
  const higherBetter = HIGHER_IS_BETTER.has(upper);

  const delta = current - baseline;
  const improvementMagnitude = higherBetter ? delta : -delta;

  // Pas de MCID connu → on rend une évolution brute sans qualification
  if (mcid === null) {
    if (delta === 0) {
      return ev(delta, baseline, 'stable', 'unknown', null, 'Score identique', '= 0', 'neutral');
    }
    return ev(
      delta,
      baseline,
      improvementMagnitude > 0 ? 'improvement' : 'deterioration',
      'unknown',
      null,
      improvementMagnitude > 0 ? `Évolution favorable (Δ ${formatDelta(delta)})` : `Évolution défavorable (Δ ${formatDelta(delta)})`,
      `Δ ${formatDelta(delta)}`,
      improvementMagnitude > 0 ? 'green' : 'amber',
    );
  }

  // Seuil de stabilité : < MCID / 2 dans n'importe quel sens
  if (Math.abs(improvementMagnitude) < mcid / 2) {
    return ev(delta, baseline, 'stable', 'stable', mcid, `Stable (Δ ${formatDelta(delta)}, < ½ MCID)`, `Stable`, 'neutral');
  }

  if (improvementMagnitude >= mcid) {
    return ev(
      delta,
      baseline,
      'improvement',
      'significant',
      mcid,
      `Amélioration cliniquement significative (Δ ${formatDelta(delta)}, MCID = ${mcid})`,
      `↗ ${formatDelta(delta)} · MCID atteint`,
      'green',
    );
  }
  if (improvementMagnitude > 0) {
    return ev(
      delta,
      baseline,
      'improvement',
      'sub-mcid',
      mcid,
      `Tendance favorable mais sous le MCID (Δ ${formatDelta(delta)}, MCID = ${mcid})`,
      `↗ ${formatDelta(delta)} · sub-MCID`,
      'amber',
    );
  }
  if (-improvementMagnitude >= mcid) {
    return ev(
      delta,
      baseline,
      'deterioration',
      'significant',
      mcid,
      `Dégradation cliniquement significative (Δ ${formatDelta(delta)}, MCID = ${mcid})`,
      `↘ ${formatDelta(delta)} · MCID atteint`,
      'red',
    );
  }
  return ev(
    delta,
    baseline,
    'deterioration',
    'sub-mcid',
    mcid,
    `Légère dégradation sous le MCID (Δ ${formatDelta(delta)}, MCID = ${mcid})`,
    `↘ ${formatDelta(delta)} · sub-MCID`,
    'amber',
  );
}

function ev(
  delta: number,
  baselineScore: number,
  direction: EvolutionDirection,
  significance: EvolutionSignificance,
  mcid: number | null,
  label: string,
  short: string,
  tone: Tone,
): Evolution {
  return { delta, baselineScore, direction, significance, mcid, label, short, tone };
}

function formatDelta(delta: number): string {
  if (delta > 0) return `+${delta}`;
  return `${delta}`;
}

export function toneStyles(tone: Tone): { bg: string; border: string; text: string; accent: string } {
  switch (tone) {
    case 'green':
      // Favorable : carte claire, accent noir
      return { bg: '#F9FAFB', border: '#E5E7EB', text: '#0E1217', accent: '#0E1217' };
    case 'amber':
      // Vigilance : carte gris clair, accent gris foncé
      return { bg: '#F3F4F6', border: '#D1D5DB', text: '#0E1217', accent: '#4B5563' };
    case 'red':
      // Sévère : carte noire pleine, texte blanc
      return { bg: '#0E1217', border: '#0E1217', text: '#FFFFFF', accent: '#FFFFFF' };
    default:
      return { bg: '#F9FAFB', border: '#E5E7EB', text: '#374151', accent: '#6B7280' };
  }
}
