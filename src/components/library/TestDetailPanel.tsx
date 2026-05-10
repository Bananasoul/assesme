'use client';

import React from 'react';
import { QuestionnaireDef } from '@/data/questionnaires';
import { getMeta, BODY_PART_LABELS } from '@/data/questionnaires-meta';
import {
  Activity,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  Lightbulb,
  ListChecks,
  Stethoscope,
  Target,
  Video,
} from 'lucide-react';

export default function TestDetailPanel({ test }: { test: QuestionnaireDef }) {
  const meta = getMeta(test.id);

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
          {test.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{test.description}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {test.validated && <Badge color="success" icon={<CheckCircle2 size={12} />}>Validé</Badge>}
          {test.estimatedTime && <Badge color="default" icon={<Clock size={12} />}>{test.estimatedTime}</Badge>}
          {test.category && <Badge color="default">{test.category}</Badge>}
          {(meta?.bodyParts ?? []).map((bp) => (
            <Badge key={bp} color="primary">{BODY_PART_LABELS[bp]}</Badge>
          ))}
        </div>
      </div>

      {/* Valeur clinique */}
      {test.clinicalValue && (
        <Section icon={<Stethoscope size={18} />} title="Valeur clinique">
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.65 }}>{test.clinicalValue}</p>
        </Section>
      )}

      {/* Algorithme décisionnel */}
      {test.decisionAlgorithm && (
        <Section icon={<Target size={18} />} title="Aide à la décision">
          <div
            style={{
              padding: '1rem',
              background: 'var(--primary-light)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              lineHeight: 1.6,
            }}
          >
            {test.decisionAlgorithm}
          </div>
        </Section>
      )}

      {/* Questions cliniques */}
      {meta?.clinicalQuestions && meta.clinicalQuestions.length > 0 && (
        <Section icon={<Lightbulb size={18} />} title="Questions cliniques auxquelles ce test répond">
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {meta.clinicalQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Méthodologie / propriétés psychométriques */}
      {meta?.psychometrics && (
        <Section icon={<Activity size={18} />} title="Propriétés psychométriques">
          <PsychometricsTable p={meta.psychometrics} />
        </Section>
      )}

      {/* Interventions thérapeutiques */}
      {test.therapeuticInterventions && (
        <Section icon={<ListChecks size={18} />} title="Interventions thérapeutiques associées">
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {test.therapeuticInterventions.exercises.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Exercices
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  {test.therapeuticInterventions.exercises.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {test.therapeuticInterventions.education.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Éducation
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  {test.therapeuticInterventions.education.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Langues */}
      <Section icon={<Globe size={18} />} title="Langues de validation">
        {meta?.languages && meta.languages.length > 0 ? (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {meta.languages.map((l) => (
              <span
                key={l}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: 'var(--surface-hover)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        ) : (
          <NotProvided>Langues non renseignées.</NotProvided>
        )}
      </Section>

      {/* Vidéo */}
      <Section icon={<Video size={18} />} title="Tutoriel vidéo">
        {meta?.youtubeUrl ? (
          <a
            href={meta.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Voir la vidéo <ExternalLink size={14} />
          </a>
        ) : (
          <NotProvided>Aucune vidéo renseignée. Vous pourrez en ajouter une depuis la fiche praticien (à venir).</NotProvided>
        )}
      </Section>

      {/* Références */}
      <Section icon={<BookOpen size={18} />} title="Références scientifiques">
        {test.references && test.references.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
            {test.references.map((r, i) => (
              <li key={i}>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      lineHeight: 1.5,
                    }}
                  >
                    {r.title} <ExternalLink size={13} />
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-primary)' }}>{r.title}</span>
                )}
                <span style={{ marginLeft: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  ({r.type === 'methodology' ? 'méthodologie' : 'article scientifique'})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <NotProvided>Aucune référence renseignée.</NotProvided>
        )}
      </Section>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <h3
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
        }}
      >
        <span style={{ color: 'var(--primary)', display: 'flex' }}>{icon}</span>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Badge({
  children,
  icon,
  color,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color: 'success' | 'default' | 'primary';
}) {
  const styles = {
    success: { bg: '#DCFCE7', fg: '#166534' },
    default: { bg: 'var(--surface-hover)', fg: 'var(--text-secondary)' },
    primary: { bg: 'var(--primary-light)', fg: 'white' },
  }[color];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.65rem',
        background: styles.bg,
        color: styles.fg,
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

function NotProvided({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontStyle: 'italic',
      }}
    >
      <AlertCircle size={14} /> {children}
    </div>
  );
}

function PsychometricsTable({ p }: { p: NonNullable<ReturnType<typeof getMeta>>['psychometrics'] }) {
  if (!p) return null;
  const rows: { label: string; value?: string }[] = [
    { label: 'Cohérence interne', value: p.internalConsistency },
    { label: 'Test-retest (fiabilité)', value: p.testRetest },
    { label: 'MCID (différence cliniquement importante)', value: p.mcid },
    { label: 'Validité', value: p.validity },
    { label: 'Sensibilité au changement', value: p.sensitivity },
    { label: 'Populations validées', value: p.populations },
  ].filter((r) => r.value);

  if (rows.length === 0) return <NotProvided>Données psychométriques non renseignées.</NotProvided>;

  return (
    <div
      style={{
        background: 'var(--surface-hover)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 240px) 1fr',
            padding: '0.75rem 1rem',
            borderTop: i > 0 ? '1px solid var(--border)' : 'none',
            background: i % 2 === 0 ? 'var(--surface-hover)' : 'var(--surface)',
            gap: '1rem',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{r.label}</div>
          <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{r.value}</div>
        </div>
      ))}
    </div>
  );
}
