export function addJitter(time, variance = 0.1): number {
  const variant = variance * time * Math.random();

  return Math.floor(time - (variance * time) / 2 + variant);
}
