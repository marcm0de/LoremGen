"use client";

import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function Toast() {
  const toast = useAppStore((s) => s.toast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5
            rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
            text-sm font-medium shadow-lg"
        >
          <Check size={16} className="text-green-400 dark:text-green-600" />
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
