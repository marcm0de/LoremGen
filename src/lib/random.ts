// Mulberry32 - fast seeded PRNG
export class SeededRandom {
  private state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)];
  }

  shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  uuid(): string {
    const hex = () =>
      this.int(0, 255).toString(16).padStart(2, "0");
    return (
      hex() + hex() + hex() + hex() + "-" +
      hex() + hex() + "-4" + hex().slice(1) + hex() + "-" +
      ((this.int(0, 3) + 8).toString(16)) + hex().slice(1) + hex() + "-" +
      hex() + hex() + hex() + hex() + hex() + hex()
    );
  }
}

export function createRandom(seed?: number): SeededRandom {
  return new SeededRandom(seed ?? Date.now());
}
