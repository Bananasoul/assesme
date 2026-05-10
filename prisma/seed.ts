import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const FORCE = process.argv.includes('--force')
const DEMO_PRACTITIONER_ID = 'kine2024' // Données de démo non rattachées à un compte Supabase

const demoPatients = [
  {
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    dateOfBirth: new Date('1980-05-15'),
    record: {
      createdAt: new Date('2024-03-01'),
      assessments: [
        {
          timelineAnchor: 'T0_INITIAL',
          timestamp: new Date('2024-03-01T10:00:00Z'),
          questionnaires: [
            { type: 'ODI', score: 35, maxScore: 50 },
            { type: 'TAMPA', score: 45, maxScore: 68 }
          ]
        },
        {
          timelineAnchor: 'T1_MID_TREATMENT',
          timestamp: new Date('2024-03-21T10:00:00Z'),
          questionnaires: [
            { type: 'ODI', score: 20, maxScore: 50 },
            { type: 'TAMPA', score: 32, maxScore: 68 }
          ]
        }
      ]
    }
  },
  {
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.m@example.com',
    dateOfBirth: new Date('1992-11-23'),
    record: {
      createdAt: new Date('2024-04-10'),
      assessments: [
        {
          timelineAnchor: 'T0_INITIAL',
          timestamp: new Date('2024-04-10T09:30:00Z'),
          questionnaires: [
            { type: 'NDI', score: 42, maxScore: 50 },
            { type: 'HADS', score: 14, maxScore: 21 }
          ]
        }
      ]
    }
  },
  {
    firstName: 'Thomas',
    lastName: 'Leroux',
    email: 'thomas.l@example.com',
    dateOfBirth: new Date('1975-02-08'),
    record: {
      createdAt: new Date('2024-04-15'),
      assessments: [
        {
          timelineAnchor: 'T0_INITIAL',
          timestamp: new Date('2024-04-15T14:15:00Z'),
          questionnaires: [
            { type: 'START_BACK', score: 7, maxScore: 9, rawResponses: '{"subscore": 5}' }
          ]
        }
      ]
    }
  }
]

async function main() {
  if (FORCE) {
    console.log('⚠️  --force: purge des données de démo en cours...')
    const demoEmails = demoPatients.map(p => p.email)
    await prisma.patientVault.deleteMany({ where: { email: { in: demoEmails } } })
    console.log('   purge terminée.')
  }

  let created = 0
  let skipped = 0

  for (const p of demoPatients) {
    const existing = await prisma.patientVault.findUnique({ where: { email: p.email } })
    if (existing) {
      skipped++
      continue
    }

    await prisma.patientVault.create({
      data: {
        practitionerId: DEMO_PRACTITIONER_ID,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        dateOfBirth: p.dateOfBirth,
        clinicalRecord: {
          create: {
            createdAt: p.record.createdAt,
            assessments: {
              create: p.record.assessments.map(a => ({
                timelineAnchor: a.timelineAnchor,
                timestamp: a.timestamp,
                questionnaires: {
                  create: a.questionnaires.map(q => ({
                    type: q.type,
                    score: q.score,
                    maxScore: q.maxScore,
                    rawResponses: 'rawResponses' in q ? q.rawResponses! : '{}'
                  }))
                }
              }))
            }
          }
        }
      }
    })
    created++
  }

  console.log(`✅ Seed terminé — créés: ${created}, déjà présents: ${skipped}`)
  if (skipped > 0 && !FORCE) {
    console.log('   (utilise "npm run db:seed -- --force" pour ré-importer les démos)')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
