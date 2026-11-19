'use client';

import React, { useState, useMemo } from 'react';
import {
  CategoryMeta,
  CategorySlug,
  Region,
  REGIONS,
  TRACKER_ITEMS,
  CATEGORIES,
} from '@/data/trackerData';
import { useTracker } from '@/context/TrackerContext';
import { ChecklistItemCard } from '@/components/ChecklistItemCard';
import { AdSlot } from '@/components/AdSlot';
import {
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';

interface CategoryTrackerClientProps {
  category: CategoryMeta;
}

export function CategoryTrackerClient({ category }: CategoryTrackerClientProps) {
  const { completedIds, categoryStats } = useTracker();

  const [statusFilter, setStatusFilter] = useState<'all' | 'remaining' | 'completed'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get all items in this category
  const allCategoryItems = useMemo(() => {
    return TRACKER_ITEMS.filter((item) => item.category === category.slug);
  }, [category.slug]);

  // Filtered items based on user selection
  const filteredItems = useMemo(() => {
    return allCategoryItems.filter((item) => {
      const isDone = completedIds.has(item.id);

      // Status Filter
      if (statusFilter === 'remaining' && isDone) return false;
      if (statusFilter === 'completed' && !isDone) return false;

      // Region Filter
      if (selectedRegion !== 'all' && item.region !== selectedRegion) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesHint = item.locationHint.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesHint && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [allCategoryItems, completedIds, statusFilter, selectedRegion, searchQuery]);

  const currentStat = categoryStats[category.slug] || {
    total: allCategoryItems.length,
    completed: 0,
    percentage: 0,
  };

  // Regions that actually exist in this category
  const availableRegions = useMemo(() => {
    const set = new Set<Region>();
    allCategoryItems.forEach((item) => set.add(item.region));
    return Array.from(set);
  }, [allCategoryItems]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl border border-zinc-800 bg-[#121216] p-6 sm:p-8 overflow-hidden shadow-xl">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: category.accentColor }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Master Dashboard</span>
            </Link>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${category.accentColor}15`,
                  borderColor: `${category.accentColor}30`,
                  color: category.accentColor,
                }}
              >
                {category.badgeText}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                100% Completion Track
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {category.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Category Progress Stats Box */}
          <div className="shrink-0 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 self-stretch sm:self-auto min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">Category Progress</span>
              <span className="font-bold text-white">{currentStat.percentage}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-950 overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${currentStat.percentage}%`,
                  backgroundColor: category.accentColor,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>{currentStat.completed} completed</span>
              <span>{currentStat.total - currentStat.completed} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#121216] border border-zinc-800/90 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Filter Buttons (Min 48px Tap Targets) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 overflow-x-auto">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`min-h-[42px] px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({allCategoryItems.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('remaining')}
              className={`min-h-[42px] px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'remaining'
                  ? 'bg-amber-600/20 text-amber-300 shadow-sm border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Remaining ({allCategoryItems.length - currentStat.completed})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`min-h-[42px] px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600/20 text-emerald-300 shadow-sm border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed ({currentStat.completed})
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this category..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Region Filter Chips (One-thumb controller tap) */}
        <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            Region:
          </span>

          <button
            type="button"
            onClick={() => setSelectedRegion('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors shrink-0 ${
              selectedRegion === 'all'
                ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            All Regions
          </button>

          {availableRegions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors shrink-0 ${
                selectedRegion === region
                  ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items Feed */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-2">
            <SlidersHorizontal className="w-10 h-10 mx-auto text-zinc-700 mb-2" />
            <h3 className="text-base font-bold text-white">No items match your active filters</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Try switching your status filter back to &quot;All&quot; or clearing your region selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <ChecklistItemCard item={item} />
              {/* Insert In-Feed AdSlot naturally every 8 list items with fixed min-height to prevent CLS */}
              {(index + 1) % 8 === 0 && index !== filteredItems.length - 1 && (
                <AdSlot position="in-feed" id={`in-feed-ad-${index}`} />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
