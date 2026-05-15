import Link from 'next/link';
import { Activity, ArrowLeft, ArrowRight, BookOpen, Lock, Zap, TrendingUp } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import Counter from '@/components/landing/Counter';

export const dynamic = 'force-dynamic';

export default function ManifestePage() {
  return (
    <main style={{ background: 'white', color: '#0E1217', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Header minimal avec subtitle dédiée */}
      <header style={{ borderBottom: '1px solid rgba(14,18,23,0.06)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'saturate(180%) blur(10px)', WebkitBackdropFilter: 'saturate(180%) blur(10px)' }}>
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
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.18em', marginTop: '0.1rem' }}>MANIFESTE</span>
            </div>
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0E1217',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Retour
          </Link>
        </div>
      </header>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section
        style={{
          position: 'relative',
          padding: '7rem 2rem 5rem',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div className="elx-halo" aria-hidden />

        <Reveal as="p" delay={50}
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            marginBottom: '1.75rem',
          }}
        >
          Manifeste
        </Reveal>

        <Reveal as="div">
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            <span className="elx-word" style={{ transitionDelay: '0.05s' }}>Quatre</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.13s' }}>principes</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.21s' }}>pour</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.29s' }}>mesurer</span>{' '}
            <br />
            <span className="elx-word" style={{ transitionDelay: '0.37s' }}>ce</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.44s' }}>qui</span>{' '}
            <span className="elx-word" style={{ transitionDelay: '0.51s' }}>compte.</span>
          </h1>
        </Reveal>

        <Reveal as="p" delay={350}
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#6B7280',
            margin: '2.5rem auto 0',
            maxWidth: '640px',
            lineHeight: 1.6,
          }}
        >
          AssesMe n'est pas un énième logiciel de gestion. C'est une manière de penser
          la mesure clinique. Voici ce qui nous tient.
        </Reveal>
      </section>

      {/* ============================================================
          PILIER 01 — RIGUEUR
      ============================================================ */}
      <section id="rigueur" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <Reveal as="div">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                01 · Rigueur
              </span>
              <BookOpen size={18} strokeWidth={2} />
            </div>
            <h2 className="elx-h2" style={{ marginBottom: '1.5rem' }}>
              Chaque test cite sa source.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65, marginBottom: '1rem' }}>
              Trente-deux questionnaires, et pour chacun la publication fondatrice : auteurs,
              journal, année, DOI cliquable. Pas d'invention, pas d'à-peu-près. Quand AssesMe
              vous dit que le seuil de la TAMPA est de 37, vous pouvez cliquer pour lire
              Vlaeyen, 1995, dans <em>Pain</em>.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65 }}>
              Les seuils décisionnels, les MCID, les drapeaux jaunes — tout vient
              de la littérature. Quand la littérature évolue, AssesMe évolue.
            </p>
          </Reveal>

          <Reveal as="div" variant="scale" delay={150}>
            <div
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                position: 'sticky',
                top: '6rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                }}
              >
                Référence type — TAMPA
              </div>
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#0E1217',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                Source du test
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0E1217', lineHeight: 1.45 }}>
                Fear of movement/(re)injury in chronic low back pain and its relation
                to behavioral performance
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', fontStyle: 'italic', marginTop: '0.5rem' }}>
                Vlaeyen JWS, et al. · <em>Pain</em> · 1995
              </div>
              <div
                style={{
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: '0.78rem',
                  color: '#0E1217',
                  marginTop: '0.75rem',
                  padding: '0.4rem 0.65rem',
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.4rem',
                  display: 'inline-block',
                }}
              >
                DOI · 10.1016/0304-3959(95)00073-2
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal as="div"
          style={{
            marginTop: '5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center',
          }}
          variant="stagger"
        >
          <div>
            <div className="elx-stat-num"><Counter to={32} /></div>
            <div className="elx-stat-label">Tests référencés</div>
          </div>
          <div>
            <div className="elx-stat-num"><Counter to={100} suffix="+" /></div>
            <div className="elx-stat-label">DOI cliquables</div>
          </div>
          <div>
            <div className="elx-stat-num"><Counter to={50} suffix="+" /></div>
            <div className="elx-stat-label">Études citées</div>
          </div>
          <div>
            <div className="elx-stat-num"><Counter to={0} /></div>
            <div className="elx-stat-label">Source inventée</div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          PILIER 02 — ANONYMAT
      ============================================================ */}
      <section id="anonymat" style={{ padding: '6rem 2rem', background: '#F9FAFB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal as="div" variant="scale" delay={150}>
            {/* Schéma visuel du flux anonyme */}
            <div
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1.25rem',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1.75rem',
                }}
              >
                Flux d'un bilan AssesMe
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { step: '1', label: 'Le praticien prescrit un test', tag: 'KINÉ' },
                  { step: '2', label: 'AssesMe génère un code AM-XXXX', tag: 'AUTO' },
                  { step: '3', label: 'Le patient remplit anonymement', tag: 'PATIENT' },
                  { step: '4', label: 'Le score remonte au praticien', tag: 'KINÉ' },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 1rem',
                      background: '#F9FAFB',
                      borderRadius: '0.65rem',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#0E1217',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {s.step}
                    </span>
                    <span style={{ flex: 1, fontSize: '0.92rem', color: '#0E1217' }}>{s.label}</span>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        color: '#6B7280',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        background: '#F3F4F6',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.78rem',
                  color: '#6B7280',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}
              >
                Aucun nom n'apparaît dans la page que le patient remplit.
                Le lien entre code et identité reste dans votre dossier praticien.
              </div>
            </div>
          </Reveal>

          <Reveal as="div">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                02 · Anonymat
              </span>
              <Lock size={18} strokeWidth={2} />
            </div>
            <h2 className="elx-h2" style={{ marginBottom: '1.5rem' }}>
              Le patient n'est pas son nom.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65, marginBottom: '1rem' }}>
              Quand un patient ouvre un questionnaire AssesMe, il voit son test —
              jamais son identité. Le code <strong>AM-XXXX</strong> sert d'intermédiaire :
              il garantit que les réponses arrivent au bon dossier sans jamais étiqueter
              le formulaire.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65 }}>
              Les données sont hébergées dans l'Union européenne. Le lien entre code
              et identité reste dans <em>votre</em> espace praticien — et seulement là.
              Le patient peut remplir depuis n'importe quel appareil sans laisser de trace
              nominative côté serveur web.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PILIER 03 — AUTONOMIE / TEMPS
      ============================================================ */}
      <section id="autonomie" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal as="div">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                03 · Autonomie
              </span>
              <Zap size={18} strokeWidth={2} />
            </div>
            <h2 className="elx-h2" style={{ marginBottom: '1.5rem' }}>
              Cinq minutes, pas trois rendez-vous.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65, marginBottom: '1rem' }}>
              Mesurer ne devrait pas coûter plus que ce que ça rapporte. AssesMe
              compresse en cinq minutes ce qui prenait une demi-heure : choisir
              le bon test, le scorer, l'interpréter, le tracer dans le dossier.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65 }}>
              Le wizard à quatre étapes guide le geste. La bibliothèque propose
              les tests pertinents par service hospitalier et par indication
              (PTH, PTG, AVC, lombalgie chronique…). L'envoi se fait par lien
              court, QR code ou WhatsApp.
            </p>
          </Reveal>

          <Reveal as="div" variant="scale" delay={150}>
            <div
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1.25rem',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                Avant / Après
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#F9FAFB',
                    border: '1px dashed #D1D5DB',
                    borderRadius: '0.85rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Sans
                  </div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0E1217', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    30 min
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.65rem', lineHeight: 1.45 }}>
                    Photocopie · scoring papier · saisie · interprétation manuelle
                  </div>
                </div>
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#0E1217',
                    borderRadius: '0.85rem',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Avec AssesMe
                  </div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <Counter to={5} suffix=" min" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.65rem', lineHeight: 1.45 }}>
                    Wizard 4 étapes · scoring auto · interprétation auto · archive auto
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PILIER 04 — TEMPS LONG
      ============================================================ */}
      <section id="temps" style={{ padding: '6rem 2rem', background: '#F9FAFB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal as="div" variant="scale" delay={150}>
            <div
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1.25rem',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                Évolution ODI · 3 mois
              </div>

              {/* Mini-chart SVG monochrome avec ligne qui se dessine */}
              <svg viewBox="0 0 320 140" width="100%" style={{ display: 'block' }} aria-label="Courbe d'évolution illustrative">
                <line x1="0" y1="100" x2="320" y2="100" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="0" y1="20" x2="320" y2="20" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 4" />
                <polyline
                  className="elx-draw-line"
                  style={{ '--dash-len': '600' } as React.CSSProperties}
                  points="20,30 120,55 220,80 300,108"
                  fill="none"
                  stroke="#0E1217"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="30" r="5" fill="#0E1217" />
                <circle cx="120" cy="55" r="5" fill="#0E1217" />
                <circle cx="220" cy="80" r="5" fill="#0E1217" />
                <circle cx="300" cy="108" r="5" fill="#0E1217" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.85rem', fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                <span>T0 · 62</span>
                <span>T1 · 48</span>
                <span>T2 · 32</span>
                <span>T3 · 16</span>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '0.85rem 1rem',
                  background: '#0E1217',
                  color: 'white',
                  borderRadius: '0.65rem',
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                }}
              >
                <TrendingUp size={16} strokeWidth={2.4} />
                <span>
                  <strong>−46 pts</strong> · amélioration cliniquement significative (MCID = 10)
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal as="div">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                04 · Temps long
              </span>
              <TrendingUp size={18} strokeWidth={2} />
            </div>
            <h2 className="elx-h2" style={{ marginBottom: '1.5rem' }}>
              Le travail invisible devient visible.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65, marginBottom: '1rem' }}>
              Un score isolé dit peu. Une courbe T0 → T1 → T2 → T3 dit beaucoup —
              à condition d'utiliser le même test dans les mêmes conditions. AssesMe
              compare chaque évaluation à la baseline du patient et la confronte à
              la <strong>MCID</strong> du test (la plus petite différence cliniquement
              perceptible, issue de la littérature).
            </p>
            <p style={{ fontSize: '1.05rem', color: '#0E1217', lineHeight: 1.65 }}>
              Le praticien voit en un coup d'œil si la prise en charge a vraiment
              progressé. Le patient voit son chemin. Le payeur voit que le soin a un
              effet mesurable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          CTA FINAL
      ============================================================ */}
      <section style={{ padding: '8rem 2rem' }}>
        <Reveal as="div" variant="scale"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: '1.5rem',
            }}
          >
            Rejoindre la pratique
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: '#0E1217',
              margin: 0,
            }}
          >
            La métrologie clinique n'attend pas d'être réservée à la recherche.
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280', maxWidth: '620px', margin: '1.75rem auto 2.5rem', lineHeight: 1.6 }}>
            Elle peut entrer dans votre cabinet dès la semaine prochaine.
          </p>
          <Link href="/practitioner/login" className="elx-button">
            Commencer maintenant <ArrowRight size={16} strokeWidth={2.4} />
          </Link>
        </Reveal>
      </section>

      {/* ============================================================
          FOOTER (idem landing)
      ============================================================ */}
      <footer style={{ background: '#0A0A0A', color: 'white', padding: '5rem 2rem 2rem' }}>
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
