'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTracker } from '@/context/TrackerContext';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Cloud,
  FileJson,
  Gamepad2,
  ListChecks,
  Home,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { SearchModal } from './SearchModal';
import { ProCloudSyncModal } from './ProCloudSyncModal';
import { ImportExportModal } from './ImportExportModal';
import { CATEGORIES } from '@/data/trackerData';

export function Header() {
  const pathname = usePathname();
  const {
    overallPercentage,
    completedItemsCount,
    totalItemsCount,
    isSpoilerShieldActive,
    toggleSpoilerShield,
  } = useTracker();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCloudSyncOpen, setIsCloudSyncOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/90 bg-[#09090B]/95 backdrop-blur-md">
        {/* Top Progress & HUD Ticker */}
        <div className="w-full bg-zinc-950/80 border-b border-zinc-900 px-3 sm:px-6 py-1.5 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400 hidden xs:inline">LEONIDA STATE HUB</span>
            <span className="text-pink-400 font-bold">{overallPercentage}% COMPLETED</span>
            <span className="text-zinc-500">
              ({completedItemsCount}/{totalItemsCount})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick backup button */}
            <button
              type="button"
              onClick={() => setIsBackupOpen(true)}
              className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Backup / Restore Save"
            >
              <FileJson className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Backup Save</span>
            </button>

            {/* Cloud Sync Trigger */}
            <button
              type="button"
              onClick={() => setIsCloudSyncOpen(true)}
              className="text-zinc-400 hover:text-pink-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Cloud Sync (Preview)"
            >
              <Cloud className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">Pro Sync</span>
              <span className="text-[9px] bg-pink-500/20 text-pink-300 px-1 rounded uppercase">New</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar Line */}
        <div className="w-full h-1 bg-zinc-900 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
          />
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-xs text-gradient-vice tracking-tighter">
                  VI
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider text-white">
                  LEONIDA
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 font-bold">
                  100%
                </span>
              </div>
              <span className="block text-[10px] text-zinc-400 font-mono tracking-tight -mt-0.5">
                Vice City Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname === '/'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/tracker/story-missions"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith('/tracker')
                  ? 'bg-pink-600/20 text-pink-300 border border-pink-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5 text-pink-400" />
              <span>Checklists</span>
            </Link>

            <Link
              href="/cheats"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname === '/cheats'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>PS5 & Xbox Cheats</span>
            </Link>
          </nav>

          {/* Controls: Search, Spoiler Shield & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search dialog"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all text-xs font-mono"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Spoiler-Shield Toggle (CRITICAL FEATURE) */}
            <button
              type="button"
              onClick={toggleSpoilerShield}
              aria-label={`Toggle Spoiler Shield (Currently ${isSpoilerShieldActive ? 'ON' : 'OFF'})`}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
                isSpoilerShieldActive
                  ? 'bg-amber-950/60 border-amber-600/70 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {isSpoilerShieldActive ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden xs:inline">Spoiler:</span>
                  <span className="text-amber-400 font-bold">ON</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="hidden xs:inline">Spoiler:</span>
                  <span className="text-zinc-400">OFF</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-[#09090B] px-4 py-4 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  pathname === '/'
                    ? 'bg-zinc-800 border-zinc-700 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <Home className="w-4 h-4 text-pink-400" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/cheats"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  pathname === '/cheats'
                    ? 'bg-zinc-800 border-zinc-700 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>PS5 & Xbox Cheats</span>
              </Link>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                100% Checklist Categories
              </span>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/tracker/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-medium text-zinc-300 hover:border-pink-500/50 hover:text-white transition-all"
                  >
                    <span>{cat.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{cat.badgeText}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBackupOpen(true);
                }}
                className="text-cyan-400 font-mono flex items-center gap-1.5"
              >
                <FileJson className="w-4 h-4" />
                <span>Backup / Restore</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCloudSyncOpen(true);
                }}
                className="text-pink-400 font-mono flex items-center gap-1.5"
              >
                <Cloud className="w-4 h-4" />
                <span>Pro Cloud Sync</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProCloudSyncModal isOpen={isCloudSyncOpen} onClose={() => setIsCloudSyncOpen(false)} />
      <ImportExportModal isOpen={isBackupOpen} onClose={() => setIsBackupOpen(false)} />
    </>
  );
}
