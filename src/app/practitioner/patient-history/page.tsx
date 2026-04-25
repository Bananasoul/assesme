import { getPatientHistory } from '@/lib/data';
import Link from 'next/link';
import { ChevronLeft, User, Calendar, Activity, Database, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import PrintButton from '@/components/PrintButton';
import GenerateLinkButton from '@/components/GenerateLinkButton';
import EvolutionChart from '@/components/EvolutionChart';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PatientHistoryPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const patientId = typeof resolvedParams.id === 'string' ? resolvedParams.id : undefined;
  const patient = await getPatientHistory(patientId);

  if (!patient || !patient.clinicalRecord) {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Aucun dossier patient trouvé.</h2>
        <Link href="/practitioner" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>Retour</Link>
      </main>
    );
  }

  const record = patient.clinicalRecord;
  const assessments = record.assessments;

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav className="no-print" style={{ maxWidth: '1000px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          href="/practitioner" 
          style={{ 
            color: 'var(--text-secondary)', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)'
          }}
        >
          <ChevronLeft size={20} />
          Retour au mode Praticien
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <GenerateLinkButton recordId={record.id} patientName={`${patient.firstName} ${patient.lastName}`} />
          <PrintButton />
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Patient Identity Card */}
        <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '50%' }}>
            <User size={48} color="var(--primary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {patient.firstName} {patient.lastName}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Dossier N° {record.id.split('-')[0].toUpperCase()}
            </p>
          </div>
        </div>

        {/* Graphiques d'évolution (Recharts) */}
        {assessments.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={24} color="var(--primary)" />
              Tableau de Bord Clinique
            </h2>
            <EvolutionChart assessments={assessments} />
          </div>
        )}

        {/* Timeline of Assessments (Raw Data) */}
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={24} color="var(--primary)" />
            Historique détaillé des évaluations
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {assessments.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucun bilan n'a encore été complété par ce patient.</p>
            ) : (
              assessments.map(assessment => (
                <div key={assessment.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Calendar size={18} color="var(--secondary)" />
                      {new Date(assessment.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </div>
                    <span style={{ background: 'var(--surface-hover)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                      Ancrage: {assessment.timelineAnchor}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {assessment.questionnaires.map(q => {
                      const percentage = Math.round((q.score / q.maxScore) * 100);
                      return (
                        <div key={q.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                          <h4 style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }}>{q.type}</h4>
                          <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{q.score}</span>
                            <span style={{ color: 'var(--text-secondary)', paddingBottom: '4px' }}>/ {q.maxScore}</span>
                          </div>
                          
                          {/* Raw Data Visualizer mock */}
                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Database size={14} />
                            Données brutes enregistrées ({Object.keys(JSON.parse(q.rawResponses || '{}')).length} réponses)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
