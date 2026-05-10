import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

type Body = {
  type?: string;
  score?: number;
  maxScore?: number;
  rawResponses?: Record<string, unknown>;
  submissionToken?: string; // anonymousCode (AM-XXXX) ou AssessmentRequest.id
  isPatientInput?: boolean;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return bad('Corps JSON invalide.');
  }

  const { type, score, maxScore, rawResponses, submissionToken, isPatientInput } = body;

  if (typeof type !== 'string' || !type.trim()) return bad('type requis.');
  if (typeof score !== 'number' || !Number.isFinite(score)) return bad('score numérique requis.');
  if (typeof maxScore !== 'number' || !Number.isFinite(maxScore) || maxScore <= 0) {
    return bad('maxScore numérique > 0 requis.');
  }
  if (score < 0 || score > maxScore) return bad('score hors bornes.');

  // ----- Résolution du recordId via un canal authentifié -----
  let recordId: string | null = null;
  let isPatient = !!isPatientInput;

  if (submissionToken && submissionToken.startsWith('AM-')) {
    // Lien anonyme patient
    const session = await prisma.anonymousSession.findUnique({
      where: { anonymousCode: submissionToken }
    });
    if (!session) return bad('Code anonyme inconnu.', 404);
    if (session.status === 'COMPLETED') return bad('Session déjà complétée.', 410);
    recordId = session.clinicalRecordId;
    isPatient = true;
  } else if (submissionToken) {
    // Demande nominative AssessmentRequest
    const req = await prisma.assessmentRequest.findUnique({ where: { id: submissionToken } });
    if (!req) return bad('Demande inconnue.', 404);
    if (req.status === 'COMPLETED') return bad('Demande déjà complétée.', 410);
    recordId = req.clinicalRecordId;
    isPatient = true;
  } else {
    // Pas de token → exige un praticien authentifié + recordId explicite via header
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return bad('Non authentifié.', 401);

    const headerRecordId = request.headers.get('x-record-id');
    if (!headerRecordId) return bad('Record cible non spécifié.', 400);

    // Vérifie que le record appartient bien à un patient de ce praticien
    const record = await prisma.clinicalRecord.findUnique({
      where: { id: headerRecordId },
      include: { patient: true }
    });
    if (!record || record.patient.practitionerId !== user.id) {
      return bad('Record introuvable ou accès interdit.', 403);
    }
    recordId = headerRecordId;
    isPatient = false;
  }

  if (!recordId) return bad('Impossible de résoudre le record cible.', 500);

  try {
    const assessment = await prisma.assessment.create({
      data: {
        recordId,
        timelineAnchor: 'T0_INITIAL',
        questionnaires: {
          create: {
            type,
            score,
            maxScore,
            rawResponses: JSON.stringify(rawResponses ?? {}),
            isPatientInput: isPatient
          }
        }
      },
      include: { questionnaires: true }
    });

    return NextResponse.json({ success: true, assessment }, { status: 201 });
  } catch (error) {
    console.error('Erreur sauvegarde assessment :', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
}
