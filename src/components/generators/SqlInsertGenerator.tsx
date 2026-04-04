"use client";

import { useState } from "react";
import { Database } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import CopyButton from "../CopyButton";
import { NumberInput, SeedInput, SelectInput, GenerateButton } from "../Controls";
import { createRandom } from "@/lib/random";
import {
  FIRST_NAMES, LAST_NAMES, EMAIL_DOMAINS, CITIES, COUNTRIES, STATES,
  PRODUCT_ADJECTIVES, PRODUCT_NOUNS, PRODUCT_CATEGORIES,
} from "@/lib/data";

type TableType = "users" | "products" | "orders" | "posts";

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

function generateSqlInserts(table: TableType, count: number, seed?: number): string {
  const rng = createRandom(seed);
  const statements: string[] = [];

  if (table === "users") {
    statements.push("-- Table: users");
    statements.push("-- CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(150), city VARCHAR(100), country VARCHAR(100), is_active BOOLEAN, created_at TIMESTAMP);\n");
    for (let i = 1; i <= count; i++) {
      const first = rng.pick(FIRST_NAMES);
      const last = rng.pick(LAST_NAMES);
      const name = `${first} ${last}`;
      const email = `${first.toLowerCase()}.${last.toLowerCase()}@${rng.pick(EMAIL_DOMAINS)}`;
      const city = rng.pick(CITIES);
      const country = rng.pick(COUNTRIES);
      const active = rng.next() > 0.2 ? "TRUE" : "FALSE";
      const year = rng.int(2020, 2025);
      const month = rng.int(1, 12).toString().padStart(2, "0");
      const day = rng.int(1, 28).toString().padStart(2, "0");
      statements.push(
        `INSERT INTO users (id, name, email, city, country, is_active, created_at) VALUES (${i}, '${escapeSQL(name)}', '${escapeSQL(email)}', '${escapeSQL(city)}', '${escapeSQL(country)}', ${active}, '${year}-${month}-${day} ${rng.int(0, 23).toString().padStart(2, "0")}:${rng.int(0, 59).toString().padStart(2, "0")}:00');`
      );
    }
  } else if (table === "products") {
    statements.push("-- Table: products");
    statements.push("-- CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(150), price DECIMAL(10,2), category VARCHAR(50), sku VARCHAR(20), in_stock BOOLEAN);\n");
    for (let i = 1; i <= count; i++) {
      const name = `${rng.pick(PRODUCT_ADJECTIVES)} ${rng.pick(PRODUCT_NOUNS)}`;
      const price = (rng.int(499, 49999) / 100).toFixed(2);
      const category = rng.pick(PRODUCT_CATEGORIES);
      const sku = `SKU-${rng.int(10000, 99999)}`;
      const inStock = rng.next() > 0.2 ? "TRUE" : "FALSE";
      statements.push(
        `INSERT INTO products (id, name, price, category, sku, in_stock) VALUES (${i}, '${escapeSQL(name)}', ${price}, '${escapeSQL(category)}', '${sku}', ${inStock});`
      );
    }
  } else if (table === "orders") {
    statements.push("-- Table: orders");
    statements.push("-- CREATE TABLE orders (id INT PRIMARY KEY, user_id INT, total DECIMAL(10,2), status VARCHAR(20), items_count INT, ordered_at TIMESTAMP);\n");
    for (let i = 1; i <= count; i++) {
      const userId = rng.int(1, 500);
      const total = (rng.int(1500, 99999) / 100).toFixed(2);
      const status = rng.pick(["pending", "processing", "shipped", "delivered", "cancelled"]);
      const items = rng.int(1, 10);
      const year = rng.int(2023, 2025);
      const month = rng.int(1, 12).toString().padStart(2, "0");
      const day = rng.int(1, 28).toString().padStart(2, "0");
      statements.push(
        `INSERT INTO orders (id, user_id, total, status, items_count, ordered_at) VALUES (${i}, ${userId}, ${total}, '${status}', ${items}, '${year}-${month}-${day} ${rng.int(0, 23).toString().padStart(2, "0")}:${rng.int(0, 59).toString().padStart(2, "0")}:00');`
      );
    }
  } else if (table === "posts") {
    statements.push("-- Table: posts");
    statements.push("-- CREATE TABLE posts (id INT PRIMARY KEY, user_id INT, title VARCHAR(200), body TEXT, likes INT, published_at DATE);\n");
    const topics = ["Getting Started with", "Advanced", "Why I Love", "A Deep Dive into", "The Future of"];
    const subjects = ["React", "TypeScript", "CSS Grid", "Machine Learning", "Rust", "GraphQL", "WebAssembly"];
    for (let i = 1; i <= count; i++) {
      const userId = rng.int(1, 100);
      const title = `${rng.pick(topics)} ${rng.pick(subjects)}`;
      const body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.";
      const likes = rng.int(0, 5000);
      const year = rng.int(2023, 2025);
      const month = rng.int(1, 12).toString().padStart(2, "0");
      const day = rng.int(1, 28).toString().padStart(2, "0");
      statements.push(
        `INSERT INTO posts (id, user_id, title, body, likes, published_at) VALUES (${i}, ${userId}, '${escapeSQL(title)}', '${escapeSQL(body)}', ${likes}, '${year}-${month}-${day}');`
      );
    }
  }

  return statements.join("\n");
}

