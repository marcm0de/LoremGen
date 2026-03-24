"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import CopyButton from "../CopyButton";
import { NumberInput, TextInput, GenerateButton } from "../Controls";
import { generatePlaceholderImage } from "@/lib/generators";

export default function ImageGenerator() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState("#7c3aed");
  const [textColor, setTextColor] = useState("#ffffff");
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(generatePlaceholderImage(width, height, bgColor, textColor));
  };

  return (
    <GeneratorCard title="Placeholder Images" icon={<ImageIcon size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Width" value={width} onChange={setWidth} min={10} max={2000} />
        <NumberInput label="Height" value={height} onChange={setHeight} min={10} max={2000} />
        <TextInput label="BG Color" value={bgColor} onChange={setBgColor} placeholder="#7c3aed" />
        <TextInput label="Text Color" value={textColor} onChange={setTextColor} placeholder="#ffffff" />
        <GenerateButton onClick={generate} />
      </div>
      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Preview
            </span>
            <CopyButton text={output} label={`${width}×${height} image`} generator="Placeholder Image" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={output}
            alt={`${width}×${height} placeholder`}
            className="rounded-xl border border-gray-200 dark:border-gray-700 max-w-full"
            style={{ maxHeight: 300 }}
          />
          <pre className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200
            dark:border-gray-700 text-xs overflow-auto max-h-24 text-gray-600 dark:text-gray-400
            whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}
    </GeneratorCard>
  );
}
