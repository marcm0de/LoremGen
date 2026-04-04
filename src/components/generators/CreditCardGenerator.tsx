"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, ToggleJson, GenerateButton } from "../Controls";
import { generateCreditCards, CreditCard as CreditCardType } from "@/lib/generators";

function CardPreview({ card }: { card: CreditCardType }) {
  const typeColors: Record<string, { bg: string; accent: string }> = {
    Visa: { bg: "from-blue-600 to-blue-800", accent: "text-blue-200" },
    Mastercard: { bg: "from-orange-500 to-red-600", accent: "text-orange-200" },
    "American Express": { bg: "from-emerald-600 to-teal-800", accent: "text-emerald-200" },
    Discover: { bg: "from-amber-500 to-orange-600", accent: "text-amber-200" },
    JCB: { bg: "from-indigo-500 to-purple-700", accent: "text-indigo-200" },
  };
  const colors = typeColors[card.type] || typeColors.Visa;

  const formatNumber = (num: string) => {
    if (card.type === "American Express") {
      return `${num.slice(0, 4)} ${num.slice(4, 10)} ${num.slice(10)}`;
    }
    return num.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div
      className={`relative w-full max-w-[320px] aspect-[1.586/1] rounded-xl bg-gradient-to-br ${colors.bg} p-4 flex flex-col justify-between text-white shadow-lg overflow-hidden`}
    >
      {/* Chip + Type */}
      <div className="flex items-start justify-between">
        <div className="w-10 h-7 rounded-md bg-yellow-300/80 border border-yellow-400/50" />
        <span className={`text-xs font-bold uppercase tracking-wider ${colors.accent}`}>
          {card.type}
        </span>
      </div>
      {/* Number */}
      <div className="font-mono text-base sm:text-lg tracking-widest">{formatNumber(card.number)}</div>
      {/* Bottom row */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-wider opacity-60">Card Holder</div>
          <div className="text-xs font-medium tracking-wide">{card.holder}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-wider opacity-60">Expires</div>
          <div className="text-xs font-mono">{card.expiry}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-wider opacity-60">CVV</div>
          <div className="text-xs font-mono">{card.cvv}</div>
        </div>
      </div>
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/5" />
    </div>
  );
}

export default function CreditCardGenerator() {
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState("");
  const [json, setJson] = useState(false);
  const [output, setOutput] = useState("");
  const [cards, setCards] = useState<CreditCardType[]>([]);
  const [showPreview, setShowPreview] = useState(true);

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    const generated = generateCreditCards(count, s);
    setCards(generated);
    if (json) {
      setOutput(JSON.stringify(generated, null, 2));
    } else {
      setOutput(
        generated
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
      <div className="flex flex-wrap items-end gap-3 mb-3">
        <NumberInput label="Count" value={count} onChange={setCount} min={1} max={50} />
        <SeedInput seed={seed} onChange={setSeed} />
        <ToggleJson value={json} onChange={setJson} />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showPreview}
            onChange={(e) => setShowPreview(e.target.checked)}
            className="w-4 h-4 rounded accent-purple-600"
          />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Card preview
          </span>
        </label>
        <GenerateButton onClick={generate} />
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-3">
        ⚠️ Fake numbers only — Luhn-valid but not real cards. For testing purposes.
      </p>

      {/* Visual card previews */}
      {showPreview && cards.length > 0 && (
        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex gap-3" style={{ minWidth: cards.length > 1 ? `${Math.min(cards.length, 3) * 340}px` : undefined }}>
            {cards.slice(0, 3).map((card, i) => (
              <CardPreview key={i} card={card} />
            ))}
          </div>
          {cards.length > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Showing 3 of {cards.length} cards — see full output below
            </p>
          )}
        </div>
      )}

      <OutputBox content={output} generator="CreditCard" label={`${count} credit cards`} isJson={json} />
    </GeneratorCard>
  );
}
