import { questionnaires } from '@/data/questionnaires';
import MultiQuestionnaireFlow from '@/components/MultiQuestionnaireFlow';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FillPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const requestId = typeof resolvedParams.requestId === 'string' ? resolvedParams.requestId : null;

  if (!requestId) {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Lien invalide ou expiré.</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Veuillez demander un nouveau lien à votre praticien.</p>
      </main>
    );
  }

  // New flow: using AssessmentRequest
  const request = await prisma.assessmentRequest.findUnique({
    where: { id: requestId },
    include: {
      clinicalRecord: {
        include: { patient: true }
      }
    }
  });

  if (!request || request.status === 'COMPLETED') {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Bilan déjà complété ou invalide.</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Ce lien n'est plus actif.</p>
      </main>
    );
  }

  const requestedIds = JSON.parse(request.questionnaireIds) as string[];
  const defs = requestedIds.map(id => questionnaires.find(q => q.id === id)).filter(Boolean) as typeof questionnaires;

  if (defs.length === 0) {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Erreur: Aucun questionnaire trouvé.</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <MultiQuestionnaireFlow
          questionnaires={defs}
          requestId={request.id}
        />
      </div>
    </main>
  );
}
