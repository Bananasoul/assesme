'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Check, Copy } from 'lucide-react';

type Props = {
  link: string;
};

export default function CopyLinkButton({ link }: Props) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    const absoluteLink = link.startsWith('http') ? link : `${window.location.origin}${link}`;
    
    try {
      await navigator.clipboard.writeText(absoluteLink);
    } catch {
      // Fallback for non-HTTPS contexts
      const textArea = document.createElement('textarea');
      textArea.value = absoluteLink;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    
    setCopied(true);
    setShowTooltip(true);
    setTimeout(() => {
      setCopied(false);
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleCopy}
        title="Copier le lien pour le patient"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: copied ? '#DCFCE7' : 'var(--surface-hover)',
          color: copied ? '#166534' : 'var(--text-primary)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          fontSize: '0.875rem',
          border: copied ? '1px solid #86EFAC' : '1px solid var(--border)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? '✓ Lien copié !' : 'Copier le lien'}
      </button>

      {showTooltip && (
        <div style={{
          position: 'absolute',
          bottom: '110%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#166534',
          color: 'white',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.75rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          animation: 'fadeIn 0.2s ease',
          zIndex: 50
        }}>
          Lien copié dans le presse-papiers !
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #166534'
          }} />
        </div>
      )}
    </div>
  );
}
