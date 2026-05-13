'use client';

import { useActionState, useState } from 'react';
import { loginAction, signupAction } from './actions';
import { Activity, ArrowLeft, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, null);
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, null);

  const pending = isLogin ? loginPending : signupPending;
  const state = isLogin ? loginState : signupState;
  const action = isLogin ? loginFormAction : signupFormAction;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.95rem 1rem 0.95rem 2.85rem',
    borderRadius: '0.85rem',
    border: '1px solid #E5E7EB',
    background: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    color: '#0E1217',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
  };

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header minimal cohérent avec la landing */}
      <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>CLINIQUE</span>
            </div>
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0E1217',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Accueil
          </Link>
        </div>
      </header>

      <section
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
        }}
      >
        <div className="elx-fade-up" style={{ width: '100%', maxWidth: '420px' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Espace praticien
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#0E1217',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {isLogin ? 'Bienvenue.' : 'Créer un compte.'}
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: '#6B7280',
              textAlign: 'center',
              margin: '0.75rem 0 2.5rem',
              lineHeight: 1.55,
            }}
          >
            {isLogin
              ? 'Connectez-vous pour accéder à vos bilans.'
              : 'Quelques secondes pour commencer à mesurer.'}
          </p>

          <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                color="#9CA3AF"
                strokeWidth={2}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input type="email" name="email" placeholder="Email professionnel" required style={inputStyle} />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                color="#9CA3AF"
                strokeWidth={2}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input type="password" name="password" placeholder="Mot de passe" required style={inputStyle} />
            </div>

            {state?.error && (
              <div
                style={{
                  color: '#0E1217',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  padding: '0.6rem 0.85rem',
                  background: '#F3F4F6',
                  borderRadius: '0.6rem',
                  border: '1px solid #E5E7EB',
                }}
              >
                ⚠ {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '9999px',
                background: '#0E1217',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
                opacity: pending ? 0.6 : 1,
                cursor: pending ? 'wait' : 'pointer',
                border: 'none',
                fontFamily: 'inherit',
                transition: 'background 0.25s ease',
              }}
            >
              {pending ? 'Chargement…' : isLogin ? 'Se connecter' : 'Créer le compte'}
            </button>
          </form>

          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.9rem',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            {isLogin ? "Pas encore de compte ?" : 'Vous avez déjà un compte ?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                color: '#0E1217',
                fontWeight: 700,
                marginLeft: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>

          <p
            style={{
              marginTop: '3rem',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              textAlign: 'center',
            }}
          >
            Sécurisé · Supabase Auth
          </p>
        </div>
      </section>
    </main>
  );
}
