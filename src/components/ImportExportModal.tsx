'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '@/context/TrackerContext';
import { Download, Upload, AlertCircle, CheckCircle2, X, FileJson, RefreshCw } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { completedIds, exportSave, importSave, resetProgress } = useTracker();
  const [jsonInput, setJsonInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setStatusMessage(null);
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = importSave(text);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Backup save file imported successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Failed to import backup file' });
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!jsonInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste valid JSON save content' });
      return;
    }
    const res = importSave(jsonInput);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'Save data restored from pasted JSON!' });
      setJsonInput('');
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Malformed JSON format' });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="backup-modal-title"
      className="m-auto w-[92vw] max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-0 text-zinc-100 backdrop:bg-black/80 backdrop:backdrop-blur-sm overflow-hidden"
    >
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FileJson className="w-4 h-4" />
          </div>
          <div>
            <h3 id="backup-modal-title" className="text-base sm:text-lg font-bold text-white">
              Save File Backup & Migration
            </h3>
            <p className="text-xs text-zinc-400">
              Never lose your 100% progress even when clearing browser cookies.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Status Alert */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                : 'bg-rose-950/60 border-rose-700/60 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action 1: Export */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-200">Export Current Save</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Currently tracking {completedIds.size} completed items.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                exportSave();
                setStatusMessage({ type: 'success', text: 'Downloaded leonida save JSON!' });
              }}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(236,72,153,0.3)] flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export .JSON</span>
            </button>
          </div>
        </div>

        {/* Action 2: File Upload */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div>
            <div className="text-sm font-semibold text-zinc-200">Import Save File</div>
            <div className="text-xs text-zinc-400 mt-0.5">
              Select a previously exported `.json` file from your device.
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Choose JSON File to Upload</span>
          </button>
        </div>

        {/* Action 3: Paste Raw JSON */}
        <div className="space-y-2">
          <label htmlFor="raw-json" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
            Or Paste Raw Save JSON
          </label>
          <textarea
            id="raw-json"
            rows={3}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"completedIds":["story-01","story-02"], ...}'
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleManualImport}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
            >
              Apply JSON Save
            </button>
          </div>
        </div>

        {/* Reset Danger Zone */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
          <span>Need a clean slate?</span>
          <button
            type="button"
            onClick={resetProgress}
            className="text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 font-mono"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
