'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, Compass, Award, Swords, MapPin, Zap } from 'lucide-react';

export function QuickJumpGrid() {
  const jumpCards = [
    {
      title: 'PS5 & Xbox Cheats',
      subtitle: 'Button combos, health, weapons & spawns',
      href: '/cheats',
      icon: Gamepad2,
      badge: 'Interactive Badges',
      accent: 'border-cyan-500/30 hover:border-cyan-500/70',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      title: 'Collectibles & USBs',
      subtitle: 'Smuggler caches, vintage vinyl & mural tags',
      href: '/tracker/collectibles',
      icon: Compass,
      badge: 'GPS Coordinates',
      accent: 'border-purple-500/30 hover:border-purple-500/70',
      iconBg: 'bg-purple-500/10 text-purple-400',
    },
    {
      title: 'Main Story & Gold Medals',
      subtitle: 'Mission time limits & precision objectives',
      href: '/tracker/story-missions',
      icon: Swords,
      badge: 'Lucia & Jason',
      accent: 'border-pink-500/30 hover:border-pink-500/70',
      iconBg: 'bg-pink-500/10 text-pink-400',
    },
    {
      title: 'Platinum & 1,000G Roadmap',
      subtitle: 'Track trophy criteria & secret unlock conditions',
      href: '/tracker/trophies',
      icon: Award,
      badge: '100% Kingpin',
      accent: 'border-amber-500/30 hover:border-amber-500/70',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    {
      title: 'Unique Stunt Jumps',
      subtitle: 'Drawbridges, ramps & rooftop launches',
      href: '/tracker/stunt-jumps',
      icon: Zap,
      badge: 'All 6 Regions',
      accent: 'border-rose-500/30 hover:border-rose-500/70',
      iconBg: 'bg-rose-500/10 text-rose-400',
    },
    {
      title: 'Random Encounters',
      subtitle: 'ATM heists, gators & emergent events',
      href: '/tracker/random-events',
      icon: MapPin,
      badge: 'Dynamic World',
      accent: 'border-emerald-500/30 hover:border-emerald-500/70',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
  ];

  return (
    <section aria-labelledby="quick-jump-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="quick-jump-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
            Quick-Access Jump Grid
          </h2>
          <p className="text-xs text-zinc-400">
            One-tap shortcuts for fast second-screen lookups while holding your controller.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {jumpCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group flex items-start gap-3.5 p-4 rounded-2xl bg-[#121216] border ${card.accent} hover:bg-[#181822] transition-all duration-200 shadow-sm`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800 ${card.iconBg} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                    {card.title}
                  </span>
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
