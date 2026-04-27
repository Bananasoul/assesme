'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

type Props = {
  recordId: string;
  patientName: string;
};

export default function PortalLinkButton({ recordId, patientName }: Props) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const portalUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/portal/${recordId}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(portalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
          background: 'var(--surface)', 
          color: 'var(--secondary)', 
          border: '1px solid var(--secondary)',
          padding: '0.75rem 1.25rem', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        <Share2 size={20} />
        Accès Patient
      </button>

      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 0.5rem)', 
          right: 0, 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.5rem', 
          width: '320px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 50
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Espace de {patientName}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Partagez ce lien avec votre patient. Il devra utiliser sa date de naissance pour s'y connecter.
          </p>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              readOnly 
              value={portalUrl}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                fontSize: '0.75rem', 
                background: 'var(--background)', 
                border: '1px solid var(--border)', 
                borderRadius: 'var(--radius-md)' 
              }}
            />
            <button 
              onClick={handleCopy}
              style={{ 
                background: copied ? 'var(--secondary)' : 'var(--primary)', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Copier le lien"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
