/**
 * Backfill : génère un identifier pour les patients existants qui n'en ont pas.
 * Stratégie : initiales (prénom + nom) + 2 derniers chiffres de l'année de naissance.
 * Fallback : "Patient_<8 premiers chars de l'UUID>".
 *
 * Usage : npx tsx prisma/backfill-identifier.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateIdentifier(p: { firstName: string | null; lastName: string | null; dateOfBirth: Date | null; id: string }): string {
  const initials = [p.firstName, p.lastName]
    .filter(Boolean)
    .map((n) => n!.charAt(0).toUpperCase())
    .join('');
  if (initials && p.dateOfBirth) {
    return `${initials}${String(p.dateOfBirth.getFullYear()).slice(-2)}`;
  }
  if (initials) return initials;
  return `Patient_${p.id.slice(0, 8)}`;
}

async function main() {
  const patients = await prisma.patientVault.findMany({
    where: { identifier: null },
    select: { id: true, practitionerId: true, firstName: true, lastName: true, dateOfBirth: true },
  });

  console.log(`🔍 ${patients.length} patient(s) sans identifier`);

  for (const p of patients) {
    const candidate = generateIdentifier(p);
    let suffix = 0;
    // Garantir l'unicité par praticien
    while (
      await prisma.patientVault.findFirst({
        where: { practitionerId: p.practitionerId, identifier: suffix === 0 ? candidate : `${candidate}_${suffix}` },
      })
    ) {
      suffix++;
    }
    const finalIdentifier = suffix === 0 ? candidate : `${candidate}_${suffix}`;
    await prisma.patientVault.update({ where: { id: p.id }, data: { identifier: finalIdentifier } });
    console.log(`✅ ${p.id.slice(0, 8)} → ${finalIdentifier}`);
  }

  console.log(`\nDone.`);
}

main()
  .catch((e) => {
    console.error('❌', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
