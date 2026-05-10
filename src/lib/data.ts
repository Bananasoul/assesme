import { prisma } from './prisma';
import { createClient } from '@/utils/supabase/server';

// Récupérer l'historique complet pour le praticien
export async function getPatientHistory(patientId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return prisma.patientVault.findFirst({
    where: { 
      id: patientId ? patientId : undefined,
      practitionerId: user.id
    },
    include: {
      clinicalRecord: {
        include: {
          assessments: {
            include: { questionnaires: true },
            orderBy: { timestamp: 'desc' }
          },
          exercises: {
            orderBy: { createdAt: 'desc' }
          },
          sessionNotes: {
            orderBy: { date: 'desc' }
          },
          requests: {
            where: { status: 'PENDING' },
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  });
}
