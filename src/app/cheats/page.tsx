'use client';

import React, { useState, useMemo } from 'react';
import { CHEAT_CODES, CheatCategory, CheatCode } from '@/data/trackerData';
import { useTracker } from '@/context/TrackerContext';
import { CheatKeyBadge } from '@/components/CheatKeyBadge';
import { AdSlot } from '@/components/AdSlot';
import {
  AlertTriangle,
  Search,
  Phone,
  Copy,
  Check,
  Gamepad2,
  Sparkles,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

const CATEGORIES_LIST: ('All' | CheatCategory)[] = [
  'All',
  'Player & Health',
  'Wanted Level',
  'Vehicles & Spawns',
  'Weapons & World',
];

export default function CheatsPage() {
  const { preferredPlatform, setPreferredPlatform } = useTracker();
  const [selectedCategory, setSelectedCategory] = useState<'All' | CheatCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCheats = useMemo(() => {
    return CHEAT_CODES.filter((cheat) => {
      // Category filter
      if (selectedCategory !== 'All' && cheat.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = cheat.title.toLowerCase().includes(q);
        const matchesDesc = cheat.description.toLowerCase().includes(q);
        const matchesPhone = cheat.phoneDialCode?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesPhone) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPhone = (cheat: CheatCode) => {
    if (cheat.phoneDialCode) {
      navigator.clipboard.writeText(cheat.phoneDialCode);
      setCopiedId(cheat.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Cheats Hero Header */}
      <div className="relative rounded-3xl border border-zinc-800 bg-[#121216] p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-1">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>OFFICIAL CONTROLLER COMBOS & PHONE NUMBERS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              GTA 6 <span className="text-gradient-cyan">PS5 & Xbox Cheat Codes</span> Directory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Instant button inputs for health, weapons, supercars, attack helicopters, and wanted level control. Visual keycaps rendered specifically for your active gamepad.
            </p>
          </div>

          {/* Platform Switcher Pill (Persisted in state) */}
          <div className="shrink-0 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-inner flex items-center gap-1.5 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => setPreferredPlatform('ps5')}
              className={`flex-1 sm:flex-none min-h-[46px] px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                preferredPlatform === 'ps5'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
              <span>PlayStation 5</span>
            </button>

            <button
              type="button"
              onClick={() => setPreferredPlatform('xbox')}
              className={`flex-1 sm:flex-none min-h-[46px] px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                preferredPlatform === 'xbox'
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
              <span>Xbox Series X|S</span>
            </button>
          </div>
        </div>
      </div>

      {/* Warning Alert Banner (Achievements & Trophies Disabled) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-600/40 flex items-start gap-3.5 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300 font-mono text-sm uppercase tracking-wider">
            Important: Trophies & Achievements Warning
          </div>
          <p className="text-amber-200/90 leading-relaxed text-xs">
            Entering controller button cheats or cell phone numbers disables PlayStation Trophies and Xbox Achievements for the current game session. To resume earning trophies, reload a clean manual save created prior to entering cheats.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-mono whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white font-bold shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Instant Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter cheats (e.g. Health, Supercar)..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Cheats Grid */}
      <div className="space-y-4">
        {filteredCheats.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-2">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-zinc-700 mb-2" />
            <h3 className="text-base font-bold text-white">No cheat codes found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              No cheats match &quot;{searchQuery}&quot;. Try clearing your search keyword.
            </p>
          </div>
        ) : (
          filteredCheats.map((cheat, index) => {
            const buttons = preferredPlatform === 'ps5' ? cheat.ps5Code : cheat.xboxCode;

            return (
              <React.Fragment key={cheat.id}>
                <article className="p-4 sm:p-5 rounded-2xl bg-[#121216] border border-zinc-800/90 hover:border-zinc-700 hover:bg-[#15151c] transition-all space-y-3.5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {cheat.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-cyan-400">
                          {cheat.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {cheat.description}
                      </p>
                    </div>

                    {cheat.phoneDialCode && (
                      <button
                        type="button"
                        onClick={() => handleCopyPhone(cheat)}
                        className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                        title="Copy in-game cellphone dial code"
                      >
                        <Phone className="w-3.5 h-3.5 text-pink-400" />
                        <span>{copiedId === cheat.id ? 'Copied Dial Code!' : cheat.phoneDialCode}</span>
                        {copiedId === cheat.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                        ) : (
                          <Copy className="w-3 h-3 text-zinc-500 ml-1" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Controller Button Keycaps Row */}
                  <div className="pt-2 border-t border-zinc-800/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        {preferredPlatform === 'ps5' ? 'DualSense (PS5) Sequence:' : 'Xbox Wireless Controller Sequence:'}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Input fast without pausing
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {buttons.map((btn, bIdx) => (
                        <CheatKeyBadge
                          key={`${cheat.id}-${bIdx}`}
                          button={btn}
                          platform={preferredPlatform}
                        />
                      ))}
                    </div>
                  </div>
                </article>

                {/* In-Feed ad slot every 6 cheats */}
                {(index + 1) % 6 === 0 && index !== filteredCheats.length - 1 && (
                  <AdSlot position="in-feed" id={`cheat-infeed-${index}`} />
                )}
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
