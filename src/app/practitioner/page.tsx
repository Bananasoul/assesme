import Link from 'next/link';
import { Activity, Settings, BookOpen, ChevronRight, Clock, Send } from 'lucide-react';
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

export default async function PractitionerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [patients, pendingRequests, onboarding] = await Promise.all([
    getPatients(),
    getPendingRequests(),
    getOnboardingState(),
  ]);

  // Patient list passed to wizard (slim format)
  const wizardPatients = patients.map((p) => ({
    id: p.id,
    identifier: p.identifier,
    firstName: p.firstName,
    lastName: p.lastName,
    clinicalRecord: p.clinicalRecord ? { id: p.clinicalRecord.id } : null,
  }));

  return (
    <main style={{ padding: '1.5rem 1rem 4rem', background: 'var(--background)', minHeight: '100vh' }}>
      {/* ============ TOP NAV ============ */}
      <nav
        style={{
          maxWidth: '1100px',
          margin: '0 auto 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              background: 'var(--primary)',
              padding: '0.45rem',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              display: 'flex',
            }}
          >
            <Activity size={20} />
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>AssesMe</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link
            href="/practitioner/library"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              color: 'var(--text-secondary)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            <BookOpen size={16} />
            Bibliothèque
          </Link>
          <Link
            href="/practitioner/settings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              color: 'var(--text-secondary)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            <Settings size={16} />
            Paramètres
          </Link>
          <LogoutButton />
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* ============ HÉROS ACTION ============ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Bonjour {user?.email?.split('@')[0]}
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Prêt à prescrire un bilan en moins d'une minute.
            </p>
          </div>
          <NewBilanWizard patients={wizardPatients} />
        </div>

        {/* ============ ONBOARDING (au-dessus si pas complet) ============ */}
        {(!onboarding.hasCreatedPatient || !onboarding.hasAssignedTest || !onboarding.hasCompletedTest) && (
          <OnboardingChecklist {...onboarding} />
        )}

        {/* ============ BILANS EN ATTENTE ============ */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" />
              Bilans en attente
              {pendingRequests.length > 0 && (
                <span
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
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
                padding: '1.25rem',
                background: 'var(--surface)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              Aucun bilan en attente de réponse.
            </div>
          ) : (
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              {pendingRequests.map((req, index) => {
                const testIds = JSON.parse(req.questionnaireIds || '[]');
                const tests = testIds.map((id: string) => QUESTIONNAIRES[id as keyof typeof QUESTIONNAIRES]);
                const hasTherapistTest = tests.some((t: any) => t?.administrationType === 'therapist');
                const patient = req.clinicalRecord?.patient;
                if (!patient) return null;

                return (
                  <div
                    key={req.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      borderBottom: index < pendingRequests.length - 1 ? '1px solid var(--border)' : 'none',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          background: '#FEF08A',
                          color: '#854D0E',
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}
                      >
                        Attente
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <Link
                          href={`/practitioner/patient-history?id=${patient.id}`}
                          style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem' }}
                        >
                          {patientLabel(patient)}
                        </Link>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {tests.map((t: any) => t?.title || 'Test').join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                      <CopyLinkButton link={`/test/${req.anonymousCode}`} />
                      {hasTherapistTest && (
                        <Link
                          href={`/test/${req.anonymousCode}`}
                          style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.45rem 0.9rem',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          <Send size={13} /> Remplir
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============ PATIENTS ============ */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Mes patients
              <span
                style={{
                  marginLeft: '0.5rem',
                  background: 'var(--surface-hover)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                }}
              >
                {patients.length}
              </span>
            </h2>
          </div>

          {patients.length === 0 ? (
            <div
              style={{
                padding: '3rem 1.5rem',
                background: 'var(--surface)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                Aucun patient pour l'instant
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Cliquez sur « + Nouveau bilan » pour créer votre premier patient.
              </p>
            </div>
          ) : (
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
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
                      padding: '0.9rem 1.25rem',
                      borderBottom: index < patients.length - 1 ? '1px solid var(--border)' : 'none',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'var(--primary-light)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          flexShrink: 0,
                        }}
                      >
                        {patientInitials(patient)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {patientLabel(patient)}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0 0' }}>
                          {patient.clinicalRecord?.pathology || 'Pathologie non renseignée'}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                          {latestAssessment ? latestAssessment.timelineAnchor.replace(/_/g, ' ') : 'Aucun bilan'}
                        </p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {latestAssessment ? new Date(latestAssessment.timestamp).toLocaleDateString('fr-FR') : ''}
                        </p>
                      </div>
                      <ChevronRight size={16} color="var(--text-secondary)" />
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
