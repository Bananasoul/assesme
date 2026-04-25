import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, score, maxScore, rawResponses, targetRecordId, isPatientInput } = body;

    let recordIdToUse = targetRecordId;

    if (!recordIdToUse) {
      // Fallback for the demo patient dashboard
      let patient = await prisma.patientVault.findFirst();
      if (!patient) {
        patient = await prisma.patientVault.create({
          data: {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            clinicalRecord: { create: {} }
          },
          include: { clinicalRecord: true }
        });
      }

      let clinicalRecord = await prisma.clinicalRecord.findUnique({
        where: { patientId: patient.id }
      });

      if (!clinicalRecord) {
          clinicalRecord = await prisma.clinicalRecord.create({
              data: { patientId: patient.id }
          });
      }
      recordIdToUse = clinicalRecord.id;
    }

    // Création de l'évaluation (Assessment)
    const assessment = await prisma.assessment.create({
      data: {
        recordId: recordIdToUse,
        timelineAnchor: 'T0_INITIAL', // Simplifié pour la démo
        questionnaires: {
          create: {
            type: type || 'TAMPA',
            score: score || 0,
            maxScore: maxScore || 68,
            rawResponses: JSON.stringify(rawResponses || {}),
            isPatientInput: isPatientInput !== undefined ? isPatientInput : true
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
