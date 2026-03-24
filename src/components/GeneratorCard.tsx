"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function GeneratorCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md
        transition-shadow p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}
