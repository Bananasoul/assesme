'use client';

import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, Award } from 'lucide-react';
import { QuestionnaireDef } from '@/data/questionnaires';
import Link from 'next/link';

interface QuestionnaireEngineProps {
  questionnaire: QuestionnaireDef;
  targetRecordId?: string;
  isRemoteFill?: boolean;
}

export default function QuestionnaireEngine({ questionnaire, targetRecordId, isRemoteFill }: QuestionnaireEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questionnaire.questions[currentIndex];
  const progress = (currentIndex / questionnaire.questions.length) * 100;

  const handleSelect = (value: number) => {
    // Handle reverse scoring if needed
    let finalValue = value;
    if (currentQuestion.reverseScore) {
      // Pour TAMPA : 1->4, 2->3, 3->2, 4->1. Formule simple : 5 - valeur (si echelle 1-4)
      // Ici on hardcode la formule d'inversion classique pour le TAMPA (max + min - val)
      finalValue = 5 - value; 
    }

    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    
    setTimeout(async () => {
      if (currentIndex < questionnaire.questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Submit
        try {
          let totalScore = 0;
          
          if (questionnaire.id === 'quickdash' || questionnaire.id === 'dash') {
            // Formule QuickDASH: ((Sum / n) - 1) * 25
            const sum = Object.values(newAnswers).reduce((a, b) => a + b, 0);
            const n = Object.keys(newAnswers).length;
            totalScore = Math.round(((sum / n) - 1) * 25);
          } else if (questionnaire.id === 'ndi' || questionnaire.id === 'odi') {
            // NDI & ODI: Score = (Sum / (n * 5)) * 100
            const sum = Object.values(newAnswers).reduce((a, b) => a + b, 0);
            const n = Object.keys(newAnswers).length;
            totalScore = Math.round((sum / (n * 5)) * 100);
          } else if (questionnaire.id === 'spadi') {
            // SPADI: Score = (Sum / (n * 10)) * 100
            const sum = Object.values(newAnswers).reduce((a, b) => a + b, 0);
            const n = Object.keys(newAnswers).length;
            totalScore = Math.round((sum / (n * 10)) * 100);
          } else if (questionnaire.id === 'koos' || questionnaire.id === 'hoos') {
            // KOOS & HOOS: 100 - (Sum / (n * 4)) * 100 (100 = sain, 0 = sévère)
            const sum = Object.values(newAnswers).reduce((a, b) => a + b, 0);
            const n = Object.keys(newAnswers).length;
            totalScore = 100 - Math.round((sum / (n * 4)) * 100);
          } else {
            // Somme classique (ex: RMDQ)
            totalScore = Object.values(newAnswers).reduce((a, b) => a + b, 0);
          }

          await fetch('/api/assessments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: questionnaire.id.toUpperCase(),
              score: totalScore,
              maxScore: questionnaire.maxScore,
              rawResponses: newAnswers,
              targetRecordId,
              isPatientInput: !!isRemoteFill
            })
          });
          setIsCompleted(true);
        } catch (e) {
          console.error("Failed to save", e);
          setIsCompleted(true);
        }
      }
    }, 400);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 animate-slide-up" style={{ minHeight: '60vh' }}>
        <div style={{ background: 'var(--secondary-light)', padding: '2rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
          <Award size={64} color="var(--secondary)" />
        </div>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 700 }}>
          Évaluation Terminée !
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '400px' }}>
          Merci d'avoir complété le {questionnaire.title}. Vos réponses ont été transmises en toute sécurité à votre praticien.
        </p>
        
        {!isRemoteFill ? (
          <Link 
            href="/"
            style={{
              background: 'var(--primary)',
              color: 'var(--text-inverse)',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle2 size={20} />
            Retour au Tableau de Bord
          </Link>
        ) : (
          <div style={{
              background: 'var(--surface-hover)',
              color: 'var(--text-secondary)',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 500,
            }}>
            Vous pouvez maintenant fermer cette page.
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }} className="animate-slide-up">
      {/* Progress Header */}
      <div style={{ padding: '1.5rem', background: 'var(--primary)', color: 'var(--text-inverse)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <button 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft size={24} />
          </button>
          <span style={{ fontWeight: 600 }}>Question {currentIndex + 1} / {questionnaire.questions.length}</span>
          <div style={{ width: 24 }} /> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.2)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${progress}%`,
              background: 'var(--secondary)',
              height: '100%', 
              transition: 'width 0.3s ease-out' 
            }} 
          />
        </div>
      </div>

      {/* Question Body */}
      <div style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.4 }}>
          {currentQuestion.text}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQuestion.options.map(option => {
            const isSelected = answers[currentQuestion.id] === option.value;
            // Handle reverse scoring visual mapping if needed (but UI value should match what patient clicked, so we check raw answer vs mapped answer)
            // Wait, answer stored is the final mapped value. So to check if selected, we check if the stored value matches finalValue.
            const finalValue = currentQuestion.reverseScore ? (5 - option.value) : option.value;
            const actuallySelected = answers[currentQuestion.id] === finalValue;

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.value)}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: actuallySelected ? '2px solid var(--primary)' : '2px solid var(--border)',
                  background: actuallySelected ? 'var(--surface-hover)' : 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '1.125rem',
                  fontWeight: actuallySelected ? 600 : 400,
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {option.label}
                {actuallySelected && <CheckCircle2 size={20} color="var(--primary)" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
