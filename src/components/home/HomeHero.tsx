'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, ArrowRight, Sparkles } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-6">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 opacity-20 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-96 rounded-full bg-gradient-to-tr from-emerald-300 to-cyan-300 opacity-15 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-semibold text-indigo-900 tracking-wide">
            Pour kinésithérapeutes · OMT · TMO
          </span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05] mb-6"
        >
          La métrologie clinique{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            sans charge mentale
          </span>
          .
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Mesurez, décidez, éduquez — sur la base de <strong className="font-semibold text-gray-900">preuves scientifiques</strong>,
          pas d'intuitions. <span className="text-indigo-600 font-medium">32 questionnaires validés</span> intégrés
          à votre raisonnement clinique.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/practitioner/login"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            Commencer maintenant
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#manifeste"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-gray-900 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Découvrir l'approche
          </a>
        </motion.div>

        {/* Mini-stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: '32', label: 'questionnaires validés' },
            { value: '11', label: 'zones anatomiques' },
            { value: '5 min', label: 'pour assigner un bilan' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
