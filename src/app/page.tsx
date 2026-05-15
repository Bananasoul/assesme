import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import Reveal from '@/components/landing/Reveal';
import Counter from '@/components/landing/Counter';
import ScoreDemo from '@/components/landing/ScoreDemo';

export const dynamic = 'force-dynamic';

const PILLARS = [
  {
    n: '01',
    title: 'Rigueur',
    text: 'Chaque test est lié à sa publication fondatrice et son DOI. Les seuils décisionnels viennent de la littérature.',
  },
  {
    n: '02',
    title: 'Anonymat',
    text: 'Le patient remplit via un code AM-XXXX, jamais son nom. Souveraineté des données.',
  },
  {
    n: '03',
    title: 'Autonomie',
    text: 'Cinq minutes entre l\'idée du bilan et son envoi. Scoring instantané, interprétation automatique.',
  },
  {
    n: '04',
    title: 'Temps long',
    text: 'T0 → T1 → T2 comparés à la MCID. Voir si la prise en charge fait vraiment progresser.',
  },
];

const PROGRAMS = [
  { title: 'Mesurer', text: 'Le bon questionnaire validé pour la bonne plainte. Réponses depuis un smartphone, scoring instantané.' },
  { title: 'Décider', text: 'Chaque score déclenche une bifurcation thérapeutique explicite. La métrique devient guide d\'action.' },
  { title: 'Éduquer', text: 'Valeur clinique, MCID, sources scientifiques. Votre pratique devient apprentissage continu.' },
  { title: 'Suivre', text: 'Courbes d\'évolution T0 → T1 → T2 et interprétation cliniquement significative automatique.' },
];

