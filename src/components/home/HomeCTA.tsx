'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/40" />
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Faites de chaque séance une{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            décision éclairée
          </span>
          .
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
          Créez votre espace praticien en moins d'une minute.
          <br />
          <span className="text-gray-500 text-base">Aucune carte bancaire requise.</span>
        </p>
        <Link
          href="/practitioner/login"
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-semibold text-lg shadow-xl hover:bg-gray-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
        >
          Commencer maintenant
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
