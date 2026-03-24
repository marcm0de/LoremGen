"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HistoryEntry {
  id: string;
  generator: string;
  label: string;
  content: string;
  timestamp: number;
}

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  history: HistoryEntry[];
  addHistory: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
  clearHistory: () => void;
  removeHistory: (id: string) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      history: [],
      addHistory: (entry) =>
        set((s) => ({
          history: [
            {
              ...entry,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...s.history,
          ].slice(0, 100),
        })),
      clearHistory: () => set({ history: [] }),
      removeHistory: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
      toast: null,
      showToast: (msg) => {
        set({ toast: msg });
        setTimeout(() => set({ toast: null }), 2000);
      },
    }),
    {
      name: "loremgen-storage",
      partialize: (s) => ({ theme: s.theme, history: s.history }),
    }
  )
);
