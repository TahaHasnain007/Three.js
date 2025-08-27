const planetColors = [
  0xfdb813, // Sun 🌞 (yellow-orange glow)
  0x8e6e53, // Mercury (rocky brown/gray)
  0xc2b280, // Venus (pale yellow/beige)
  0x2e86c1, // Earth (blue)
  0xc1440e, // Mars (red/orange)
  0xd4af37, // Jupiter (golden brown bands)
  0xf5deb3, // Saturn (pale yellow with rings)
  0x40e0d0, // Uranus (light cyan/blue-green)
  0x1f51ff, // Neptune (deep blue)
];

const orbitRadii = [
  0, // Sun (center)
  8, // Mercury
  11, // Venus
  14, // Earth
  17, // Mars
  23, // Jupiter
  30, // Saturn
  37, // Uranus
  44, // Neptune
];

const planetSizes = [
  3, // Sun 🌞
  0.5, // Mercury
  0.8, // Venus
  0.85, // Earth
  0.65, // Mars
  1.4, // Jupiter
  1.2, // Saturn
  0.9, // Uranus
  0.85, // Neptune
];

const orbitSpeeds = [
  0, // Sun (doesn’t orbit)
  0.04, // Mercury (fastest)
  0.035, // Venus
  0.02, // Earth
  0.01, // Mars
  0.009, // Jupiter
  0.006, // Saturn
  0.004, // Uranus
  0.002, // Neptune (slowest)
];

export { planetColors, planetSizes, orbitRadii, orbitSpeeds };
