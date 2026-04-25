import Link from 'next/link';
import { Activity, ClipboardList, TrendingUp, Users, Search, Calendar, ChevronRight } from 'lucide-react';
import PractitionerDashboard from '@/components/PractitionerDashboard';
import { getPatients } from './actions';
import NewPatientModal from '@/components/NewPatientModal';
import LogoutButton from '@/components/LogoutButton';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PractitionerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const patients = await getPatients();

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
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <NewPatientModal />
            <LogoutButton />
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--primary-light)', color: 'white', borderRadius: 'var(--radius-md)' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Patients</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{patients.length}</h3>
            </div>
          </div>
          
          {/* Quick Access to Triage (Old dashboard feature) */}
          <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1rem', gridColumn: 'span 2' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>Arbre de Décision Clinique</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Outil d'aide à la décision pour sélectionner le bon questionnaire fonctionnel.</p>
            </div>
            <Link 
              href="#triage"
              style={{ padding: '0.75rem 1.5rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-full)', fontWeight: 500, color: 'var(--primary)' }}
            >
              Ouvrir l'outil
            </Link>
          </div>
        </div>

        {/* Patient List */}
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Mes Patients</h2>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          {patients.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Aucun patient trouvé. Ajoutez votre premier patient !
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {patients.map((patient, index) => {
                const latestAssessment = patient.clinicalRecord?.assessments?.[0];
                return (
                  <Link 
                    key={patient.id} 
                    href={`/practitioner/patient-history?id=${patient.id}`}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem',
                      borderBottom: index < patients.length - 1 ? '1px solid var(--border)' : 'none',
                      textDecoration: 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
