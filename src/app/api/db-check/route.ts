/**
 * Diagnostic temporaire : révèle quelles env vars DB sont chargées,
 * sans fuiter le mot de passe. À supprimer une fois la connexion stabilisée.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function maskUrl(url: string | undefined): string {
  if (!url) return '<absent>';
  try {
    const u = new URL(url);
    const masked = u.password ? '*'.repeat(Math.min(u.password.length, 8)) : '<no-pwd>';
    return `${u.protocol}//${u.username}:${masked}@${u.hostname}:${u.port || '<default>'}${u.pathname}${u.search ? '?' + u.search.slice(1).split('&').map((p) => p.split('=')[0]).join('&') : ''}`;
  } catch {
    return '<unparsable>';
  }
}

export async function GET() {
  // Reproduit le shim de src/lib/prisma.ts
  const effectiveDb = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  const effectiveDirect = process.env.DIRECT_URL || process.env.POSTGRES_URL_NON_POOLING;

  return NextResponse.json({
    env: {
      DATABASE_URL: maskUrl(process.env.DATABASE_URL),
      DIRECT_URL: maskUrl(process.env.DIRECT_URL),
      POSTGRES_PRISMA_URL: maskUrl(process.env.POSTGRES_PRISMA_URL),
      POSTGRES_URL_NON_POOLING: maskUrl(process.env.POSTGRES_URL_NON_POOLING),
      POSTGRES_URL: maskUrl(process.env.POSTGRES_URL),
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '<absent>',
    },
    effective: {
      prismaUrl: maskUrl(effectiveDb),
      prismaDirectUrl: maskUrl(effectiveDirect),
    },
    note: "Le pooler Supabase attend l'utilisateur 'postgres.PROJECT_REF', pas 'postgres' seul. Vérifie l'URL ci-dessus.",
  });
}
