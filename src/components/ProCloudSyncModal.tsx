'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cloud, CheckCircle2, Sparkles, X, Shield, Smartphone, Laptop } from 'lucide-react';

interface ProCloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProCloudSyncModal({ isOpen, onClose }: ProCloudSyncModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);

    // Mock API / Waitlist submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Persist waitlist flag locally
      try {
        localStorage.setItem('leonida_cloud_waitlist_email', email);
      } catch {}
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="cloud-sync-title"
      className="m-auto w-[92vw] max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-0 text-zinc-100 backdrop:bg-black/80 backdrop:backdrop-blur-sm overflow-hidden"
    >
      {/* Top Banner Graphic */}
      <div className="relative p-6 bg-gradient-to-br from-pink-950/60 via-purple-950/40 to-cyan-950/60 border-b border-zinc-800/80">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-cyan-500 flex items-center justify-center text-white mb-3 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <Cloud className="w-6 h-6 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-mono font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          EARLY ACCESS PREVIEW
        </div>

        <h3 id="cloud-sync-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Pro Cloud Sync & Cross-Device Hub
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
          Switch seamlessly between your smartphone, iPad, and desktop browser with zero manual save file exporting.
        </p>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-400 stroke-[2]" />
            <h4 className="text-lg font-bold text-white">You&apos;re on the VIP Waitlist!</h4>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              We&apos;ll notify <span className="text-pink-400 font-semibold">{email}</span> the moment Cloud Sync launches alongside the GTA 6 midnight release.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Done & Return to Tracker
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-200">Phone & Controller</div>
                  <div className="text-zinc-400 text-[11px] mt-0.5">Second-screen mode on OLED phones</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                <Laptop className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-200">Desktop Dual-Screen</div>
                  <div className="text-zinc-400 text-[11px] mt-0.5">Instant sync across all your tabs</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cloud-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                Your Email Address
              </label>
              <input
                ref={inputRef}
                id="cloud-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <Shield className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Zero spam. Local saves always remain 100% free forever.</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Maybe Later
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Join Cloud Sync Beta'}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
