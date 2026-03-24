"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateProfiles } from "@/lib/generators";

export default function ProfileGenerator() {
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const profiles = generateProfiles(count, s);
    if (json) {
      setOutput(JSON.stringify(profiles, null, 2));
    } else {
      setOutput(
        profiles
          .map(
            (p, i) =>
              `#${i + 1}\nName: ${p.name}\nEmail: ${p.email}\nAvatar: ${p.avatar}\nBio: ${p.bio}`
          )
          .join("\n\n")
      );
    }
  };

  return (
    <GeneratorCard title="User Profiles" icon={<Users size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="User Profiles" label={`${count} profiles`} isJson={json} />
    </GeneratorCard>
  );
}
