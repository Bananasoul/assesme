'use client';

import { useState } from 'react';
import { UserPlus, X, Info } from 'lucide-react';
import { createPatient } from '@/app/practitioner/actions';
import { useRouter } from 'next/navigation';

type Props = {
  /** Label personnalisé pour le bouton déclencheur. Si non défini, "Nouveau patient". */
  triggerLabel?: string;
  /** Style minimaliste sans bouton primary (utilisé dans un contexte autre). */
  minimal?: boolean;
  /** Callback après création — si défini, court-circuite la navigation par défaut. */
  onCreated?: (patientId: string) => void;
};

export default function NewPatientModal({ triggerLabel, minimal = false, onCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createPatient(formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      setIsOpen(false);
      setIsSubmitting(false);
      if (result.patientId) {
        if (onCreated) {
          onCreated(result.patientId);
        } else {
          router.push(`/practitioner/patient-history?id=${result.patientId}`);
        }
      }
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={
          minimal
            ? {
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: 'var(--primary)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                cursor: 'pointer',
              }
            : {
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                boxShadow: 'var(--shadow-md)',
                border: 'none',
                cursor: 'pointer',
              }
        }
      >
        <UserPlus size={18} />
        {triggerLabel ?? 'Nouveau patient'}
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
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
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          width: '100%',
          maxWidth: '520px',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={22} color="var(--primary)" />
          Nouveau patient
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Seul l'identifiant est obligatoire. Vous pourrez compléter le reste plus tard.
        </p>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              background: '#F3F4F6',
              color: '#0E1217',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Identifier OBLIGATOIRE */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
              Identifiant <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              name="identifier"
              required
              autoFocus
              placeholder="Ex: MD78, Patient #42, JD-cervical…"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                fontSize: '0.95rem',
                background: 'var(--background)',
              }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
              <Info size={12} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                Sert à retrouver le patient dans votre espace. Peut être un pseudo (RGPD-friendly) ou des
                initiales + année (« MD78 ») — vous restez responsable de la correspondance avec les
                identités réelles.
              </span>
            </p>
          </div>

          {/* Champs OPTIONNELS */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Prénom <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>(optionnel)</span>
              </label>
              <input
                name="firstName"
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Nom <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>(optionnel)</span>
              </label>
              <input
                name="lastName"
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Email patient <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>(optionnel)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Si vide, vous transmettrez le lien par QR/SMS"
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Date de naissance <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>(optionnel)</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Notes privées <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>(optionnel)</span>
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Ex: lombalgie chronique, sportif, suivi cabinet collègue…"
              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ padding: '0.65rem 1.25rem', color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.65rem 1.5rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Création…' : 'Créer le dossier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
