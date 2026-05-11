'use client';

import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginAction, signupAction } from './actions';
import { Lock, Mail, Activity, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, null);
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, null);

  const pending = isLogin ? loginPending : signupPending;
  const state = isLogin ? loginState : signupState;
  const action = isLogin ? loginFormAction : signupFormAction;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 opacity-20 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      </div>

      {/* Lien retour accueil */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Accueil
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Carte glassmorphism */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-indigo-200/40 p-8 md:p-10">
          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl">
                <Activity className="w-7 h-7" />
              </div>
            </div>
          </motion.div>

          {/* Titre dynamique */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                {isLogin ? 'Heureux de vous revoir' : 'Créez votre espace'}
              </h1>
              <p className="text-gray-500 text-sm flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                {isLogin ? 'Connectez-vous pour accéder à vos patients' : 'Démarrez en moins d\'une minute'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Formulaire */}
          <form action={action} className="space-y-4">
            {/* Email */}
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email professionnel"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                name="password"
                placeholder={isLogin ? 'Mot de passe' : 'Choisir un mot de passe'}
                required
                minLength={isLogin ? undefined : 6}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Erreur */}
            <AnimatePresence>
              {state?.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">
                    {state.error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="group w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              {pending && <Loader2 className="w-4 h-4 animate-spin" />}
              {pending ? 'Chargement…' : isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          {/* Toggle login / signup */}
          <div className="mt-7 text-center text-sm text-gray-600">
            {isLogin ? "Pas encore de compte ? " : 'Déjà inscrit ? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-indigo-600 hover:text-indigo-700 underline-offset-2 hover:underline"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>

          {/* Trust mention */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-center text-gray-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Sécurisé par Supabase · Données hébergées en Europe
          </div>
        </div>
      </motion.div>
    </main>
  );
}
