"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateCreditCards } from "@/lib/generators";

export default function CreditCardGenerator() {
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const cards = generateCreditCards(count, s);
    if (json) {
      setOutput(JSON.stringify(cards, null, 2));
    } else {
      setOutput(
        cards
          .map(
            (c, i) =>
              `Card ${i + 1}:\n  Number: ${c.number}\n  Type: ${c.type}\n  Expiry: ${c.expiry}\n  CVV: ${c.cvv}\n  Holder: ${c.holder}`
          )
          .join("\n\n")
      );
    }
  };

  return (
    <GeneratorCard title="Credit Card Numbers" icon={<CreditCard size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-2">
        ⚠️ Fake numbers only — Luhn-valid but not real cards. For testing purposes.
      </p>
      <OutputBox content={output} generator="CreditCard" label={`${count} credit cards`} isJson={json} />
    </GeneratorCard>
  );
}
