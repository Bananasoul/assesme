import PractitionerDashboard from "@/components/PractitionerDashboard";
import Link from "next/link";

export default function PractitionerPage() {
  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav style={{ maxWidth: '1000px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'flex-start' }}>
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

      <PractitionerDashboard />
    </main>
  );
}
