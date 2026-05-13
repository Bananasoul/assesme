'use client';

import React, { useState, useMemo, useTransition, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  X,
  Search,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Send,
  Check,
  Copy,
  MessageCircle,
  Plus,
  Sparkles,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import BodyChart from '@/components/library/BodyChart';
import { BodyPartKey, BODY_PART_LABELS, QUESTIONNAIRE_META, getMeta } from '@/data/questionnaires-meta';
import { questionnaires, QuestionnaireDef } from '@/data/questionnaires';
import { createPatient } from '@/app/practitioner/actions';
import { createAnonymousSession } from '@/app/actions/anonymousSession';

type PatientLite = {
  id: string;
  identifier: string | null;
  firstName: string | null;
  lastName: string | null;
  clinicalRecord: { id: string } | null;
};

type Props = {
  patients: PatientLite[];
};

type Step = 1 | 2 | 3 | 4;

export default function NewBilanWizard({ patients }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // State step 1
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState('');

  // State step 2
  const [zone, setZone] = useState<BodyPartKey | null>(null);

  // State step 3
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);

  // State step 4 (result)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const reset = () => {
    setStep(1);
    setSelectedPatientId(null);
    setShowCreateForm(false);
    setSearch('');
    setZone(null);
    setSelectedTestIds([]);
    setGeneratedCode(null);
    setGeneratedLink(null);
    setError(null);
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(reset, 300);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) ?? null;

  const filteredPatients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return patients.slice(0, 8);
    return patients
      .filter((p) =>
        [p.identifier, p.firstName, p.lastName]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q)),
      )
      .slice(0, 12);
  }, [patients, search]);

  const filteredTests = useMemo(() => {
    if (!zone) return [];
    return questionnaires.filter((t) => QUESTIONNAIRE_META[t.id]?.bodyParts.includes(zone));
  }, [zone]);

  const canGoNext = (): boolean => {
    if (step === 1) return !!selectedPatient?.clinicalRecord;
    if (step === 2) return !!zone;
    if (step === 3) return selectedTestIds.length > 0;
    return false;
  };

  const next = () => {
    if (step < 3) {
      setStep((step + 1) as Step);
    } else if (step === 3) {
      // Step 3 → 4 : génération du lien
      if (!selectedPatient?.clinicalRecord) return;
      setError(null);
      startTransition(async () => {
        const res = await createAnonymousSession(selectedPatient.clinicalRecord!.id, selectedTestIds);
        if (res.success && res.anonymousCode) {
          setGeneratedCode(res.anonymousCode);
          setGeneratedLink(`${window.location.origin}/test/${res.anonymousCode}`);
          setStep(4);
        } else {
          setError(res.error || 'Erreur génération du lien.');
        }
      });
    }
  };

  const back = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const patientLabel = (p: PatientLite) => {
    const name = [p.firstName, p.lastName].filter(Boolean).join(' ');
    return name ? `${name} · ${p.identifier ?? '—'}` : (p.identifier ?? '—');
  };

  const copyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Portail monté seulement côté client (SSR-safe)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const trigger = (
    <button
      onClick={() => setIsOpen(true)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 1.75rem',
        background: 'var(--primary)',
        color: 'white',
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: 'var(--shadow-md)',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.15s',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Plus size={20} />
      Nouveau bilan
    </button>
  );

  if (!isOpen || !mounted) {
    return trigger;
  }

  const modal = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(14, 18, 23, 0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          background: 'white',
          borderRadius: '1.25rem',
          border: '1px solid #E5E7EB',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* HEADER avec progression */}
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Nouveau bilan</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>· Étape {step}/4</span>
          </div>
          <button
            onClick={close}
            aria-label="Fermer"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: 'var(--surface-hover)', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(step / 4) * 100}%`,
              height: '100%',
              background: 'var(--primary)',
              transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
          {/* ============ STEP 1 : PATIENT ============ */}
          {step === 1 && (
            <Step1Patient
              patients={patients}
              filteredPatients={filteredPatients}
              search={search}
              setSearch={setSearch}
              selectedPatientId={selectedPatientId}
              setSelectedPatientId={setSelectedPatientId}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
              patientLabel={patientLabel}
              onCreated={(id) => {
                setSelectedPatientId(id);
                setShowCreateForm(false);
                router.refresh();
              }}
            />
          )}

          {/* ============ STEP 2 : ZONE ============ */}
          {step === 2 && (
            <Step2Zone zone={zone} setZone={setZone} />
          )}

          {/* ============ STEP 3 : TEST ============ */}
          {step === 3 && (
            <Step3Tests
              zone={zone}
              tests={filteredTests}
              selectedIds={selectedTestIds}
              setSelectedIds={setSelectedTestIds}
            />
          )}

          {/* ============ STEP 4 : ENVOI ============ */}
          {step === 4 && generatedCode && generatedLink && selectedPatient && (
            <Step4Send
              patient={selectedPatient}
              patientLabel={patientLabel(selectedPatient)}
              code={generatedCode}
              link={generatedLink}
              copied={copied}
              onCopy={copyLink}
            />
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--background)',
          }}
        >
          {error && (
            <div style={{ color: '#0E1217', fontSize: '0.85rem', fontWeight: 600 }}>⚠ {error}</div>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
            {step > 1 && step < 4 && (
              <button
                onClick={back}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.25rem',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: 'none',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} /> Précédent
              </button>
            )}
            {step < 3 && (
              <button
                onClick={next}
                disabled={!canGoNext()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.5rem',
                  background: canGoNext() ? 'var(--primary)' : 'var(--surface-hover)',
                  color: canGoNext() ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  cursor: canGoNext() ? 'pointer' : 'not-allowed',
                }}
              >
                Suivant <ChevronRight size={16} />
              </button>
            )}
            {step === 3 && (
              <button
                onClick={next}
                disabled={!canGoNext() || isPending}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.5rem',
                  background: canGoNext() ? 'var(--primary)' : 'var(--surface-hover)',
                  color: canGoNext() ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  cursor: canGoNext() ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={16} /> {isPending ? 'Génération…' : 'Générer le lien'}
              </button>
            )}
            {step === 4 && (
              <button
                onClick={close}
                style={{
                  padding: '0.65rem 1.5rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {trigger}
      {createPortal(modal, document.body)}
    </>
  );
}

// ===================================================================
// STEP 1 — Sélection / création patient
// ===================================================================
function Step1Patient({
  patients,
  filteredPatients,
  search,
  setSearch,
  selectedPatientId,
  setSelectedPatientId,
  showCreateForm,
  setShowCreateForm,
  patientLabel,
  onCreated,
}: {
  patients: PatientLite[];
  filteredPatients: PatientLite[];
  search: string;
  setSearch: (s: string) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  showCreateForm: boolean;
  setShowCreateForm: (b: boolean) => void;
  patientLabel: (p: PatientLite) => string;
  onCreated: (id: string) => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          1. À qui ce bilan est-il destiné ?
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Choisissez un patient existant ou créez-en un nouveau (l'identifiant suffit).
        </p>
      </div>

      {!showCreateForm && (
        <>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Rechercher par identifiant ou nom…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '0.7rem 0.85rem 0.7rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--background)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Patient list */}
          {filteredPatients.length > 0 ? (
            <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
              {filteredPatients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: selectedPatientId === p.id ? 'var(--primary-light)' : 'var(--surface)',
                    color: selectedPatientId === p.id ? 'white' : 'var(--text-primary)',
                    border: `1px solid ${selectedPatientId === p.id ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: selectedPatientId === p.id ? 600 : 500,
                  }}
                >
                  <span>{patientLabel(p)}</span>
                  {selectedPatientId === p.id && <Check size={18} />}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
              {patients.length === 0 ? 'Aucun patient. Créez votre premier dossier ci-dessous.' : 'Aucun patient ne correspond à votre recherche.'}
            </div>
          )}

          {/* Bouton créer */}
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1rem',
              background: 'transparent',
              color: 'var(--primary)',
              border: '1px dashed var(--primary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            <UserPlus size={16} /> Créer un nouveau patient
          </button>
        </>
      )}

      {showCreateForm && <InlineCreatePatient onCreated={onCreated} onCancel={() => setShowCreateForm(false)} />}
    </div>
  );
}

