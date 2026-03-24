"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function CopyButton({
  text,
  label,
  generator,
}: {
  text: string;
  label?: string;
  generator?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { showToast, addHistory } = useAppStore();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Copied to clipboard!");
    if (generator && label) {
      addHistory({ generator, label, content: text.slice(0, 500) });
    }
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
        bg-purple-600 text-white hover:bg-purple-700 transition-colors
        dark:bg-purple-500 dark:hover:bg-purple-600 cursor-pointer"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
