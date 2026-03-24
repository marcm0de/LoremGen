# Contributing to LoremGen

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/marcusfequiere/LoremGen.git
   cd LoremGen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/            # Next.js app router pages
├── components/
│   ├── generators/ # Individual generator components
│   └── ...         # Shared components (OutputBox, Controls, etc.)
└── lib/
    ├── generators.ts # Core generation logic
    ├── random.ts     # Seeded PRNG (Mulberry32)
    ├── data.ts       # Static data arrays for generation
    └── store.ts      # Zustand state management
```

## How to Contribute

### Adding a New Generator

1. Add generation logic to `src/lib/generators.ts`
2. Create a component in `src/components/generators/` (use `GeneratorCard`, `OutputBox`, and `Controls` components)
3. Import and render it in `src/app/page.tsx`
4. Use the `SeededRandom` class from `src/lib/random.ts` for reproducible output

### Bug Reports & Feature Requests

Open an issue with a clear description and steps to reproduce (for bugs).

### Pull Requests

1. Fork the repo and create a feature branch
2. Make your changes with clear commit messages
3. Ensure `npm run build` passes
4. Open a PR with a description of what changed and why

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Zustand for state management
- Tailwind CSS for styling
- Framer Motion for animations

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
