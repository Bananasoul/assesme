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
        
        dataByType[q.type].push({
          date: dateStr,
          anchor: assessment.timelineAnchor,
          score: q.score,
          maxScore: q.maxScore,
          fullDate: new Date(assessment.timestamp).toLocaleString('fr-FR')
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
          <div style={{ display: 'flex', alignItems: 'end', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: payload[0].color, lineHeight: 1 }}>{data.score}</span>
            <span style={{ color: 'var(--text-secondary)', paddingBottom: '2px' }}>/ {data.maxScore}</span>
          </div>
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
          </div>
        );
      })}
    </div>
  );
}
