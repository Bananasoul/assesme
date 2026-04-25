import { questionnaires } from '@/data/questionnaires';
import QuestionnaireEngine from '@/components/QuestionnaireEngine';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FillPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const recordId = typeof resolvedParams.recordId === 'string' ? resolvedParams.recordId : null;
  const typeId = typeof resolvedParams.type === 'string' ? resolvedParams.type : null;
  const patientName = typeof resolvedParams.name === 'string' ? resolvedParams.name : 'Patient';

  if (!recordId || !typeId) {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Lien invalide ou expiré.</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Veuillez demander un nouveau lien à votre praticien.</p>
      </main>
    );
  }

  const questionnaireDef = questionnaires.find(q => q.id === typeId);

  if (!questionnaireDef) {
    notFound();
  }

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Bonjour {patientName},
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Votre kinésithérapeute vous invite à remplir ce bilan fonctionnel : <strong>{questionnaireDef.title}</strong>.
          </p>
        </div>

        {/* Le QuestionnaireEngine recevra le recordId pour le lier au bon patient */}
        <QuestionnaireEngine questionnaire={questionnaireDef} targetRecordId={recordId} isRemoteFill={true} />
      </div>
    </main>
  );
}
