'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, Brain, BookOpen, Target, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

const pillars = [
  {
    icon: ClipboardCheck,
    title: 'Standardiser',
    text: "32 questionnaires validés prêts à l'emploi. Le patient répond depuis son téléphone via un lien sécurisé. Pas d'impression, pas de saisie manuelle, pas de tableur Excel.",
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Brain,
    title: 'Décider',
    text: "Pour chaque test, l'arbre décisionnel thérapeutique est explicite : quel score déclenche quelle bifurcation, quels exercices, quelles éducations. La métrique devient guide d'action.",
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BookOpen,
    title: 'Éduquer',
    text: "Chaque questionnaire est documenté : valeur clinique, MCID, interventions thérapeutiques associées, sources scientifiques. La pratique devient apprentissage.",
    color: 'from-pink-500 to-rose-500',
  },
];

const frictions = [
  {
    title: 'Trop de tests, trop peu de temps',
    text: "Des dizaines d'échelles validées existent, mais lesquelles utiliser face à un patient lombalgique chronique ce mardi à 14h ?",
  },
  {
    title: 'Le score sans la décision',
    text: "Calculer un ODI ne sert à rien si l'on ne sait pas quelle bifurcation thérapeutique il déclenche.",
  },
  {
    title: "L'écart entre savoir et faire",
    text: "L'evidence-based practice est dans tous les cursus. Dans les cabinets, elle reste l'exception.",
  },
];

const benefits = [
  { icon: Target, title: 'Pertinence clinique', text: 'Le bon test pour la bonne plainte, suggéré au bilan.' },
  { icon: TrendingUp, title: 'Suivi visuel', text: "Courbes d'évolution T0 → T1 → T2 sur tous les bilans." },
  { icon: ShieldCheck, title: 'Conforme et sécurisé', text: 'Pseudonymisation, liens à usage unique, données EU.' },
  { icon: Activity, title: 'Mobile-first', text: 'PWA installable. Patient comme praticien depuis leur smartphone.' },
];

function FadeInOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeManifesto() {
  return (
    <div id="manifeste">
      {/* Le constat */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-3">Le constat</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight tracking-tight">
                Les outils existent. <span className="text-gray-400">Leur usage quotidien reste un défi.</span>
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {frictions.map((f, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="h-full p-7 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                  <div className="text-5xl font-extrabold text-gray-200 mb-3">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{f.text}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Notre approche — 3 piliers avec gradient cards */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-3">Notre approche</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight tracking-tight">
                Trois piliers pour transformer chaque consultation en{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  décision éclairée
                </span>
                .
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeInOnScroll key={i} delay={i * 0.15}>
                  <div className="group relative h-full p-8 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className={`relative inline-flex p-3 mb-5 rounded-xl bg-gradient-to-br ${p.color} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                    <p className="relative text-gray-600 leading-relaxed">{p.text}</p>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bénéfices — quatre cards compactes */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-3">Pour vous, praticien</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight tracking-tight">
                Tester plus souvent, <span className="text-gray-400">sans alourdir votre journée.</span>
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <FadeInOnScroll key={i} delay={i * 0.08}>
                  <div className="h-full p-6 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200">
                    <div className="inline-flex p-2.5 mb-4 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{b.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{b.text}</p>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
