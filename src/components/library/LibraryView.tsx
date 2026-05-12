'use client';

import React, { useMemo, useState } from 'react';
import { questionnaires, QuestionnaireDef } from '@/data/questionnaires';
import { QUESTIONNAIRE_META, BODY_PART_LABELS, BodyPartKey, getMeta } from '@/data/questionnaires-meta';
import BodyChart from './BodyChart';
import TestDetailPanel from './TestDetailPanel';
import { ClipboardList, HelpCircle, FileText, ChevronRight } from 'lucide-react';

type Tab = 'tests' | 'questions' | 'detail';

export type PatientContext = {
  patientId: string;
  recordId: string;
  patientName: string;
};

export default function LibraryView({ patientContext = null }: { patientContext?: PatientContext | null }) {
  const [zone, setZone] = useState<BodyPartKey | null>('lumbar');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('tests');

  const filteredTests = useMemo<QuestionnaireDef[]>(() => {
    if (!zone) return [];
    return questionnaires.filter((q) => {
      const meta = QUESTIONNAIRE_META[q.id];
      return meta?.bodyParts.includes(zone);
    });
  }, [zone]);

  const aggregatedQuestions = useMemo<{ test: QuestionnaireDef; questions: string[] }[]>(() => {
    return filteredTests
      .map((t) => ({ test: t, questions: getMeta(t.id)?.clinicalQuestions ?? [] }))
      .filter((x) => x.questions.length > 0);
  }, [filteredTests]);

  const selectedTest = selectedTestId ? questionnaires.find((q) => q.id === selectedTestId) ?? null : null;

  const handleZone = (z: BodyPartKey) => {
    setZone(z);
    setSelectedTestId(null);
    setTab('tests');
  };

  const handleSelectTest = (id: string) => {
    setSelectedTestId(id);
    setTab('detail');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 380px) 1fr',
        gap: '2rem',
        alignItems: 'start',
      }}
      className="library-grid"
    >
      <style>{`
        @media (max-width: 768px) {
          .library-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ---- Panneau gauche : Body chart ---- */}
      <div
        style={{
          background: 'var(--surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          position: 'sticky',
          top: '1rem',
        }}
      >
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
          Sélectionnez une zone
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textAlign: 'center' }}>
          Cliquez sur une partie du corps pour voir les tests associés.
        </p>
        <BodyChart selected={zone} onSelect={handleZone} />
        {zone && (
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'var(--primary-light)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Zone : {BODY_PART_LABELS[zone]}
          </div>
        )}
      </div>

      {/* ---- Panneau droit : Onglets ---- */}
      <div>
        {/* Tabs header */}
        <div
          role="tablist"
          style={{
            display: 'flex',
            gap: '0.25rem',
            background: 'var(--surface-hover)',
            borderRadius: 'var(--radius-full)',
            padding: '0.25rem',
            marginBottom: '1.25rem',
            width: 'fit-content',
            maxWidth: '100%',
            flexWrap: 'wrap',
          }}
        >
          <TabButton
            active={tab === 'tests'}
            icon={<ClipboardList size={16} />}
            label={`Tests${filteredTests.length ? ` (${filteredTests.length})` : ''}`}
            onClick={() => setTab('tests')}
          />
          <TabButton
            active={tab === 'questions'}
            icon={<HelpCircle size={16} />}
            label="Questions cliniques"
            onClick={() => setTab('questions')}
          />
          <TabButton
            active={tab === 'detail'}
            icon={<FileText size={16} />}
            label="Détails"
            onClick={() => setTab('detail')}
            disabled={!selectedTest}
          />
        </div>

        {/* Tab content */}
        {tab === 'tests' && (
          <TabPanel>
            {filteredTests.length === 0 ? (
              <Empty>Aucun test associé à cette zone pour le moment.</Empty>
            ) : (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {filteredTests.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTest(t.id)}
                    style={{
                      textAlign: 'left',
                      padding: '1rem 1.25rem',
                      background: 'var(--surface)',
                      border: `1px solid ${selectedTestId === t.id ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.description}</div>
                      <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {(getMeta(t.id)?.bodyParts ?? []).map((bp) => (
                          <span
                            key={bp}
                            style={{
                              padding: '0.15rem 0.5rem',
                              background: 'var(--surface-hover)',
                              color: 'var(--text-secondary)',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                            }}
                          >
                            {BODY_PART_LABELS[bp]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={18} color="var(--text-secondary)" />
                  </button>
                ))}
              </div>
            )}
          </TabPanel>
        )}

        {tab === 'questions' && (
          <TabPanel>
            {aggregatedQuestions.length === 0 ? (
              <Empty>Aucune question clinique renseignée pour cette zone.</Empty>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {aggregatedQuestions.map(({ test, questions }) => (
                  <div
                    key={test.id}
                    style={{
                      padding: '1.25rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{test.title}</h4>
                      <button
                        onClick={() => handleSelectTest(test.id)}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--primary)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Voir le détail →
                      </button>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {questions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
        )}

        {tab === 'detail' && (
          <TabPanel>
            {selectedTest ? (
              <TestDetailPanel test={selectedTest} patientContext={patientContext} />
            ) : (
              <Empty>Sélectionnez un test pour voir ses détails.</Empty>
            )}
          </TabPanel>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
  disabled,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: active ? 'var(--surface)' : 'transparent',
        color: disabled ? 'var(--text-secondary)' : active ? 'var(--primary)' : 'var(--text-secondary)',
        fontWeight: active ? 700 : 500,
        fontSize: '0.85rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        boxShadow: active ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.15s',
      }}
    >
      {icon} {label}
    </button>
  );
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return <div role="tabpanel">{children}</div>;
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border)',
      }}
    >
      {children}
    </div>
  );
}
