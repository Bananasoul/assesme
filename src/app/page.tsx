import Link from 'next/link';
import { Activity, ArrowRight, ArrowUpRight, Menu } from 'lucide-react';

export const dynamic = 'force-dynamic';

const PROGRAMS = [
  { title: 'Mesurer', text: 'Le bon questionnaire validé pour la bonne plainte. Réponses depuis un smartphone, scoring instantané.' },
  { title: 'Décider', text: 'Chaque score déclenche une bifurcation thérapeutique explicite. La métrique devient guide d\'action.' },
  { title: 'Éduquer', text: 'Valeur clinique, MCID, sources scientifiques. Votre pratique devient apprentissage continu.' },
  { title: 'Suivre', text: 'Courbes d\'évolution T0 → T1 → T2 et interprétation cliniquement significative automatique.' },
];

const STATS_TOP = [
  { num: '32', label: 'questionnaires validés' },
  { num: '8/10', label: 'praticiens veulent objectiver leurs résultats' },
  { num: '5 min', label: 'pour assigner un bilan à un patient' },
];

const STATS_STUDIO = [
  { num: '32', label: 'Tests cliniques' },
  { num: '11', label: 'Zones anatomiques' },
  { num: '4', label: 'Modules cliniques' },
  { num: '0 €', label: 'À l\'inscription' },
];

export default function Home() {
  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh' }}>
      {/* ============================================================
          HEADER MINIMAL
      ============================================================ */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(10px)',
          WebkitBackdropFilter: 'saturate(180%) blur(10px)',
          borderBottom: '1px solid rgba(14,18,23,0.06)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <Activity size={20} color="#0E1217" strokeWidth={2.4} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0E1217', letterSpacing: '-0.01em' }}>AssesMe</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#8B5CF6', letterSpacing: '0.18em', marginTop: '0.1rem' }}>CLINIQUE</span>
            </div>
          </Link>
          <Menu size={22} color="#0E1217" strokeWidth={2} />
        </div>
      </header>

      {/* ============================================================
          HERO — titre énorme centré + stats en bas
      ============================================================ */}
      <section style={{ padding: '8rem 2rem 4rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h1
          className="elx-fade-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: '#0E1217',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '900px',
          }}
        >
          Et si chaque bilan parlait avant vous ?
        </h1>

        <p
          className="elx-fade-up elx-delay-1"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#6B7280',
            textAlign: 'center',
            maxWidth: '620px',
            margin: '2rem auto 0',
            lineHeight: 1.6,
          }}
        >
          La métrologie clinique au service de votre raisonnement. Évaluer, décider,
          éduquer — sur la base de preuves, pas d'intuitions.
        </p>

        <div
          className="elx-fade-up elx-delay-2"
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap' }}
        >
          <Link href="/practitioner/login" className="elx-button">
            Commencer maintenant <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
          <a href="#approche" className="elx-button elx-button--outline">
            Découvrir l'approche
          </a>
        </div>

        {/* Stats en bas de hero */}
        <div
          className="elx-fade-up elx-delay-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginTop: '7rem',
          }}
        >
          {STATS_TOP.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="elx-stat-num">{s.num}</div>
              <div className="elx-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 1 — TRAVAUX (mosaïque de visuels conceptuels)
      ============================================================ */}
      <section style={{ padding: '6rem 2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="elx-h2">Une bibliothèque clinique vivante.</h2>
            <p className="elx-lede" style={{ maxWidth: '480px' }}>
              On transforme les questionnaires validés en outils que vous utilisez vraiment.
            </p>
          </div>
          <Link href="/practitioner/library" className="elx-link">
            Explorer <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mosaïque 4 cards — visuels conceptuels noir/blanc avec gradient subtil */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { label: 'Lombaire', tests: 'ODI · RMDQ · START Back', bg: 'linear-gradient(135deg, #0E1217 0%, #1F2937 100%)' },
            { label: 'Cervical', tests: 'NDI · Whiplash · TAMPA', bg: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' },
            { label: 'Genou', tests: 'KOOS · IKDC · VISA-P', bg: 'linear-gradient(135deg, #0E1217 0%, #4B5563 100%)' },
            { label: 'Psycho-social', tests: 'TAMPA · PCS · HADS', bg: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)' },
          ].map((card, i) => (
            <div
              key={card.label}
              className={`elx-fade-up elx-delay-${(i % 4) + 1}`}
              style={{
                aspectRatio: '3/4',
                background: card.bg,
                borderRadius: '1.5rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                {card.tests}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — PROGRAMMES (liste avec dividers)
      ============================================================ */}
      <section id="approche" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="elx-h2">Quatre modules. Une seule discipline : raisonner.</h2>
            <p className="elx-lede" style={{ maxWidth: '480px' }}>
              Du bilan initial à la fin du traitement, chaque étape est outillée.
            </p>
          </div>
          <Link href="/practitioner/login" className="elx-link">
            Démarrer <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          {PROGRAMS.map((p, i) => (
            <div key={p.title} className="elx-row" style={{ animationDelay: `${0.1 * i}s` }}>
              <h3 className="elx-row__title">{p.title}</h3>
              <p className="elx-row__text">{p.text}</p>
              <span className="elx-row__arrow"><ArrowUpRight size={20} strokeWidth={2} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — CARTE NOIRE "STUDIO"
      ============================================================ */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div className="elx-card-dark">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <h2 className="elx-h2 elx-h2--inv">Studio clinique.</h2>
              <p style={{ fontSize: '1rem', color: '#9CA3AF', margin: '0.5rem 0 0', maxWidth: '440px' }}>
                Une plateforme, une discipline, une rigueur.
              </p>
            </div>
            <Link href="/practitioner/login" className="elx-link" style={{ color: '#A78BFA' }}>
              Découvrir <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
            {STATS_STUDIO.map((s) => (
              <div key={s.label}>
                <div className="elx-stat-num elx-stat-num--inv">{s.num}</div>
                <div className="elx-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — CTA FINAL
      ============================================================ */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <h2 className="elx-h2" style={{ maxWidth: '440px' }}>
            Votre pratique a plus à dire qu'elle ne le montre. On s'en occupe ?
          </h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/practitioner/login" className="elx-button">
              Travailler avec nous <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER NOIR avec MEGA-NAV
      ============================================================ */}
      <footer style={{ background: '#0A0A0A', color: 'white', padding: '5rem 2rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <nav style={{ marginBottom: '5rem' }}>
            <Link href="/practitioner/library" className="elx-mega">Bibliothèque</Link>
            <Link href="/practitioner/login" className="elx-mega">Espace praticien</Link>
            <Link href="#approche" className="elx-mega">L'approche</Link>
            <Link href="mailto:contact@assesme.app" className="elx-mega">Contact</Link>
          </nav>

          <div
            style={{
              borderTop: '1px solid #1F2937',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.85rem',
              color: '#6B7280',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: '#9CA3AF', marginBottom: '0.25rem' }}>© {new Date().getFullYear()} AssesMe</div>
              <div>Plateforme de métrologie clinique pour la kinésithérapie.</div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Mentions légales</Link>
              <Link href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
