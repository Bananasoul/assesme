'use client';

import React, { useState } from 'react';
import styles from './PractitionerDashboard.module.css';
import { Activity, ChevronRight, Stethoscope, BrainCircuit, CheckCircle2, ClipboardList, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { QUESTIONNAIRES } from '@/data/questionnaires';

const ANATOMY_REGIONS = [
  { id: 'Lombaire', label: 'Dos (Lombaire)', icon: '🧍', tags: ['Lombaire', 'Orthopédique'] },
  { id: 'Cervical', label: 'Cou (Cervicale)', icon: '👤', tags: ['Cervical', 'Orthopédique'] },
  { id: 'Épaule', label: 'Épaule / Bras', icon: '💪', tags: ['Épaule', 'Membre Supérieur', 'Orthopédique'] },
  { id: 'Genou', label: 'Genou / Hanche', icon: '🦵', tags: ['Genou', 'Hanche', 'Membre Inférieur', 'Orthopédique'] },
  { id: 'Neurologique', label: 'Neurologique', icon: '🧠', tags: ['Neurologique'] },
  { id: 'Général', label: 'Général / Psycho', icon: '🎯', tags: ['Général', 'Psychologique', 'Fonctionnel'] },
];

export default function PractitionerDashboard() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const handleRegionClick = (id: string) => {
    setActiveRegion(id === activeRegion ? null : id);
    setExpandedTest(null);
  };

  // Filter questionnaires dynamically from the real QUESTIONNAIRES data
  const getRecommendations = () => {
    if (!activeRegion) return [];
    const region = ANATOMY_REGIONS.find(r => r.id === activeRegion);
    if (!region) return [];
    
    return Object.values(QUESTIONNAIRES).filter(q => 
      q.tags?.some(tag => region.tags.includes(tag))
    );
  };

  const recommendations = getRecommendations();

  return (
    <div className={`${styles.container} animate-slide-up`}>
      <header className={styles.header} style={{ textAlign: 'left' }}>
        <h2 className={styles.title}>Aide à la Décision Clinique</h2>
        <p className={styles.subtitle}>Sélectionnez la région pour voir les tests recommandés et leur algorithme de décision</p>
      </header>

      <div className={styles.grid}>
        
        {/* Anatomical Selection */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Activity size={20} color="var(--primary)" />
            Ciblage Anatomique / Clinique
          </h3>
          <div className={styles.anatomyGrid}>
            {ANATOMY_REGIONS.map(region => (
              <button
                key={region.id}
                className={`${styles.anatomyBtn} ${activeRegion === region.id ? styles.active : ''}`}
                onClick={() => handleRegionClick(region.id)}
              >
                <span>{region.icon}</span>
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations - dynamically populated */}
        {activeRegion && (
          <div className={`${styles.recommendationPanel} animate-slide-up`}>
            <div className={styles.recHeader}>
              <Stethoscope size={24} />
              {recommendations.length} test(s) recommandé(s) pour « {ANATOMY_REGIONS.find(r => r.id === activeRegion)?.label} »
            </div>
            
            {recommendations.length === 0 ? (
              <p style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Aucun test trouvé pour cette région.</p>
            ) : (
              <div className={styles.recList}>
                {recommendations.map((q) => (
                  <div key={q.id} style={{ marginBottom: '0.5rem' }}>
                    {/* Test Summary Row */}
                    <div 
                      className={styles.recItem}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedTest(expandedTest === q.id ? null : q.id)}
                    >
                      <div className={styles.recInfo}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={18} color="var(--secondary-light)" />
                          {q.title}
                          <span style={{ 
                            fontSize: '0.65rem', 
                            padding: '0.1rem 0.4rem', 
                            borderRadius: 'var(--radius-full)', 
                            fontWeight: 600,
                            background: q.administrationType === 'auto' ? '#E0E7FF' : '#FEF3C7',
                            color: q.administrationType === 'auto' ? '#3730A3' : '#92400E',
                            marginLeft: '0.25rem'
                          }}>
                            {q.administrationType === 'auto' ? 'Auto' : q.administrationType === 'therapist' ? 'Thér.' : 'Mixte'}
                          </span>
                        </h4>
                        <p style={{ fontSize: '0.8rem', margin: '0.25rem 0 0 0', lineHeight: 1.4 }}>
                          {q.clinicalValue || q.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {expandedTest === q.id ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                      </div>
                    </div>

                    {/* Expanded Decision Details */}
                    {expandedTest === q.id && (
                      <div style={{ 
                        padding: '1rem 1.5rem', 
                        background: 'var(--background)', 
                        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        animation: 'fadeIn 0.2s ease'
                      }}>
                        {/* Decision Algorithm */}
                        {q.decisionAlgorithm && (
                          <div style={{ background: '#FEF3C7', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #F59E0B' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#92400E', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                              🧭 Algorithme de Décision
                            </span>
                            <p style={{ fontSize: '0.8rem', color: '#78350F', margin: 0, lineHeight: 1.5 }}>
                              {q.decisionAlgorithm}
                            </p>
                          </div>
                        )}

                        {/* Therapeutic Interventions */}
                        {q.therapeuticInterventions && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                              <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                💪 Exercices Recommandés
                              </span>
                              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                {q.therapeuticInterventions.exercises.map((ex, i) => <li key={i}>{ex}</li>)}
                              </ul>
                            </div>
                            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                              <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                📚 Éducation Thérapeutique
                              </span>
                              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                {q.therapeuticInterventions.education.map((ed, i) => <li key={i}>{ed}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* References */}
                        {q.references && q.references.length > 0 && (
                          <div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                              📎 Références Scientifiques
                            </span>
                            <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1rem', fontSize: '0.75rem' }}>
                              {q.references.map((ref, i) => (
                                <li key={i}>
                                  {ref.url ? (
                                    <a href={ref.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>{ref.title}</a>
                                  ) : ref.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
