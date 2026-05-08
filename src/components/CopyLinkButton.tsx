'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

type Props = {
  link: string;
};

export default function CopyLinkButton({ link }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const absoluteLink = link.startsWith('http') ? link : `${window.location.origin}${link}`;
    navigator.clipboard.writeText(absoluteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {copied ? <Check size={16} /> : <LinkIcon size={16} />}
      {copied ? 'Copié !' : 'Copier le lien'}
    </button>
  );
}
