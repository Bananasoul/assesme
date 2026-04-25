'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveProfile(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const title = formData.get('title') as string;
  const inamiNumber = formData.get('inamiNumber') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Non autorisé' };
    }

    await prisma.practitionerProfile.upsert({
      where: {
        practitionerId: user.id
      },
      update: {
        firstName,
        lastName,
        title,
        inamiNumber,
        address,
        phone,
        email
      },
      create: {
        practitionerId: user.id,
        firstName,
        lastName,
        title,
        inamiNumber,
        address,
        phone,
        email
      }
    });

    revalidatePath('/practitioner');
    revalidatePath('/practitioner/settings');
    revalidatePath('/practitioner/patient-history');
    
    return { success: true };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { error: 'Erreur lors de la sauvegarde.' };
  }
}
