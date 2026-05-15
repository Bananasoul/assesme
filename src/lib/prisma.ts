import { PrismaClient } from '@prisma/client';

// L'intégration native Vercel↔Supabase injecte POSTGRES_PRISMA_URL / POSTGRES_URL_NON_POOLING
// et les auto-rotate quand le password Supabase change. On leur donne PRIORITÉ sur les
// DATABASE_URL / DIRECT_URL manuels (qui peuvent être périmés). Fallback sur DATABASE_URL
// pour le dev local où l'intégration n'existe pas.
if (process.env.POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}
if (process.env.POSTGRES_URL_NON_POOLING) {
  process.env.DIRECT_URL = process.env.POSTGRES_URL_NON_POOLING;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