export default function Home() {
  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', overflow: 'hidden' }}>
      <LandingHeader />

      {/* ============================================================
          HERO — titre énorme avec mots révélés un par un
      ============================================================ */}
      <section
        style={{
          position: 'relative',
          padding: '7rem 2rem 4rem',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div className="elx-halo" aria-hidden />

        <Reveal as="p" delay={50} className="elx-fade-up"
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            marginBottom: '1.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
          }}
        >
          <Sparkles size={12} strokeWidth={2.2} /> Métrologie clinique pour kinésithérapeutes
        </Reveal>

        <Reveal as="div" variant="up">
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              color: '#0E1217',
              margin: '0 auto',
              maxWidth: '960px',
            }}
          >
            <span className="elx-word" style={{ transitionDelay: '0.05s' }}>Et</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.12s' }}>si</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.19s' }}>chaque</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.26s' }}>bilan</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.33s' }}>parlait</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.40s' }}>avant</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.47s' }}>vous</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.54s' }}>?</span>
          </h1>
        </Reveal>

        <Reveal as="p" delay={300} className="elx-fade-up"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
            color: '#6B7280',
            textAlign: 'center',
            maxWidth: '640px',
            margin: '2.5rem auto 0',
            lineHeight: 1.6,
          }}
        >
          Trente-deux questionnaires validés, du scoring automatique et l'interprétation
          clinique en sortie. Pour que la mesure devienne un geste de soin, pas un fardeau administratif.
        </Reveal>

        <Reveal as="div" delay={500}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/practitioner/login" className="elx-button">
            Commencer maintenant <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
          <Link href="/manifeste" className="elx-button elx-button--outline">
            Lire le manifeste
          </Link>
        </Reveal>
      </section>

      {/* ============================================================
          BANDEAU — questions défilantes (marquee infini)
      ============================================================ */}
      <section style={{ padding: '4rem 0 1rem', textAlign: 'center' }}>
        <Reveal as="p"
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            marginBottom: '1.75rem',
          }}
        >
          Ce qu'AssesMe vous aide à savoir
        </Reveal>
        <div
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 600,
            color: '#0E1217',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          <div className="elx-questions">
            <div className="elx-questions__track">
              {[...Array(2)].flatMap((_, copy) =>
                [
                  '« Mon patient a-t-il peur de bouger ? »',
                  '« Cette épaule fonctionne-t-elle vraiment ? »',
                  '« Le lombalgique va-t-il passer en chronique ? »',
                  '« Ce genou est-il prêt à reprendre le sport ? »',
                  '« La douleur impacte-t-elle son sommeil ? »',
                  '« Mon traitement a-t-il vraiment fait progresser ? »',
                  '« Le patient se sent-il dépassé par sa douleur ? »',
                ].map((q, i) => (
                  <span key={`${copy}-${i}`} className="elx-questions__item">
                    {q}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS animées (compteurs)
      ============================================================ */}
      <section style={{ padding: '7rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal as="div" variant="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div className="elx-stat-num">
              <Counter to={32} />
            </div>
            <div className="elx-stat-label">Questionnaires validés</div>
          </div>
          <div>
            <div className="elx-stat-num">
              <Counter to={25} />
            </div>
            <div className="elx-stat-label">Services hospitaliers couverts</div>
          </div>
          <div>
            <div className="elx-stat-num">
              <Counter to={5} suffix=" min" />
            </div>
            <div className="elx-stat-label">Pour assigner un bilan</div>
          </div>
          <div>
            <div className="elx-stat-num">
              <Counter to={100} suffix="+" />
            </div>
            <div className="elx-stat-label">DOI référencés</div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          DEMO INTERACTIVE — slider TAMPA en direct
      ============================================================ */}
      <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal as="div">
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                marginBottom: '1rem',
              }}
            >
              Démo en direct
            </p>
            <h2 className="elx-h2" style={{ marginBottom: '1rem' }}>
              Un score qui parle.
            </h2>
            <p className="elx-lede" style={{ maxWidth: '440px' }}>
              Déplacez le curseur. Le score change, l'interprétation clinique change,
              la couleur du tableau change. C'est exactement ce que voit le praticien
              dans AssesMe, en sortie de chaque bilan.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '1.25rem', lineHeight: 1.55 }}>
              Échelle de TAMPA — TSK-17. Cut-off &gt; 37 = kinésiophobie élevée
              (drapeau jaune). Référence : Vlaeyen et al., <em>Pain</em>, 1995.
            </p>
          </Reveal>

          <Reveal as="div" variant="scale" delay={150}>
            <ScoreDemo />
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          BIBLIOTHÈQUE (mosaïque)
      ============================================================ */}
      <section style={{ padding: '6rem 2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal as="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                marginBottom: '0.85rem',
              }}
            >
              Bibliothèque vivante
            </p>
            <h2 className="elx-h2">32 tests, 25 services, 23 indications.</h2>
            <p className="elx-lede" style={{ maxWidth: '520px' }}>
              Tout ce qu'un kiné doit pouvoir trouver en deux clics — classé par
              zone, par service hospitalier et par pathologie.
            </p>
          </div>
          <Link href="/practitioner/library" className="elx-link">
            Explorer <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </Reveal>

        <Reveal as="div" variant="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { label: 'Lombaire', tests: 'ODI · RMDQ · STaRT Back', bg: 'linear-gradient(135deg, #0E1217 0%, #1F2937 100%)' },
            { label: 'Cervical', tests: 'NDI · Whiplash · TAMPA', bg: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' },
            { label: 'Genou', tests: 'KOOS · IKDC · VISA-P', bg: 'linear-gradient(135deg, #0E1217 0%, #4B5563 100%)' },
            { label: 'Psycho-social', tests: 'TAMPA · PCS · HADS', bg: 'linear-gradient(135deg, #374151 0%, #0E1217 100%)' },
          ].map((card) => (
            <div
              key={card.label}
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
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {card.tests}
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '0.4rem' }}>
                {card.label}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============================================================
          PROGRAMMES — 4 verbes du métier
      ============================================================ */}
      <section id="approche" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal as="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                marginBottom: '0.85rem',
              }}
            >
              Quatre verbes
            </p>
            <h2 className="elx-h2">Une seule discipline : raisonner.</h2>
            <p className="elx-lede" style={{ maxWidth: '520px' }}>
              Du bilan initial à la sortie, chaque étape est outillée.
            </p>
          </div>
          <Link href="/manifeste" className="elx-link">
            Notre manifeste <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </Reveal>

        <Reveal as="div" variant="stagger" style={{ borderTop: '1px solid #E5E7EB' }}>
          {PROGRAMS.map((p) => (
            <div key={p.title} className="elx-row">
              <h3 className="elx-row__title">{p.title}</h3>
              <p className="elx-row__text">{p.text}</p>
              <span className="elx-row__arrow">
                <ArrowUpRight size={20} strokeWidth={2} />
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============================================================
          APERÇU MANIFESTE — 4 piliers résumés
      ============================================================ */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal as="div" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: '1rem',
            }}
          >
            Manifeste
          </p>
          <h2 className="elx-h2" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Quatre principes pour mesurer ce qui compte.
          </h2>
        </Reveal>

        <Reveal
          as="div"
          variant="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {PILLARS.map((p) => (
            <Link
              key={p.n}
              href={`/manifeste#${p.title.toLowerCase()}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1.25rem',
                textDecoration: 'none',
                color: '#0E1217',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                {p.n}
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>{p.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.55, marginTop: '0.85rem', flex: 1 }}>
                {p.text}
              </p>
              <span
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#0E1217',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Lire <ArrowRight size={12} strokeWidth={2.5} />
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ============================================================
          CARTE NOIRE STUDIO
      ============================================================ */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal as="div" variant="scale">
          <div className="elx-card-dark">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#9CA3AF',
                    marginBottom: '0.85rem',
                  }}
                >
                  Studio clinique
                </p>
                <h2 className="elx-h2 elx-h2--inv">Une plateforme. Une rigueur.</h2>
                <p style={{ fontSize: '1rem', color: '#9CA3AF', margin: '0.5rem 0 0', maxWidth: '440px' }}>
                  Construite avec et pour les kinésithérapeutes qui cherchent à objectiver leur pratique.
                </p>
              </div>
              <Link href="/practitioner/login" className="elx-link" style={{ color: 'white' }}>
                Découvrir <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
              {[
                { num: 32, label: 'Tests validés' },
                { num: 11, label: 'Zones anatomiques' },
                { num: 25, label: 'Services hospitaliers' },
                { num: 0, label: 'Euro à l\'inscription', suffix: ' €' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="elx-stat-num elx-stat-num--inv">
                    <Counter to={s.num} suffix={s.suffix ?? ''} />
                  </div>
                  <div className="elx-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          CTA FINAL
      ============================================================ */}
      <section style={{ padding: '7rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal as="div"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <h2 className="elx-h2" style={{ maxWidth: '480px' }}>
            Votre pratique a plus à dire qu'elle ne le montre.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link href="/practitioner/login" className="elx-button">
              Commencer <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          FOOTER NOIR avec MEGA-NAV
      ============================================================ */}
      <footer style={{ background: '#0A0A0A', color: 'white', padding: '5rem 2rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <nav style={{ marginBottom: '5rem' }}>
            <Link href="/practitioner/library" className="elx-mega">Bibliothèque</Link>
            <Link href="/manifeste" className="elx-mega">Manifeste</Link>
            <Link href="/practitioner/login" className="elx-mega">Espace praticien</Link>
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
              <div style={{ fontWeight: 600, color: '#9CA3AF', marginBottom: '0.25rem' }}>
                © {new Date().getFullYear()} AssesMe
              </div>
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
