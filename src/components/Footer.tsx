'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTracker } from '@/context/TrackerContext';
import { Download, Upload, Shield, Smartphone, Heart, Sparkles, FileJson } from 'lucide-react';
import { ImportExportModal } from './ImportExportModal';

export function Footer() {
  const { exportSave } = useTracker();
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  return (
    <>
      <footer className="w-full border-t border-zinc-800/80 bg-[#09090B] mt-16 pt-8 pb-14 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Mobile-Friendly Backup / Restore Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-zinc-200 text-sm">
                  Never Lose Your Progress: Offline Local Backups
                </div>
                <div className="text-zinc-400 text-xs mt-0.5">
                  Export your full save as a lightweight JSON file anytime or restore an existing backup.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={exportSave}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold transition-all shadow-[0_0_12px_rgba(236,72,153,0.3)] flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Save (.json)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBackupOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold border border-zinc-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>Import Save</span>
              </button>
            </div>
          </div>

          {/* Quick links & PWA notice */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-zinc-900">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white text-sm">LEONIDA // 100%</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  PWA Ready
                </span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
                Engineered specifically as a companion second screen for smartphones while playing Grand Theft Auto VI on PlayStation 5 and Xbox Series X|S. No sign-in required, zero layout shifts.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                <Smartphone className="w-3.5 h-3.5 text-pink-400" />
                <span>Tip: Tap &quot;Add to Home Screen&quot; in Safari/Chrome for full-screen OLED HUD</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-zinc-300 uppercase tracking-wider text-xs">
                Quick Navigation
              </div>
              <ul className="space-y-1.5 text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-pink-400 transition-colors">
                    Dashboard Overview
                  </Link>
                </li>
                <li>
                  <Link href="/cheats" className="hover:text-cyan-400 transition-colors">
                    PS5 & Xbox Cheats
                  </Link>
                </li>
                <li>
                  <Link href="/tracker/collectibles" className="hover:text-purple-400 transition-colors">
                    Collectibles & Caches
                  </Link>
                </li>
                <li>
                  <Link href="/tracker/trophies" className="hover:text-amber-400 transition-colors">
                    Trophies & 1,000G
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-zinc-300 uppercase tracking-wider text-xs">
                Features & Integrity
              </div>
              <ul className="space-y-1.5 text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Spoiler-Shield Active</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Zero CLS Guaranteed</span>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsBackupOpen(true)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Save File Manager
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="pt-4 border-t border-zinc-900 text-[11px] text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>
              GTA 6, Vice City, and Leonida are registered trademarks of Rockstar Games & Take-Two Interactive Software. This companion application is an independent, community-driven fan project not affiliated with or endorsed by Rockstar Games.
            </p>
            <div className="flex items-center gap-1 shrink-0 text-zinc-400 font-mono">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span>for GTA fans</span>
            </div>
          </div>
        </div>
      </footer>

      <ImportExportModal isOpen={isBackupOpen} onClose={() => setIsBackupOpen(false)} />
    </>
  );
}
