"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateProducts } from "@/lib/generators";

export default function ProductGenerator() {
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const products = generateProducts(count, s);
    if (json) {
      setOutput(JSON.stringify(products, null, 2));
    } else {
      setOutput(
        products
          .map(
            (p, i) =>
              `#${i + 1}\nName: ${p.name}\nPrice: ${p.price}\nSKU: ${p.sku}\nCategory: ${p.category}\nDescription: ${p.description}`
          )
          .join("\n\n")
      );
    }
  };

  return (
    <GeneratorCard title="Product Listings" icon={<ShoppingBag size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Products" label={`${count} products`} isJson={json} />
    </GeneratorCard>
  );
}
