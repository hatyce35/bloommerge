import { LevelConfig } from '../types/game';

// Handcrafted, 100% solvable 30 deterministic levels
export const LEVELS: LevelConfig[] = [
  // Level 1: Pembe (Lotus) ve Mavi (Çançiçeği) Tohumları
  {
    id: 1,
    title: 'İlk Tohumlar',
    subtitle: 'Pembe ve mavi çiçek tohumlarını birleştir!',
    tutorialTip: 'Tohumları (🌱) birleştirerek küçük çiçek (🌷), onları da birleştirerek büyük çiçek (🌸) yap!',
    targetBloomStage: 3,
    columns: [
      {
        capacity: 99,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 1 },
          { color: 'blue', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 1 },
          { color: 'pink', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 1 },
          { color: 'blue', stage: 1 },
        ],
      },
    ],
    goals: [
      { color: 'pink', stage: 3, targetCount: 1 },
      { color: 'blue', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },

  // Level 2: Farklı Tohumlar - Sarı (Ayçiçeği) ve Mor (Orkide) Tohumları
  {
    id: 2,
    title: 'Güneş ve Gece Tohumları',
    subtitle: 'Sarı ayçiçeği ve mor orkide tohumları bahçeye geldi',
    specialFeatureIntroduced: 'Sarı ve Mor Çiçek Tohumları',
    tutorialTip: 'Farklı tohumları kendi renk gruplarında toplayıp her sütuna bir büyük çiçek açtır!',
    targetBloomStage: 3,
    columns: [
      {
        capacity: 99,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'purple', stage: 1 },
          { color: 'yellow', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 1 },
          { color: 'purple', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 1 },
          { color: 'purple', stage: 1 },
        ],
      },
    ],
    goals: [
      { color: 'yellow', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },

  // Level 3: Farklı Tohumlar - Turuncu (Zambak) ve Kırmızı (Kamelya) Tohumları
  {
    id: 3,
    title: 'Ateş Açan Tohumlar',
    subtitle: 'Turuncu zambak ve kırmızı kamelya tohumları filizleniyor',
    specialFeatureIntroduced: 'Turuncu ve Kırmızı Çiçek Tohumları',
    tutorialTip: 'Her sütuna 1 büyük çiçek açtırarak bölümü tamamla!',
    targetBloomStage: 3,
    columns: [
      {
        capacity: 99,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 1 },
          { color: 'orange', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'red', stage: 2 },
          { color: 'orange', stage: 1 },
          { color: 'red', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 2 },
          { color: 'orange', stage: 1 },
          { color: 'red', stage: 1 },
        ],
      },
    ],
    goals: [
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'red', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },

  // Level 4: 3 Farklı Tohum - Pembe, Sarı, Mavi Tohumları
  {
    id: 4,
    title: 'Gökkuşağı Tohum Bahçesi',
    subtitle: 'Üç farklı çiçek tohumu bir arada',
    targetBloomStage: 3,
    columns: [
      {
        capacity: 99,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 1 },
          { color: 'blue', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'blue', stage: 1 },
          { color: 'pink', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 1 },
          { color: 'yellow', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 1 },
          { color: 'yellow', stage: 1 },
          { color: 'blue', stage: 1 },
        ],
      },
    ],
    goals: [
      { color: 'pink', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
      { color: 'blue', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 8, twoStars: 14 },
  },

  // Level 5: 3 Farklı Tohum - Mor, Turuncu, Kırmızı Tohumları
  {
    id: 5,
    title: 'Saray Bahçesi Tohumları',
    subtitle: 'Mor, turuncu ve kırmızı tohumlar filizleniyor',
    targetBloomStage: 3,
    columns: [
      {
        capacity: 99,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'orange', stage: 1 },
          { color: 'red', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 1 },
          { color: 'purple', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'red', stage: 2 },
          { color: 'purple', stage: 1 },
          { color: 'orange', stage: 1 },
        ],
      },
      {
        capacity: 99,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 2 },
          { color: 'purple', stage: 1 },
          { color: 'orange', stage: 1 },
          { color: 'red', stage: 1 },
        ],
      },
    ],
    goals: [
      { color: 'purple', stage: 3, targetCount: 1 },
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'red', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 8, twoStars: 13 },
  },

  // Levels 6-10: Introducing Orchid (Purple) & 4-5 columns
  {
    id: 6,
    title: 'Royal Amethyst',
    subtitle: 'The Royal Orchid family enters the garden',
    specialFeatureIntroduced: 'Purple Flower Family',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'purple', stage: 3, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 9 },
  },
  {
    id: 7,
    title: 'Seedling Nursery',
    subtitle: 'Chain merge from buds to blossoms',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 1 },
          { color: 'blue', stage: 1 },
          { color: 'blue', stage: 1 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
    ],
    goals: [
      { color: 'blue', stage: 3, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 3, twoStars: 6 },
  },
  {
    id: 8,
    title: 'Quad Bloom',
    subtitle: 'Manage four colorful flower varieties',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'purple', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 10, twoStars: 15 },
  },
  {
    id: 9,
    title: 'Grand Bloom Quest',
    subtitle: 'Nurture your first Large Blossom (Stage 4)!',
    tutorialTip: 'Stack 3 blossoms (🌸) to merge into a majestic Large Blossom (🌺)!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 3 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 3 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 3 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'pink', stage: 4, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 8 },
  },
  {
    id: 10,
    title: 'Terrace Garden',
    subtitle: 'A clean arrangement of four colors',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'blue', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },

  // Levels 11-15: Sunset Lily (Orange) & 5 Columns
  {
    id: 11,
    title: 'Sunset Lily Glow',
    subtitle: 'Meet the fiery Sunset Lily family',
    specialFeatureIntroduced: 'Orange Flower Family',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 9 },
  },
  {
    id: 12,
    title: 'Patience & Petals',
    subtitle: 'Think ahead before clearing empty columns',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 9, twoStars: 14 },
  },
  {
    id: 13,
    title: 'Double Harvest',
    subtitle: 'Produce two Azure Bluebell blossoms',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'blue', stage: 3, targetCount: 2 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 7, twoStars: 12 },
  },
  {
    id: 14,
    title: 'Tight Planter',
    subtitle: 'Columns with 3-slot capacity require precision',
    columns: [
      {
        capacity: 3,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 3,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 3,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 3,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'pink', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },
  {
    id: 15,
    title: 'Botanical Symphony',
    subtitle: 'Four families weaving together',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'blue', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 11, twoStars: 17 },
  },

  // Levels 16-20: Crimson Camellia (Red) & Rare Flower (Stage 5)
  {
    id: 16,
    title: 'Crimson Passion',
    subtitle: 'The velvet Crimson Camellia family arrives',
    specialFeatureIntroduced: 'Red Flower Family',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'red', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'red', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'red', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 8 },
  },
  {
    id: 17,
    title: 'Double Tier Growth',
    subtitle: 'Merge buds to small flowers, then small to blossom',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 1 },
          { color: 'red', stage: 1 },
          { color: 'red', stage: 1 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 2 },
          { color: 'red', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'purple', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
    ],
    goals: [
      { color: 'red', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 3, twoStars: 5 },
  },
  {
    id: 18,
    title: 'Rare Helianthus Crown',
    subtitle: 'Nurture a Rare Flower (Stage 5)!',
    tutorialTip: 'Stack 3 Large Blossoms (🌺) to birth a Rare Flower (🌻)!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 4 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 4 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 4 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'yellow', stage: 5, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 8 },
  },
  {
    id: 19,
    title: 'Five Color Tapestry',
    subtitle: 'Pink, blue, yellow, purple, and orange weave together',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'yellow', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'pink', stage: 3, targetCount: 1 },
      { color: 'blue', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 10, twoStars: 16 },
  },
  {
    id: 20,
    title: 'The Midpoint Zenith',
    subtitle: 'Achieve both a Rare Bloom and a Large Blossom',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 4 },
          { color: 'red', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 4 },
          { color: 'red', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 4 },
          { color: 'red', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'blue', stage: 5, targetCount: 1 },
      { color: 'red', stage: 4, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 8 },
  },

  // Levels 21-25: Special Flowers (Wild Flower & Frozen Flower)
  {
    id: 21,
    title: 'The Wild Petal',
    subtitle: 'Wild Flowers can match with any color once!',
    specialFeatureIntroduced: 'Wild Flower (Matches any color)',
    tutorialTip: 'A Wild Flower has a swirling rainbow center and will match any color family!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 2, isWild: true },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'yellow', stage: 3, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 4, twoStars: 7 },
  },
  {
    id: 22,
    title: 'Frost in the Garden',
    subtitle: 'Thaw frozen flowers to unlock their potential',
    specialFeatureIntroduced: 'Frozen Flower (Tap or move to thaw)',
    tutorialTip: 'Frozen flowers (❄️) are encased in ice. Move them or merge nearby to crack the frost!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2, isFrozen: true },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'blue', stage: 3, targetCount: 1 },
      { color: 'pink', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 8 },
  },
  {
    id: 23,
    title: 'Winter Thaw',
    subtitle: 'Two frozen flowers in deep garden pots',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2, isFrozen: true },
          { color: 'purple', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2, isFrozen: true },
          { color: 'yellow', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'yellow', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },
  {
    id: 24,
    title: 'Prism & Frost',
    subtitle: 'Use wild petals to thaw and merge stubborn frost',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 2, isFrozen: true },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 2, isWild: true },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'red', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'orange', stage: 3, targetCount: 1 },
      { color: 'red', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 5, twoStars: 9 },
  },
  {
    id: 25,
    title: 'The Glacial Garden',
    subtitle: 'Carefully sequence every move through cold glass',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2, isFrozen: true },
          { color: 'blue', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2, isFrozen: true },
          { color: 'yellow', stage: 2 },
          { color: 'pink', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'pink', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'pink', stage: 3, targetCount: 1 },
      { color: 'blue', stage: 3, targetCount: 1 },
      { color: 'yellow', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 9, twoStars: 14 },
  },

  // Levels 26-30: Rainbow Flower, Locked Flower & Magical Zenith (Stage 6)
  {
    id: 26,
    title: 'Rainbow Bloom',
    subtitle: 'Rainbow flowers adapt to any destination need',
    specialFeatureIntroduced: 'Rainbow Flower (Adapts to needed color)',
    tutorialTip: 'A Rainbow Flower shifts to the hue of whatever column it joins!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2 },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 2, isRainbow: true },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'purple', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 3, twoStars: 6 },
  },
  {
    id: 27,
    title: 'The Golden Padlock',
    subtitle: 'Locked flowers cannot move until unlocked by a merge!',
    specialFeatureIntroduced: 'Locked Flower (Unlocks on any merge)',
    tutorialTip: 'Complete any merge in the garden to break the golden vine padlock!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 2, isLocked: true },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 2 },
          { color: 'yellow', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 2 },
          { color: 'red', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'yellow', stage: 3, targetCount: 1 },
      { color: 'red', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 4, twoStars: 7 },
  },
  {
    id: 28,
    title: 'Bramble & Ice',
    subtitle: 'Overcome locked and frozen elements together',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'purple', stage: 2, isLocked: true },
          { color: 'blue', stage: 2 },
          { color: 'orange', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'orange', stage: 2, isFrozen: true },
          { color: 'purple', stage: 2 },
          { color: 'blue', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'blue', stage: 2 },
          { color: 'orange', stage: 2 },
          { color: 'purple', stage: 2 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'blue', stage: 3, targetCount: 1 },
      { color: 'purple', stage: 3, targetCount: 1 },
    ],
    starThresholds: { threeStars: 9, twoStars: 15 },
  },
  {
    id: 29,
    title: 'The Alchemist’s Garden',
    subtitle: 'Wild, rainbow, and frozen flowers intertwine',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 3, isFrozen: true },
          { color: 'yellow', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'yellow', stage: 3 },
          { color: 'red', stage: 3, isWild: true },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'red', stage: 3 },
          { color: 'yellow', stage: 3, isRainbow: true },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'red', stage: 4, targetCount: 1 },
      { color: 'yellow', stage: 4, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 11 },
  },
  {
    id: 30,
    title: 'Celestial Transcendence',
    subtitle: 'Birth the Legendary Stage 6 Magical Flower (✨)!',
    specialFeatureIntroduced: 'Magical Flower (Stage 6)',
    tutorialTip: 'Merge three Rare Flowers (🌻) to awaken the Celestial Magical Flower and master Bloom Merge!',
    columns: [
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 5 },
          { color: 'blue', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 5 },
          { color: 'blue', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [
          { color: 'pink', stage: 5, isWild: true },
          { color: 'blue', stage: 3 },
        ],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
      {
        capacity: 4,
        initialFlowers: [],
      },
    ],
    goals: [
      { color: 'pink', stage: 6, targetCount: 1 },
      { color: 'blue', stage: 4, targetCount: 1 },
    ],
    starThresholds: { threeStars: 6, twoStars: 10 },
  },
];
