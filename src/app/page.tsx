import PatientDashboard from "@/components/PatientDashboard";
import Link from "next/link";
import { getPatientDashboardStats } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await getPatientDashboardStats();

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: 700 }}>Kiné App</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Espace Patient</p>
        
        <Link 
          href="/practitioner"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--primary)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          Mode Expert 👨‍⚕️
        </Link>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Main Dashboard containing progression and questionnaire links */}
        <section>
          <PatientDashboard score={stats.score} />
        </section>
      </div>
    </main>
  );
}
