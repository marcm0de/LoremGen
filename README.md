# LoremGen ✨

A smart placeholder content generator for developers and designers. All generation happens client-side with deterministic seeded randomness.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Lorem Ipsum** — paragraphs, sentences, or words (1–20)
- **User Profiles** — name, email, avatar URL, bio (1–50)
- **Product Listings** — name, price, description, SKU, category
- **Blog Posts** — title, date, author, excerpt, full body
- **Addresses** — street, city, state, zip, country
- **Numbers / Dates / UUIDs** — configurable ranges
- **Placeholder Images** — SVG data URIs with custom dimensions & colors
- **JSON Output Mode** — every generator supports JSON export
- **Copy to Clipboard** — one-click copy with toast notification
- **History** — keeps track of your last 100 generations
- **Dark / Light Mode** — toggle with persistence
- **Deterministic Seeds** — same seed = same output, every time

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/LoremGen.git
cd LoremGen

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building

```bash
npm run build
npm start
```

## How It Works

All content is generated client-side using a seeded pseudo-random number generator (Mulberry32). Providing the same seed always produces the same output, making it great for reproducible mockups and tests.

No API calls, no external dependencies for data generation. Everything runs in your browser.

## License

[MIT](LICENSE)
