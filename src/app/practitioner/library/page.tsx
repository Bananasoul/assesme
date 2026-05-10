import Link from 'next/link';
import { ChevronLeft, BookOpen, User } from 'lucide-react';
import LibraryView from '@/components/library/LibraryView';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LibraryPage({ searchParams }: Props) {
  const params = await searchParams;
  const patientId = typeof params.patientId === 'string' ? params.patientId : null;
  const recordId = typeof params.recordId === 'string' ? params.recordId : null;
  const patientName = typeof params.patientName === 'string' ? params.patientName : null;

  const patientContext =
    patientId && recordId && patientName ? { patientId, recordId, patientName } : null;

  return (
    <main style={{ padding: '2rem 1rem 4rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link
          href={patientContext ? `/practitioner/patient-history?id=${patientContext.patientId}` : '/practitioner'}
          style={{
            color: 'var(--text-secondary)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
          }}
        >
          <ChevronLeft size={18} />
          {patientContext ? `Retour à la fiche de ${patientContext.patientName}` : 'Tableau de bord'}
        </Link>

        {patientContext && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'var(--primary-light)',
              color: 'white',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            <User size={16} /> Mode prescription : {patientContext.patientName}
          </div>
        )}
      </nav>

      <header style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)', display: 'flex' }}>
            <BookOpen size={20} />
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Bibliothèque clinique
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', lineHeight: 1.6 }}>
          {patientContext
            ? `Sélectionnez une zone, choisissez un test, puis prescrivez-le directement à ${patientContext.patientName}.`
            : "Sélectionnez une zone anatomique pour voir les questionnaires qui s'y rapportent, les questions cliniques qu'ils résolvent, et le détail psychométrique complet de chaque test."}
        </p>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <LibraryView patientContext={patientContext} />
      </div>
    </main>
  );
}
