import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import HomeManifesto from '@/components/home/HomeManifesto';
import HomeCTA from '@/components/home/HomeCTA';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ============ HEADER STICKY ============ */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">AssesMe</span>
          </div>
          <Link
            href="/practitioner"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all"
          >
            Espace praticien
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      {/* ============ SECTIONS ============ */}
      <HomeHero />
      <HomeManifesto />
      <HomeCTA />

      {/* ============ FOOTER ============ */}
      <footer className="py-10 px-6 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© {new Date().getFullYear()} AssesMe — Plateforme de métrologie clinique pour la kinésithérapie.</p>
      </footer>
    </main>
  );
}
