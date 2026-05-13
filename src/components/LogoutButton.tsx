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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.55rem 1rem',
        color: '#0E1217',
        background: 'white',
        borderRadius: '9999px',
        border: '1px solid #E5E7EB',
        fontWeight: 600,
        fontSize: '0.82rem',
        fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      <LogOut size={15} strokeWidth={2} />
      Déconnexion
    </button>
  );
}
