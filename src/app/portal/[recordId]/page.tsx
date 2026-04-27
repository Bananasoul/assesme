import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import PortalUnlockForm from '@/components/PortalUnlockForm';
import EvolutionChart from '@/components/EvolutionChart';
import { Dumbbell, Video, TrendingUp, LogOut, User } from 'lucide-react';
import { lockPortal } from './actions';

export const dynamic = 'force-dynamic';

export default async function PortalPage({ params }: { params: Promise<{ recordId: string }> }) {
  const resolvedParams = await params;
  const recordId = resolvedParams.recordId;
  
  const record = await prisma.clinicalRecord.findUnique({
    where: { id: recordId },
    include: {
      patient: true,
      assessments: {
        include: { questionnaires: true },
        orderBy: { timestamp: 'asc' }
      },
      exercises: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!record) return notFound();

  const cookieStore = await cookies();
  const isUnlocked = cookieStore.get(`portal_unlocked_${recordId}`)?.value === 'true';

  if (!isUnlocked) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--background)', padding: '1rem' }}>
        <PortalUnlockForm recordId={recordId} />
      </main>
    );
  }

  // User is unlocked
  const patient = record.patient;
  const exercises = record.exercises;
  const assessments = record.assessments;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', padding: '0' }}>
      {/* Header */}
      <header style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '50%' }}>
              <User size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Bonjour, {patient.firstName}</h1>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>Votre Espace Kiné</p>
            </div>
          </div>
          <form action={async () => {
            'use server';
            await lockPortal(recordId);
          }}>
            <button type="submit" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
              <LogOut size={20} />
              <span className="hide-mobile">Se déconnecter</span>
            </button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Exercices à faire à la maison */}
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Dumbbell size={24} color="var(--primary)" />
            Mon Plan d'Exercices
          </h2>
          
          {exercises.length === 0 ? (
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Aucun exercice n'a encore été prescrit par votre praticien.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {exercises.map(ex => (
                <div key={ex.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{ex.name}</h3>
                    {ex.videoUrl && (
                      <a href={ex.videoUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#FEF2F2', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                        <Video size={16} />
                        Voir la vidéo
                      </a>
                    )}
                  </div>
                  
                  {(ex.sets || ex.reps) && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {ex.sets && (
                        <span style={{ background: 'var(--primary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600 }}>
                          Séries: {ex.sets}
                        </span>
                      )}
                      {ex.reps && (
                        <span style={{ background: 'var(--secondary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600 }}>
                          Répétitions: {ex.reps}
                        </span>
                      )}
                    </div>
                  )}

                  {ex.instructions && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: 0, borderLeft: '4px solid var(--primary)' }}>
                      {ex.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Évolution Clinique */}
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={24} color="var(--primary)" />
            Mon Évolution
          </h2>
          
          {assessments.length === 0 ? (
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Aucun bilan n'a encore été réalisé.
            </div>
          ) : (
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', overflowX: 'auto' }}>
              <EvolutionChart assessments={assessments} />
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
