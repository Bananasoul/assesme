'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addExercise(formData: FormData) {
  const recordId = formData.get('recordId') as string;
  const patientId = formData.get('patientId') as string;
  const name = formData.get('name') as string;
  const sets = formData.get('sets') as string;
  const reps = formData.get('reps') as string;
  const instructions = formData.get('instructions') as string;
  const videoUrl = formData.get('videoUrl') as string;

  if (!recordId || !name) {
    return { error: 'Le nom de l\'exercice est obligatoire.' };
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

    await prisma.exercise.create({
      data: {
        clinicalRecordId: recordId,
        name,
        sets,
        reps,
        instructions,
        videoUrl
      }
    });

    revalidatePath(`/practitioner/patient-history`);
    
    return { success: true };
  } catch (error) {
    console.error("Error adding exercise:", error);
    return { error: 'Erreur lors de l\'ajout de l\'exercice.' };
  }
}