const SQL_KEYWORDS = new Set([
  "INSERT", "INTO", "VALUES", "CREATE", "TABLE", "PRIMARY", "KEY",
  "INT", "VARCHAR", "DECIMAL", "BOOLEAN", "TIMESTAMP", "TEXT", "DATE",
  "TRUE", "FALSE",
]);

function highlightSQL(sql: string) {
  return sql.split("\n").map((line, lineIdx) => {
    if (line.startsWith("--")) {
      return (
        <div key={lineIdx} className="text-gray-400 dark:text-gray-500 italic">
          {line}
        </div>
      );
    }
    if (!line.trim()) return <div key={lineIdx}>&nbsp;</div>;

    // Tokenize: keywords, strings, numbers, parens, rest
    const tokens: { type: string; value: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
      // Whitespace
      const wsMatch = remaining.match(/^(\s+)/);
      if (wsMatch) {
        tokens.push({ type: "ws", value: wsMatch[1] });
        remaining = remaining.slice(wsMatch[1].length);
        continue;
      }
      // String literal
      if (remaining[0] === "'") {
        let end = 1;
        while (end < remaining.length) {
          if (remaining[end] === "'" && remaining[end + 1] === "'") {
            end += 2;
          } else if (remaining[end] === "'") {
            end++;
            break;
          } else {
            end++;
          }
        }
        tokens.push({ type: "string", value: remaining.slice(0, end) });
        remaining = remaining.slice(end);
        continue;
      }
      // Number
      const numMatch = remaining.match(/^(\d+\.?\d*)/);
      if (numMatch && (tokens.length === 0 || tokens[tokens.length - 1].type !== "word")) {
        tokens.push({ type: "number", value: numMatch[1] });
        remaining = remaining.slice(numMatch[1].length);
        continue;
      }
      // Word
      const wordMatch = remaining.match(/^([A-Za-z_]\w*)/);
      if (wordMatch) {
        const word = wordMatch[1];
        const isKeyword = SQL_KEYWORDS.has(word.toUpperCase());
        tokens.push({ type: isKeyword ? "keyword" : "ident", value: word });
        remaining = remaining.slice(word.length);
        continue;
      }
      // Parens and punctuation
      tokens.push({ type: "punct", value: remaining[0] });
      remaining = remaining.slice(1);
    }

    return (
      <div key={lineIdx} className="whitespace-pre-wrap break-words">
        {tokens.map((token, i) => {
          switch (token.type) {
            case "keyword":
              return <span key={i} className="text-blue-400 dark:text-blue-400 font-bold">{token.value}</span>;
            case "string":
              return <span key={i} className="text-emerald-500 dark:text-emerald-400">{token.value}</span>;
            case "number":
              return <span key={i} className="text-amber-400 dark:text-amber-300">{token.value}</span>;
            case "punct":
              return <span key={i} className="text-gray-400 dark:text-gray-500">{token.value}</span>;
            case "ident":
              return <span key={i} className="text-purple-400 dark:text-purple-300">{token.value}</span>;
            default:
              return <span key={i}>{token.value}</span>;
          }
        })}
      </div>
    );
  });
}

export default function SqlInsertGenerator() {
  const [count, setCount] = useState(5);
  const [table, setTable] = useState<TableType>("users");
  const [seed, setSeed] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    setOutput(generateSqlInserts(table, count, s));
  };

  const tableDescriptions: Record<TableType, string> = {
    users: "id, name, email, city, country, is_active, created_at",
    products: "id, name, price, category, sku, in_stock",
    orders: "id, user_id, total, status, items_count, ordered_at",
    posts: "id, user_id, title, body, likes, published_at",
  };

  return (
    <GeneratorCard title="SQL INSERT Statements" icon={<Database size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Rows" value={count} onChange={setCount} min={1} max={100} />
        <SelectInput
          label="Table"
          value={table}
          onChange={setTable}
          options={[
            { value: "users", label: "👤 users" },
            { value: "products", label: "📦 products" },
            { value: "orders", label: "🛒 orders" },
            { value: "posts", label: "📝 posts" },
          ]}
        />
        <SeedInput seed={seed} onChange={setSeed} />
        <GenerateButton onClick={generate} />
      </div>

      {/* Schema hint */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Schema: </span>
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{tableDescriptions[table]}</span>
      </div>

      {/* Syntax-highlighted output */}
      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Output · SQL
            </span>
            <CopyButton text={output} label={`${count} ${table} rows`} generator="SQL INSERT" />
          </div>
          <pre
            className="p-4 rounded-xl bg-gray-950 dark:bg-gray-950 border border-gray-200
              dark:border-gray-700 text-sm leading-relaxed overflow-auto max-h-80 font-mono"
          >
            {highlightSQL(output)}
          </pre>
        </div>
      )}
    </GeneratorCard>
  );
}
