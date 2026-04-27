'use client';

import React, { useState, useTransition } from 'react';
import { Lock, Calendar } from 'lucide-react';
import { unlockPortal } from '@/app/portal/[recordId]/actions';

export default function PortalUnlockForm({ recordId }: { recordId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);

    startTransition(async () => {
      const result = await unlockPortal(recordId, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        // Page will refresh automatically because the cookie is set
        window.location.reload();
      }
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--primary-light)', color: 'white', borderRadius: '50%', marginBottom: '1.5rem' }}>
        <Lock size={32} />
      </div>
      
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Espace Sécurisé</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Veuillez saisir votre date de naissance pour accéder à votre dossier de kinésithérapie.
      </p>

      {error && (
        <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Date de naissance
          </label>
          <div style={{ position: 'relative' }}>
            <Calendar size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="date" 
              name="dob" 
              required
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          style={{ 
            width: '100%',
            padding: '0.875rem', 
            background: 'var(--primary)', 
            color: 'var(--surface)', 
            borderRadius: 'var(--radius-full)', 
            fontWeight: 600,
            marginTop: '1rem',
            opacity: isPending ? 0.7 : 1
          }}
        >
          {isPending ? 'Vérification...' : 'Déverrouiller mon dossier'}
        </button>
      </form>
    </div>
  );
}
