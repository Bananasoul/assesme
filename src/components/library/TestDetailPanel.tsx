'use client';

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { QuestionnaireDef } from '@/data/questionnaires';
import { getMeta, BODY_PART_LABELS } from '@/data/questionnaires-meta';
import { createAnonymousSession } from '@/app/actions/anonymousSession';
import type { PatientContext } from './LibraryView';
import {
  Activity,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Copy,
  ExternalLink,
  Globe,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Send,
  Stethoscope,
  Target,
  Video,
} from 'lucide-react';

type Props = {
  test: QuestionnaireDef;
  patientContext?: PatientContext | null;
};

export default function TestDetailPanel({ test, patientContext = null }: Props) {
  const meta = getMeta(test.id);

  return (
    <motion.div
      key={test.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* ============ HEADER COMPACT ============ */}
      <div className="px-7 pt-7 pb-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {test.title}
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">{test.description}</p>
        <div className="flex gap-2 flex-wrap">
          {test.validated && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Validé
            </span>
          )}
          {test.estimatedTime && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold">
              <Clock className="w-3 h-3" /> {test.estimatedTime}
            </span>
          )}
          {test.category && (
            <span className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold">
              {test.category}
            </span>
          )}
          {(meta?.bodyParts ?? []).map((bp) => (
            <span
              key={bp}
              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold"
            >
              {BODY_PART_LABELS[bp]}
            </span>
          ))}
        </div>
      </div>

      {/* ============ PURPOSE-FIRST : Questions cliniques en HÉROS ============ */}
      {meta?.clinicalQuestions && meta.clinicalQuestions.length > 0 && (
        <div className="px-7 py-7 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-pink-50/30 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-indigo-900 tracking-widest uppercase">
              Pourquoi je prescris ce test ?
            </h3>
          </div>
          <div className="grid gap-3">
            {meta.clinicalQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 items-start p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-900 leading-relaxed font-medium">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ============ ALGORITHME DÉCISIONNEL EN BLOC PROÉMINENT ============ */}
      {test.decisionAlgorithm && (
        <div className="px-7 py-7 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-amber-900 tracking-widest uppercase">
              Que faire selon le score
            </h3>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-100">
            <p className="text-gray-900 leading-relaxed">{test.decisionAlgorithm}</p>
          </div>
        </div>
      )}

      {/* ============ CTA PRESCRIRE ============ */}
      {patientContext && (
        <div className="px-7 py-5">
          <PrescribeBlock test={test} patientContext={patientContext} />
        </div>
      )}

      {/* ============ SECTIONS DÉROULANTES ============ */}
      <div className="px-7 pb-7 pt-2">
        {/* Valeur clinique */}
        {test.clinicalValue && (
          <Section icon={Stethoscope} title="Contexte clinique" color="text-indigo-600">
            <p className="text-gray-700 leading-relaxed">{test.clinicalValue}</p>
          </Section>
        )}

        {/* Interventions thérapeutiques */}
        {test.therapeuticInterventions && (
          <Section icon={ListChecks} title="Interventions associées" color="text-emerald-600">
            <div className="grid sm:grid-cols-2 gap-4">
              {test.therapeuticInterventions.exercises.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">Exercices</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-4">
                    {test.therapeuticInterventions.exercises.map((e, i) => (
                      <li key={i} className="leading-relaxed">{e}</li>
                    ))}
                  </ul>
                </div>
              )}
              {test.therapeuticInterventions.education.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">Éducation</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-4">
                    {test.therapeuticInterventions.education.map((e, i) => (
                      <li key={i} className="leading-relaxed">{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Psychométrie */}
        {meta?.psychometrics && (
          <Section icon={Activity} title="Propriétés psychométriques" color="text-blue-600">
            <PsychometricsTable p={meta.psychometrics} />
          </Section>
        )}

        {/* Langues */}
        <Section icon={Globe} title="Langues de validation" color="text-cyan-600">
          {meta?.languages && meta.languages.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {meta.languages.map((l) => (
                <span
                  key={l}
                  className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"
                >
                  {l}
                </span>
              ))}
            </div>
          ) : (
            <NotProvided>Langues non renseignées.</NotProvided>
          )}
        </Section>

        {/* Vidéo */}
        <Section icon={Video} title="Tutoriel vidéo" color="text-rose-600">
          {meta?.youtubeUrl ? (
            <a
              href={meta.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-rose-600 font-semibold hover:underline"
            >
              Voir la vidéo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <NotProvided>Aucune vidéo renseignée.</NotProvided>
          )}
        </Section>

        {/* Références */}
        <Section icon={BookOpen} title="Références scientifiques" color="text-violet-600">
          {test.references && test.references.length > 0 ? (
            <ul className="space-y-2">
              {test.references.map((r, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-violet-600 hover:underline"
                    >
                      {r.title} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-gray-800">{r.title}</span>
                  )}
                  <span className="ml-1 text-xs text-gray-500">
                    ({r.type === 'methodology' ? 'méthodologie' : 'article scientifique'})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <NotProvided>Aucune référence renseignée.</NotProvided>
          )}
        </Section>
      </div>
    </motion.div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: typeof Activity;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-5 border-b border-gray-50 last:border-0">
      <h3 className={`flex items-center gap-2 text-sm font-bold ${color} mb-3 uppercase tracking-wide`}>
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function NotProvided({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 italic">
      <AlertCircle className="w-3.5 h-3.5" /> {children}
    </span>
  );
}

function PrescribeBlock({ test, patientContext }: { test: QuestionnaireDef; patientContext: PatientContext }) {
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePrescribe = () => {
    setError(null);
    startTransition(async () => {
      const res = await createAnonymousSession(patientContext.recordId, [test.id]);
      if (res.success && res.anonymousCode) {
        setCode(res.anonymousCode);
        setLink(`${window.location.origin}/test/${res.anonymousCode}`);
      } else {
        setError(res.error || 'Échec de la création du lien.');
      }
    });
  };

  const copy = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (code && link) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <strong className="text-emerald-900">
            Lien anonyme créé pour {patientContext.patientName}
          </strong>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="px-3 py-1.5 bg-white rounded-lg font-extrabold text-lg tracking-widest text-indigo-700 border border-emerald-200">
            {code}
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition"
          >
            <Copy className="w-3.5 h-3.5" /> {copied ? 'Copié !' : 'Copier le lien'}
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            Ouvrir le lien
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200">
      <div>
        <div className="flex items-center gap-2 font-bold mb-1">
          <ClipboardCheck className="w-5 h-5" /> Prescrire à {patientContext.patientName}
        </div>
        <div className="text-sm text-white/90">Génère un lien anonyme à transmettre au patient.</div>
      </div>
      <button
        onClick={handlePrescribe}
        disabled={isPending}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-indigo-700 font-bold text-sm hover:scale-105 active:scale-100 disabled:opacity-70 transition-transform"
      >
        <Send className="w-4 h-4" /> {isPending ? 'Création…' : 'Générer le lien'}
      </button>
      {error && <div className="w-full text-sm text-white/95">⚠️ {error}</div>}
    </div>
  );
}

function PsychometricsTable({ p }: { p: NonNullable<ReturnType<typeof getMeta>>['psychometrics'] }) {
  if (!p) return null;
  const rows = [
    { label: 'Cohérence interne', value: p.internalConsistency },
    { label: 'Test-retest', value: p.testRetest },
    { label: 'MCID', value: p.mcid },
    { label: 'Validité', value: p.validity },
    { label: 'Sensibilité au changement', value: p.sensitivity },
    { label: 'Populations validées', value: p.populations },
  ].filter((r) => r.value);

  if (rows.length === 0) return <NotProvided>Données psychométriques non renseignées.</NotProvided>;

  return (
    <div className="rounded-xl overflow-hidden border border-gray-100">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid grid-cols-[minmax(140px,200px)_1fr] gap-4 px-4 py-2.5 text-sm ${
            i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
          } ${i > 0 ? 'border-t border-gray-100' : ''}`}
        >
          <div className="font-semibold text-gray-500">{r.label}</div>
          <div className="text-gray-800">{r.value}</div>
        </div>
      ))}
    </div>
  );
}
