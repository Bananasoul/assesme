import { PrismaClient } from '@prisma/client';

// L'intégration native Vercel↔Supabase injecte POSTGRES_PRISMA_URL / POSTGRES_URL_NON_POOLING,
// alors que schema.prisma lit DATABASE_URL / DIRECT_URL. On pont les deux conventions ici
// avant d'instancier le client Prisma — préserve la compat locale (.env.local) et Vercel.
if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}
if (!process.env.DIRECT_URL && process.env.POSTGRES_URL_NON_POOLING) {
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
