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
              <div className="grid gap-3">
                {filteredTests.map((t) => {
                  const tMeta = getMeta(t.id);
                  const firstQuestion = tMeta?.clinicalQuestions?.[0];
                  const isSelected = selectedTestId === t.id;
                  return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTest(t.id)}
                    className={`group text-left p-5 rounded-2xl bg-white transition-all hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-2 border-indigo-500 shadow-lg shadow-indigo-100'
                        : 'border border-gray-100 hover:border-indigo-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="font-bold text-gray-900 text-base">{t.title}</div>
                      <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-transform ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-gray-400 group-hover:translate-x-0.5 group-hover:text-indigo-500'}`} />
                    </div>
                    {firstQuestion && (
                      <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50/50 border border-indigo-100/50">
                        <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-0.5">Pour savoir</div>
                        <div className="text-sm text-gray-800 leading-snug">{firstQuestion}</div>
                      </div>
                    )}
                    <div className="text-sm text-gray-500 leading-relaxed mb-2">{t.description}</div>
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {(tMeta?.bodyParts ?? []).map((bp) => (
                        <span
                          key={bp}
                          className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 text-[10px] font-semibold"
                        >
                          {BODY_PART_LABELS[bp]}
                        </span>
                      ))}
                      {t.estimatedTime && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-medium">
                          ⏱ {t.estimatedTime}
                        </span>
                      )}
                    </div>
                  </button>
                  );
                })}
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
