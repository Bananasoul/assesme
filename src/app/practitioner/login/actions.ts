'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(state: any, formData: FormData) {
  const pin = formData.get('pin');
  
  if (pin === 'KINE2024') {
    const cookieStore = await cookies();
    cookieStore.set('kine-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    redirect('/practitioner');
  } else {
    return { error: 'Code PIN incorrect' };
  }
}
