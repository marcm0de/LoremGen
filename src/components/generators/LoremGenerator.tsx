"use client";

import { useState } from "react";
import { Type } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SelectInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateLorem, LoremUnit } from "@/lib/generators";

export default function LoremGenerator() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const text = generateLorem(count, unit, s);
    setOutput(json ? JSON.stringify({ type: "lorem", unit, count, text }, null, 2) : text);
  };

  return (
    <GeneratorCard title="Lorem Ipsum" icon={<Type size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={20} />
        <SelectInput
          label="Unit"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "paragraphs", label: "Paragraphs" },
            { value: "sentences", label: "Sentences" },
            { value: "words", label: "Words" },
          ]}
        />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Lorem Ipsum" label={`${count} ${unit}`} isJson={json} />
    </GeneratorCard>
  );
}
