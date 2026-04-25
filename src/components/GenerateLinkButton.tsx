'use client';

import { useState } from 'react';
import { Link as LinkIcon, Check, Copy } from 'lucide-react';
import { questionnaires } from '@/data/questionnaires';

type Props = {
  recordId: string;
  patientName: string;
};

export default function GenerateLinkButton({ recordId, patientName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>(questionnaires[0].id);
  const [copied, setCopied] = useState(false);

  // Générer le lien absolu
  const generateUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/fill?recordId=${recordId}&type=${selectedType}&name=${encodeURIComponent(patientName)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="no-print"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'var(--primary)',
          color: 'white',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.2s',
        }}
      >
        <LinkIcon size={18} />
        Envoyer un questionnaire
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.5rem',
          width: '320px',
          zIndex: 50,
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Générer un lien
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Choisir le questionnaire :
            </label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border)',
                background: 'var(--background)'
              }}
            >
              {questionnaires.map(q => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>
          </div>

          <div style={{
            padding: '0.75rem',
            background: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            fontSize: '0.75rem',
            wordBreak: 'break-all',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            maxHeight: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {generateUrl()}
          </div>

          <button 
            onClick={handleCopy}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: copied ? 'var(--success)' : 'var(--primary-light)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Lien copié !' : 'Copier le lien'}
          </button>
        </div>
      )}
    </div>
  );
}
