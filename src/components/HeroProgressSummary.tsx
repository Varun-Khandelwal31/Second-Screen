'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES, CategoryMeta } from '@/data/trackerData';
import { useTracker } from '@/context/TrackerContext';
import {
  Swords,
  Users,
  Compass,
  Zap,
  Radio,
  Trophy,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Swords,
  Users,
  Compass,
  Zap,
  Radio,
  Trophy,
  Award,
};

export function HeroProgressSummary() {
  const { categoryStats, overallPercentage, completedItemsCount, totalItemsCount } = useTracker();

  return (
    <section aria-labelledby="hero-progress-title" className="space-y-6">
      {/* Grand Hero Completion HUD */}
      <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#121216] via-[#101014] to-[#0d0d10] p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-retro-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECOND-SCREEN PS5 & XBOX COMPANION</span>
            </div>
            <h1 id="hero-progress-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leonida & Vice City <span className="text-gradient-vice">100% Secrets Tracker</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Track missions, hidden smuggler caches, flight recorder USBs, stunt jumps, and instant controller cheats with zero sign-in friction and instant local auto-save.
            </p>
          </div>

          {/* Master Progress Radial / Circular Badge */}
          <div className="shrink-0 flex items-center gap-5 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-zinc-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Ring with Vice Gradient */}
                <path
                  className="text-pink-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${overallPercentage}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-mono font-bold text-white">
                  {Math.round(overallPercentage)}%
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase">Done</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                State Completion
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5">
                {completedItemsCount} <span className="text-xs text-zinc-400 font-normal">/ {totalItemsCount}</span>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {totalItemsCount - completedItemsCount} items remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              100% Roadmap by Discipline
            </h2>
            <p className="text-xs text-zinc-400">
              Tap any category to filter by region, reveal spoilers, or tick items off.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat: CategoryMeta) => {
            const Icon = ICON_MAP[cat.iconName] || Trophy;
            const stat = categoryStats[cat.slug] || { total: 0, completed: 0, percentage: 0 };
            const isFinished = stat.total > 0 && stat.completed === stat.total;

            return (
              <Link
                key={cat.slug}
                href={`/tracker/${cat.slug}`}
                className="group relative rounded-2xl bg-[#121216] border border-zinc-800/90 p-4 sm:p-5 hover:border-zinc-700 hover:bg-[#16161c] transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-opacity opacity-70 group-hover:opacity-100"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${cat.accentColor}15`,
                        borderColor: `${cat.accentColor}30`,
                        color: cat.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {cat.badgeText}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-pink-300 transition-colors flex items-center justify-between">
                    <span>{cat.title}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Progress bar footer */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">
                      {stat.completed} of {stat.total} Completed
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: isFinished ? '#10B981' : cat.accentColor }}
                    >
                      {stat.percentage}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${stat.percentage}%`,
                        backgroundColor: isFinished ? '#10B981' : cat.accentColor,
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
