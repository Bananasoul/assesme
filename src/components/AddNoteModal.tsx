'use client';

import React, { useState, useRef, useTransition } from 'react';
import { Plus, X, FileText } from 'lucide-react';
import { addSessionNote } from '@/app/practitioner/patient-history/notes-actions';

type Props = {
  recordId: string;
};

export default function AddNoteModal({ recordId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setError(null);
    const formData = new FormData(formRef.current);
    
    startTransition(async () => {
      const result = await addSessionNote(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setIsOpen(false);
        if (formRef.current) formRef.current.reset();
      }
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="no-print"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'var(--primary-light)', 
          color: 'var(--primary-dark)', 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        <Plus size={16} />
        Ajouter une note
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="animate-slide-up" style={{ background: 'var(--surface)', width: '100%', maxWidth: '500px', borderRadius: 'var(--radius-lg)', padding: '2rem', position: 'relative' }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <FileText color="var(--primary)" />
              Note de Séance
            </h2>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input type="hidden" name="recordId" value={recordId} />

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Date de la séance *
                </label>
                <input 
                  type="date" 
                  name="date" 
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Notes cliniques *
                </label>
                <textarea 
                  name="content" 
                  required
                  rows={5}
                  placeholder="Déroulement de la séance, évolution des symptômes, techniques utilisées..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  style={{ padding: '0.75rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    background: 'var(--primary)', 
                    color: 'var(--surface)', 
                    borderRadius: 'var(--radius-full)', 
                    fontWeight: 600,
                    opacity: isPending ? 0.7 : 1,
                    cursor: isPending ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isPending ? 'Enregistrement...' : 'Enregistrer la note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
