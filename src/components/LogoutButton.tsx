'use client';

import { LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/practitioner/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        color: 'var(--accent)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        fontWeight: 500,
        cursor: 'pointer'
      }}
    >
      <LogOut size={18} />
      Déconnexion
    </button>
  );
}
