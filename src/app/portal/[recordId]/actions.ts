'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function unlockPortal(recordId: string, formData: FormData) {
  const dobInput = formData.get('dob') as string;
  
  if (!dobInput) {
    return { error: 'Veuillez saisir votre date de naissance.' };
  }

  try {
    const record = await prisma.clinicalRecord.findUnique({
      where: { id: recordId },
      include: { patient: true }
    });

    if (!record || !record.patient.dateOfBirth) {
      return { error: 'Dossier introuvable ou date de naissance non configurée.' };
    }

    // Convert input and DB date to YYYY-MM-DD for comparison
    const dbDate = new Date(record.patient.dateOfBirth).toISOString().split('T')[0];
    
    if (dobInput !== dbDate) {
      return { error: 'Date de naissance incorrecte.' };
    }

    // Success: Set a cookie to remember the unlocked state for this record
    const cookieStore = await cookies();
    cookieStore.set(`portal_unlocked_${recordId}`, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return { success: true };
  } catch (error) {
    console.error("Error unlocking portal:", error);
    return { error: 'Une erreur est survenue.' };
  }
}

export async function lockPortal(recordId: string) {
  const cookieStore = await cookies();
  cookieStore.delete(`portal_unlocked_${recordId}`);
}
