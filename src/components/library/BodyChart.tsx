'use client';

import React, { useState } from 'react';
import { BodyPartKey } from '@/data/questionnaires-meta';
import { Brain, HeartPulse, Ear } from 'lucide-react';

type Props = {
  selected: BodyPartKey | null;
  onSelect: (zone: BodyPartKey) => void;
};

type View = 'anterior' | 'posterior';

export default function BodyChart({ selected, onSelect }: Props) {
  const [view, setView] = useState<View>('anterior');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      {/* Toggle face avant / arrière */}
      <div
        role="tablist"
        style={{
          display: 'inline-flex',
          background: 'var(--surface-hover)',
          borderRadius: 'var(--radius-full)',
          padding: '0.25rem',
          gap: '0.25rem',
        }}
      >
        {(['anterior', 'posterior'] as View[]).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: view === v ? 'var(--surface)' : 'transparent',
              color: view === v ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: view === v ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: view === v ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {v === 'anterior' ? 'Face avant' : 'Face arrière'}
          </button>
        ))}
      </div>

      {/* SVG body */}
      <svg
        viewBox="0 0 240 600"
        style={{ width: '100%', maxWidth: '320px', height: 'auto', userSelect: 'none' }}
        aria-label="Schéma corporel cliquable"
      >
        <defs>
          <style>{`
            .zone { cursor: pointer; transition: fill 0.15s, stroke 0.15s; }
            .zone:hover { fill: var(--primary-light); }
            .zone.selected { fill: var(--primary); }
            .silhouette { fill: var(--surface-hover); stroke: var(--border); stroke-width: 1; pointer-events: none; }
            .body-label { font-family: inherit; font-size: 9px; fill: var(--text-secondary); pointer-events: none; }
          `}</style>
        </defs>

        {/* Silhouette de fond (non cliquable, juste contexte visuel) */}
        <SilhouetteBody view={view} />

        {/* Zones cliquables — communes aux 2 vues sauf lumbar (postérieur uniquement) */}
        <Zone id="cervical" selected={selected} onSelect={onSelect}>
          <ellipse cx="120" cy="92" rx="18" ry="10" />
        </Zone>

        <Zone id="shoulder" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="78" cy="120" rx="22" ry="16" />
        </Zone>
        <Zone id="shoulder" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="162" cy="120" rx="22" ry="16" />
        </Zone>

        <Zone id="elbow" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="60" cy="210" rx="14" ry="14" />
        </Zone>
        <Zone id="elbow" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="180" cy="210" rx="14" ry="14" />
        </Zone>

        <Zone id="wrist-hand" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="48" cy="295" rx="14" ry="20" />
        </Zone>
        <Zone id="wrist-hand" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="192" cy="295" rx="14" ry="20" />
        </Zone>

        {/* Lombaire — vue postérieure uniquement */}
        {view === 'posterior' && (
          <Zone id="lumbar" selected={selected} onSelect={onSelect}>
            <rect x="92" y="245" width="56" height="50" rx="8" />
          </Zone>
        )}

        <Zone id="hip" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="100" cy="320" rx="18" ry="14" />
        </Zone>
        <Zone id="hip" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="140" cy="320" rx="18" ry="14" />
        </Zone>

        <Zone id="knee" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="100" cy="430" rx="16" ry="14" />
        </Zone>
        <Zone id="knee" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="140" cy="430" rx="16" ry="14" />
        </Zone>

        <Zone id="ankle-foot" selected={selected} onSelect={onSelect} side="left">
          <ellipse cx="100" cy="560" rx="20" ry="18" />
        </Zone>
        <Zone id="ankle-foot" selected={selected} onSelect={onSelect} side="right">
          <ellipse cx="140" cy="560" rx="20" ry="18" />
        </Zone>
      </svg>

      {/* Catégories non-corporelles */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <CategoryButton
          label="Général / Psycho-social"
          icon={<HeartPulse size={16} />}
          active={selected === 'general'}
          onClick={() => onSelect('general')}
        />
        <CategoryButton
          label="Neurologique"
          icon={<Brain size={16} />}
          active={selected === 'neuro'}
          onClick={() => onSelect('neuro')}
        />
        <CategoryButton
          label="Vestibulaire"
          icon={<Ear size={16} />}
          active={selected === 'vestibular'}
          onClick={() => onSelect('vestibular')}
        />
      </div>
    </div>
  );
}

function Zone({
  id,
  selected,
  onSelect,
  children,
}: {
  id: BodyPartKey;
  selected: BodyPartKey | null;
  onSelect: (zone: BodyPartKey) => void;
  side?: 'left' | 'right';
  children: React.ReactNode;
}) {
  const isSelected = selected === id;
  return (
    <g
      className={`zone${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(id);
      }}
      role="button"
      tabIndex={0}
      style={{
        fill: isSelected ? 'var(--primary)' : 'var(--primary-light)',
        opacity: isSelected ? 1 : 0.55,
      }}
    >
      {children}
    </g>
  );
}

function CategoryButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 0.875rem',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
        background: active ? 'var(--primary)' : 'var(--surface)',
        color: active ? 'white' : 'var(--text-primary)',
        fontWeight: 600,
        fontSize: '0.8rem',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {icon} {label}
    </button>
  );
}

function SilhouetteBody({ view }: { view: View }) {
  // Silhouette stylisée — zones interactives sont superposées par-dessus.
  return (
    <g className="silhouette">
      {/* Tête */}
      <ellipse cx="120" cy="50" rx="28" ry="35" />
      {/* Cou */}
      <rect x="108" y="80" width="24" height="22" rx="4" />
      {/* Torse */}
      <path d="M 60 130 Q 60 115 80 110 L 160 110 Q 180 115 180 130 L 175 270 Q 175 290 160 295 L 80 295 Q 65 290 65 270 Z" />
      {/* Bras gauche */}
      <path d="M 58 130 Q 50 130 48 145 L 50 220 Q 50 230 55 235 L 48 290 Q 48 305 55 308" />
      {/* Bras droit */}
      <path d="M 182 130 Q 190 130 192 145 L 190 220 Q 190 230 185 235 L 192 290 Q 192 305 185 308" />
      {/* Mains */}
      <ellipse cx="48" cy="295" rx="12" ry="18" />
      <ellipse cx="192" cy="295" rx="12" ry="18" />
      {/* Bassin */}
      <path d="M 70 295 L 170 295 L 165 340 Q 160 360 150 360 L 90 360 Q 80 360 75 340 Z" />
      {/* Jambe gauche */}
      <path d="M 88 360 Q 86 380 92 410 L 95 500 Q 96 520 100 540" />
      <path d="M 116 360 Q 114 380 110 410 L 108 500 Q 107 520 104 540" />
      {/* Jambe droite */}
      <path d="M 124 360 Q 126 380 130 410 L 132 500 Q 133 520 136 540" />
      <path d="M 152 360 Q 154 380 148 410 L 145 500 Q 144 520 140 540" />
      {/* Pieds */}
      <ellipse cx="100" cy="560" rx="18" ry="16" />
      <ellipse cx="140" cy="560" rx="18" ry="16" />

      {/* Marqueur visuel postérieur : trait vertical lombaire */}
      {view === 'posterior' && (
        <g opacity="0.3">
          <line x1="120" y1="130" x2="120" y2="290" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      )}
    </g>
  );
}
