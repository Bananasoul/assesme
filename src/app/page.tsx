import Link from "next/link";
import { Activity, User, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      {/* Navigation / Header */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}>
            <Activity size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>AssesMe</span>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '1rem', color: 'white', display: 'flex' }}>
            <Activity size={48} />
          </div>
          AssesMe
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {/* Therapist Entry */}
          <Link 
            href="/practitioner"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '3rem 2rem',
              background: 'var(--surface)',
              border: '2px solid var(--primary)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              width: '300px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: 'var(--shadow-md)'
            }}
            className="hover-card"
          >
            <div style={{ background: 'var(--primary-light)', padding: '1.5rem', borderRadius: '50%', color: 'var(--primary)' }}>
              <Activity size={40} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Praticien</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Espace professionnel sécurisé</p>
            </div>
          </Link>

          {/* Patient Entry */}
          <Link 
            href="/portal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '3rem 2rem',
              background: 'var(--surface)',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              width: '300px',
              transition: 'all 0.2s ease-in-out',
            }}
            className="hover-card"
          >
            <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '50%', color: 'var(--secondary)' }}>
              <User size={40} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Patient</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Accès à vos questionnaires</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', fontSize: '0.875rem' }}>
        <p>© {new Date().getFullYear()} AssesMe. Plateforme sécurisée de métrologie clinique.</p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg) !important;
          border-color: var(--primary) !important;
        }
      `}} />
    </main>
  );
}
