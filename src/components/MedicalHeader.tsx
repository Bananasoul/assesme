import React from 'react';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { Building2 } from 'lucide-react';

export default async function MedicalHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await prisma.practitionerProfile.findUnique({
    where: { practitionerId: user.id }
  });

  if (!profile) return null;

  return (
    <div className="print-only" style={{ marginBottom: '3rem', borderBottom: '2px solid #000', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ width: 64, height: 64, border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 size={32} color="#000" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            {profile.firstName} {profile.lastName}
          </h2>
          {profile.title && <p style={{ fontSize: '1.1rem', margin: '0.25rem 0', fontWeight: 'bold' }}>{profile.title}</p>}
          <p style={{ margin: 0, fontSize: '0.9rem' }}>{profile.address}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.9rem' }}>
            {profile.phone && <span>Tél : {profile.phone}</span>}
            {profile.email && <span>Email : {profile.email}</span>}
          </div>
          {profile.inamiNumber && (
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', fontStyle: 'italic' }}>
              N° d'identification : {profile.inamiNumber}
            </p>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
        <p style={{ margin: 0 }}>Fait le : {new Date().toLocaleDateString('fr-FR')}</p>
        <p style={{ margin: '0.25rem 0 0 0' }}>Document généré informatiquement</p>
      </div>
    </div>
  );
}
