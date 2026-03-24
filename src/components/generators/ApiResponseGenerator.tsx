"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import GeneratorCard from "../GeneratorCard";
import OutputBox from "../OutputBox";
import { NumberInput, SeedInput, SelectInput, GenerateButton } from "../Controls";
import { createRandom } from "@/lib/random";
import {
  FIRST_NAMES, LAST_NAMES, EMAIL_DOMAINS, CITIES, COUNTRIES,
} from "@/lib/data";

type EndpointType = "users" | "products" | "posts" | "comments" | "todos";

function generateApiResponse(endpoint: EndpointType, count: number, seed?: number): string {
  const rng = createRandom(seed);

  const generateUser = () => {
    const first = rng.pick(FIRST_NAMES);
    const last = rng.pick(LAST_NAMES);
    return {
      id: rng.int(1, 9999),
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${rng.pick(EMAIL_DOMAINS)}`,
      username: `${first.toLowerCase()}${rng.int(10, 99)}`,
      phone: `+1-${rng.int(200, 999)}-${rng.int(100, 999)}-${rng.int(1000, 9999)}`,
      address: {
        city: rng.pick(CITIES),
        country: rng.pick(COUNTRIES),
        zipCode: rng.int(10000, 99999).toString(),
      },
      isActive: rng.next() > 0.3,
      createdAt: new Date(2023, rng.int(0, 11), rng.int(1, 28)).toISOString(),
    };
  };

  const generateProduct = () => ({
    id: rng.int(1, 9999),
    name: rng.pick(["Wireless", "Smart", "Ultra", "Pro", "Mini"]) + " " + rng.pick(["Speaker", "Watch", "Keyboard", "Mouse", "Headphones", "Camera", "Tablet"]),
    price: parseFloat((rng.int(999, 49999) / 100).toFixed(2)),
    currency: "USD",
    category: rng.pick(["Electronics", "Home", "Sports", "Fashion", "Books"]),
    inStock: rng.next() > 0.2,
    rating: parseFloat((rng.int(30, 50) / 10).toFixed(1)),
    reviewCount: rng.int(0, 2500),
    sku: `SKU-${rng.int(10000, 99999)}`,
  });

  const generatePost = () => ({
    id: rng.int(1, 9999),
    title: rng.pick(["How to", "Why", "The Ultimate Guide to", "Understanding", "10 Tips for"]) + " " + rng.pick(["Build Better Apps", "Learn Faster", "Write Clean Code", "Stay Productive", "Master CSS"]),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userId: rng.int(1, 100),
    tags: Array.from({ length: rng.int(1, 4) }, () => rng.pick(["tech", "tutorial", "news", "opinion", "review", "guide"])),
    publishedAt: new Date(2024, rng.int(0, 11), rng.int(1, 28)).toISOString(),
    likes: rng.int(0, 5000),
  });

  const generateComment = () => ({
    id: rng.int(1, 9999),
    postId: rng.int(1, 100),
    author: `${rng.pick(FIRST_NAMES)} ${rng.pick(LAST_NAMES)}`,
    email: `${rng.pick(FIRST_NAMES).toLowerCase()}@${rng.pick(EMAIL_DOMAINS)}`,
    body: rng.pick([
      "Great article! Very helpful.",
      "I disagree with some points, but overall good read.",
      "Thanks for sharing this!",
      "This changed my perspective completely.",
      "Can you elaborate on the third point?",
      "Bookmarked for later. Excellent content.",
    ]),
    createdAt: new Date(2024, rng.int(0, 11), rng.int(1, 28)).toISOString(),
  });

  const generateTodo = () => ({
    id: rng.int(1, 9999),
    userId: rng.int(1, 50),
    title: rng.pick(["Fix", "Review", "Update", "Implement", "Test", "Deploy", "Refactor"]) + " " + rng.pick(["login page", "API endpoints", "database schema", "user dashboard", "payment flow", "search feature"]),
    completed: rng.next() > 0.5,
    priority: rng.pick(["low", "medium", "high", "critical"]),
    dueDate: new Date(2024, rng.int(0, 11), rng.int(1, 28)).toISOString().split("T")[0],
  });

  const generators: Record<EndpointType, () => unknown> = {
    users: generateUser,
    products: generateProduct,
    posts: generatePost,
    comments: generateComment,
    todos: generateTodo,
  };

  const data = Array.from({ length: count }, () => generators[endpoint]());

  const response = {
    status: 200,
    message: "OK",
    data,
    meta: {
      total: rng.int(count, count * 10),
      page: 1,
      perPage: count,
      totalPages: rng.int(1, 20),
    },
  };

  return JSON.stringify(response, null, 2);
}

export default function ApiResponseGenerator() {
  const [count, setCount] = useState(3);
  const [endpoint, setEndpoint] = useState<EndpointType>("users");
  const [seed, setSeed] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    const s = seed ? parseInt(seed, 10) || seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) : undefined;
    setOutput(generateApiResponse(endpoint, count, s));
  };

  return (
    <GeneratorCard title="API Response" icon={<Globe size={20} />}>
      <div className="flex flex-wrap items-end gap-3 mb-2">
        <NumberInput label="Items" value={count} onChange={setCount} min={1} max={50} />
        <SelectInput
          label="Endpoint"
          value={endpoint}
          onChange={setEndpoint}
          options={[
            { value: "users", label: "/api/users" },
            { value: "products", label: "/api/products" },
            { value: "posts", label: "/api/posts" },
            { value: "comments", label: "/api/comments" },
            { value: "todos", label: "/api/todos" },
          ]}
        />
        <SeedInput seed={seed} onChange={setSeed} />
        <GenerateButton onClick={generate} />
      </div>
      <OutputBox content={output} generator="API Response" label={`${count} ${endpoint}`} isJson />
    </GeneratorCard>
  );
}
