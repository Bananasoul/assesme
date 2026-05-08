import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Mail, CheckCircle, Activity, User, ChevronRight } from 'lucide-react';
import { QUESTIONNAIRES } from '@/data/questionnaires';

export const dynamic = 'force-dynamic';

export default async function PatientPortalPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const requestId = typeof resolvedParams.requestId === 'string' ? resolvedParams.requestId : null;

  let request = null;
  if (requestId) {
    request = await prisma.assessmentRequest.findUnique({
      where: { id: requestId },
      include: {
        clinicalRecord: {
          include: { patient: true }
        }
      }
    });
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}>
            <Activity size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>AssesMe Portal</span>
        </div>
        {request && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <User size={18} />
            <span style={{ fontWeight: 600 }}>{request.clinicalRecord.patient.firstName}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Mail color="var(--primary)" />
          Boîte de réception
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Retrouvez ici les questionnaires prescrits par votre praticien.
        </p>

        {!requestId ? (
          <div style={{ background: 'var(--surface)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <Mail size={48} color="var(--text-secondary)" style={{ opacity: 0.5, margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Aucune demande sélectionnée</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
              Pour accéder à vos tests, veuillez cliquer sur le lien sécurisé que votre praticien vous a envoyé par email ou SMS.
            </p>
          </div>
        ) : !request ? (
           <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 500 }}>
             Le lien que vous avez suivi est invalide ou a expiré. Veuillez demander un nouveau lien à votre praticien.
           </div>
        ) : request.status === 'COMPLETED' ? (
          <div style={{ background: 'var(--surface)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bilan terminé</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
              Merci ! Vos réponses ont été transmises en toute sécurité à votre praticien. Vous pouvez fermer cette page.
            </p>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Nouveau Bilan Clinique</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Demandé le {new Date(request.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <span style={{ background: '#FEF08A', color: '#854D0E', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                À faire
              </span>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '1rem' }}>
                Bonjour {request.clinicalRecord.patient.firstName},<br/><br/>
                Afin de préparer notre prochaine séance, merci de prendre quelques minutes pour remplir les questionnaires suivants :
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {JSON.parse(request.questionnaireIds).map((id: string) => {
                  const q = QUESTIONNAIRES[id];
                  if (!q) return null;
                  return (
                    <li key={id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <Activity size={20} color="var(--primary)" />
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.875rem' }}>{q.title}</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Temps estimé : {q.estimatedTime}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <Link 
              href={`/fill?requestId=${request.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '1rem',
                background: 'var(--primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'opacity 0.2s',
              }}
            >
              Commencer l'évaluation <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
