'use client';

import React, { useState } from 'react';
import styles from './PractitionerDashboard.module.css';
import { UserCircle, Activity, ChevronRight, Stethoscope, BrainCircuit, CheckCircle2, Send, History } from 'lucide-react';
import Link from 'next/link';

const ANATOMY_REGIONS = [
  { id: 'LUMBAR', label: 'Dos (Lombaire)', icon: '🧍' },
  { id: 'CERVICAL', label: 'Cou (Cervicale)', icon: '👤' },
  { id: 'SHOULDER', label: 'Épaule / Bras', icon: '💪' },
  { id: 'KNEE', label: 'Genou / Hanche', icon: '🦵' },
];

const QUESTIONNAIRES = {
  'LUMBAR': [
    { name: 'ODI (Oswestry)', intent: 'Évaluer l\'incapacité fonctionnelle' },
    { name: 'STarT Back', intent: 'Dépister le risque de chronicité' }
  ],
  'CERVICAL': [
    { name: 'NDI (Neck Disability)', intent: 'Impact sur la vie quotidienne' }
  ],
  'SHOULDER': [
    { name: 'DASH / SPADI', intent: 'Limitation membre supérieur' }
  ],
  'KNEE': [
    { name: 'KOOS / HOOS', intent: 'Gêne fonctionnelle articulaire' }
  ],
  'GLOBAL': [
    { name: 'TAMPA', intent: 'Kinésiophobie (Peur du mouvement)' },
    { name: 'HAD-S', intent: 'Évaluation anxio-dépressive' }
  ]
};

export default function PractitionerDashboard() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [triageStep, setTriageStep] = useState(0);

  const handleRegionClick = (id: string) => {
    setActiveRegion(id);
    setTriageStep(0); // Reset triage when changing region
  };

  const getRecommendations = () => {
    let recs: Array<{name: string, intent: string}> = [];
    if (activeRegion) {
      recs = [...(QUESTIONNAIRES[activeRegion as keyof typeof QUESTIONNAIRES] || [])];
    }
    // If triage advanced, add global questionnaires
    if (triageStep > 0) {
      recs.push(QUESTIONNAIRES['GLOBAL'][0]); // TAMPA
      if (triageStep === 1) {
          recs.push(QUESTIONNAIRES['GLOBAL'][1]); // HADS
      }
    }
    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className={`${styles.container} animate-slide-up`}>
      <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
        <div>
            <h2 className={styles.title}>Mode Expert Praticien</h2>
            <p className={styles.subtitle}>Sélection du parcours d'évaluation clinique</p>
        </div>
        <Link 
            href="/practitioner/patient-history"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--primary)',
                fontWeight: 600,
                textDecoration: 'none'
            }}
        >
            <History size={20} />
            Dossier Patient
        </Link>
      </header>

      <div className={styles.grid}>
        
        {/* Anatomical Selection */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Activity className="w-5 h-5 text-[var(--primary)]" />
            1. Ciblage Anatomique
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

        {/* Clinical Triage */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <BrainCircuit className="w-5 h-5 text-[var(--primary)]" />
            2. Triage Rapide
          </h3>
          
          <div className={styles.treeOptions}>
            <div className={styles.treeQuestion}>
              Avez-vous repéré des signes d'évitement ou de peur du mouvement chez ce patient ?
            </div>
            <button 
              className={styles.treeOptionBtn} 
              onClick={() => setTriageStep(1)}
              style={triageStep === 1 ? { borderColor: 'var(--primary)', background: 'var(--surface-hover)' } : {}}
            >
              Oui, suspicion de kinésiophobie
              <ChevronRight size={18} />
            </button>
            <button 
              className={styles.treeOptionBtn}
              onClick={() => setTriageStep(2)}
              style={triageStep === 2 ? { borderColor: 'var(--primary)', background: 'var(--surface-hover)' } : {}}
            >
              Non, pas d'évitement marqué
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Recommendation Engine (pops up when region or triage selected) */}
        {(activeRegion || triageStep > 0) && (
          <div className={`${styles.recommendationPanel} animate-slide-up`}>
            <div className={styles.recHeader}>
              <Stethoscope size={28} />
              Recommandations Cliniques (IA)
            </div>
            
            <div className={styles.recList}>
              {recommendations.map((rec, idx) => (
                <div key={idx} className={styles.recItem}>
                  <div className={styles.recInfo}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={20} color="var(--secondary-light)" />
                      {rec.name}
                    </h4>
                    <p>{rec.intent}</p>
                  </div>
                  <button className={styles.sendBtn} title="Envoyer au patient">
                    <Send size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
