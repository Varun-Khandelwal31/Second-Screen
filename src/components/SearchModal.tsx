'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TRACKER_ITEMS, CHEAT_CODES, TrackerItem, CheatCode } from '@/data/trackerData';
import { useTracker } from '@/context/TrackerContext';
import { Search, X, Check, MapPin, Gamepad2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'items' | 'cheats'>('all');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { completedIds, preferredPlatform } = useTracker();

  // Dialog open/close sync with native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        // Focus input after modal renders
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle ESC or native close
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

  // Click outside backdrop to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  // Filtered Results
  const matchingItems = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return TRACKER_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.locationHint.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
    ).slice(0, 10);
  }, [query]);

  const matchingCheats = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CHEAT_CODES.filter(
      (cheat) =>
        cheat.title.toLowerCase().includes(q) ||
        cheat.description.toLowerCase().includes(q) ||
        cheat.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="search-modal-title"
      className="m-auto w-[94vw] max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-0 text-zinc-100 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="p-4 sm:p-5 border-b border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search missions, collectibles, cheats (e.g. Cheetah, Ocean Drive)..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-sans"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Type Pills */}
        <div className="flex items-center gap-2 mt-3 text-xs">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
              filterType === 'all'
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            All Results
          </button>
          <button
            type="button"
            onClick={() => setFilterType('items')}
            className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
              filterType === 'items'
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            Missions & Collectibles ({matchingItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('cheats')}
            className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
              filterType === 'cheats'
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            Cheat Codes ({matchingCheats.length})
          </button>
        </div>
      </div>

      {/* Results Viewport */}
      <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-4">
        {!query.trim() ? (
          <div className="text-center py-10 text-zinc-500 text-sm">
            <Search className="w-10 h-10 mx-auto text-zinc-700 mb-2 stroke-[1.5]" />
            <p className="font-medium text-zinc-400">Search the entire Leonida State database</p>
            <p className="text-xs text-zinc-500 mt-1">
              Type names, weapons, vehicles, radio cassettes, or coordinates.
            </p>
          </div>
        ) : matchingItems.length === 0 && matchingCheats.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 text-sm">
            <p className="font-medium text-zinc-300">No matching items or cheats found</p>
            <p className="text-xs text-zinc-500 mt-1">Try another search keyword or check spelling.</p>
          </div>
        ) : (
          <>
            {/* Checklist items section */}
            {(filterType === 'all' || filterType === 'items') && matchingItems.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Tracker Items & Locations
                </h4>
                <div className="space-y-2">
                  {matchingItems.map((item) => {
                    const isDone = completedIds.has(item.id);
                    return (
                      <Link
                        key={item.id}
                        href={`/tracker/${item.category}`}
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/50 hover:bg-zinc-800/80 transition-all group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono ${
                                isDone
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-zinc-800 border border-zinc-700 text-zinc-400'
                              }`}
                            >
                              {isDone ? <Check className="w-3.5 h-3.5" /> : '•'}
                            </span>
                            <div className="truncate">
                              <span
                                className={`text-sm font-semibold truncate block ${
                                  isDone ? 'line-through text-zinc-400' : 'text-zinc-100'
                                }`}
                              >
                                {item.title}
                              </span>
                              <span className="text-[11px] font-mono text-zinc-400">
                                {item.region} • {item.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cheats section */}
            {(filterType === 'all' || filterType === 'cheats') && matchingCheats.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-400 mb-2 flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Cheat Codes
                </h4>
                <div className="space-y-2">
                  {matchingCheats.map((cheat) => (
                    <Link
                      key={cheat.id}
                      href="/cheats"
                      onClick={onClose}
                      className="block p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-zinc-100">{cheat.title}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                              {cheat.category}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                            {cheat.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/40 rounded-b-2xl flex items-center justify-between text-xs text-zinc-400 font-mono">
        <span>Press ESC to close</span>
        <span>Cmd+K / Ctrl+K quick open</span>
      </div>
    </dialog>
  );
}
