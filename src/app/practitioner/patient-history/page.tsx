import { getPatientHistory } from '@/lib/data';
import Link from 'next/link';
import { ChevronLeft, User, Calendar, Activity, Database, TrendingUp, Dumbbell, Video, FileText, ClipboardList, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import PrintButton from '@/components/PrintButton';
import AssignTestsModal from '@/components/AssignTestsModal';
import EvolutionChart from '@/components/EvolutionChart';
import MedicalHeader from '@/components/MedicalHeader';
import AddExerciseModal from '@/components/AddExerciseModal';
import PortalLinkButton from '@/components/PortalLinkButton';
import AddNoteModal from '@/components/AddNoteModal';
import { QUESTIONNAIRES } from '@/data/questionnaires';
import CopyLinkButton from '@/components/CopyLinkButton';

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
  const exercises = record.exercises || [];
  const sessionNotes = record.sessionNotes || [];

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

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/practitioner/library?patientId=${patient.id}&recordId=${record.id}&patientName=${encodeURIComponent(patient.firstName)}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--surface)',
              color: 'var(--primary)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              border: '1px solid var(--primary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            <BookOpen size={16} /> Bibliothèque
          </Link>
          <PortalLinkButton recordId={record.id} patientName={patient.firstName} />
          <AssignTestsModal recordId={record.id} />
          <PrintButton />
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <MedicalHeader />
        
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
          <div className="no-print">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={24} color="var(--primary)" />
              Tableau de Bord Clinique
            </h2>
            <EvolutionChart assessments={assessments} />
          </div>
        )}

        {/* Plan de Traitement à Domicile (HEP) */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Dumbbell size={24} color="var(--primary)" />
              Plan de Traitement à Domicile
            </h2>
            <AddExerciseModal recordId={record.id} patientId={patient.id} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {exercises.length === 0 ? (
              <p className="no-print" style={{ color: 'var(--text-secondary)' }}>Aucun exercice n'a encore été prescrit.</p>
            ) : (
              exercises.map(ex => (
                <div key={ex.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{ex.name}</h3>
                    {ex.videoUrl && (
                      <a href={ex.videoUrl} target="_blank" rel="noopener noreferrer" className="no-print" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        <Video size={16} />
                        Vidéo
                      </a>
                    )}
                  </div>
                  
                  {(ex.sets || ex.reps) && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {ex.sets && (
                        <span style={{ background: 'var(--primary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                          Séries: {ex.sets}
                        </span>
                      )}
                      {ex.reps && (
                        <span style={{ background: 'var(--secondary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                          Répétitions: {ex.reps}
                        </span>
                      )}
                    </div>
                  )}

                  {ex.instructions && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, background: 'var(--surface-hover)', padding: '0.75rem', borderRadius: 'var(--radius-md)', margin: 0 }}>
                      {ex.instructions}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Demandes de Bilans en Attente */}
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardList size={24} color="var(--primary)" />
            Bilans en attente
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(!record.requests || record.requests.length === 0) ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucun bilan en attente pour ce patient.</p>
            ) : (
              record.requests.map(req => {
                const requestedIds = JSON.parse(req.questionnaireIds) as string[];
                const tests = requestedIds.map(id => QUESTIONNAIRES[id]).filter(Boolean);
                const hasTherapistTest = tests.some(t => t.administrationType === 'therapist' || t.administrationType === 'both');
                
                return (
                  <div key={req.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        <Calendar size={18} color="var(--secondary)" />
                        Ordonnance du {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {tests.map(t => (
                          <span key={t.id} style={{ background: 'var(--surface-hover)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {t.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ background: '#FEF08A', color: '#854D0E', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        En attente
                      </span>
                      <CopyLinkButton link={`/fill?requestId=${req.id}`} />
                      {hasTherapistTest && (
                        <Link 
                          href={`/fill?requestId=${req.id}`}
                          style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}
                        >
                          Remplir maintenant
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

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

                          {/* Clinical Decision Support */}
                          {(() => {
                            const qDef = QUESTIONNAIRES[q.type];
                            if (!qDef) return null;
                            return (
                              <div style={{ marginTop: '1.5rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                <div style={{ padding: '0.75rem 1rem', background: 'var(--primary-light)', color: 'white', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <Activity size={16} />
                                  Aide à la décision clinique
                                </div>
                                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                  {qDef.clinicalValue && (
                                    <div>
                                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Valeur Clinique</span>
                                      <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0 }}>{qDef.clinicalValue}</p>
                                    </div>
                                  )}
                                  {qDef.decisionAlgorithm && (
                                    <div style={{ background: '#FEF3C7', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#92400E', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Algorithme d'Interprétation</span>
                                      <p style={{ fontSize: '0.875rem', color: '#92400E', margin: 0, fontWeight: 500 }}>{qDef.decisionAlgorithm}</p>
                                    </div>
                                  )}
                                  {qDef.therapeuticInterventions && (
                                    <div>
                                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Interventions Suggérées</span>
                                      <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                          <strong style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>Exercices</strong>
                                          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                                            {qDef.therapeuticInterventions.exercises.map((ex, i) => <li key={i}>{ex}</li>)}
                                          </ul>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          <strong style={{ fontSize: '0.75rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.25rem' }}>Éducation</strong>
                                          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                                            {qDef.therapeuticInterventions.education.map((ed, i) => <li key={i}>{ed}</li>)}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {qDef.references && qDef.references.length > 0 && (
                                    <div>
                                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Méthodologie & Preuves</span>
                                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {qDef.references.map((ref, i) => (
                                          <li key={i}>
                                            {ref.url ? <a href={ref.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>{ref.title}</a> : ref.title}
                                            <span style={{ fontStyle: 'italic', marginLeft: '0.5rem' }}>({ref.type === 'methodology' ? 'Méthodologie' : 'Article scientifique'})</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Journal des Séances (SOAP Notes) */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={24} color="var(--primary)" />
              Journal des Séances
            </h2>
            <AddNoteModal recordId={record.id} />
          </div>

          <div style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Ligne verticale de timeline */}
            <div style={{ position: 'absolute', left: '0.375rem', top: '0', bottom: '0', width: '2px', background: 'var(--border)' }}></div>

            {sessionNotes.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucune note de séance pour le moment.</p>
            ) : (
              sessionNotes.map(note => (
                <div key={note.id} style={{ position: 'relative' }}>
                  {/* Point de timeline */}
                  <div style={{ position: 'absolute', left: '-1.5rem', top: '0.25rem', width: '1rem', height: '1rem', background: 'var(--surface)', border: '2px solid var(--primary)', borderRadius: '50%', zIndex: 10 }}></div>
                  
                  <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      <Calendar size={16} />
                      {new Date(note.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <p style={{ color: 'var(--text-primary)', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                      {note.content}
                    </p>
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
