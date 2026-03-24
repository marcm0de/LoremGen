"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateAddresses } from "@/lib/generators";

export default function AddressGenerator() {
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const addrs = generateAddresses(count, s);
    if (json) {
      setOutput(JSON.stringify(addrs, null, 2));
    } else {
      setOutput(
        addrs
          .map(
            (a, i) =>
              `#${i + 1}\n${a.street}\n${a.city}, ${a.state} ${a.zip}\n${a.country}`
          )
          .join("\n\n")
      );
    }
  };

  return (
    <GeneratorCard title="Addresses" icon={<MapPin size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Addresses" label={`${count} addresses`} isJson={json} />
    </GeneratorCard>
  );
}
