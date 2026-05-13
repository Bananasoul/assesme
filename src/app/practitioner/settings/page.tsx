import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity } from 'lucide-react';
import { saveProfile } from './actions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid #E5E7EB',
  background: 'white',
  fontSize: '0.95rem',
  color: '#0E1217',
  fontFamily: 'inherit',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#9CA3AF',
  marginBottom: '0.5rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/practitioner/login');
  }

  const profile = await prisma.practitionerProfile.findUnique({
    where: { practitionerId: user.id },
  });

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/practitioner" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>PARAMÈTRES</span>
            </div>
          </Link>
          <Link
            href="/practitioner"
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
            Tableau de bord
          </Link>
        </div>
      </header>

      <section style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        <div className="elx-fade-up" style={{ marginBottom: '2.5rem' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: '0.6rem',
            }}
          >
            Cabinet
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: '#0E1217',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Paramètres du cabinet.
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: 1.55, marginTop: '0.75rem', maxWidth: '560px' }}>
            Ces informations apparaîtront sur les courriers PDF générés depuis vos bilans.
          </p>
        </div>

        <form
          className="elx-fade-up elx-delay-1"
          action={async (formData) => {
            'use server';
            await saveProfile(formData);
          }}
          style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Prénom *</label>
              <input type="text" name="firstName" defaultValue={profile?.firstName || ''} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nom *</label>
              <input type="text" name="lastName" defaultValue={profile?.lastName || ''} required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Titre professionnel</label>
            <input
              type="text"
              name="title"
              placeholder="ex : Masseur-Kinésithérapeute D.E."
              defaultValue={profile?.title || ''}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Numéro INAMI / RPPS</label>
            <input type="text" name="inamiNumber" defaultValue={profile?.inamiNumber || ''} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Adresse du cabinet</label>
            <textarea
              name="address"
              defaultValue={profile?.address || ''}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Téléphone</label>
              <input type="tel" name="phone" defaultValue={profile?.phone || ''} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email de contact</label>
              <input type="email" name="email" defaultValue={profile?.email || user.email || ''} style={inputStyle} />
            </div>
          </div>

          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1.05rem 1.75rem',
              background: '#0E1217',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              alignSelf: 'flex-start',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Enregistrer <ArrowRight size={15} strokeWidth={2.4} />
          </button>
        </form>
      </section>
    </main>
  );
}
