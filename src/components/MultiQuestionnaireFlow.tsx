'use client';

import React, { useState, useEffect } from 'react';
import { QuestionnaireDef } from '@/data/questionnaires';
import QuestionnaireEngine from './QuestionnaireEngine';
import { Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { completeAnonymousSession } from '@/app/actions/anonymousSession';

type Props = {
  questionnaires: QuestionnaireDef[];
  recordId: string;
  requestId: string;
};

export default function MultiQuestionnaireFlow({ questionnaires, recordId, requestId }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullyCompleted, setIsFullyCompleted] = useState(false);

  const handleNext = async () => {
    if (currentIndex < questionnaires.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished all. Since we pass the anonymousCode as requestId, we can complete it here.
      await completeAnonymousSession(requestId);
      setIsFullyCompleted(true);
    }
  };

  // We hack the QuestionnaireEngine by rendering it and hooking its completion
  // Actually, QuestionnaireEngine currently shows a "Completed" screen and doesn't notify the parent.
  // We need to pass an `onComplete` prop to QuestionnaireEngine!
  
  if (isFullyCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 animate-slide-up" style={{ minHeight: '60vh' }}>
        <div style={{ background: 'var(--secondary-light)', padding: '2rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem', display: 'inline-block' }}>
          <Award size={64} color="var(--secondary)" />
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 700 }}>
          Tous les bilans sont terminés !
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto' }}>
          Merci de votre participation. Vos réponses ont été transmises en toute sécurité à votre praticien.
        </p>
        <button 
          onClick={() => window.close()}
          style={{
            background: 'var(--primary)',
            color: 'var(--text-inverse)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <CheckCircle2 size={20} />
          Fermer cette page
        </button>
      </div>
    );
  }

  const currentQ = questionnaires[currentIndex];

  return (
    <div>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Questionnaire {currentIndex + 1} sur {questionnaires.length}
        </p>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{currentQ.title}</h2>
      </div>

      <QuestionnaireEngine 
        key={currentQ.id} // Important so it resets state when changing questionnaire
        questionnaire={currentQ} 
        targetRecordId={recordId} 
        isRemoteFill={true} 
        onComplete={handleNext}
      />
    </div>
  );
}
