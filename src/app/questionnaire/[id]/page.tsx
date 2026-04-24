import QuestionnaireEngine from "@/components/QuestionnaireEngine";
import { QUESTIONNAIRES } from "@/data/questionnaires";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function QuestionnairePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const questionnaireId = resolvedParams.id;
  const questionnaire = QUESTIONNAIRES[questionnaireId];

  if (!questionnaire) {
    notFound();
  }

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        <Link 
          href="/" 
          style={{ 
            color: 'var(--text-secondary)', 
            fontWeight: 600, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)'
          }}
        >
          <ChevronLeft size={20} />
          Annuler et revenir
        </Link>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 700 }}>
          {questionnaire.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          {questionnaire.description}
        </p>
      </div>

      <QuestionnaireEngine questionnaire={questionnaire} />
    </main>
  );
}
