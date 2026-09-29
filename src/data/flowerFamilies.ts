import { FlowerColor, FlowerStage } from '../types/game';

export interface FlowerMeta {
  color: FlowerColor;
  familyName: string;
  botanicalName: string;
  themeColor: string;
  secondaryColor: string;
  borderColor: string;
  lore: string;
  stageNames: Record<FlowerStage, string>;
}

export const STAGE_DESCRIPTIONS: Record<FlowerStage, { title: string; symbol: string }> = {
  1: { title: 'Tohum', symbol: '🌱' },
  2: { title: 'Çiçek 1', symbol: '🌷' },
  3: { title: 'Çiçek 2', symbol: '🌸' },
  4: { title: 'Çiçek 3', symbol: '🌺' },
  5: { title: 'En Büyük Çiçek', symbol: '✨' },
  6: { title: 'En Büyük Çiçek', symbol: '✨' },
};

export const FLOWER_FAMILIES: Record<FlowerColor, FlowerMeta> = {
  pink: {
    color: 'pink',
    familyName: 'Sakura Lotus',
    botanicalName: 'Nelumbo Serenitatis',
    themeColor: '#f472b6',
    secondaryColor: '#fbcfe8',
    borderColor: '#db2777',
    lore: 'Gentle aquatic petals that bring tranquility and serenity to garden waters.',
    stageNames: {
      1: 'Lotus Seedling',
      2: 'Pink Sprout',
      3: 'Sakura Blossom',
      4: 'Radiant Grand Lotus',
      5: 'Crown Lotus',
      6: 'Celestial Star Lotus',
    },
  },
  blue: {
    color: 'blue',
    familyName: 'Azure Bluebell',
    botanicalName: 'Campanula Caelestis',
    themeColor: '#38bdf8',
    secondaryColor: '#bae6fd',
    borderColor: '#0284c7',
    lore: 'Chiming bell petals that catch morning dew and echo the whisper of breezes.',
    stageNames: {
      1: 'Dewy Bluebud',
      2: 'Bellflower Sprout',
      3: 'Azure Bluebell',
      4: 'Grand Sapphire Cluster',
      5: 'Royal Crystal Bell',
      6: 'Starlight Windchime',
    },
  },
  yellow: {
    color: 'yellow',
    familyName: 'Solar Helianthus',
    botanicalName: 'Helianthus Solaris',
    themeColor: '#fbbf24',
    secondaryColor: '#fef08a',
    borderColor: '#d97706',
    lore: 'Warm radiating petals that follow the path of sunlight across summer skies.',
    stageNames: {
      1: 'Sun Sprout',
      2: 'Solar Shoot',
      3: 'Golden Helianthus',
      4: 'Solar Grand Bloom',
      5: 'Amber Ray Sovereign',
      6: 'Dawn Helios Flower',
    },
  },
  purple: {
    color: 'purple',
    familyName: 'Royal Orchid',
    botanicalName: 'Orchis Majestatis',
    themeColor: '#c084fc',
    secondaryColor: '#f3e8ff',
    borderColor: '#9333ea',
    lore: 'Velvety winged blossoms with an alluring fragrance favored by noble gardens.',
    stageNames: {
      1: 'Purple Pip',
      2: 'Lilac Shoot',
      3: 'Royal Orchid',
      4: 'Imperial Velvet Iris',
      5: 'Crowned Amethyst Petal',
      6: 'Mystic Nebula Orchid',
    },
  },
  orange: {
    color: 'orange',
    familyName: 'Sunset Lily',
    botanicalName: 'Lilium Vesperis',
    themeColor: '#fb923c',
    secondaryColor: '#ffedd5',
    borderColor: '#ea580c',
    lore: 'Flamboyant reflexed petals glowing with the rich warmth of dusk and twilight.',
    stageNames: {
      1: 'Ember Bud',
      2: 'Flame Sprout',
      3: 'Sunset Lily',
      4: 'Tiger Lily Bloom',
      5: 'Solar Flare Lily',
      6: 'Phoenix Fireflower',
    },
  },
  red: {
    color: 'red',
    familyName: 'Crimson Camellia',
    botanicalName: 'Camellia Rubra',
    themeColor: '#f87171',
    secondaryColor: '#fee2e2',
    borderColor: '#dc2626',
    lore: 'Dense spiral petals steeped in deep romantic crimson that withstand cold frosts.',
    stageNames: {
      1: 'Ruby Nodule',
      2: 'Rose Bud',
      3: 'Crimson Camellia',
      4: 'Lush Velvet Rose',
      5: 'Imperial Empress Rose',
      6: 'Heart of the Garden',
    },
  },
};
