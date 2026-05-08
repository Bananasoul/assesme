'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createAssessmentRequest(clinicalRecordId: string, questionnaireIds: string[]) {
  try {
    const request = await prisma.assessmentRequest.create({
      data: {
        clinicalRecordId,
        questionnaireIds: JSON.stringify(questionnaireIds),
        status: 'PENDING'
      }
    });

    revalidatePath('/practitioner/patient-history');
    return { success: true, requestId: request.id };
  } catch (error) {
    console.error('Error creating assessment request:', error);
    return { success: false, error: 'Failed to create request' };
  }
}

export async function completeAssessmentRequest(requestId: string) {
  try {
    await prisma.assessmentRequest.update({
      where: { id: requestId },
      data: { status: 'COMPLETED' }
    });
    revalidatePath('/portal');
    return { success: true };
  } catch (error) {
    console.error('Error completing assessment request:', error);
    return { success: false, error: 'Failed to complete request' };
  }
}
