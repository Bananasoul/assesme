import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  ClipboardCheck,
  ShieldCheck,
  Target,
  TrendingUp,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      {/* ============ HEADER ============ */}
      <header
        style={{
          padding: '1.25rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', display: 'flex' }}>
            <Activity size={22} />
          </div>
          <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>AssesMe</span>
        </div>
        <Link
          href="/practitioner"
          style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '0.625rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Espace praticien <ArrowRight size={16} />
        </Link>
      </header>

      {/* ============ HERO ============ */}
      <section style={{ padding: '5rem 1.5rem 3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            letterSpacing: '0.02em',
          }}
        >
          <ShieldCheck size={14} /> Pour les kinésithérapeutes
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          La métrologie clinique <span style={{ color: 'var(--primary)' }}>sans charge mentale</span>.
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
          }}
        >
          AssesMe rend les questionnaires validés faciles à intégrer dans votre pratique quotidienne.
          Mesurez, décidez, éduquez — sur la base de preuves, pas d'intuitions.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/practitioner"
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '0.95rem 1.75rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Accéder à mon espace <ArrowRight size={18} />
          </Link>
          <a
            href="#approche"
            style={{
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              padding: '0.95rem 1.75rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem',
              border: '1px solid var(--border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Découvrir l'approche
          </a>
        </div>
      </section>

      {/* ============ LE CONSTAT ============ */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Le constat
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.2 }}>
              Les outils existent. Leur usage quotidien, lui, reste un défi.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Trop de tests, trop peu de temps', text: "Des dizaines d'échelles validées existent, mais lesquelles utiliser face à un patient lombalgique chronique ce mardi à 14h ?" },
              { title: 'Le score sans la décision', text: "Calculer un ODI ne sert à rien si l'on ne sait pas quelle bifurcation thérapeutique il déclenche." },
              { title: "L'écart entre savoir et faire", text: "L'evidence-based practice est dans tous les cursus. Dans les cabinets, elle reste l'exception." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'var(--background)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOTRE APPROCHE ============ */}
      <section id="approche" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Notre approche
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.2 }}>
              Trois piliers pour transformer chaque consultation en décision éclairée.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <Pillar
              icon={<ClipboardCheck size={24} />}
              title="Standardiser"
              text="14 questionnaires validés (TAMPA, ODI, NDI, KOOS, HOOS, SPADI, RMDQ, HADS, QuickDASH, LEFS, MRS, START Back, PSFS) prêts à l'emploi. Le patient répond depuis chez lui via un lien sécurisé. Pas d'impression, pas de saisie manuelle."
            />
            <Pillar
              icon={<Brain size={24} />}
              title="Décider"
              text="Pour chaque test, l'arbre décisionnel thérapeutique est explicite : quel score déclenche quelle bifurcation, quels exercices, quelles éducations. La métrique devient un guide d'action, pas une donnée stockée."
            />
            <Pillar
              icon={<BookOpen size={24} />}
              title="Éduquer"
              text="Chaque questionnaire est documenté avec sa valeur clinique, ses MCID, ses interventions thérapeutiques associées et ses sources. Vous progressez à chaque mesure — la pratique devient apprentissage."
            />
          </div>
        </div>
      </section>

      {/* ============ BÉNÉFICES ============ */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Pour vous, praticien
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.2 }}>
              Tester plus souvent, sans alourdir votre journée.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: <Target size={20} />, title: 'Pertinence clinique', text: 'Le bon test pour la bonne plainte, suggéré au moment du bilan.' },
              { icon: <TrendingUp size={20} />, title: 'Suivi visuel', text: 'Courbes d\'évolution T0 → T1 → T2 sur tous les bilans réalisés.' },
              { icon: <ShieldCheck size={20} />, title: 'Conforme et sécurisé', text: 'Pseudonymisation, liens patients à usage unique, données EU.' },
              { icon: <Activity size={20} />, title: 'Mobile-first', text: 'PWA installable. Le patient répond depuis son smartphone, vous consultez depuis le vôtre.' },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'var(--background)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'white', marginBottom: '0.75rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Faites de chaque séance une décision éclairée.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Créez votre espace praticien en moins d'une minute. Aucune carte bancaire requise.
          </p>
          <Link
            href="/practitioner/login"
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.05rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Commencer maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          borderTop: '1px solid var(--border)',
          fontSize: '0.875rem',
          background: 'var(--surface)',
        }}
      >
        <p>© {new Date().getFullYear()} AssesMe — Plateforme de métrologie clinique pour la kinésithérapie.</p>
      </footer>
    </main>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--primary)',
          color: 'white',
          marginBottom: '1.25rem',
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}
