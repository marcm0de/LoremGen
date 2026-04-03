"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateEmails } from "@/lib/generators";

export default function EmailGenerator() {
  const [count, setCount] = useState(10);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const emails = generateEmails(count, s);
    if (json) {
      setOutput(JSON.stringify(emails, null, 2));
    } else {
      setOutput(emails.map((e) => `${e.name} <${e.email}>`).join("\n"));
    }
  };

  return (
    <GeneratorCard title="Email Addresses" icon={<Mail size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={100} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Email" label={`${count} emails`} isJson={json} />
    </GeneratorCard>
  );
}
