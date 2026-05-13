'use server';

import { prisma } from '@/lib/prisma';
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

export async function getOnboardingState() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { hasCreatedPatient: false, hasAssignedTest: false, hasCompletedTest: false };

    const [patientCount, anyAssigned, anyCompleted] = await Promise.all([
      prisma.patientVault.count({ where: { practitionerId: user.id } }),
      prisma.anonymousSession.count({
        where: { clinicalRecord: { patient: { practitionerId: user.id } } }
      }),
      prisma.anonymousSession.count({
        where: {
          status: 'COMPLETED',
          clinicalRecord: { patient: { practitionerId: user.id } }
        }
      })
    ]);

    return {
      hasCreatedPatient: patientCount > 0,
      hasAssignedTest: anyAssigned > 0,
      hasCompletedTest: anyCompleted > 0,
    };
  } catch (error) {
    console.error('Error fetching onboarding state:', error);
    return { hasCreatedPatient: false, hasAssignedTest: false, hasCompletedTest: false };
  }
}

export async function getPendingRequests() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const pendingRequests = await prisma.anonymousSession.findMany({
      where: {
        status: 'PENDING',
        clinicalRecord: {
          patient: {
            practitionerId: user.id
          }
        }
      },
      include: {
        clinicalRecord: {
          include: {
            patient: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return pendingRequests;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return [];
  }
}

export async function createPatient(formData: FormData) {
  const identifier = (formData.get('identifier') as string)?.trim();
  const firstName = (formData.get('firstName') as string)?.trim() || null;
  const lastName = (formData.get('lastName') as string)?.trim() || null;
  const email = (formData.get('email') as string)?.trim() || null;
  const dobString = (formData.get('dateOfBirth') as string)?.trim();
  const notes = (formData.get('notes') as string)?.trim() || null;

  if (!identifier) {
    return { error: "L'identifiant du patient est obligatoire (ex: « MD78 », « Patient #42 »)." };
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Vous devez être connecté.' };

    // Identifier doit être unique pour ce praticien
    const existing = await prisma.patientVault.findFirst({
      where: { practitionerId: user.id, identifier },
    });
    if (existing) {
      return { error: `Vous avez déjà un patient avec l'identifiant « ${identifier} ».` };
    }

    const patient = await prisma.patientVault.create({
      data: {
        practitionerId: user.id,
        identifier,
        firstName,
        lastName,
        email,
        dateOfBirth: dobString ? new Date(dobString) : null,
        notes,
        clinicalRecord: { create: {} },
      },
    });

    revalidatePath('/practitioner');
    return { success: true, patientId: patient.id };
  } catch (error) {
    console.error('Error creating patient:', error);
    const detail = error instanceof Error ? error.message : String(error);
    return { error: `Création impossible : ${detail}` };
  }
}
