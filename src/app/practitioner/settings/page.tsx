import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft, Save, Building2, User } from 'lucide-react';
import { saveProfile } from './actions';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/practitioner/login');
  }

  const profile = await prisma.practitionerProfile.findUnique({
    where: { practitionerId: user.id }
  });

  return (
    <main style={{ padding: '2rem 1rem', background: 'var(--background)', minHeight: '100vh' }}>
      <nav style={{ maxWidth: '800px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'flex-start' }}>
        <Link 
          href="/practitioner" 
          style={{ 
            color: 'var(--text-secondary)', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)'
          }}
        >
          <ChevronLeft size={20} />
          Retour au mode Praticien
        </Link>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.2 }}>Paramètres du Cabinet</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Ces informations apparaîtront sur les courriers PDF.</p>
          </div>
        </div>

        <form action={async (formData) => {
          'use server';
          await saveProfile(formData);
        }} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Prénom *</label>
              <input 
                type="text" 
                name="firstName" 
                defaultValue={profile?.firstName || ''}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Nom *</label>
              <input 
                type="text" 
                name="lastName" 
                defaultValue={profile?.lastName || ''}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Titre professionnel</label>
            <input 
              type="text" 
              name="title" 
              placeholder="ex: Masseur-Kinésithérapeute D.E."
              defaultValue={profile?.title || ''}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Numéro INAMI / RPPS</label>
            <input 
              type="text" 
              name="inamiNumber" 
              defaultValue={profile?.inamiNumber || ''}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Adresse du cabinet</label>
            <textarea 
              name="address" 
              defaultValue={profile?.address || ''}
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Téléphone</label>
              <input 
                type="tel" 
                name="phone" 
                defaultValue={profile?.phone || ''}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email de contact</label>
              <input 
                type="email" 
                name="email" 
                defaultValue={profile?.email || user.email || ''}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)' }}
              />
            </div>
          </div>

          <button 
            type="submit"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              padding: '1rem', 
              background: 'var(--primary)', 
              color: 'white', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 600,
              marginTop: '1rem'
            }}
          >
            <Save size={20} />
            Enregistrer les paramètres
          </button>
        </form>
      </div>
    </main>
  );
}
