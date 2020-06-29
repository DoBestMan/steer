export function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}

export function map(s: number, a1: number, a2: number, b1: number, b2: number) {
  return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
}
