import { questionnaires } from '@/data/questionnaires';
import MultiQuestionnaireFlow from '@/components/MultiQuestionnaireFlow';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ code: string }>;
};

export default async function AnonymousTestPage({ params }: Props) {
  const resolvedParams = await params;
  const { code } = resolvedParams;

  const session = await prisma.anonymousSession.findUnique({
    where: { anonymousCode: code }
  });

  if (!session) {
    notFound(); // 404 si le code n'existe pas
  }

  if (session.status === 'COMPLETED') {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary-light)', color: 'white', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <ShieldAlert size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bilan déjà complété</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Ce code a déjà été utilisé et les résultats ont été transmis. Ce lien n'est plus actif.
          </p>
        </div>
      </main>
    );
  }

  const requestedIds = JSON.parse(session.questionnaireIds) as string[];
  const defs = requestedIds.map(id => questionnaires.find(q => q.id === id)).filter(Boolean) as typeof questionnaires;

  if (defs.length === 0) {
    return (
      <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Erreur : Aucun questionnaire trouvé pour ce code.</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Bandeau d'anonymat (Optionnel mais rassurant pour le patient) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          background: '#E0F2FE', 
          color: '#0369A1', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem',
          fontSize: '0.875rem'
        }}>
          <ShieldAlert size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Session Sécurisée et Anonyme</strong><br/>
            Aucune donnée nominative n'est enregistrée sur cette page. Code actif : {code}
          </div>
        </div>

        <MultiQuestionnaireFlow
          questionnaires={defs}
          requestId={session.anonymousCode}
        />
      </div>
    </main>
  );
}