function InlineCreatePatient({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const res = await createPatient(data);
    if (res.error) {
      setError(res.error);
      setSubmitting(false);
    } else if (res.patientId) {
      onCreated(res.patientId);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '1.25rem',
        background: 'var(--background)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Nouveau patient</h4>
        <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}>
          Annuler
        </button>
      </div>

      {error && (
        <div style={{ padding: '0.6rem 0.75rem', background: '#F3F4F6', color: '#0E1217', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #E5E7EB' }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Identifiant <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <input
          name="identifier"
          required
          autoFocus
          placeholder="Ex: MD78, Patient #42…"
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            marginTop: '0.3rem',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <input name="firstName" placeholder="Prénom (optionnel)" style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }} />
        <input name="lastName" placeholder="Nom (optionnel)" style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }} />
      </div>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <input type="email" name="email" placeholder="Email patient (optionnel)" style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }} />
        <input type="date" name="dateOfBirth" style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '0.65rem 1rem',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontWeight: 600,
          cursor: 'pointer',
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? 'Création…' : 'Créer et continuer'}
      </button>
    </form>
  );
}

// ===================================================================
// STEP 2 — Choix de la zone anatomique
// ===================================================================
function Step2Zone({ zone, setZone }: { zone: BodyPartKey | null; setZone: (z: BodyPartKey) => void }) {
  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          2. Quelle zone évaluer ?
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Cliquez sur une partie du corps ou choisissez une catégorie ci-dessous.
        </p>
      </div>
      <div style={{ maxWidth: '380px', margin: '0 auto' }}>
        <BodyChart selected={zone} onSelect={setZone} />
      </div>
      {zone && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '0.85rem 1rem',
            background: 'var(--primary-light)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Zone : {BODY_PART_LABELS[zone]}
        </div>
      )}
    </div>
  );
}

