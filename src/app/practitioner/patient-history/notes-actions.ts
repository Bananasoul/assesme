'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addSessionNote(formData: FormData) {
  const recordId = formData.get('recordId') as string;
  const dateString = formData.get('date') as string;
  const content = formData.get('content') as string;

  if (!recordId || !dateString || !content) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Non autorisé' };
    }

    // Verify ownership
    const record = await prisma.clinicalRecord.findUnique({
      where: { id: recordId },
      include: { patient: true }
    });

    if (!record || record.patient.practitionerId !== user.id) {
      return { error: 'Accès refusé.' };
    }

    await prisma.sessionNote.create({
      data: {
        clinicalRecordId: recordId,
        date: new Date(dateString),
        content
      }
    });

    revalidatePath(`/practitioner/patient-history`);
    
    return { success: true };
  } catch (error) {
    console.error("Error adding session note:", error);
    return { error: 'Erreur lors de l\'ajout de la note.' };
  }
}
