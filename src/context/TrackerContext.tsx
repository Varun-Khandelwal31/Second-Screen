'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { TRACKER_ITEMS, CATEGORIES, TrackerItem, CategorySlug, Region } from '@/data/trackerData';
import confetti from 'canvas-confetti';

interface CategoryStat {
  total: number;
  completed: number;
  percentage: number;
}

interface TrackerContextType {
  completedIds: Set<string>;
  pinnedIds: Set<string>;
  revealedSpoilerIds: Set<string>;
  customNotes: Record<string, string>;
  isSpoilerShieldActive: boolean;
  preferredPlatform: 'ps5' | 'xbox';
  isLoaded: boolean;

  // Actions
  toggleItemCompleted: (id: string) => void;
  togglePinItem: (id: string) => void;
  revealSpoiler: (id: string) => void;
  setCustomNote: (id: string, note: string) => void;
  toggleSpoilerShield: () => void;
  setPreferredPlatform: (platform: 'ps5' | 'xbox') => void;
  exportSave: () => void;
  importSave: (jsonString: string) => { success: boolean; error?: string };
  resetProgress: () => void;

  // Metrics
  totalItemsCount: number;
  completedItemsCount: number;
  overallPercentage: number;
  categoryStats: Record<CategorySlug, CategoryStat>;
  getCategoryProgress: (category: CategorySlug) => CategoryStat;
}

const STORAGE_KEY = 'leonida_tracker_v1';

