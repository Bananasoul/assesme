'use client';

import React from 'react';
import styles from './PatientDashboard.module.css';
import { Activity, Award, Calendar, TrendingUp, Lock, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { QUESTIONNAIRES } from '@/data/questionnaires';

export default function PatientDashboard({ score }: { score?: number }) {
  // Use real data if provided, otherwise 0
  const progressScore = score !== undefined ? score : 0;
  
  return (
    <div className={`${styles.dashboard} animate-slide-up`}>
      <header className={styles.header}>
        <h2 className={styles.title}>Mon Suivi Fonctionnel</h2>
        <p className={styles.subtitle}>Super, vous êtes sur la bonne voie !</p>
      </header>

      <div className={styles.grid}>
        
        {/* Questionnaire List Section */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <h3 className={styles.cardTitle}>
            <FileText className="w-5 h-5 text-[var(--primary)]" />
            Mes Bilans à Remplir
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            Votre praticien vous demande de compléter ces évaluations pour mieux adapter votre traitement.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {Object.values(QUESTIONNAIRES).map(q => (
              <Link 
                key={q.id}
                href={`/questionnaire/${q.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  padding: '1.25rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.title}</span>
                  <ArrowRight size={18} color="var(--primary)" />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>⏱ {q.estimatedTime}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Current Score Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Activity className="w-5 h-5 text-[var(--primary)]" />
            Capacité Actuelle
          </h3>
          <div className={styles.progressCircleContainer}>
            {/* Simple SVG Circle Progress */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--surface-hover)" strokeWidth="10" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="var(--secondary)" 
                strokeWidth="10" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * progressScore) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className={styles.progressValue}>
              {progressScore}%
              <span className={styles.progressLabel}>Mobilité</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
            +15% depuis le dernier bilan (T1)
          </p>
        </div>

        {/* Evolution Timeline Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
            Évolution dans le temps
          </h3>
          <div className={styles.timeline}>
            <div className={styles.timelineStep}>
              <div className={`${styles.timelineDot} ${styles.success}`}></div>
              <span className={styles.timelineLabel}>Bilan Initial</span>
              <span className={styles.timelineScore}>45%</span>
            </div>
            <div className={styles.timelineStep}>
              <div className={`${styles.timelineDot} ${styles.active}`}></div>
              <span className={styles.timelineLabel}>T1 (Mi-parcours)</span>
              <span className={styles.timelineScore}>63%</span>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.timelineDot}></div>
              <span className={styles.timelineLabel}>T2 (Final)</span>
              <span className={styles.timelineScore}>--</span>
            </div>
          </div>
        </div>

        {/* Achievements / Badges Card */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <h3 className={styles.cardTitle}>
            <Award className="w-5 h-5 text-[var(--primary)]" />
            Succès Fonctionnels
          </h3>
          <div className={styles.badgesContainer}>
            
            <div className={styles.badge}>
              <div className={`${styles.badgeIcon} ${styles.unlocked}`}>
                <Calendar size={24} />
              </div>
              <span className={styles.badgeLabel}>1er Bilan</span>
              <span className={styles.badgeDate}>Débloqué le 12/03</span>
            </div>

            <div className={styles.badge}>
              <div className={`${styles.badgeIcon} ${styles.unlocked}`}>
                <TrendingUp size={24} />
              </div>
              <span className={styles.badgeLabel}>Progression</span>
              <span className={styles.badgeDate}>Débloqué le 26/03</span>
            </div>

            <div className={styles.badge}>
              <div className={`${styles.badgeIcon} ${styles.locked}`}>
                <Lock size={24} />
              </div>
              <span className={styles.badgeLabel}>Pleine Mobilité</span>
              <span className={styles.badgeDate}>À venir</span>
            </div>

            <div className={styles.badge}>
              <div className={`${styles.badgeIcon} ${styles.locked}`}>
                <Lock size={24} />
              </div>
              <span className={styles.badgeLabel}>Sans Douleur</span>
              <span className={styles.badgeDate}>À venir</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