// ===================================================================
// STEP 3 — Sélection des tests (avec questions cliniques visibles)
// ===================================================================
function Step3Tests({
  zone,
  tests,
  selectedIds,
  setSelectedIds,
}: {
  zone: BodyPartKey | null;
  tests: QuestionnaireDef[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
}) {
  const toggle = (id: string) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          3. Quel(s) test(s) prescrire ?
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Pour chaque test, la <strong>question clinique principale</strong> qu'il résout est affichée. Vous pouvez en sélectionner plusieurs.
        </p>
      </div>

      {tests.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
          Aucun test pour cette zone.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {tests.map((t) => {
            const meta = getMeta(t.id);
            const firstQ = meta?.clinicalQuestions?.[0];
            const isSel = selectedIds.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1rem 1.15rem',
                  background: isSel ? '#F9FAFB' : 'var(--surface)',
                  border: `1.5px solid ${isSel ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                {/* Checkbox visuelle */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    background: isSel ? 'var(--primary)' : 'transparent',
                    border: `2px solid ${isSel ? 'var(--primary)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    transition: 'all 0.15s',
                  }}
                >
                  {isSel && <Check size={14} color="white" strokeWidth={3} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{t.title}</strong>
                    {t.estimatedTime && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>⏱ {t.estimatedTime}</span>
                    )}
                  </div>
                  {firstQ && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.4rem',
                        padding: '0.5rem 0.65rem',
                        background: '#F3F4F6',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.45,
                      }}
                    >
                      <Sparkles size={12} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span><strong style={{ color: 'var(--primary)' }}>Pour savoir :</strong> {firstQ}</span>
                    </div>
                  )}
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.45 }}>
                    {t.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedIds.length > 0 && (
        <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'var(--primary-light)', color: 'white', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
          {selectedIds.length} test(s) sélectionné(s) — prêt à envoyer
        </div>
      )}
    </div>
  );
}

// ===================================================================
// STEP 4 — Envoi (lien + QR + actions)
// ===================================================================
function Step4Send({
  patient,
  patientLabel,
  code,
  link,
  copied,
  onCopy,
}: {
  patient: PatientLite;
  patientLabel: string;
  code: string;
  link: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const whatsappMsg = encodeURIComponent(
    `Bonjour,\n\nVotre praticien vous a prescrit un bilan fonctionnel.\n\n🔑 Code : ${code}\n🔗 Lien : ${link}\n\nLe remplissage est anonyme et rapide.\n`,
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', padding: '1rem', background: '#F3F4F6', color: '#0E1217', borderRadius: '50%', marginBottom: '1rem', border: '1px solid #E5E7EB' }}>
        <Check size={32} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
        Bilan créé !
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Pour <strong>{patientLabel}</strong>
      </p>

      {/* Code */}
      <div
        style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          background: 'var(--primary-light)',
          borderRadius: 'var(--radius-md)',
          border: '2px dashed var(--primary)',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Code patient
        </p>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>
          {code}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        {/* QR */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <QRCodeSVG value={link} size={140} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={onCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1rem',
              background: copied ? '#0E1217' : 'var(--surface-hover)',
              color: copied ? 'white' : 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Copy size={14} /> {copied ? 'Copié !' : 'Copier le lien'}
          </button>
          <a
            href={`https://wa.me/?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1rem',
              background: '#374151',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
            }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a
            href={`mailto:?subject=Votre bilan fonctionnel&body=${whatsappMsg}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1rem',
              background: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
            }}
          >
            Email
          </a>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Le patient peut scanner le QR code en cabinet ou recevoir le lien à distance.
      </p>
    </div>
  );
}
