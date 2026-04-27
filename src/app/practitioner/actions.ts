'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function getPatients() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const patients = await prisma.patientVault.findMany({
      where: {
        practitionerId: user.id
      },
      include: {
        clinicalRecord: {
          include: {
            assessments: {
              orderBy: { timestamp: 'desc' },
              take: 1
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
}

export async function createPatient(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const dobString = formData.get('dateOfBirth') as string;
  
  if (!firstName || !lastName || !email || !dobString) {
    return { error: 'Veuillez remplir tous les champs obligatoires, y compris la date de naissance.' };
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Vous devez être connecté.' };
    }

    // Basic email check for THIS practitioner
    const existingPatient = await prisma.patientVault.findFirst({
      where: { 
        email,
        practitionerId: user.id
      }
    });

    if (existingPatient) {
      return { error: 'Vous avez déjà un patient avec cet email.' };
    }

    const patient = await prisma.patientVault.create({
      data: {
        practitionerId: user.id,
        firstName,
        lastName,
        email,
        dateOfBirth: dobString ? new Date(dobString) : null,
        clinicalRecord: {
          create: {} // Create an empty clinical record
        }
      }
    });

    revalidatePath('/practitioner');
    return { success: true, patientId: patient.id };
  } catch (error) {
    console.error("Error creating patient:", error);
    return { error: 'Une erreur est survenue lors de la création du patient.' };
  }
}
