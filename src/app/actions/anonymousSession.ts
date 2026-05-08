'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

function generateAnonymousCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Pas de 0/O/1/I pour éviter la confusion
  let code = 'AM-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createAnonymousSession(clinicalRecordId: string, questionnaireIds: string[]) {
  try {
    // Générer un code unique (retry si collision)
    let anonymousCode = generateAnonymousCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.anonymousSession.findUnique({ where: { anonymousCode } });
      if (!existing) break;
      anonymousCode = generateAnonymousCode();
      attempts++;
    }

    const session = await prisma.anonymousSession.create({
      data: {
        anonymousCode,
        clinicalRecordId,
        questionnaireIds: JSON.stringify(questionnaireIds),
        status: 'PENDING'
      }
    });

    revalidatePath('/practitioner');
    revalidatePath('/practitioner/patient-history');
    return { success: true, anonymousCode: session.anonymousCode };
  } catch (error) {
    console.error('Error creating anonymous session:', error);
    return { success: false, error: 'Impossible de créer la session anonyme.' };
  }
}

export async function completeAnonymousSession(anonymousCode: string) {
  try {
    await prisma.anonymousSession.update({
      where: { anonymousCode },
      data: { status: 'COMPLETED', completedAt: new Date() }
    });
    return { success: true };
  } catch (error) {
    console.error('Error completing anonymous session:', error);
    return { success: false, error: 'Erreur lors de la finalisation.' };
  }
}

export async function getAnonymousSession(anonymousCode: string) {
  return prisma.anonymousSession.findUnique({
    where: { anonymousCode },
    include: {
      clinicalRecord: true
    }
  });
}
