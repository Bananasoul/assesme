'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getPatients() {
  try {
    const patients = await prisma.patientVault.findMany({
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
  
  if (!firstName || !lastName || !email) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' };
  }

  try {
    // Basic email check
    const existingPatient = await prisma.patientVault.findUnique({
      where: { email }
    });

    if (existingPatient) {
      return { error: 'Un patient avec cet email existe déjà.' };
    }

    const patient = await prisma.patientVault.create({
      data: {
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
