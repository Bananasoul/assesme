'use client';

import React, { useState, useTransition } from 'react';
import { ClipboardList, X, Check, Copy, MessageCircle } from 'lucide-react';
import { createAssessmentRequest } from '@/app/actions/assessmentRequests';
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
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique tags and force base categories
  const baseTags = ['Orthopédique', 'Neurologique', 'Vestibulaire', 'Général'];
  const extractedTags = Array.from(new Set(Object.values(QUESTIONNAIRES).flatMap(q => q.tags || [])));
  const allTags = Array.from(new Set([...baseTags, ...extractedTags])).sort();

  // Filter tests based on selected tags and search term
  const filteredTests = Object.values(QUESTIONNAIRES).filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => q.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleTest = (id: string) => {
    setSelectedTests(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleCreateRequest = () => {
    if (selectedTests.length === 0) return;
    
    setError(null);
    startTransition(async () => {
      const result = await createAssessmentRequest(recordId, selectedTests);
      if (result.error || !result.requestId) {
        setError(result.error || 'Erreur inconnue');
      } else {
        const link = `${window.location.origin}/fill?requestId=${result.requestId}`;
        setGeneratedLink(link);
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

      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="animate-slide-up" style={{ background: 'var(--surface)', width: '100%', maxWidth: '800px', borderRadius: 'var(--radius-lg)', padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <button 
              onClick={() => { setIsOpen(false); setGeneratedLink(null); setSelectedTests([]); setSelectedTags([]); }}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent', border: 'none' }}
            >
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <ClipboardList color="var(--primary)" />
              Ordonnance de bilans
            </h2>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            {generatedLink ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '1rem 0' }}>
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '1rem', borderRadius: '50%' }}>
                  <Check size={48} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>Ordonnance générée avec succès !</h3>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '500px' }}>
                  Faites scanner ce QR Code à votre patient, ou envoyez-lui le lien directement sur son smartphone.
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

                    <a href={`https://wa.me/?text=${encodeURIComponent(`Bonjour, voici le lien sécurisé pour accéder à vos questionnaires de suivi à remplir avant notre prochaine séance : ${generatedLink}`)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#25D366', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none' }}>
                      <MessageCircle size={20} />
                      Envoyer par WhatsApp
                    </a>

                    <a href={`mailto:?subject=Vos questionnaires de suivi Kinésithérapie&body=Bonjour,%0A%0AVoici le lien sécurisé pour accéder à vos questionnaires de suivi à remplir avant notre prochaine séance :%0A%0A${generatedLink}%0A%0AÀ très vite !`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none' }}>
                      Envoyer par Email
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => { setIsOpen(false); setGeneratedLink(null); setSelectedTests([]); setSelectedTags([]); }} style={{ background: 'var(--surface-hover)', color: 'var(--text-primary)', padding: '0.75rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {allTags.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                            background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                            color: isSelected ? 'var(--primary-dark)' : 'var(--text-secondary)',
                            transition: 'all 0.2s'
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main area (Tests) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {filteredTests.map(q => {
                      const isSelected = selectedTests.includes(q.id);
                      return (
                        <div 
                          key={q.id} 
                          onClick={() => toggleTest(q.id)}
                          style={{ 
                            padding: '1rem', 
                            border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`, 
                            borderRadius: 'var(--radius-md)', 
                            cursor: 'pointer',
                            background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                            transition: 'all 0.1s',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <h4 style={{ fontWeight: 600, color: isSelected ? 'var(--primary-dark)' : 'var(--text-primary)', fontSize: '0.875rem' }}>{q.title}</h4>
                            {isSelected && <Check size={16} color="var(--primary-dark)" style={{ flexShrink: 0, marginLeft: '0.5rem' }} />}
                          </div>
                          
                          {q.clinicalValue && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                              {q.clinicalValue}
                            </p>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{q.estimatedTime}</p>
                            {q.administrationType && (
                              <span style={{ 
                                fontSize: '0.65rem', 
                                padding: '0.15rem 0.4rem', 
                                borderRadius: 'var(--radius-full)', 
                                fontWeight: 600,
                                background: q.administrationType === 'auto' ? '#E0E7FF' : '#FEF3C7',
                                color: q.administrationType === 'auto' ? '#3730A3' : '#92400E'
                              }}>
                                {q.administrationType === 'auto' ? 'Auto-administré' : q.administrationType === 'therapist' ? 'Thérapeute' : 'Mixte'}
                              </span>
                            )}
                          </div>
                          
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                            {q.tags?.map(t => <span key={t} style={{ fontSize: '0.65rem', background: 'var(--background)', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>{t}</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
        </div>
      )}
    </>
  );
}
