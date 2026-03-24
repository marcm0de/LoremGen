"use client";

import { useAppStore } from "@/lib/store";
import { Clock, Trash2, X } from "lucide-react";
import CopyButton from "./CopyButton";

export default function History() {
  const { history, clearHistory, removeHistory } = useAppStore();

  if (history.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700
      bg-white dark:bg-gray-800 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
            <Clock size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            History
          </h2>
          <span className="text-xs text-gray-400">({history.length})</span>
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
        >
          <Trash2 size={12} /> Clear all
        </button>
      </div>
      <div className="space-y-3 max-h-96 overflow-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200
              dark:border-gray-700 group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                  {entry.generator}
                </span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">{entry.label}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={entry.content} />
                <button
                  onClick={() => removeHistory(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500
                    transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
