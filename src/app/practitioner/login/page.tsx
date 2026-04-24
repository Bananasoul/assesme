'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Lock, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '1rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', textAlign: 'center', position: 'relative' }}>
        
        <Link 
          href="/" 
          style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
        >
          &larr; Accueil
        </Link>

        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', background: 'var(--primary-light)', color: 'var(--surface)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <Stethoscope size={32} />
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Mode Expert
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Veuillez saisir votre code d'accès professionnel.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Lock size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              name="pin"
              placeholder="Code PIN"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--background)',
                fontSize: '1rem',
                outline: 'none',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {state?.error && (
            <div style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 500, textAlign: 'left' }}>
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              color: 'var(--text-inverse)',
              fontWeight: 600,
              fontSize: '1rem',
              marginTop: '1rem',
              opacity: pending ? 0.7 : 1
            }}
          >
            {pending ? 'Connexion...' : 'Accéder au dossier'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Pour la démo, le code est : <strong>KINE2024</strong>
        </p>
      </div>
    </main>
  );
}
