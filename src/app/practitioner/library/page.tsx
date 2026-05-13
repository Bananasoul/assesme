import Link from 'next/link';
import { ArrowLeft, Activity, User } from 'lucide-react';
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
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/practitioner" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>BIBLIOTHÈQUE</span>
            </div>
          </Link>
          <Link
            href={patientContext ? `/practitioner/patient-history?id=${patientContext.patientId}` : '/practitioner'}
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
            {patientContext ? 'Retour fiche patient' : 'Tableau de bord'}
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        <div
          className="elx-fade-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                marginBottom: '0.6rem',
              }}
            >
              Catalogue
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#0E1217',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Bibliothèque clinique.
            </h1>
            <p style={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.55, marginTop: '0.85rem', maxWidth: '640px' }}>
              {patientContext
                ? `Sélectionnez une zone, choisissez un test, puis prescrivez-le directement à ${patientContext.patientName}.`
                : "Sélectionnez une zone anatomique pour voir les questionnaires qui s'y rapportent, les questions cliniques qu'ils résolvent et le détail psychométrique complet."}
            </p>
          </div>

          {patientContext && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.65rem 1.1rem',
                background: '#0E1217',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <User size={14} strokeWidth={2.4} /> Prescription · {patientContext.patientName}
            </div>
          )}
        </div>

        <div className="elx-fade-up elx-delay-1">
          <LibraryView patientContext={patientContext} />
        </div>
      </section>
    </main>
  );
}
