'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { QUESTIONNAIRES } from '../data/questionnaires';

type Assessment = {
  id: string;
  timestamp: Date;
  timelineAnchor: string;
  questionnaires: {
    type: string;
    score: number;
    maxScore: number;
  }[];
};

type Props = {
  assessments: Assessment[];
};

export default function EvolutionChart({ assessments }: Props) {
  // Grouper les données par type de questionnaire
  const chartDataByType = useMemo(() => {
    const dataByType: Record<string, any[]> = {};

    // Sort by timestamp asc for the chart (left to right)
    const sortedAssessments = [...assessments].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    sortedAssessments.forEach(assessment => {
      const dateStr = new Date(assessment.timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
      
      assessment.questionnaires.forEach(q => {
        if (!dataByType[q.type]) {
          dataByType[q.type] = [];
        }
        
        const previousDataForType = dataByType[q.type].length > 0 ? dataByType[q.type][dataByType[q.type].length - 1] : null;
        let diff = null;
        let isSignificant = false;
        let isImprovement = false;
        
        // Lookup questionnaire def
        const def = QUESTIONNAIRES[q.type.toLowerCase()];
        
        if (previousDataForType) {
           diff = q.score - previousDataForType.score;
           if (def && def.mcid) {
              if (Math.abs(diff) >= def.mcid) {
                 isSignificant = true;
                 if (def.higherIsBetter) {
                    isImprovement = diff > 0;
                 } else {
                    isImprovement = diff < 0; // lower score is better
                 }
              }
           }
        }

        dataByType[q.type].push({
          date: dateStr,
          anchor: assessment.timelineAnchor,
          score: q.score,
          maxScore: q.maxScore,
          fullDate: new Date(assessment.timestamp).toLocaleString('fr-FR'),
          diff,
          isSignificant,
          isImprovement,
          mcid: def?.mcid
        });
      });
    });

    return dataByType;
  }, [assessments]);

  const types = Object.keys(chartDataByType);

  if (types.length === 0) {
    return null;
  }

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: 'var(--surface)', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{data.anchor}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{data.fullDate}</p>
          <div style={{ display: 'flex', alignItems: 'end', gap: '0.25rem', marginBottom: data.diff !== null ? '0.5rem' : '0' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: payload[0].color, lineHeight: 1 }}>{data.score}</span>
            <span style={{ color: 'var(--text-secondary)', paddingBottom: '2px' }}>/ {data.maxScore}</span>
          </div>
          
          {data.diff !== null && data.mcid && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'inline-block',
              backgroundColor: data.isSignificant 
                ? (data.isImprovement ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                : 'rgba(156, 163, 175, 0.1)',
              color: data.isSignificant 
                ? (data.isImprovement ? '#16a34a' : '#dc2626')
                : '#6b7280'
            }}>
              {data.isSignificant ? (
                data.isImprovement ? `🟢 Amélioration Clinique (${data.diff > 0 ? '+' : ''}${data.diff} pts)` : `🔴 Dégradation Clinique (${data.diff > 0 ? '+' : ''}${data.diff} pts)`
              ) : (
                `⚪ Non significatif (${data.diff > 0 ? '+' : ''}${data.diff} pts)`
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {types.map(type => {
        const data = chartDataByType[type];
        const maxScoreForType = data[0]?.maxScore || 100;
        
        // Define colors based on type (just to make it look nice)
        const color = type === 'ODI' ? '#3b82f6' : type === 'TAMPA' ? '#ec4899' : 'var(--primary)';

        return (
          <div key={type} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
              Évolution du score {type}
            </h3>
            
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--border)' }}
                    dy={10}
                  />
                  <YAxis 
                    domain={[0, maxScoreForType]} 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={color} 
                    strokeWidth={3}
                    dot={{ r: 5, fill: color, strokeWidth: 2, stroke: 'var(--surface)' }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Résumé des évolutions cliniques */}
            {data.some(d => d.diff !== null) && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Alertes Cliniques MCID</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[...data].filter(d => d.diff !== null).reverse().map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{d.date}</span>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{d.anchor}</span>
                      </div>
                      <div style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: d.isSignificant 
                          ? (d.isImprovement ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                          : 'rgba(156, 163, 175, 0.1)',
                        color: d.isSignificant 
                          ? (d.isImprovement ? '#16a34a' : '#dc2626')
                          : '#6b7280'
                      }}>
                        {d.isSignificant ? (
                          d.isImprovement ? `🟢 Amélioration (${d.diff > 0 ? '+' : ''}${d.diff} pts)` : `🔴 Dégradation (${d.diff > 0 ? '+' : ''}${d.diff} pts)`
                        ) : (
                          `⚪ Non significatif (${d.diff > 0 ? '+' : ''}${d.diff} pts)`
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
