import { SeededRandom, createRandom } from "./random";
import {
  LOREM_WORDS, FIRST_NAMES, LAST_NAMES, BIOS, EMAIL_DOMAINS,
  PRODUCT_ADJECTIVES, PRODUCT_NOUNS, PRODUCT_CATEGORIES, PRODUCT_DESCRIPTIONS,
  BLOG_TITLES, BLOG_TOPICS, BLOG_FIELDS,
  STREET_NAMES, CITIES, STATES, COUNTRIES,
} from "./data";

// --- Lorem Ipsum ---
export type LoremUnit = "paragraphs" | "sentences" | "words";

function generateSentence(rng: SeededRandom): string {
  const len = rng.int(8, 18);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(rng.pick(LOREM_WORDS));
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(rng: SeededRandom): string {
  const count = rng.int(4, 8);
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) sentences.push(generateSentence(rng));
  return sentences.join(" ");
}

export function generateLorem(count: number, unit: LoremUnit, seed?: number): string {
  const rng = createRandom(seed);
  if (unit === "words") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) words.push(rng.pick(LOREM_WORDS));
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  }
  if (unit === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) sentences.push(generateSentence(rng));
    return sentences.join(" ");
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) paragraphs.push(generateParagraph(rng));
  return paragraphs.join("\n\n");
}

// --- User Profiles ---
export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export function generateProfiles(count: number, seed?: number): UserProfile[] {
  const rng = createRandom(seed);
  const profiles: UserProfile[] = [];
  for (let i = 0; i < count; i++) {
    const first = rng.pick(FIRST_NAMES);
    const last = rng.pick(LAST_NAMES);
    const name = `${first} ${last}`;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@${rng.pick(EMAIL_DOMAINS)}`;
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
    const bio = rng.pick(BIOS);
    profiles.push({ name, email, avatar, bio });
  }
  return profiles;
}

// --- Products ---
export interface Product {
  name: string;
  price: string;
  description: string;
  sku: string;
  category: string;
}

export function generateProducts(count: number, seed?: number): Product[] {
  const rng = createRandom(seed);
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const adj = rng.pick(PRODUCT_ADJECTIVES);
    const noun = rng.pick(PRODUCT_NOUNS);
    products.push({
      name: `${adj} ${noun}`,
      price: `$${(rng.int(999, 29999) / 100).toFixed(2)}`,
      description: rng.pick(PRODUCT_DESCRIPTIONS),
      sku: `SKU-${rng.int(10000, 99999)}`,
      category: rng.pick(PRODUCT_CATEGORIES),
    });
  }
  return products;
}

// --- Blog Posts ---
export interface BlogPost {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  body: string;
}

export function generateBlogPosts(count: number, seed?: number): BlogPost[] {
  const rng = createRandom(seed);
  const posts: BlogPost[] = [];
  for (let i = 0; i < count; i++) {
    const topic = rng.pick(BLOG_TOPICS);
    const field = rng.pick(BLOG_FIELDS);
    const year = rng.int(2024, 2026).toString();
    let title = rng.pick(BLOG_TITLES)
      .replace("{topic}", topic)
      .replace("{year}", year)
      .replace("{field}", field);
    const month = rng.int(1, 12).toString().padStart(2, "0");
    const day = rng.int(1, 28).toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    const author = `${rng.pick(FIRST_NAMES)} ${rng.pick(LAST_NAMES)}`;
    const excerpt = generateSentence(rng) + " " + generateSentence(rng);
    const body = [generateParagraph(rng), generateParagraph(rng), generateParagraph(rng)].join("\n\n");
    posts.push({ title, date, author, excerpt, body });
  }
  return posts;
}

// --- Addresses ---
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export function generateAddresses(count: number, seed?: number): Address[] {
  const rng = createRandom(seed);
  const addrs: Address[] = [];
  for (let i = 0; i < count; i++) {
    addrs.push({
      street: `${rng.int(100, 9999)} ${rng.pick(STREET_NAMES)}`,
      city: rng.pick(CITIES),
      state: rng.pick(STATES),
      zip: rng.int(10000, 99999).toString(),
      country: rng.pick(COUNTRIES),
    });
  }
  return addrs;
}

// --- Numbers / Dates / UUIDs ---
export type MiscType = "integers" | "decimals" | "dates" | "uuids";

export function generateMisc(count: number, type: MiscType, seed?: number, min = 0, max = 1000): string[] {
  const rng = createRandom(seed);
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case "integers":
        results.push(rng.int(min, max).toString());
        break;
      case "decimals":
        results.push((rng.next() * (max - min) + min).toFixed(2));
        break;
      case "dates": {
        const start = new Date(2020, 0, 1).getTime();
        const end = new Date(2027, 0, 1).getTime();
        const d = new Date(start + rng.next() * (end - start));
        results.push(d.toISOString().split("T")[0]);
        break;
      }
      case "uuids":
        results.push(rng.uuid());
        break;
    }
  }
  return results;
}

// --- Placeholder Images ---
export function generatePlaceholderImage(
  width: number,
  height: number,
  bgColor: string,
  textColor: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="sans-serif" font-size="${Math.min(width, height) / 6}px"
      fill="${textColor}">${width}×${height}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