interface StoredData {
  completedIds: string[];
  pinnedIds: string[];
  revealedSpoilerIds: string[];
  customNotes: Record<string, string>;
  isSpoilerShieldActive: boolean;
  preferredPlatform: 'ps5' | 'xbox';
  version: number;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [revealedSpoilerIds, setRevealedSpoilerIds] = useState<Set<string>>(new Set());
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [isSpoilerShieldActive, setIsSpoilerShieldActive] = useState<boolean>(true);
  const [preferredPlatform, setPreferredPlatform] = useState<'ps5' | 'xbox'>('ps5');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredData = JSON.parse(stored);
        if (Array.isArray(parsed.completedIds)) setCompletedIds(new Set(parsed.completedIds));
        if (Array.isArray(parsed.pinnedIds)) setPinnedIds(new Set(parsed.pinnedIds));
        if (Array.isArray(parsed.revealedSpoilerIds)) setRevealedSpoilerIds(new Set(parsed.revealedSpoilerIds));
        if (parsed.customNotes) setCustomNotes(parsed.customNotes);
        if (typeof parsed.isSpoilerShieldActive === 'boolean') setIsSpoilerShieldActive(parsed.isSpoilerShieldActive);
        if (parsed.preferredPlatform === 'ps5' || parsed.preferredPlatform === 'xbox') {
          setPreferredPlatform(parsed.preferredPlatform);
        }
      }
    } catch (e) {
      console.error('Failed to load local save from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage on updates (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const payload: StoredData = {
        completedIds: Array.from(completedIds),
        pinnedIds: Array.from(pinnedIds),
        revealedSpoilerIds: Array.from(revealedSpoilerIds),
        customNotes,
        isSpoilerShieldActive,
        preferredPlatform,
        version: 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to write save to localStorage', e);
    }
  }, [completedIds, pinnedIds, revealedSpoilerIds, customNotes, isSpoilerShieldActive, preferredPlatform, isLoaded]);

  // Micro-celebration trigger
  const triggerCelebration = (isGrand: boolean = false) => {
    try {
      if (typeof window !== 'undefined' && confetti) {
        if (isGrand) {
          // 100% grand fireworks
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#EC4899', '#06B6D4', '#F59E0B', '#A855F7'],
          });
        } else {
          // Quick satisfying pop
          confetti({
            particleCount: 30,
            spread: 45,
            origin: { y: 0.8 },
            colors: ['#EC4899', '#06B6D4'],
          });
        }
      }
    } catch {
      // Ignore if confetti fails in headless env
    }
  };

  // Toggle Item
  const toggleItemCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      const isChecking = !next.has(id);
      if (isChecking) {
        next.add(id);
        // Haptic feedback if supported on mobile
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(20);
        }
        // If checking makes everything 100%
        if (next.size === TRACKER_ITEMS.length) {
          triggerCelebration(true);
        } else {
          triggerCelebration(false);
        }
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  // Toggle Pin
  const togglePinItem = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Reveal Spoiler
  const revealSpoiler = (id: string) => {
    setRevealedSpoilerIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Set Custom Note
  const setCustomNote = (id: string, note: string) => {
    setCustomNotes((prev) => ({
      ...prev,
      [id]: note,
    }));
  };

  // Toggle Spoiler Shield
  const toggleSpoilerShield = () => {
    setIsSpoilerShieldActive((prev) => !prev);
  };

  // Export Save to JSON File
  const exportSave = () => {
    const payload: StoredData = {
      completedIds: Array.from(completedIds),
      pinnedIds: Array.from(pinnedIds),
      revealedSpoilerIds: Array.from(revealedSpoilerIds),
      customNotes,
      isSpoilerShieldActive,
      preferredPlatform,
      version: 1,
    };
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const a = document.createElement('a');
    a.href = url;
    a.download = `leonida-gta6-save-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import Save from JSON File
  const importSave = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON file format' };
      }
      if (Array.isArray(parsed.completedIds)) {
        setCompletedIds(new Set(parsed.completedIds));
      }
      if (Array.isArray(parsed.pinnedIds)) {
        setPinnedIds(new Set(parsed.pinnedIds));
      }
      if (Array.isArray(parsed.revealedSpoilerIds)) {
        setRevealedSpoilerIds(new Set(parsed.revealedSpoilerIds));
      }
      if (parsed.customNotes && typeof parsed.customNotes === 'object') {
        setCustomNotes(parsed.customNotes);
      }
      if (typeof parsed.isSpoilerShieldActive === 'boolean') {
        setIsSpoilerShieldActive(parsed.isSpoilerShieldActive);
      }
      if (parsed.preferredPlatform === 'ps5' || parsed.preferredPlatform === 'xbox') {
        setPreferredPlatform(parsed.preferredPlatform);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to parse JSON file' };
    }
  };

  // Reset Progress
  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all tracked progress? This action cannot be undone unless you have an exported backup.')) {
      setCompletedIds(new Set());
      setPinnedIds(new Set());
      setRevealedSpoilerIds(new Set());
      setCustomNotes({});
    }
  };

  // Calculated Stats
  const totalItemsCount = TRACKER_ITEMS.length;
  const completedItemsCount = completedIds.size;
  const overallPercentage = totalItemsCount > 0
    ? Math.round((completedItemsCount / totalItemsCount) * 1000) / 10
    : 0;

  const categoryStats = useMemo(() => {
    const stats: Record<CategorySlug, CategoryStat> = {} as any;
    for (const cat of CATEGORIES) {
      const itemsInCat = TRACKER_ITEMS.filter((item) => item.category === cat.slug);
      const completedInCat = itemsInCat.filter((item) => completedIds.has(item.id)).length;
      const pct = itemsInCat.length > 0
        ? Math.round((completedInCat / itemsInCat.length) * 1000) / 10
        : 0;
      stats[cat.slug] = {
        total: itemsInCat.length,
        completed: completedInCat,
        percentage: pct,
      };
    }
    return stats;
  }, [completedIds]);

  const getCategoryProgress = (category: CategorySlug): CategoryStat => {
    return categoryStats[category] || { total: 0, completed: 0, percentage: 0 };
  };

  return (
    <TrackerContext.Provider
      value={{
        completedIds,
        pinnedIds,
        revealedSpoilerIds,
        customNotes,
        isSpoilerShieldActive,
        preferredPlatform,
        isLoaded,
        toggleItemCompleted,
        togglePinItem,
        revealSpoiler,
        setCustomNote,
        toggleSpoilerShield,
        setPreferredPlatform,
        exportSave,
        importSave,
        resetProgress,
        totalItemsCount,
        completedItemsCount,
        overallPercentage,
        categoryStats,
        getCategoryProgress,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}
