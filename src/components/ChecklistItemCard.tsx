'use client';

import React, { useState } from 'react';
import { TrackerItem } from '@/data/trackerData';
import { useTracker } from '@/context/TrackerContext';
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Eye,
  EyeOff,
  Copy,
  Pin,
  Award,
  Gift,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface ChecklistItemCardProps {
  item: TrackerItem;
}

export function ChecklistItemCard({ item }: ChecklistItemCardProps) {
  const {
    completedIds,
    pinnedIds,
    revealedSpoilerIds,
    customNotes,
    isSpoilerShieldActive,
    toggleItemCompleted,
    togglePinItem,
    revealSpoiler,
    setCustomNote,
  } = useTracker();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedCoord, setCopiedCoord] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>(customNotes[item.id] || '');

  const isCompleted = completedIds.has(item.id);
  const isPinned = pinnedIds.has(item.id);
  const isRevealed = revealedSpoilerIds.has(item.id);

  // Determine if item content is masked by spoiler shield
  const shouldMaskSpoiler = item.isSpoiler && isSpoilerShieldActive && !isRevealed;

  const handleCopyCoordinates = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.coordinates) {
      navigator.clipboard.writeText(item.coordinates);
      setCopiedCoord(true);
      setTimeout(() => setCopiedCoord(false), 2000);
    }
  };

  const handleSaveNote = () => {
    setCustomNote(item.id, noteText);
    setIsEditingNote(false);
  };

  return (
    <article
      className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden ${
        isCompleted
          ? 'bg-[#121216]/60 border-zinc-800/60 opacity-80'
          : isPinned
          ? 'bg-[#15151c] border-pink-500/40 shadow-[0_0_15px_-3px_rgba(236,72,153,0.15)]'
          : 'bg-[#121216] border-zinc-800/90 hover:border-zinc-700 hover:bg-[#16161c]'
      }`}
    >
      {/* Top Accent Strip */}
      <div
        className={`h-1 w-full transition-colors ${
          isCompleted
            ? 'bg-emerald-500/50'
            : isPinned
            ? 'bg-pink-500'
            : item.isSpoiler
            ? 'bg-amber-500/40'
            : 'bg-transparent'
        }`}
      />

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Large Thumb-Friendly 48px Tap Checkbox */}
          <button
            type="button"
            onClick={() => toggleItemCompleted(item.id)}
            aria-label={`Mark ${item.title} as ${isCompleted ? 'incomplete' : 'completed'}`}
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-95 ${
              isCompleted
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'border-2 border-zinc-700 bg-zinc-900/90 text-transparent hover:border-pink-500/70 hover:bg-zinc-800/80'
            }`}
          >
            <Check
              className={`w-6 h-6 stroke-[3] transition-transform duration-200 ${
                isCompleted ? 'scale-100' : 'scale-50 opacity-0'
              }`}
            />
          </button>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Header badges row */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {item.region}
              </span>

              {item.difficulty && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    item.difficulty === 'Extreme'
                      ? 'bg-rose-950/50 text-rose-300 border-rose-800/60'
                      : item.difficulty === 'Hard'
                      ? 'bg-amber-950/50 text-amber-300 border-amber-800/60'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                  }`}
                >
                  {item.difficulty}
                </span>
              )}

              {item.isSpoiler && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-700/50">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  Spoiler
                </span>
              )}

              {isPinned && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-pink-950/60 text-pink-300 border border-pink-700/50">
                  <Pin className="w-3 h-3 text-pink-400 fill-pink-400" />
                  Pinned
                </span>
              )}
            </div>

            {/* Title with Spoiler Shield Masking */}
            <div className="relative">
              <h3
                className={`text-base sm:text-lg font-semibold leading-snug transition-all ${
                  isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'
                } ${shouldMaskSpoiler ? 'blur-sm select-none opacity-60' : ''}`}
              >
                {item.title}
              </h3>

              {/* Spoiler Overlay Shield Button */}
              {shouldMaskSpoiler && (
                <button
                  type="button"
                  onClick={() => revealSpoiler(item.id)}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/70 border border-amber-500/40 rounded-lg backdrop-blur-[2px] text-xs font-semibold text-amber-300 hover:text-amber-200 hover:bg-zinc-950/80 transition-all p-2 gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Spoiler Shield Active • Tap to Reveal</span>
                </button>
              )}
            </div>

            {/* Item Description (respects spoiler shield) */}
            <p
              className={`text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed ${
                shouldMaskSpoiler ? 'blur-sm select-none opacity-40' : ''
              }`}
            >
              {item.description}
            </p>

            {/* Reward & Requirements preview tags */}
            {(item.rewards || item.goldMedalRequirements) && !shouldMaskSpoiler && (
              <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                {item.goldMedalRequirements && item.goldMedalRequirements.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Gold Req: {item.goldMedalRequirements[0]}</span>
                    {item.goldMedalRequirements.length > 1 && (
                      <span className="text-amber-500 font-bold">
                        +{item.goldMedalRequirements.length - 1} more
                      </span>
                    )}
                  </span>
                )}

                {item.rewards && item.rewards.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-pink-500/10 border border-pink-500/20 text-pink-300 text-[11px] font-mono">
                    <Gift className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Reward: {item.rewards[0]}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions Right Column */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {/* Pin Toggle */}
            <button
              type="button"
              onClick={() => togglePinItem(item.id)}
              aria-label={isPinned ? 'Unpin item' : 'Pin item to top'}
              className={`p-2 rounded-lg border transition-colors ${
                isPinned
                  ? 'bg-pink-950/60 text-pink-400 border-pink-700/50'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Pin className={`w-4 h-4 ${isPinned ? 'fill-pink-400' : ''}`} />
            </button>

            {/* Accordion Expand Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label="Toggle details and step-by-step hint"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Accordion: Location Hint & Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-3.5 text-xs sm:text-sm animate-fadeIn">
            {/* Location Hint */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Location Hint & Intel
                </span>

                {item.coordinates && (
                  <button
                    type="button"
                    onClick={handleCopyCoordinates}
                    className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedCoord ? 'Copied!' : item.coordinates}</span>
                  </button>
                )}
              </div>

              <p
                className={`text-zinc-300 text-xs sm:text-sm leading-relaxed ${
                  shouldMaskSpoiler ? 'blur-sm select-none opacity-40' : ''
                }`}
              >
                {item.locationHint}
              </p>
            </div>

            {/* Gold Medal Full Criteria */}
            {item.goldMedalRequirements && item.goldMedalRequirements.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <Award className="w-3.5 h-3.5" />
                  Gold Medal 100% Objectives
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {item.goldMedalRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom Player Note Section */}
            <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Player Note
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingNote(!isEditingNote)}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  {isEditingNote ? 'Cancel' : customNotes[item.id] ? 'Edit Note' : '+ Add Note'}
                </button>
              </div>

              {isEditingNote ? (
                <div className="space-y-2">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="E.g., Park getaway bike in alley; Need sniper rifle before starting..."
                    rows={2}
                    className="w-full text-xs bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleSaveNote}
                      className="px-3 py-1 rounded bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              ) : customNotes[item.id] ? (
                <p className="text-xs text-zinc-300 italic bg-zinc-950/70 p-2 rounded border border-zinc-800/80">
                  &ldquo;{customNotes[item.id]}&rdquo;
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500">
                  No personal note pinned yet. Tap &apos;+ Add Note&apos; to write your own reminder.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
