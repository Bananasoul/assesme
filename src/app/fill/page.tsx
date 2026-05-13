import { questionnaires } from '@/data/questionnaires';
import MultiQuestionnaireFlow from '@/components/MultiQuestionnaireFlow';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function FillHeader({ subtitle = 'BILAN' }: { subtitle?: string }) {
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

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <FillHeader />
      <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div className="elx-fade-up" style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>
            Lien sécurisé
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0E1217', margin: 0 }}>
            {title}
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', margin: '1rem 0 2rem', lineHeight: 1.6 }}>{message}</p>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.95rem 1.75rem',
              background: '#0E1217',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    </main>
  );
}

export default async function FillPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const requestId = typeof resolvedParams.requestId === 'string' ? resolvedParams.requestId : null;

  if (!requestId) {
    return <ErrorState title="Lien invalide ou expiré." message="Veuillez demander un nouveau lien à votre praticien." />;
  }

  const request = await prisma.assessmentRequest.findUnique({
    where: { id: requestId },
    include: {
      clinicalRecord: {
        include: { patient: true },
      },
    },
  });

  if (!request || request.status === 'COMPLETED') {
    return <ErrorState title="Bilan déjà complété." message="Ce lien n'est plus actif." />;
  }

  const requestedIds = JSON.parse(request.questionnaireIds) as string[];
  const defs = requestedIds.map((id) => questionnaires.find((q) => q.id === id)).filter(Boolean) as typeof questionnaires;

  if (defs.length === 0) {
    return <ErrorState title="Aucun questionnaire." message="Une erreur est survenue dans la prescription. Contactez votre praticien." />;
  }

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <FillHeader />
      <section style={{ flex: 1, padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <MultiQuestionnaireFlow questionnaires={defs} requestId={request.id} />
        </div>
      </section>
    </main>
  );
}
