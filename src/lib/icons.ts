/**
 * Available custom icons for the handyman template
 * Use these icon names with the astro-icon component
 */

export const ICONS = {
  // Carpentry Icons
  CARPENTRY: {
    CARPENTER_SQUARE: 'carpentry-carpenter-square',
    CHISEL: 'carpentry-chisel',
    CIRCULAR_SAW: 'carpentry-circular-saw',
    HAMMER_CARPENTRY: 'carpentry-hammer-carpentry',
    MEASURING_TAPE: 'carpentry-measuring-tape',
    NAIL_CARPENTRY: 'carpentry-nail-carpentry',
    SAW_CARPENTRY: 'carpentry-saw-carpentry',
    SCREWDRIVER_CARPENTRY: 'carpentry-screwdriver-carpentry',
    WOOD_GLUE: 'carpentry-wood-glue',
    WOOD_PLANK: 'carpentry-wood-plank',
    WOODEN_CABINET: 'carpentry-wooden-cabinet',
    WOODEN_CHAIR: 'carpentry-wooden-chair',
    WOODEN_DOOR: 'carpentry-wooden-door',
    WOODWORK: 'carpentry-woodwork',
    WOODWORKING_BENCH: 'carpentry-woodworking-bench',
    WORKBENCH: 'carpentry-workbench',
  },

  // Energy Icons
  ENERGY: {
    BATTERY: 'energy-battery',
    ELECTRIC_CAR: 'energy-electric-car',
    ELECTRIC_PLUG: 'energy-electric-plug',
    FAST_CHARGE: 'energy-fast-charge',
    FLAME: 'energy-flame',
    GAS_PUMP: 'energy-gas-pump',
    HYDROPOWER_DAM: 'energy-hydropower-dam',
    HYDROPOWER_WATER: 'energy-hydropower-water',
    LIGHT_BULB: 'energy-light-bulb',
    METER: 'energy-meter',
    NUCLEAR: 'energy-nuclear',
    OIL_BARREL: 'energy-oil-barrel',
    SOLAR_BATTERY: 'energy-solar-battery',
    SOLAR_ENERGY: 'energy-solar-energy',
    WIND: 'energy-wind',
    WINDMILL: 'energy-windmill',
  },

  // Gardening Icons
  GARDENING: {
    COMPOST: 'gardening-compost',
    FLOWER_POT: 'gardening-flower-pot',
    GARDEN_BED: 'gardening-garden-bed',
    GARDEN_FENCE: 'gardening-garden-fence',
    GARDEN_HOSE: 'gardening-garden-hose',
    GLOVES: 'gardening-gloves',
    LAWN_MOWER: 'gardening-lawn-mower',
    MULCH: 'gardening-mulch',
    RAKE: 'gardening-rake',
    SEEDLING: 'gardening-seedling',
    SHOVEL: 'gardening-shovel',
    SPRINKLER: 'gardening-sprinkler',
    SUNSHINE: 'gardening-sunshine',
    TOOLS: 'gardening-tools',
    WATERING_CAN: 'gardening-watering-can',
    WHEELBARROW: 'gardening-wheelbarrow',
  },

  // Home Repair Icons
  HOME_REPAIR: {
    DRILL: 'home-repair-drill',
    HAMMER: 'home-repair-hammer',
    LADDER: 'home-repair-ladder',
    LEVEL_TOOL: 'home-repair-level-tool',
    NAILS: 'home-repair-nails',
    PAINT_BRUSH: 'home-repair-paint-brush',
    PAINT_ROLLER: 'home-repair-paint-roller',
    PIPE_WRENCH: 'home-repair-pipe-wrench',
    PLIERS: 'home-repair-pliers',
    SAW: 'home-repair-saw',
    SCREWDRIVER: 'home-repair-screwdriver',
    SCREWS: 'home-repair-screws',
    SPANNER: 'home-repair-spanner',
    TAPE_MEASURE: 'home-repair-tape-measure',
    TOOLBOX: 'home-repair-toolbox',
    WRENCH: 'home-repair-wrench',
  },

  // Plumbing Icons
  PLUMBER: {
    BUCKET: 'plumber-bucket',
    DRAIN: 'plumber-drain',
    FAUCET: 'plumber-faucet',
    GLOVES: 'plumber-gloves',
    HOSE: 'plumber-hose',
    PIPE: 'plumber-pipe',
    PIPING_SYSTEM: 'plumber-piping-system',
    SEWER: 'plumber-sewer',
    SHOWER: 'plumber-shower',
    TOILET_PLUNGER: 'plumber-toilet-plunger',
    TOILET: 'plumber-toilet',
    TORCH: 'plumber-torch',
    VALVE: 'plumber-valve',
    WATER_LEAK: 'plumber-water-leak',
    WATER_METER: 'plumber-water-meter',
    WRENCH: 'plumber-wrench',
  },

  // Repair Icons
  REPAIR: {
    BOLT_NUT: 'repair-bolt-nut',
    DRILL: 'repair-drill',
    GEAR: 'repair-gear',
    HAMMER: 'repair-hammer',
    HELMET: 'repair-helmet',
    LADDER: 'repair-ladder',
    LIGHT_BULB: 'repair-light-bulb',
    NAIL_HAMMER: 'repair-nail-hammer',
    PAINTBRUSH: 'repair-paintbrush',
    PIPE_WRENCH: 'repair-pipe-wrench',
    PLIERS: 'repair-pliers',
    SAW: 'repair-saw',
    SCREWDRIVER: 'repair-screwdriver',
    TAPE_MEASURE: 'repair-tape-measure',
    TOOLBOX: 'repair-toolbox',
    WRENCH: 'repair-wrench',
  },

  // Security Icons
  SECURITY: {
    ALARM: 'security-alarm',
    BADGE: 'security-badge',
    CCTV: 'security-cctv',
    CYBERSECURITY: 'security-cybersecurity',
    DOOR: 'security-door',
    EYE: 'security-eye',
    FINGERPRINT: 'security-fingerprint',
    FIREWALL: 'security-firewall',
    GUARD: 'security-guard',
    KEY: 'security-key',
    LOCK_KEY: 'security-lock-key',
    LOCK: 'security-lock',
    SAFE: 'security-safe',
    SHIELD: 'security-shield',
    SURVEILLANCE: 'security-surveillance',
    WARNING: 'security-warning',
  },
} as const

// Flattened list of all icon names for easy access
export const ALL_ICONS = Object.values(ICONS).reduce((acc, category) => {
  return [...acc, ...Object.values(category)]
}, [] as string[])

// Type for icon names (useful for TypeScript)
export type IconName = (typeof ALL_ICONS)[number]

// Helper function to get all icons by category
export const getIconsByCategory = (category: keyof typeof ICONS) => {
  return Object.values(ICONS[category])
}

// Helper function to get all categories
export const getIconCategories = () => {
  return Object.keys(ICONS) as Array<keyof typeof ICONS>
}
