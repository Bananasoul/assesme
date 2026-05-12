/**
 * Seed dédié pour le compte de Phil (philippebanaszak@gmail.com).
 *
 * Crée des patients démo avec un mix de bilans à différentes temporalités
 * pour pouvoir tester l'UI (courbes d'évolution, mode prescription, etc.).
 *
 * Idempotent : ne supprime rien, ne crée que ce qui n'existe pas (clé email).
 *
 * Usage : npx tsx prisma/seed-philippe.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PRACTITIONER_EMAIL = 'philippebanaszak@gmail.com';

type AssessmentSpec = {
  anchor: 'T0_INITIAL' | 'T1_MID_TREATMENT' | 'T2_FINAL' | 'FOLLOW_UP';
  daysAgo: number;
  notes?: string;
  results: { type: string; score: number; maxScore: number }[];
};

type PatientSpec = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  pathology?: string;
  assessments: AssessmentSpec[];
  exercises?: { name: string; sets?: string; reps?: string; instructions?: string }[];
  sessionNotes?: { daysAgo: number; content: string }[];
};

const demoPatients: PatientSpec[] = [
  // ============================================================
  // 1. Marie Dubois — Lombalgie chronique en amélioration
  // ============================================================
  {
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois.demo@example.com',
    dateOfBirth: '1978-04-12',
    pathology: 'Lombalgie chronique non spécifique',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 60,
        notes: 'Bilan initial. Douleur lombaire évoluant depuis 8 mois. Sédentaire, télétravail.',
        results: [
          { type: 'ODI', score: 38, maxScore: 100 },
          { type: 'START_BACK', score: 6, maxScore: 9 },
          { type: 'TAMPA', score: 48, maxScore: 68 },
          { type: 'NPRS', score: 7, maxScore: 10 },
          { type: 'PCS', score: 28, maxScore: 52 },
        ],
      },
      {
        anchor: 'T1_MID_TREATMENT',
        daysAgo: 30,
        notes: 'Réévaluation à 1 mois. Amélioration significative, exercices bien intégrés.',
        results: [
          { type: 'ODI', score: 22, maxScore: 100 },
          { type: 'TAMPA', score: 38, maxScore: 68 },
          { type: 'NPRS', score: 4, maxScore: 10 },
        ],
      },
      {
        anchor: 'T2_FINAL',
        daysAgo: 5,
        notes: 'Bilan final. Reprise progressive du sport, lombalgie résiduelle bien gérée.',
        results: [
          { type: 'ODI', score: 12, maxScore: 100 },
          { type: 'TAMPA', score: 28, maxScore: 68 },
          { type: 'NPRS', score: 2, maxScore: 10 },
        ],
      },
    ],
    exercises: [
      { name: 'Bird-dog', sets: '3', reps: '10/côté', instructions: 'Contrôle moteur lombo-pelvien, tenir 3 sec en position' },
      { name: 'Dead-bug', sets: '3', reps: '12', instructions: 'Stabilisation lombaire en décubitus dorsal' },
      { name: 'Marche rapide quotidienne', reps: '30 min/jour', instructions: 'Reconditionnement aérobie progressif' },
    ],
    sessionNotes: [
      { daysAgo: 60, content: 'S1 — Anamnèse approfondie. Profil kinésiophobe, exposition graduelle prioritaire.' },
      { daysAgo: 45, content: 'S5 — Patient adhère bien aux exercices. ODI commence à diminuer.' },
      { daysAgo: 20, content: 'S12 — Évolution favorable. On commence le renforcement progressif.' },
    ],
  },

  // ============================================================
  // 2. Thomas Leclercq — Cervicalgie post-whiplash
  // ============================================================
  {
    firstName: 'Thomas',
    lastName: 'Leclercq',
    email: 'thomas.leclercq.demo@example.com',
    dateOfBirth: '1985-09-22',
    pathology: 'Cervicalgie post-whiplash (accident voiture 2 semaines)',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 14,
        notes: 'Whiplash léger (Grade 2). Limitation rotation cervicale, céphalées tensionnelles associées.',
        results: [
          { type: 'NDI', score: 42, maxScore: 100 },
          { type: 'TAMPA', score: 35, maxScore: 68 },
          { type: 'NPRS', score: 6, maxScore: 10 },
        ],
      },
      {
        anchor: 'T1_MID_TREATMENT',
        daysAgo: 3,
        notes: 'Bonne récupération à 11 jours. Mobilité cervicale presque complète.',
        results: [
          { type: 'NDI', score: 18, maxScore: 100 },
          { type: 'NPRS', score: 3, maxScore: 10 },
        ],
      },
    ],
    exercises: [
      { name: 'Rétractions cervicales', sets: '3', reps: '10', instructions: 'Doux, sans douleur' },
      { name: 'Étirements trapèze sup', reps: '30s × 3', instructions: 'Bilatéral' },
    ],
  },

  // ============================================================
  // 3. Sophie Martin — Gonarthrose unilatérale
  // ============================================================
  {
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin.demo@example.com',
    dateOfBirth: '1962-11-08',
    pathology: 'Gonarthrose médiale gauche (stade 2 Kellgren-Lawrence)',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 90,
        notes: 'Gonalgie médiale gauche, raideur matinale 20 min. Pas de chirurgie envisagée pour le moment.',
        results: [
          { type: 'KOOS', score: 52, maxScore: 100 },
          { type: 'NPRS', score: 5, maxScore: 10 },
          { type: 'LEFS', score: 38, maxScore: 80 },
        ],
      },
      {
        anchor: 'T1_MID_TREATMENT',
        daysAgo: 45,
        notes: 'Amélioration sur la fonction. Renforcement quadriceps + exercices aquatiques.',
        results: [
          { type: 'KOOS', score: 68, maxScore: 100 },
          { type: 'NPRS', score: 3, maxScore: 10 },
          { type: 'LEFS', score: 54, maxScore: 80 },
        ],
      },
      {
        anchor: 'T2_FINAL',
        daysAgo: 7,
        notes: 'Bonne tolérance fonctionnelle. Suivi trimestriel à prévoir.',
        results: [
          { type: 'KOOS', score: 76, maxScore: 100 },
          { type: 'NPRS', score: 2, maxScore: 10 },
          { type: 'LEFS', score: 62, maxScore: 80 },
        ],
      },
    ],
    exercises: [
      { name: 'Quadriceps statique', sets: '3', reps: '15', instructions: 'Coussin sous le genou, 5 sec de contraction' },
      { name: 'Demi-squats', sets: '3', reps: '12', instructions: 'Amplitude tolérée sans douleur' },
      { name: 'Vélo d\'appartement', reps: '20 min', instructions: 'Résistance faible, fréquence 3×/sem' },
    ],
  },

  // ============================================================
  // 4. Lucas Bernard — Tendinopathie achilléenne (coureur)
  // ============================================================
  {
    firstName: 'Lucas',
    lastName: 'Bernard',
    email: 'lucas.bernard.demo@example.com',
    dateOfBirth: '1992-03-15',
    pathology: 'Tendinopathie corporéale achilléenne droite (coureur semi-marathon)',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 35,
        notes: 'Coureur compétitif, douleur post-séance depuis 6 semaines. Volume entraînement augmenté trop vite.',
        results: [
          { type: 'VISA-A', score: 52, maxScore: 100 },
          { type: 'NPRS', score: 5, maxScore: 10 },
        ],
      },
      {
        anchor: 'T1_MID_TREATMENT',
        daysAgo: 7,
        notes: 'Protocole Alfredson bien suivi. Reprise course graduelle 3×/sem.',
        results: [
          { type: 'VISA-A', score: 74, maxScore: 100 },
          { type: 'NPRS', score: 2, maxScore: 10 },
        ],
      },
    ],
    exercises: [
      { name: 'Excentrique mollets (Alfredson)', sets: '3', reps: '15 genou tendu + 15 fléchi', instructions: '2×/jour, 12 semaines, charger progressivement' },
      { name: 'Reprise course progressive', reps: 'Plan 12 sem', instructions: 'Marche → fractionné → course continue' },
    ],
  },

  // ============================================================
  // 5. Anne Petit — Capsulite rétractile épaule
  // ============================================================
  {
    firstName: 'Anne',
    lastName: 'Petit',
    email: 'anne.petit.demo@example.com',
    dateOfBirth: '1968-07-19',
    pathology: 'Capsulite rétractile épaule droite (phase 2 - raideur)',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 21,
        notes: 'Phase douloureuse passée, maintenant raideur dominante. Diabète type 2 associé.',
        results: [
          { type: 'SPADI', score: 58, maxScore: 100 },
          { type: 'QUICKDASH', score: 52, maxScore: 100 },
          { type: 'NPRS', score: 4, maxScore: 10 },
        ],
      },
    ],
    exercises: [
      { name: 'Mobilisation pendulaire Codman', sets: '3', reps: '20 cercles', instructions: 'En antalgie, 3×/jour' },
      { name: 'Étirement capsule postérieure (sleeper stretch)', reps: '30s × 5', instructions: 'Décubitus latéral' },
    ],
  },

  // ============================================================
  // 6. Karim Belkacem — Lombo-sciatalgie aiguë L5
  // ============================================================
  {
    firstName: 'Karim',
    lastName: 'Belkacem',
    email: 'karim.belkacem.demo@example.com',
    dateOfBirth: '1981-12-03',
    pathology: 'Lombo-sciatalgie L5 droite aiguë (3 semaines)',
    assessments: [
      {
        anchor: 'T0_INITIAL',
        daysAgo: 21,
        notes: 'Radiculalgie L5 dte. IRM : protrusion L4-L5. Pas de déficit moteur, pas de red flag.',
        results: [
          { type: 'ODI', score: 56, maxScore: 100 },
          { type: 'DN4', score: 5, maxScore: 10 },
          { type: 'START_BACK', score: 7, maxScore: 9 },
          { type: 'TAMPA', score: 52, maxScore: 68 },
          { type: 'NPRS', score: 8, maxScore: 10 },
        ],
      },
      {
        anchor: 'T1_MID_TREATMENT',
        daysAgo: 4,
        notes: 'Centralisation McKenzie. Douleur de jambe diminue.',
        results: [
          { type: 'ODI', score: 32, maxScore: 100 },
          { type: 'NPRS', score: 4, maxScore: 10 },
          { type: 'DN4', score: 3, maxScore: 10 },
        ],
      },
    ],
    exercises: [
      { name: 'Extensions McKenzie (REIL)', sets: '10', reps: '10×/2h', instructions: 'Réveil + 2h, surveiller centralisation' },
      { name: 'Marche', reps: '20 min/jour', instructions: 'Active mais sans forcer en flexion' },
    ],
  },
];

async function findPractitionerId(email: string): Promise<string | null> {
  // auth.users est dans le schema auth de Supabase, hors du schema Prisma
  // → requête raw SQL pour récupérer l'UUID
  const result = await prisma.$queryRawUnsafe<{ id: string }[]>(
    `SELECT id::text as id FROM auth.users WHERE email = $1 LIMIT 1`,
    email,
  );
  return result[0]?.id ?? null;
}

async function main() {
  console.log(`🔍 Recherche du praticien ${PRACTITIONER_EMAIL}...`);
  const practitionerId = await findPractitionerId(PRACTITIONER_EMAIL);

  if (!practitionerId) {
    console.error(`❌ Aucun utilisateur Supabase avec l'email ${PRACTITIONER_EMAIL}.`);
    console.error('   → Inscris-toi d\'abord via http://localhost:3000/practitioner/login (onglet "Créer un compte")');
    process.exit(1);
  }

  console.log(`✅ Praticien trouvé : ${practitionerId}\n`);

  let createdCount = 0;
  let skippedCount = 0;

  for (const p of demoPatients) {
    const existing = await prisma.patientVault.findFirst({ where: { email: p.email } });
    if (existing) {
      console.log(`⏭  ${p.firstName} ${p.lastName} existe déjà — skip`);
      skippedCount++;
      continue;
    }

    await prisma.patientVault.create({
      data: {
        practitionerId,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        dateOfBirth: new Date(p.dateOfBirth),
        clinicalRecord: {
          create: {
            pathology: p.pathology,
            assessments: {
              create: p.assessments.map((a) => ({
                timelineAnchor: a.anchor,
                timestamp: new Date(Date.now() - a.daysAgo * 24 * 60 * 60 * 1000),
                practitionerNotes: a.notes,
                questionnaires: {
                  create: a.results.map((r) => ({
                    type: r.type,
                    score: r.score,
                    maxScore: r.maxScore,
                    rawResponses: '{}',
                    isPatientInput: true,
                  })),
                },
              })),
            },
            exercises: p.exercises
              ? {
                  create: p.exercises.map((e) => ({
                    name: e.name,
                    sets: e.sets,
                    reps: e.reps,
                    instructions: e.instructions,
                  })),
                }
              : undefined,
            sessionNotes: p.sessionNotes
              ? {
                  create: p.sessionNotes.map((n) => ({
                    date: new Date(Date.now() - n.daysAgo * 24 * 60 * 60 * 1000),
                    content: n.content,
                  })),
                }
              : undefined,
          },
        },
      },
    });

    console.log(`✅ ${p.firstName} ${p.lastName} créé(e) — ${p.assessments.length} bilan(s)`);
    createdCount++;
  }

  console.log(`\n📊 Résultat: ${createdCount} créés, ${skippedCount} déjà présents.`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
