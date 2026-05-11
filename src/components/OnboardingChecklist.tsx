'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Circle, X, ArrowRight, Sparkles } from 'lucide-react';

type Props = {
  hasCreatedPatient: boolean;
  hasAssignedTest: boolean;
  hasCompletedTest: boolean;
};

/**
 * Onboarding checklist shown on the practitioner dashboard.
 * Disappears entirely once all 3 steps are done, or can be dismissed manually.
 */
export default function OnboardingChecklist({
  hasCreatedPatient,
  hasAssignedTest,
  hasCompletedTest,
}: Props) {
  const [dismissed, setDismissed] = useState(false);

  const allDone = hasCreatedPatient && hasAssignedTest && hasCompletedTest;
  if (allDone || dismissed) return null;

  const steps = [
    {
      done: hasCreatedPatient,
      label: 'Créer votre premier patient',
      hint: "Cliquez sur le bouton « Nouveau patient » en haut à droite.",
    },
    {
      done: hasAssignedTest,
      label: 'Lui prescrire un questionnaire',
      hint: 'Ouvrez sa fiche, puis « Prescrire un bilan » ou « Bibliothèque » pour choisir.',
    },
    {
      done: hasCompletedTest,
      label: 'Voir un premier bilan complété',
      hint: 'Envoyez le lien anonyme (AM-XXXX) au patient et attendez sa réponse — vous verrez son score apparaître ici.',
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        color: 'white',
        position: 'relative',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <button
        onClick={() => setDismissed(true)}
        aria-label="Masquer le guide de démarrage"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <X size={16} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Sparkles size={18} />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
          Démarrage rapide
        </span>
      </div>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
        Bienvenue ! Voici comment démarrer en 3 étapes.
      </h3>
      <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {doneCount}/3 étapes complétées. Continuez à votre rythme.
      </p>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.85rem 1rem',
              background: step.done ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              opacity: step.done ? 0.85 : 1,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: step.done ? 'white' : 'transparent',
                border: step.done ? 'none' : '2px solid rgba(255,255,255,0.6)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {step.done ? <Check size={16} strokeWidth={3} /> : <Circle size={10} fill="rgba(255,255,255,0.3)" stroke="none" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, textDecoration: step.done ? 'line-through' : 'none' }}>
                {step.label}
              </div>
              {!step.done && (
                <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>{step.hint}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link
          href="/practitioner/library"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.1rem',
            background: 'rgba(255,255,255,0.15)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          Explorer la bibliothèque <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
