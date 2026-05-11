import Link from 'next/link';
import { Calendar, User, Search, Activity, FileText, Settings, Users, ChevronRight, BookOpen } from 'lucide-react';
import PractitionerDashboard from '@/components/PractitionerDashboard';
import { getPatients, getPendingRequests, getOnboardingState } from './actions';
import OnboardingChecklist from '@/components/OnboardingChecklist';
import CopyLinkButton from '@/components/CopyLinkButton';
import { QUESTIONNAIRES } from '@/data/questionnaires';
import NewPatientModal from '@/components/NewPatientModal';
import LogoutButton from '@/components/LogoutButton';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PractitionerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [patients, pendingRequests, onboarding] = await Promise.all([
    getPatients(),
    getPendingRequests(),
    getOnboardingState(),
  ]);

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          href="/" 
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
          ← Retour à l'Espace Patient
        </Link>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Espace Praticien</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Bienvenue, {user?.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/practitioner/library" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', color: 'var(--primary)', background: 'var(--surface)', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
              <BookOpen size={18} />
              Bibliothèque
            </Link>
            <Link href="/practitioner/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', color: 'var(--text-secondary)', background: 'var(--surface)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', fontWeight: 500, textDecoration: 'none' }}>
              <Settings size={18} />
              Paramètres
            </Link>
            <NewPatientModal />
            <LogoutButton />
          </div>
        </div>

        {/* Onboarding Checklist (auto-disappears once complete) */}
        <OnboardingChecklist {...onboarding} />

        {/* Stats Summary */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Patients</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{patients.length}</h3>
            </div>
          </div>

          <div className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">En attente</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{pendingRequests.length}</h3>
            </div>
          </div>

          {/* Lien rapide bibliothèque */}
          <div className="sm:col-span-2 group relative p-5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-200/70 hover:-translate-y-0.5 transition-all flex items-center gap-4 overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <BookOpen size={22} />
            </div>
            <div className="relative flex-1">
              <h3 className="text-base font-bold">Bibliothèque clinique</h3>
              <p className="text-sm text-white/90">Body chart · 32 tests validés · psychométrie détaillée</p>
            </div>
            <Link
              href="/practitioner/library"
              className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white text-indigo-700 font-bold text-sm hover:scale-105 transition-transform"
            >
              Ouvrir
            </Link>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={20} color="var(--primary)" />
              Bilans en attente
            </h2>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                        padding: '1.25rem 1.5rem',
                        borderBottom: index < pendingRequests.length - 1 ? '1px solid var(--border)' : 'none',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ background: '#FEF08A', color: '#854D0E', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            En attente
                          </span>
                          <Link href={`/practitioner/patient-history?id=${patient.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
                            {patient.firstName} {patient.lastName}
                          </Link>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          Tests : {tests.map((t: any) => t?.title || 'Test Inconnu').join(', ')}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <CopyLinkButton link={`/test/${req.anonymousCode}`} />
                        {hasTherapistTest && (
                          <Link 
                            href={`/test/${req.anonymousCode}`}
                            style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}
                          >
                            Remplir
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Patient List */}
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Mes Patients</h2>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          {patients.length === 0 ? (
            <div style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'var(--surface-hover)',
                  margin: '0 auto 1rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Aucun patient pour le moment
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
                Créez votre premier dossier patient pour commencer à prescrire des bilans validés
                et suivre leur évolution dans le temps.
              </p>
              <div style={{ display: 'inline-block' }}>
                <NewPatientModal />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                      padding: '1.25rem 1.5rem',
                      borderBottom: index < patients.length - 1 ? '1px solid var(--border)' : 'none',
                      textDecoration: 'none',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.125rem' }}>
                        {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{patient.firstName} {patient.lastName}</h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Activity size={14} /> 
                            {patient.clinicalRecord?.pathology || 'Pathologie non renseignée'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {latestAssessment ? latestAssessment.timelineAnchor : 'Aucun bilan'}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {latestAssessment ? new Date(latestAssessment.timestamp).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      <ChevronRight size={20} color="var(--text-secondary)" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Triage Section (Legacy) */}
        <div id="triage" style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Outil de Sélection (Triage)</h2>
          <PractitionerDashboard />
        </div>
      </div>
    </main>
  );
}
