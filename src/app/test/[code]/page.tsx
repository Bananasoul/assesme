import { questionnaires } from '@/data/questionnaires';
import MultiQuestionnaireFlow from '@/components/MultiQuestionnaireFlow';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Activity, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ code: string }>;
};

function TestHeader({ subtitle = 'BILAN ANONYME' }: { subtitle?: string }) {
  return (
    <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <Activity size={20} color="#0E1217" strokeWidth={2.4} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>{subtitle}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default async function AnonymousTestPage({ params }: Props) {
  const resolvedParams = await params;
  const { code } = resolvedParams;

  const session = await prisma.anonymousSession.findUnique({
    where: { anonymousCode: code },
  });

  if (!session) {
    notFound();
  }

  if (session.status === 'COMPLETED') {
    return (
      <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TestHeader />
        <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
          <div className="elx-fade-up" style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
            <CheckCircle size={48} color="#0E1217" strokeWidth={1.5} style={{ margin: '0 auto 1.5rem' }} />
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>
              Session terminée
            </p>
            <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0E1217', margin: 0 }}>
              Bilan déjà complété.
            </h1>
            <p style={{ fontSize: '1rem', color: '#6B7280', margin: '1rem 0 0', lineHeight: 1.6 }}>
              Ce code a déjà été utilisé et les résultats ont été transmis. Ce lien n'est plus actif.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const requestedIds = JSON.parse(session.questionnaireIds) as string[];
  const defs = requestedIds.map((id) => questionnaires.find((q) => q.id === id)).filter(Boolean) as typeof questionnaires;

  if (defs.length === 0) {
    return (
      <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TestHeader />
        <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
          <div className="elx-fade-up" style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0E1217', margin: 0 }}>
              Aucun questionnaire trouvé.
            </h1>
            <p style={{ fontSize: '1rem', color: '#6B7280', margin: '1rem 0 0', lineHeight: 1.6 }}>
              Le code ne correspond à aucun bilan actif. Contactez votre praticien.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TestHeader />
      <section style={{ flex: 1, padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {/* Bandeau anonymat */}
          <div
            className="elx-fade-up"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              padding: '1.1rem 1.25rem',
              borderRadius: '0.85rem',
              marginBottom: '2.5rem',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              color: '#0E1217',
            }}
          >
            <ShieldCheck size={20} strokeWidth={2} color="#0E1217" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <div>
              <strong style={{ fontWeight: 700 }}>Session sécurisée et anonyme.</strong>{' '}
              <span style={{ color: '#6B7280' }}>
                Aucune donnée nominative n'est enregistrée sur cette page.
              </span>
              <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF' }}>
                Code actif · {code}
              </div>
            </div>
          </div>

          <MultiQuestionnaireFlow questionnaires={defs} requestId={session.anonymousCode} />
        </div>
      </section>
    </main>
  );
}
