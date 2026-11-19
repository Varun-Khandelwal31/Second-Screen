'use client';

import React from 'react';

interface CheatKeyBadgeProps {
  button: string;
  platform: 'ps5' | 'xbox';
}

export function CheatKeyBadge({ button, platform }: CheatKeyBadgeProps) {
  // PlayStation styling
  if (platform === 'ps5') {
    let colorClasses = 'bg-zinc-800 text-zinc-100 border-zinc-700';

    if (button === '△') {
      // Triangle: Cyan / Emerald
      colorClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
    } else if (button === '○') {
      // Circle: Crimson / Rose
      colorClasses = 'bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.3)]';
    } else if (button === '✕') {
      // Cross: Blue / Cyan
      colorClasses = 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.3)]';
    } else if (button === '□') {
      // Square: Pink / Magenta
      colorClasses = 'bg-pink-950/80 text-pink-300 border-pink-500/60 shadow-[0_0_8px_rgba(236,72,153,0.3)]';
    } else if (['R1', 'R2', 'L1', 'L2'].includes(button)) {
      colorClasses = 'bg-zinc-800/90 text-zinc-100 border-zinc-600 font-bold px-2.5';
    } else if (['←', '→', '↑', '↓'].includes(button)) {
      colorClasses = 'bg-zinc-900 text-zinc-300 border-zinc-700 px-2';
    }

    return (
      <span
        className={`inline-flex items-center justify-center min-w-[34px] h-[34px] text-xs font-mono font-semibold rounded-lg border shadow-sm transition-transform select-none ${colorClasses}`}
        title={`PS5 ${button}`}
      >
        {button}
      </span>
    );
  }

  // Xbox Series X|S styling
  let xboxClasses = 'bg-zinc-800 text-zinc-100 border-zinc-700';

  if (button === 'A') {
    // A: Emerald Green
    xboxClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.3)] font-bold';
  } else if (button === 'B') {
    // B: Red
    xboxClasses = 'bg-rose-950/80 text-rose-300 border-rose-500/60 shadow-[0_0_8px_rgba(244,63,94,0.3)] font-bold';
  } else if (button === 'X') {
    // X: Sky Blue
    xboxClasses = 'bg-sky-950/80 text-sky-300 border-sky-500/60 shadow-[0_0_8px_rgba(14,165,233,0.3)] font-bold';
  } else if (button === 'Y') {
    // Y: Amber Yellow
    xboxClasses = 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.3)] font-bold';
  } else if (['RB', 'RT', 'LB', 'LT'].includes(button)) {
    xboxClasses = 'bg-zinc-800/90 text-zinc-100 border-zinc-600 font-bold px-2.5';
  } else if (['←', '→', '↑', '↓'].includes(button)) {
    xboxClasses = 'bg-zinc-900 text-zinc-300 border-zinc-700 px-2';
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[34px] h-[34px] text-xs font-mono font-semibold rounded-lg border shadow-sm transition-transform select-none ${xboxClasses}`}
      title={`Xbox ${button}`}
    >
      {button}
    </span>
  );
}
