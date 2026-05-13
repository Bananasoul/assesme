import { getPatientHistory } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Calendar, Activity, Database, TrendingUp, Dumbbell, Video, FileText, ClipboardList, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import PrintButton from '@/components/PrintButton';
import AssignTestsModal from '@/components/AssignTestsModal';
import EvolutionChart from '@/components/EvolutionChart';
import MedicalHeader from '@/components/MedicalHeader';
import AddExerciseModal from '@/components/AddExerciseModal';
import PortalLinkButton from '@/components/PortalLinkButton';
import AddNoteModal from '@/components/AddNoteModal';
import { QUESTIONNAIRES } from '@/data/questionnaires';
import { interpretScore, compareToBaseline, toneStyles } from '@/lib/interpretation';
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
      <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>Dossier</p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#0E1217', letterSpacing: '-0.025em', margin: 0 }}>Aucun dossier patient trouvé.</h1>
          <Link
            href="/practitioner"
            style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.95rem 1.75rem', background: '#0E1217', color: 'white', textDecoration: 'none', borderRadius: '9999px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Retour au tableau de bord
          </Link>
        </div>
      </main>
    );
  }

  const record = patient.clinicalRecord;
  const assessments = record.assessments;
  const exercises = record.exercises || [];
  const sessionNotes = record.sessionNotes || [];

  const patientInitials = `${patient.firstName?.[0] ?? ''}${patient.lastName?.[0] ?? ''}`.toUpperCase() || patient.identifier?.slice(0, 2).toUpperCase() || '?';

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh' }}>
      <header className="no-print" style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <Link href="/practitioner" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>FICHE PATIENT</span>
            </div>
          </Link>
          <Link
            href="/practitioner"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0E1217',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Tableau de bord
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Hero patient */}
        <div className="elx-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#0E1217',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.4rem',
                letterSpacing: '0.02em',
                flexShrink: 0,
              }}
            >
              {patientInitials}
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '0.4rem' }}>
                Dossier N° {record.id.split('-')[0].toUpperCase()}
              </p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0E1217', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
                {patient.firstName} {patient.lastName}
              </h1>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/practitioner/library?patientId=${patient.id}&recordId=${record.id}&patientName=${encodeURIComponent(patient.firstName ?? patient.identifier ?? 'Patient')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'white',
                color: '#0E1217',
                padding: '0.55rem 1rem',
                borderRadius: '9999px',
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                textDecoration: 'none',
                fontSize: '0.82rem',
              }}
            >
              <BookOpen size={15} strokeWidth={2} /> Bibliothèque
            </Link>
            <PortalLinkButton recordId={record.id} patientName={patient.firstName ?? patient.identifier ?? 'Patient'} />
            <AssignTestsModal recordId={record.id} />
            <PrintButton />
          </div>
        </div>

        <MedicalHeader />

        {/* Graphiques d'évolution (Recharts) */}
        {assessments.length > 0 && (
          <section className="no-print">
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <TrendingUp size={14} strokeWidth={2} color="#0E1217" />
              Tableau de bord clinique
            </h2>
            <EvolutionChart assessments={assessments} />
          </section>
        )}

        {/* Plan de Traitement à Domicile (HEP) */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
              <Dumbbell size={14} strokeWidth={2} color="#0E1217" />
              Plan de traitement à domicile
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
          <h2 style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <ClipboardList size={14} strokeWidth={2} color="#0E1217" />
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
                      <span style={{ background: '#0E1217', color: 'white', padding: '0.2rem 0.7rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
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
          <h2 style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <Activity size={14} strokeWidth={2} color="#0E1217" />
            Historique détaillé des évaluations
          </h2>

          {/* Baseline (T0) par type de test — score le plus ancien rencontré */}
          {(() => null)()}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {assessments.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucun bilan n'a encore été complété par ce patient.</p>
            ) : (
              (() => {
                // Calcul baseline par type (score le plus ANCIEN)
                const baselineByType = new Map<string, { score: number; maxScore: number; timestamp: Date }>();
                for (const a of assessments) {
                  const ts = new Date(a.timestamp);
                  for (const q of a.questionnaires) {
                    const prev = baselineByType.get(q.type);
                    if (!prev || ts < prev.timestamp) {
                      baselineByType.set(q.type, { score: q.score, maxScore: q.maxScore, timestamp: ts });
                    }
                  }
                }
                return assessments.map(assessment => (
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
                      const interp = interpretScore(q.type, q.score, q.maxScore);
                      const tone = interp ? toneStyles(interp.tone) : null;
                      const baseline = baselineByType.get(q.type);
                      const isBaseline = baseline && +baseline.timestamp === +new Date(assessment.timestamp) && baseline.score === q.score;
                      const evolution = !isBaseline && baseline ? compareToBaseline(q.type, q.score, baseline.score) : null;
                      const evoTone = evolution ? toneStyles(evolution.tone) : null;
                      return (
                        <div key={q.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                          <h4 style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }}>{q.type}</h4>
                          <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: tone?.accent ?? 'inherit' }}>{q.score}</span>
                            <span style={{ color: 'var(--text-secondary)', paddingBottom: '4px' }}>/ {q.maxScore}</span>
                            {interp && (
                              <span
                                style={{
                                  marginLeft: 'auto',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: 'var(--radius-full)',
                                  background: tone!.bg,
                                  color: tone!.text,
                                  border: `1px solid ${tone!.border}`,
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.03em',
                                }}
                              >
                                {interp.label}
                              </span>
                            )}
                          </div>

                          {/* ÉVOLUTION vs baseline (T0) */}
                          {evolution && evoTone && (
                            <div
                              style={{
                                marginTop: '0.85rem',
                                padding: '0.65rem 0.85rem',
                                background: evoTone.bg,
                                border: `1px solid ${evoTone.border}`,
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.2rem',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: evoTone.text, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                  vs Baseline ({baseline!.score}/{baseline!.maxScore})
                                </span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: evoTone.accent }}>
                                  {evolution.short}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.78rem', color: evoTone.text, margin: 0, lineHeight: 1.4 }}>
                                {evolution.label}
                              </p>
                            </div>
                          )}
                          {isBaseline && (
                            <div
                              style={{
                                marginTop: '0.85rem',
                                padding: '0.4rem 0.7rem',
                                background: 'var(--surface)',
                                border: '1px dashed var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.7rem',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                fontWeight: 600,
                              }}
                            >
                              📍 Baseline (T0)
                            </div>
                          )}

                          {/* INTERPRÉTATION AUTOMATIQUE selon le score réel */}
                          {interp && (
                            <div
                              style={{
                                marginTop: '0.85rem',
                                padding: '0.85rem',
                                background: tone!.bg,
                                border: `1px solid ${tone!.border}`,
                                borderRadius: 'var(--radius-sm)',
                                borderLeft: `4px solid ${tone!.accent}`,
                              }}
                            >
                              <p style={{ fontSize: '0.85rem', color: tone!.text, fontWeight: 600, margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
                                {interp.summary}
                              </p>
                              <div>
                                <strong style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: tone!.text, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                                  Implications thérapeutiques
                                </strong>
                                <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.8rem', color: tone!.text, lineHeight: 1.55 }}>
                                  {interp.actions.map((a, i) => <li key={i}>{a}</li>)}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Raw Data Visualizer */}
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
                                    <div style={{ background: '#F3F4F6', padding: '0.85rem 1rem', borderRadius: '0.6rem', border: '1px solid #E5E7EB', borderLeft: '3px solid #0E1217' }}>
                                      <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: '#0E1217', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Algorithme d'interprétation</span>
                                      <p style={{ fontSize: '0.88rem', color: '#0E1217', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{qDef.decisionAlgorithm}</p>
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
                ));
              })()
            )}
          </div>
        </div>

        {/* Journal des Séances (SOAP Notes) */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
              <FileText size={14} strokeWidth={2} color="#0E1217" />
              Journal des séances
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
