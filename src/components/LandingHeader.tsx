'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';

export default function LandingHeader() {
  const [open, setOpen] = useState(false);

  // Fermer au scroll ou échappement
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '/practitioner/library', label: 'Bibliothèque' },
    { href: '/practitioner/login', label: 'Espace praticien' },
    { href: '/#approche', label: "L'approche" },
    { href: 'mailto:contact@assesme.app', label: 'Contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 60,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(10px)',
          WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          borderBottom: '1px solid rgba(14,18,23,0.06)',
        }}
      >
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
          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0E1217',
            }}
          >
            {open ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      {/* Panneau plein écran sous le header */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 55,
            background: 'rgba(14,18,23,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 'calc(env(safe-area-inset-top, 0px) + 4.6rem)',
              left: 0,
              right: 0,
              background: 'white',
              padding: '2.5rem 2rem 3rem',
              borderBottom: '1px solid rgba(14,18,23,0.06)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              maxWidth: '1280px',
              margin: '0 auto',
              animation: 'elxFadeUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#0E1217',
                  textDecoration: 'none',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid #F3F4F6',
                  transition: 'padding-left 0.25s ease, color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '0.75rem';
                  e.currentTarget.style.color = '#4B5563';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.color = '#0E1217';
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
