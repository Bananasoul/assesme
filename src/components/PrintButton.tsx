'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--primary)',
        color: 'var(--text-inverse)',
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <Printer size={20} />
      Exporter PDF
    </button>
  );
}
