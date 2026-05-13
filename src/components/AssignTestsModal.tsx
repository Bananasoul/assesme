'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardList, X, Check, Copy, MessageCircle } from 'lucide-react';
import { createAnonymousSession } from '@/app/actions/anonymousSession';
import { QUESTIONNAIRES } from '@/data/questionnaires';
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  recordId: string;
};

export default function AssignTestsModal({ recordId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Categories for grouping
  const CATEGORIES = [
    { id: 'Lombaire', label: 'Dos (Lombaire)', icon: '🧍', matchTags: ['Lombaire'] },
    { id: 'Cervical', label: 'Cou (Cervicale)', icon: '👤', matchTags: ['Cervical'] },
    { id: 'Épaule', label: 'Épaule / Bras', icon: '💪', matchTags: ['Épaule', 'Membre Supérieur'] },
    { id: 'Genou', label: 'Genou / Hanche', icon: '🦵', matchTags: ['Genou', 'Hanche', 'Membre Inférieur'] },
    { id: 'Neurologique', label: 'Neurologique', icon: '🧠', matchTags: ['Neurologique'] },
    { id: 'Général', label: 'Général / Psycho', icon: '🎯', matchTags: ['Général', 'Psychologique', 'Fonctionnel'] },
  ];

  // Filter tests based on search term (tags selection removed for simpler UI with categories)
  const filteredTests = Object.values(QUESTIONNAIRES).filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Group tests
  const groupedTests = CATEGORIES.map(cat => ({
    ...cat,
    tests: filteredTests.filter(q => q.tags?.some(tag => cat.matchTags.includes(tag)))
  }));
  const unassignedTests = filteredTests.filter(q => !CATEGORIES.some(cat => q.tags?.some(tag => cat.matchTags.includes(tag))));
  if (unassignedTests.length > 0) {
    groupedTests.push({ id: 'Autre', label: 'Autres Bilans', icon: '🧩', matchTags: [], tests: unassignedTests });
  }



  const toggleTest = (id: string) => {
    setSelectedTests(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleCreateRequest = () => {
    if (selectedTests.length === 0) return;
    
    setError(null);
    startTransition(async () => {
      const result = await createAnonymousSession(recordId, selectedTests);
      if (result.error || !result.anonymousCode) {
        setError(result.error || 'Erreur inconnue');
      } else {
        const link = `${window.location.origin}/test/${result.anonymousCode}`;
        setGeneratedLink(link);
        setGeneratedCode(result.anonymousCode);
      }
    });
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="no-print"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'var(--primary)', 
          color: 'var(--surface)', 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        <ClipboardList size={16} />
        Prescrire un bilan
      </button>

      {isOpen && mounted && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(14, 18, 23, 0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="animate-slide-up" style={{ background: 'white', width: '100%', maxWidth: '800px', borderRadius: '1.25rem', border: '1px solid #E5E7EB', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)', padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <button 
              onClick={() => { setIsOpen(false); setGeneratedLink(null); setGeneratedCode(null); setSelectedTests([]); }}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent', border: 'none' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <ClipboardList color="var(--primary)" />
              Ordonnance de bilans
            </h2>

            {error && (
              <div style={{ background: '#F3F4F6', color: '#0E1217', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            {generatedLink ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '1rem 0' }}>
                <div style={{ background: '#F3F4F6', color: '#0E1217', padding: '1rem', borderRadius: '50%' }}>
                  <Check size={48} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>Lien anonyme généré !</h3>
                
                <div style={{ background: 'var(--primary-light)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '2px dashed var(--primary)' }}>
                  <p style={{ color: 'var(--primary-dark)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Code Patient</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>{generatedCode}</div>
                </div>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px', fontSize: '0.875rem' }}>
                  Ce code est strictement anonyme. Le patient ne verra jamais son nom lors du remplissage.
                </p>

                <div style={{ display: 'flex', gap: '3rem', width: '100%', justifyContent: 'center', alignItems: 'center', margin: '1rem 0' }}>
                  {/* QR Code */}
                  <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <QRCodeSVG value={generatedLink} size={150} />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--background)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                      <input type="text" value={generatedLink} readOnly style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-primary)', outline: 'none', minWidth: 0 }} />
                      <button onClick={copyToClipboard} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-hover)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', border: 'none', fontWeight: 500 }}>
                        <Copy size={16} /> Copier
                      </button>
                    </div>

                    <a href={`https://wa.me/?text=${encodeURIComponent(`Bonjour,\n\nVotre praticien vous a prescrit un bilan fonctionnel à remplir.\n\n🔑 Votre code personnel : ${generatedCode}\n🔗 Lien : ${generatedLink}\n\nCe code est strictement confidentiel. Le remplissage est anonyme.\nTemps estimé : 5-10 minutes.`)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#374151', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none' }}>
                      <MessageCircle size={20} />
                      Envoyer par WhatsApp
                    </a>

                    <a href={`mailto:?subject=Votre bilan fonctionnel&body=${encodeURIComponent(`Bonjour,\n\nVotre praticien vous a prescrit un bilan fonctionnel à remplir.\n\n🔑 Votre code personnel : ${generatedCode}\n🔗 Lien : ${generatedLink}\n\nCe code est strictement confidentiel. Le remplissage est anonyme.\nTemps estimé : 5-10 minutes.`)}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none' }}>
                      Envoyer par Email
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => { setIsOpen(false); setGeneratedLink(null); setGeneratedCode(null); setSelectedTests([]); }} style={{ background: 'var(--surface-hover)', color: 'var(--text-primary)', padding: '0.75rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
                {/* Filtres Haut (Recherche & Pilules) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="Rechercher un questionnaire..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                {/* Main area (Tests grouped) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {groupedTests.map(group => {
                    if (group.tests.length === 0) return null;
                    return (
                      <div key={group.id}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                          <span>{group.icon}</span> {group.label}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                          {group.tests.map(q => {
                            const isSelected = selectedTests.includes(q.id);
                            return (
                              <div
                                key={q.id}
                                onClick={() => toggleTest(q.id)}
                                style={{
                                  padding: '1rem',
                                  border: `2px solid ${isSelected ? '#0E1217' : '#E5E7EB'}`,
                                  borderRadius: 'var(--radius-md)',
                                  cursor: 'pointer',
                                  background: isSelected ? '#0E1217' : 'white',
                                  transition: 'all 0.1s',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  color: isSelected ? 'white' : '#0E1217',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                  <h4 style={{ fontWeight: 600, color: 'inherit', fontSize: '0.875rem' }}>{q.title}</h4>
                                  {isSelected && <Check size={16} color="white" style={{ flexShrink: 0, marginLeft: '0.5rem' }} />}
                                </div>

                                {q.clinicalValue && (
                                  <p style={{ fontSize: '0.75rem', color: isSelected ? 'rgba(255,255,255,0.75)' : '#6B7280', margin: '0 0 0.5rem 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                                    {q.clinicalValue}
                                  </p>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                  <p style={{ fontSize: '0.75rem', color: isSelected ? 'rgba(255,255,255,0.75)' : '#6B7280', margin: 0 }}>{q.estimatedTime}</p>
                                  {q.administrationType && (
                                    <span style={{
                                      fontSize: '0.62rem',
                                      padding: '0.2rem 0.55rem',
                                      borderRadius: '9999px',
                                      fontWeight: 700,
                                      letterSpacing: '0.08em',
                                      textTransform: 'uppercase',
                                      background: isSelected ? 'white' : (q.administrationType === 'auto' ? '#F3F4F6' : '#0E1217'),
                                      color: isSelected ? '#0E1217' : (q.administrationType === 'auto' ? '#0E1217' : 'white'),
                                      border: `1px solid ${isSelected ? 'white' : (q.administrationType === 'auto' ? '#E5E7EB' : '#0E1217')}`,
                                    }}>
                                      {q.administrationType === 'auto' ? 'Auto-administré' : q.administrationType === 'therapist' ? 'Thérapeute' : 'Mixte'}
                                    </span>
                                  )}
                                </div>
                                
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                                  {q.tags?.filter(t => !group.matchTags.includes(t)).map(t => <span key={t} style={{ fontSize: '0.65rem', background: isSelected ? 'rgba(255,255,255,0.15)' : '#F3F4F6', color: isSelected ? 'white' : '#374151', padding: '0.15rem 0.4rem', borderRadius: '0.3rem' }}>{t}</span>)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!generatedLink && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {selectedTests.length} test(s) sélectionné(s)
                </span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    style={{ padding: '0.75rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent', border: 'none' }}
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleCreateRequest}
                    disabled={isPending || selectedTests.length === 0}
                    style={{ 
                      padding: '0.75rem 1.5rem', 
                      background: 'var(--primary)', 
                      color: 'var(--surface)', 
                      borderRadius: 'var(--radius-full)', 
                      fontWeight: 600,
                      opacity: (isPending || selectedTests.length === 0) ? 0.7 : 1,
                      cursor: (isPending || selectedTests.length === 0) ? 'not-allowed' : 'pointer',
                      border: 'none'
                    }}
                  >
                    {isPending ? 'Génération...' : 'Générer l\'ordonnance'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
