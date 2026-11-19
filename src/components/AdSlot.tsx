'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdSlotProps {
  position?: 'in-feed' | 'banner';
  id?: string;
}

export function AdSlot({ position = 'in-feed', id }: AdSlotProps) {
  if (position === 'banner') {
    return (
      <aside
        id={id}
        aria-label="Sponsored Partner Banner"
        className="w-full my-6 rounded-xl border border-zinc-800/80 bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-zinc-900 p-4 min-h-[90px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-200">Leonida Customs & Tuning</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 uppercase tracking-wider font-mono">
                Sponsor
              </span>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">
              Upgrade your getaway fleet with high-traction tires and armored glass.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer">
            Visit In-Game Shop <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </span>
        </div>
      </aside>
    );
  }

  // In-Feed Ad Slot (every 8 list items) with strict fixed min-height (110px) to prevent CLS
  return (
    <div
      id={id}
      aria-label="Sponsored In-Feed Announcement"
      className="my-4 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/60 p-4 min-h-[110px] flex flex-col justify-between transition-colors hover:border-zinc-700"
    >
      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono tracking-wider">
        <span className="flex items-center gap-1.5 text-pink-400/80">
          <Sparkles className="w-3.5 h-3.5" />
          VICE CITY SPONSOR
        </span>
        <span className="uppercase text-[10px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
          Ad Slot
        </span>
      </div>
      <div className="my-2">
        <div className="text-sm font-medium text-zinc-300">
          Ammu-Nation Vice City: Tactical Loadouts on Sale
        </div>
        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
          Armor plates, thermal scopes, and heavy explosives. Deliveries available across all Leonida safehouses.
        </p>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-zinc-900 text-[11px] text-zinc-500">
        <span>Zero CLS Guaranteed Container</span>
        <span className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1">
          Catalog Deals <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
