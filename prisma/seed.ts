import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with mock patients...')

  // Clear existing
  await prisma.questionnaireResult.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.clinicalRecord.deleteMany()
  await prisma.patientVault.deleteMany()

  // 1. Patient: Jean Dupont (Progression positive)
  const jean = await prisma.patientVault.create({
    data: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      dateOfBirth: new Date('1980-05-15'),
      clinicalRecord: {
        create: {
          createdAt: new Date('2024-03-01'),
          assessments: {
            create: [
              {
                timelineAnchor: 'T0',
                timestamp: new Date('2024-03-01T10:00:00Z'),
                questionnaires: {
                  create: [
                    { type: 'ODI', score: 35, maxScore: 50, rawResponses: '{}' },
                    { type: 'TAMPA', score: 45, maxScore: 68, rawResponses: '{}' }
                  ]
                }
              },
              {
                timelineAnchor: 'T1',
                timestamp: new Date('2024-03-21T10:00:00Z'),
                questionnaires: {
                  create: [
                    { type: 'ODI', score: 20, maxScore: 50, rawResponses: '{}' },
                    { type: 'TAMPA', score: 32, maxScore: 68, rawResponses: '{}' }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  })

  // 2. Patient: Sophie Martin (Bilan initial très douloureux)
  const sophie = await prisma.patientVault.create({
    data: {
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.m@example.com',
      dateOfBirth: new Date('1992-11-23'),
      clinicalRecord: {
        create: {
          createdAt: new Date('2024-04-10'),
          assessments: {
            create: [
              {
                timelineAnchor: 'T0',
                timestamp: new Date('2024-04-10T09:30:00Z'),
                questionnaires: {
                  create: [
                    { type: 'NDI', score: 42, maxScore: 50, rawResponses: '{}' },
                    { type: 'HADS', score: 14, maxScore: 21, rawResponses: '{}' }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  })

  // 3. Patient: Thomas Leroux (Bilan STarT Back haut risque)
  const thomas = await prisma.patientVault.create({
    data: {
      firstName: 'Thomas',
      lastName: 'Leroux',
      email: 'thomas.l@example.com',
      dateOfBirth: new Date('1975-02-08'),
      clinicalRecord: {
        create: {
          createdAt: new Date('2024-04-15'),
          assessments: {
            create: [
              {
                timelineAnchor: 'T0',
                timestamp: new Date('2024-04-15T14:15:00Z'),
                questionnaires: {
                  create: [
                    { type: 'START_BACK', score: 7, maxScore: 9, rawResponses: '{"subscore": 5}' }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  })

  console.log('Seed completed successfully!')
  console.log('Created patients:', [jean.firstName, sophie.firstName, thomas.firstName].join(', '))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
