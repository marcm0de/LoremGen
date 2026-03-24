"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateBlogPosts } from "@/lib/generators";

export default function BlogGenerator() {
  const [count, setCount] = useState(2);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const posts = generateBlogPosts(count, s);
    if (json) {
      setOutput(JSON.stringify(posts, null, 2));
    } else {
      setOutput(
        posts
          .map(
            (p, i) =>
              `#${i + 1}\nTitle: ${p.title}\nDate: ${p.date}\nAuthor: ${p.author}\nExcerpt: ${p.excerpt}\n\n${p.body}`
          )
          .join("\n\n---\n\n")
      );
    }
  };

  return (
    <GeneratorCard title="Blog Posts" icon={<FileText size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={20} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="Blog Posts" label={`${count} posts`} isJson={json} />
    </GeneratorCard>
  );
}
