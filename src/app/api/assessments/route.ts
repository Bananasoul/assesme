import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, score, maxScore, rawResponses } = body;

    // Simulation: Normalement on récupérerait le patient connecté (session)
    // Ici on crée un patient et un dossier clinique temporaire s'il n'en existe pas
    let patient = await prisma.patientVault.findFirst();
    if (!patient) {
      patient = await prisma.patientVault.create({
        data: {
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@example.com',
          clinicalRecord: {
            create: {}
          }
        },
        include: { clinicalRecord: true }
      });
    }

    let clinicalRecord = await prisma.clinicalRecord.findUnique({
      where: { patientId: patient.id }
    });

    if (!clinicalRecord) {
        clinicalRecord = await prisma.clinicalRecord.create({
            data: {
                patientId: patient.id
            }
        });
    }

    // Création de l'évaluation (Assessment)
    const assessment = await prisma.assessment.create({
      data: {
        recordId: clinicalRecord.id,
        timelineAnchor: 'T0_INITIAL', // Pour l'exemple, on fixe à T0
        questionnaires: {
          create: {
            type: type || 'TAMPA',
            score: score || 0,
            maxScore: maxScore || 68,
            rawResponses: JSON.stringify(rawResponses || {}),
            isPatientInput: true
          }
        }
      },
      include: {
        questionnaires: true
      }
    });

    return NextResponse.json({ success: true, assessment }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
