"use client";

import CopyButton from "./CopyButton";

export default function OutputBox({
  content,
  generator,
  label,
  isJson,
}: {
  content: string;
  generator: string;
  label: string;
  isJson?: boolean;
}) {
  if (!content) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Output {isJson && "· JSON"}
        </span>
        <CopyButton text={content} label={label} generator={generator} />
      </div>
      <pre
        className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200
          dark:border-gray-700 text-sm leading-relaxed overflow-auto max-h-80
          text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words"
      >
        {content}
      </pre>
    </div>
  );
}
