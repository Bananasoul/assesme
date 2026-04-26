import { prisma } from './prisma';

// Récupérer les stats pour le patient (pour la démo, on prend le premier patient trouvé)
export async function getPatientDashboardStats() {
  const patient = await prisma.patientVault.findFirst({
    include: {
      clinicalRecord: {
        include: {
          assessments: {
            include: { questionnaires: true },
            orderBy: { timestamp: 'desc' }
          }
        }
      }
    }
  });

  if (!patient || !patient.clinicalRecord) {
    return { score: 0, timeline: [] };
  }

  const assessments = patient.clinicalRecord.assessments;
  
  // Calcul du score global : on cherche le dernier score ODI et on l'inverse.
  // ODI est sur 50. Si ODI = 10, Incapacité = 20%, donc Capacité = 80%.
  let currentCapacityScore = 0; // Par défaut s'il n'y a rien
  
  for (const assessment of assessments) {
    const odiResult = assessment.questionnaires.find(q => q.type === 'ODI');
    if (odiResult) {
      // (1 - (score/maxScore)) * 100
      currentCapacityScore = Math.round((1 - (odiResult.score / odiResult.maxScore)) * 100);
      break; // On a le plus récent car orderBy desc
    }
  }

  // Si pas d'ODI, on essaie avec un autre (par ex le TAMPA inversé, juste pour avoir un chiffre)
  if (currentCapacityScore === 0 && assessments.length > 0) {
    const anyResult = assessments[0].questionnaires[0];
    if (anyResult) {
        currentCapacityScore = Math.round((1 - (anyResult.score / anyResult.maxScore)) * 100);
    }
  }

  return {
    score: currentCapacityScore,
    timeline: assessments.map(a => ({
      id: a.id,
      anchor: a.timelineAnchor,
      date: a.timestamp,
      questionnaires: a.questionnaires.map(q => q.type)
    }))
  };
}

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
          }
        }
      }
    }
  });
}
