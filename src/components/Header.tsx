"use client";

import { useAppStore } from "@/lib/store";
import { Sun, Moon, Sparkles } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-purple-600 text-white">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            LoremGen
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Smart placeholder content for developers & designers
          </p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer
          text-gray-600 dark:text-gray-300"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  );
}
