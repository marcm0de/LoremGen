"use client";

import { useState } from "react";
import { Hash } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SelectInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateMisc, MiscType } from "@/lib/generators";

export default function MiscGenerator() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<MiscType>("uuids");
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const results = generateMisc(count, type, s, min, max);
    if (json) {
      setOutput(JSON.stringify({ type, values: results }, null, 2));
    } else {
      setOutput(results.join("\n"));
    }
  };

  return (
    <GeneratorCard title="Numbers / Dates / UUIDs" icon={<Hash size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={100} />
        <SelectInput
          label="Type"
          value={type}
          onChange={setType}
          options={[
            { value: "uuids", label: "UUIDs" },
            { value: "integers", label: "Integers" },
            { value: "decimals", label: "Decimals" },
            { value: "dates", label: "Dates" },
          ]}
        />
        {(type === "integers" || type === "decimals") && (
          <>
            <NumberInput label="Min" value={min} onChange={setMin} min={-999999} max={999999} />
            <NumberInput label="Max" value={max} onChange={setMax} min={-999999} max={999999} />
          </>
        )}
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Misc" label={`${count} ${type}`} isJson={json} />
    </GeneratorCard>
  );
}
