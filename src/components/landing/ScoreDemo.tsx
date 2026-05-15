'use client';

import { useState } from 'react';

/**
 * Démo interactive : on déplace le slider, le score change,
 * l'interprétation textuelle et le tone s'adaptent en direct.
 * Mime le comportement réel d'AssesMe (TAMPA-like, score 17-68).
 */
type Tone = 'low' | 'medium' | 'high';

function interpret(score: number): { label: string; tone: Tone; summary: string } {
  if (score < 30) {
    return {
      label: 'Faible',
      tone: 'low',
      summary: 'Aucun signe de kinésiophobie. Approche mécanique classique : renforcement et mise en charge progressive.',
    };
  }
  if (score < 45) {
    return {
      label: 'Modéré',
      tone: 'medium',
      summary: 'Vigilance. Le patient évite certains mouvements par peur. À combiner avec éducation à la douleur.',
    };
  }
  return {
    label: 'Élevé',
    tone: 'high',
    summary: 'Drapeau jaune. La peur du mouvement domine le tableau clinique. Graded exposure recommandée avant tout renforcement intensif.',
  };
}

const toneStyles: Record<Tone, { bg: string; border: string; text: string; chip: { bg: string; color: string } }> = {
  low: { bg: '#F9FAFB', border: '#E5E7EB', text: '#0E1217', chip: { bg: '#F3F4F6', color: '#0E1217' } },
  medium: { bg: '#F3F4F6', border: '#D1D5DB', text: '#0E1217', chip: { bg: '#FFFFFF', color: '#0E1217' } },
  high: { bg: '#0E1217', border: '#0E1217', text: '#FFFFFF', chip: { bg: '#FFFFFF', color: '#0E1217' } },
};

export default function ScoreDemo() {
  const [score, setScore] = useState(32);
  const interp = interpret(score);
  const styleSet = toneStyles[interp.tone];
  const percent = Math.round(((score - 17) / (68 - 17)) * 100);

  return (
    <div
      style={{
        background: styleSet.bg,
        border: `1px solid ${styleSet.border}`,
        borderRadius: '1.5rem',
        padding: '2rem',
        transition: 'background 0.4s ease, border-color 0.4s ease, color 0.4s ease',
        color: styleSet.text,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.55,
              marginBottom: '0.5rem',
            }}
          >
            TAMPA · Kinésiophobie
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {score}
            </span>
            <span style={{ fontSize: '1.1rem', opacity: 0.55 }}>/ 68</span>
          </div>
        </div>
        <span
          style={{
            background: styleSet.chip.bg,
            color: styleSet.chip.color,
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
          }}
        >
          {interp.label}
        </span>
      </div>

      <div className="elx-score-track" style={{ background: interp.tone === 'high' ? 'rgba(255,255,255,0.15)' : '#F3F4F6' }}>
        <div
          className="elx-score-fill"
          style={{ width: `${percent}%`, background: interp.tone === 'high' ? '#FFFFFF' : '#0E1217' }}
        />
      </div>

      <input
        type="range"
        min={17}
        max={68}
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        aria-label="Score TAMPA simulé"
        style={{
          width: '100%',
          marginTop: '0.85rem',
          accentColor: interp.tone === 'high' ? '#FFFFFF' : '#0E1217',
          cursor: 'pointer',
        }}
      />

      <p
        style={{
          marginTop: '1.5rem',
          fontSize: '1rem',
          lineHeight: 1.55,
          color: 'inherit',
          opacity: interp.tone === 'high' ? 0.85 : 0.75,
        }}
      >
        {interp.summary}
      </p>
    </div>
  );
}
