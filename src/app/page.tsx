'use client';

import React from 'react';
import { HeroProgressSummary } from '@/components/HeroProgressSummary';
import { QuickJumpGrid } from '@/components/QuickJumpGrid';
import { ChecklistItemCard } from '@/components/ChecklistItemCard';
import { AdSlot } from '@/components/AdSlot';
import { useTracker } from '@/context/TrackerContext';
import { TRACKER_ITEMS, REGIONS, Region } from '@/data/trackerData';
import {
  Pin,
  MapPin,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { pinnedIds, completedIds } = useTracker();

  // Get pinned items
  const pinnedItems = TRACKER_ITEMS.filter((item) => pinnedIds.has(item.id));

  // Compute items count per region
  const regionCounts = REGIONS.map((region: Region) => {
    const items = TRACKER_ITEMS.filter((item) => item.region === region);
    const completed = items.filter((item) => completedIds.has(item.id)).length;
    return {
      region,
      total: items.length,
      completed,
      pct: items.length > 0 ? Math.round((completed / items.length) * 100) : 0,
    };
  });

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 1. Grand Hero & Category Summary Breakdown */}
      <HeroProgressSummary />

      {/* 2. Pinned Items Section (Visible when user has pinned items) */}
      {pinnedItems.length > 0 && (
        <section aria-labelledby="pinned-items-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Pin className="w-4 h-4 fill-pink-400" />
              </div>
              <div>
                <h2 id="pinned-items-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Pinned Focus Queue ({pinnedItems.length})
                </h2>
                <p className="text-xs text-zinc-400">
                  Your active controller targets pinned for immediate access.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pinnedItems.map((item) => (
              <ChecklistItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Quick-Access Jump Grid */}
      <QuickJumpGrid />

      {/* 4. Non-Intrusive Sponsored Banner (Fixed Min-Height / Zero CLS) */}
      <AdSlot position="banner" id="home-sponsor-banner" />

      {/* 5. Region Completion Breakdown (Vice City & State of Leonida) */}
      <section aria-labelledby="regions-title" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="regions-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
              Leonida Geographic Zones
            </h2>
            <p className="text-xs text-zinc-400">
              Track progression across metropolitan Vice City, the Keys, and the bayous.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {regionCounts.map((r) => (
            <div
              key={r.region}
              className="p-3.5 rounded-2xl bg-[#121216] border border-zinc-800/80 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{r.region}</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                {r.completed} <span className="text-xs text-zinc-400 font-normal">/ {r.total}</span>
              </div>
              <div className="mt-2 w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <div className="mt-1 text-right text-[10px] font-mono text-zinc-400">{r.pct}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Use Leonida 100% (SEO & Second Screen Value) */}
      <section aria-labelledby="features-title" className="rounded-3xl border border-zinc-800 bg-[#121216]/60 p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>BUILT FOR CONSOLE GAMERS</span>
          </div>
          <h2 id="features-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Ultimate Second-Screen GTA 6 Companion
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Designed from day one to sit propped up on your coffee table or phone stand while your hands are on the DualSense or Xbox Wireless Controller.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Spoiler-Shield Engine</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Never have story endings or secret twist cameos ruined while looking up weapon caches. Titles and plot hints remain safely blurred until you deliberately tap to reveal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Thumb-Friendly 48px Ergonomics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every checkbox and filter pill exceeds touch-target standards. Tick off collectibles with one hand without setting your controller down.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Zero Account Friction</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Start checking off items immediately. Everything persists securely in local browser storage with instant one-click JSON backup export and restore.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Structured FAQ) */}
      <section aria-labelledby="faq-title" className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-pink-400" />
          <h2 id="faq-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#121216] border border-zinc-800 space-y-1.5">
            <h3 className="text-sm font-semibold text-zinc-200">
              How does this companion app save my 100% progress?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All progress is saved in your device&apos;s client-side `localStorage`. There is no mandatory account sign-up. Use the Backup Save button in the footer to download a portable `.json` file anytime.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#121216] border border-zinc-800 space-y-1.5">
            <h3 className="text-sm font-semibold text-zinc-200">
              Do GTA 6 cheat codes disable Trophies and Achievements?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. As with previous Grand Theft Auto titles, activating controller cheats disables PlayStation Trophies and Xbox Achievements for the current session. Always create a backup save first!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#121216] border border-zinc-800 space-y-1.5">
            <h3 className="text-sm font-semibold text-zinc-200">
              How do I install this on my iPhone or Android?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              In Safari on iOS, tap the Share icon and select &quot;Add to Home Screen&quot;. On Android Chrome, tap the menu and select &quot;Install App&quot;. This unlocks a full-screen, OLED dark mode experience without browser address bars.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#121216] border border-zinc-800 space-y-1.5">
            <h3 className="text-sm font-semibold text-zinc-200">
              How can community members submit new secrets and coordinates?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The companion is built with modular data files inside `/src/data/trackerData.ts`. New stunt jumps, easter eggs, and verified GPS coordinates can be contributed via open source pull requests.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
