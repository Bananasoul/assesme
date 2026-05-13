import Link from 'next/link';
import { Activity, Settings, BookOpen, ArrowRight, Clock, Send } from 'lucide-react';
import { getPatients, getPendingRequests, getOnboardingState } from './actions';
import OnboardingChecklist from '@/components/OnboardingChecklist';
import CopyLinkButton from '@/components/CopyLinkButton';
import { QUESTIONNAIRES } from '@/data/questionnaires';
import NewBilanWizard from '@/components/wizard/NewBilanWizard';
import LogoutButton from '@/components/LogoutButton';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

function patientLabel(p: { identifier: string | null; firstName: string | null; lastName: string | null }) {
  const name = [p.firstName, p.lastName].filter(Boolean).join(' ');
  if (name && p.identifier) return `${name} · ${p.identifier}`;
  return name || p.identifier || '—';
}

function patientInitials(p: { identifier: string | null; firstName: string | null; lastName: string | null }) {
  if (p.firstName || p.lastName) {
    return `${p.firstName?.[0] ?? ''}${p.lastName?.[0] ?? ''}`.toUpperCase() || '?';
  }
  return p.identifier?.slice(0, 2).toUpperCase() || '?';
}

const navPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  padding: '0.55rem 1rem',
  color: '#0E1217',
  background: 'white',
  borderRadius: '9999px',
  border: '1px solid #E5E7EB',
  fontWeight: 600,
  textDecoration: 'none',
  fontSize: '0.82rem',
  letterSpacing: '0.02em',
};

export default async function PractitionerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [patients, pendingRequests, onboarding] = await Promise.all([
    getPatients(),
    getPendingRequests(),
    getOnboardingState(),
  ]);

  const wizardPatients = patients.map((p) => ({
    id: p.id,
    identifier: p.identifier,
    firstName: p.firstName,
    lastName: p.lastName,
    clinicalRecord: p.clinicalRecord ? { id: p.clinicalRecord.id } : null,
  }));

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh' }}>
      {/* Header sticky cohérent */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(10px)',
          WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          borderBottom: '1px solid rgba(14,18,23,0.06)',
        }}
      >
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
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>PRATICIEN</span>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/practitioner/library" style={navPill}>
              <BookOpen size={15} strokeWidth={2} /> Bibliothèque
            </Link>
            <Link href="/practitioner/settings" style={navPill}>
              <Settings size={15} strokeWidth={2} /> Paramètres
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Hero action */}
        <div
          className="elx-fade-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '0.6rem' }}>
              Tableau de bord
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: '#0E1217',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Bonjour {user?.email?.split('@')[0]}.
            </h1>
            <p style={{ color: '#6B7280', marginTop: '0.65rem', fontSize: '1rem', lineHeight: 1.55 }}>
              Prêt à prescrire un bilan en moins d'une minute.
            </p>
          </div>
          <NewBilanWizard patients={wizardPatients} />
        </div>

        {/* Onboarding */}
        {(!onboarding.hasCreatedPatient || !onboarding.hasAssignedTest || !onboarding.hasCompletedTest) && (
          <div className="elx-fade-up elx-delay-1" style={{ marginBottom: '2.5rem' }}>
            <OnboardingChecklist {...onboarding} />
          </div>
        )}

        {/* Bilans en attente */}
        <section className="elx-fade-up elx-delay-2" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
              }}
            >
              <Clock size={14} strokeWidth={2} /> Bilans en attente
              {pendingRequests.length > 0 && (
                <span
                  style={{
                    background: '#0E1217',
                    color: 'white',
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.55rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {pendingRequests.length}
                </span>
              )}
            </h2>
          </div>

          {pendingRequests.length === 0 ? (
            <div
              style={{
                padding: '2rem',
                background: 'white',
                border: '1px dashed #E5E7EB',
                borderRadius: '1.25rem',
                color: '#6B7280',
                fontSize: '0.95rem',
                textAlign: 'center',
              }}
            >
              Aucun bilan en attente de réponse.
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              {pendingRequests.map((req, index) => {
                const testIds = JSON.parse(req.questionnaireIds || '[]');
                const tests = testIds.map((id: string) => QUESTIONNAIRES[id as keyof typeof QUESTIONNAIRES]);
                const hasTherapistTest = tests.some((t: { administrationType?: string } | undefined) => t?.administrationType === 'therapist');
                const patient = req.clinicalRecord?.patient;
                if (!patient) return null;

                return (
                  <div
                    key={req.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.1rem 1.5rem',
                      borderBottom: index < pendingRequests.length - 1 ? '1px solid #F3F4F6' : 'none',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          background: '#0E1217',
                          color: 'white',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}
                      >
                        En attente
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <Link
                          href={`/practitioner/patient-history?id=${patient.id}`}
                          style={{ fontWeight: 600, color: '#0E1217', textDecoration: 'none', fontSize: '0.95rem' }}
                        >
                          {patientLabel(patient)}
                        </Link>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {tests.map((t: { title?: string } | undefined) => t?.title || 'Test').join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                      <CopyLinkButton link={`/test/${req.anonymousCode}`} />
                      {hasTherapistTest && (
                        <Link
                          href={`/test/${req.anonymousCode}`}
                          style={{
                            background: '#0E1217',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <Send size={12} strokeWidth={2.5} /> Remplir
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Patients */}
        <section className="elx-fade-up elx-delay-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
              }}
            >
              Mes patients
              <span
                style={{
                  background: '#F3F4F6',
                  color: '#0E1217',
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.55rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                {patients.length}
              </span>
            </h2>
          </div>

          {patients.length === 0 ? (
            <div
              style={{
                padding: '3.5rem 1.5rem',
                background: 'white',
                border: '1px dashed #E5E7EB',
                borderRadius: '1.25rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#0E1217', fontWeight: 700, fontSize: '1.05rem', margin: '0 0 0.5rem' }}>
                Aucun patient pour l'instant.
              </p>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
                Cliquez sur « Nouveau bilan » pour créer votre premier patient.
              </p>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              {patients.map((patient, index) => {
                const latestAssessment = patient.clinicalRecord?.assessments?.[0];
                return (
                  <Link
                    key={patient.id}
                    href={`/practitioner/patient-history?id=${patient.id}`}
                    className="patient-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.1rem 1.5rem',
                      borderBottom: index < patients.length - 1 ? '1px solid #F3F4F6' : 'none',
                      textDecoration: 'none',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#0E1217',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          flexShrink: 0,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {patientInitials(patient)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontWeight: 600, color: '#0E1217', fontSize: '0.98rem', margin: 0 }}>
                          {patientLabel(patient)}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0.15rem 0 0 0' }}>
                          {patient.clinicalRecord?.pathology || 'Pathologie non renseignée'}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.82rem', color: '#0E1217', fontWeight: 500, margin: 0 }}>
                          {latestAssessment ? latestAssessment.timelineAnchor.replace(/_/g, ' ') : 'Aucun bilan'}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: '#9CA3AF', margin: 0 }}>
                          {latestAssessment ? new Date(latestAssessment.timestamp).toLocaleDateString('fr-FR') : ''}
                        </p>
                      </div>
                      <ArrowRight size={14} strokeWidth={2} color="#0E1217" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
