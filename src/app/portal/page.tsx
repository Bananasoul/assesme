import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Mail, CheckCircle, Activity, User, ArrowRight } from 'lucide-react';
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
          include: { patient: true },
        },
      },
    });
  }

  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header cohérent avec la landing */}
      <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>PORTAL</span>
            </div>
          </Link>
          {request && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.9rem' }}>
              <User size={16} strokeWidth={2} />
              <span style={{ fontWeight: 600, color: '#0E1217' }}>{request.clinicalRecord.patient.firstName}</span>
            </div>
          )}
        </div>
      </header>

      <section
        style={{
          flex: 1,
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          padding: '5rem 1.5rem 4rem',
        }}
      >
        <p
          className="elx-fade-up"
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            marginBottom: '1rem',
          }}
        >
          Espace patient
        </p>
        <h1
          className="elx-fade-up elx-delay-1"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#0E1217',
            margin: 0,
          }}
        >
          Boîte de réception.
        </h1>
        <p
          className="elx-fade-up elx-delay-2"
          style={{
            fontSize: '1.05rem',
            color: '#6B7280',
            margin: '0.85rem 0 3.5rem',
            lineHeight: 1.55,
            maxWidth: '560px',
          }}
        >
          Retrouvez ici les questionnaires prescrits par votre praticien.
        </p>

        {!requestId ? (
          <div
            className="elx-fade-up elx-delay-3"
            style={{
              background: 'white',
              padding: '4rem 2rem',
              borderRadius: '1.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
            }}
          >
            <Mail size={36} color="#9CA3AF" strokeWidth={1.6} style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0E1217', margin: '0 0 0.75rem' }}>
              Aucune demande sélectionnée
            </h2>
            <p style={{ color: '#6B7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
              Pour accéder à vos tests, cliquez sur le lien sécurisé que votre praticien vous a envoyé par email ou SMS.
            </p>
          </div>
        ) : !request ? (
          <div
            className="elx-fade-up elx-delay-3"
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1.5rem',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Le lien que vous avez suivi est invalide ou a expiré. Veuillez demander un nouveau lien à votre praticien.
          </div>
        ) : request.status === 'COMPLETED' ? (
          <div
            className="elx-fade-up elx-delay-3"
            style={{
              background: 'white',
              padding: '4rem 2rem',
              borderRadius: '1.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
            }}
          >
            <CheckCircle size={48} color="#0E1217" strokeWidth={1.5} style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0E1217', margin: '0 0 0.75rem' }}>
              Bilan terminé.
            </h2>
            <p style={{ color: '#6B7280', maxWidth: '440px', margin: '0 auto', lineHeight: 1.6 }}>
              Merci. Vos réponses ont été transmises en toute sécurité à votre praticien. Vous pouvez fermer cette page.
            </p>
          </div>
        ) : (
          <div
            className="elx-fade-up elx-delay-3"
            style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '1.5rem',
              border: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid #E5E7EB',
                paddingBottom: '1.5rem',
                marginBottom: '1.75rem',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0E1217', margin: 0 }}>
                  Nouveau bilan clinique
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                  Demandé le{' '}
                  {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <span
                style={{
                  background: '#0E1217',
                  color: 'white',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                À faire
              </span>
            </div>

            <p style={{ color: '#0E1217', fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Bonjour {request.clinicalRecord.patient.firstName},
              <br />
              <br />
              Afin de préparer notre prochaine séance, merci de prendre quelques minutes pour remplir les questionnaires suivants :
            </p>

            <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {JSON.parse(request.questionnaireIds).map((id: string) => {
                const q = QUESTIONNAIRES[id];
                if (!q) return null;
                return (
                  <li
                    key={id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: '#F9FAFB',
                      padding: '1rem 1.25rem',
                      borderRadius: '0.85rem',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <Activity size={18} color="#0E1217" strokeWidth={2} />
                    <div>
                      <strong style={{ display: 'block', color: '#0E1217', fontSize: '0.95rem', fontWeight: 600 }}>{q.title}</strong>
                      <span style={{ color: '#6B7280', fontSize: '0.8rem' }}>Temps estimé · {q.estimatedTime}</span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href={`/fill?requestId=${request.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                width: '100%',
                padding: '1.1rem',
                background: '#0E1217',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'background 0.25s ease, gap 0.25s ease',
              }}
            >
              Commencer l'évaluation <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
