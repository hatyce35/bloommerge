import { LevelConfig, FlowerColor, FlowerStage } from '../types/game';

// Helper to distribute items across ALL 6 branches so every branch is FILLED with varying flower counts
// "6 dal olsun"
function getAll6FilledDistribution(totalItems: number): number[] {
  if (totalItems === 21) {
    return [5, 4, 4, 3, 3, 2]; // 6 branches!
  }
  if (totalItems === 18) {
    return [4, 4, 3, 3, 2, 2];
  }
  if (totalItems === 28) {
    return [6, 5, 5, 4, 4, 4];
  }
  const base = Math.floor(totalItems / 6);
  const rem = totalItems % 6;
  const lengths = [base, base, base, base, base, base];
  for (let i = 0; i < rem; i++) {
    lengths[i]++;
  }
  if (lengths[0] < 6 && lengths[5] > 2) {
    lengths[0]++;
    lengths[5]--;
  }
  return lengths;
}

// Helper function to create levels:
// Strictly 6 columns on screen, and ALL 6 ARE FILLED!
// Mixed floral visual designs matching screenshot:
// - 🌱 Tohum (Stage 1 - pointed teardrop on green calyx leaves)
// - 🌷 Çiçek 1 (Stage 2 - bloomed buds: pink gem bud, blue bell cup, orange star lily, etc.)
// - 🌸 Çiçek 2 (Stage 3 - blooming flower)
// Progression: Tohum (1) -> Çiçek 1 (2) -> Çiçek 2 (3) -> Çiçek 3 (4) -> En Büyük Çiçek (5)
function createLevel(
  id: number,
  title: string,
  subtitle: string,
  colors: FlowerColor[],
  options?: {
    hasFrozen?: boolean;
    hasWild?: boolean;
    hasLocked?: boolean;
    specialFeatureIntroduced?: string;
    tutorialTip?: string;
  }
): LevelConfig {
  // Each color has a mathematically balanced 3-merge chain:
  // - 3 items at Stage 1 (🌱 Tohum) ➔ 3'ü birleşince 1 tane Çiçek 1 (Stage 2) olur!
  // - 2 items at Stage 2 (🌷 Çiçek 1) ➔ yukarıdakiyle 3 tane olur, 3'ü birleşince 1 tane Çiçek 2 (Stage 3) olur!
  // - 2 items at Stage 3 (🌸 Çiçek 2) ➔ yukarıdakiyle 3 tane olur, 3'ü birleşince 1 tane En Büyük Çiçek (Stage 5) olur!
  // Toplam 7 öge per renk (3 renk için 21 öge, 6 dala [5, 4, 4, 3, 3, 2] olarak dağıtılır)
  const allItems: {
    color: FlowerColor;
    stage: FlowerStage;
    isFrozen?: boolean;
    isWild?: boolean;
    isLocked?: boolean;
    sizeVariant?: 'small' | 'medium' | 'large';
  }[] = [];

  const stagePattern: FlowerStage[] = [3, 2, 1, 3, 2, 1, 1];
  const sizePatterns: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];

  // Interleave items by color and stage to create an interesting, natural puzzle board
  for (let step = 0; step < 7; step++) {
    colors.forEach((color, cIdx) => {
      const stage = stagePattern[(step + cIdx) % 7];
      const seedSize = stage === 1 ? sizePatterns[(step + cIdx) % 3] : 'medium';
      allItems.push({
        color,
        stage,
        sizeVariant: seedSize,
      });
    });
  }

  // ALL 6 BRANCHES ARE FILLED with varying flower counts ("6 dal olsun")
  const branchLengths = getAll6FilledDistribution(allItems.length);

  const columns: {
    capacity: number;
    initialFlowers: {
      color: FlowerColor;
      stage: FlowerStage;
      isFrozen?: boolean;
      isWild?: boolean;
      isLocked?: boolean;
      sizeVariant?: 'small' | 'medium' | 'large';
    }[];
  }[] = branchLengths.map(() => ({
    capacity: 99,
    initialFlowers: [],
  }));

  let itemPointer = 0;
  branchLengths.forEach((count, branchIdx) => {
    for (let c = 0; c < count; c++) {
      const item = allItems[itemPointer++];
      const isFrozen = !!options?.hasFrozen && branchIdx === 1 && c === 0;
      const isWild = !!options?.hasWild && branchIdx === 0 && c === 1;
      const isLocked = !!options?.hasLocked && branchIdx === 2 && c === 2;

      columns[branchIdx].initialFlowers.push({
        ...item,
        isFrozen: isFrozen || undefined,
        isWild: isWild || undefined,
        isLocked: isLocked || undefined,
      });
    }
  });

  // Ensure initial solvable move: make bottom flowers match between columns 0 & 1 and columns 2 & 3
  if (columns[0].initialFlowers.length > 0 && columns[1].initialFlowers.length > 0) {
    const targetColor = columns[0].initialFlowers[columns[0].initialFlowers.length - 1].color;
    const matchIdx = columns[1].initialFlowers.findIndex((f) => f.color === targetColor);
    if (matchIdx !== -1 && matchIdx !== columns[1].initialFlowers.length - 1) {
      const lastIdx = columns[1].initialFlowers.length - 1;
      const temp = columns[1].initialFlowers[lastIdx];
      columns[1].initialFlowers[lastIdx] = columns[1].initialFlowers[matchIdx];
      columns[1].initialFlowers[matchIdx] = temp;
    }
  }

  if (columns[2].initialFlowers.length > 0 && columns[3].initialFlowers.length > 0) {
    const targetColor2 = columns[2].initialFlowers[columns[2].initialFlowers.length - 1].color;
    const matchIdx2 = columns[3].initialFlowers.findIndex((f) => f.color === targetColor2);
    if (matchIdx2 !== -1 && matchIdx2 !== columns[3].initialFlowers.length - 1) {
      const lastIdx2 = columns[3].initialFlowers.length - 1;
      const temp2 = columns[3].initialFlowers[lastIdx2];
      columns[3].initialFlowers[lastIdx2] = columns[3].initialFlowers[matchIdx2];
      columns[3].initialFlowers[matchIdx2] = temp2;
    }
  }

  return {
    id,
    title,
    subtitle,
    tutorialTip:
      options?.tutorialTip ||
      'Tohumları aynı renkte birleştirerek büyüt: Tohum ➔ Çiçek 1 ➔ Çiçek 2 ➔ Çiçek 3 ➔ En Büyük Çiçek!',
    specialFeatureIntroduced: options?.specialFeatureIntroduced,
    targetBloomStage: 5,
    columns,
    goals: colors.map((c) => ({ color: c, stage: 5 as const, targetCount: 1 })),
    starThresholds: {
      threeStars: columns.length * 10 + 8,
      twoStars: columns.length * 16 + 12,
    },
  };
}

const CHAPTER_NAMES = [
  'Bahar Başlangıcı',
  'Kelebek Vadisi',
  'Amber Terası',
  'Nilüfer Göleti',
  'Güneş Bahçesi',
  'Mor Salkım Köşkü',
  'Zümrüt Labirent',
  'Kristal Çardak',
  'Lavanta Yaylası',
  'Orkide Sarayı',
  'Büyülü Çiçeklik',
  'Şafak Vadisi',
  'Mercan Serası',
  'Altın Çardak',
  'Gökkuşağı Çayırı',
  'Masal Koruluğu',
  'Sonsuzluk Bahçesi',
  'Efsunlu Vaha',
  'Cennet Çiçekliği',
  'Usta Bahçıvan Zirvesi',
];

const colorSets3: Array<Array<FlowerColor>> = [
  ['pink', 'blue', 'yellow'],
  ['purple', 'orange', 'red'],
  ['yellow', 'orange', 'red'],
  ['pink', 'purple', 'blue'],
  ['blue', 'yellow', 'purple'],
  ['pink', 'orange', 'blue'],
];

const colorSets4: Array<Array<FlowerColor>> = [
  ['pink', 'blue', 'yellow', 'purple'],
  ['orange', 'red', 'yellow', 'blue'],
  ['pink', 'purple', 'orange', 'red'],
  ['blue', 'purple', 'yellow', 'orange'],
  ['pink', 'yellow', 'purple', 'red'],
  ['orange', 'pink', 'blue', 'yellow'],
];

const colorSets5: Array<Array<FlowerColor>> = [
  ['pink', 'blue', 'yellow', 'purple', 'orange'],
  ['purple', 'orange', 'red', 'yellow', 'blue'],
  ['pink', 'blue', 'yellow', 'purple', 'red'],
  ['orange', 'red', 'pink', 'blue', 'purple'],
  ['yellow', 'purple', 'pink', 'orange', 'red'],
];

const colorSets6: Array<Array<FlowerColor>> = [
  ['pink', 'blue', 'yellow', 'purple', 'orange', 'red'],
  ['yellow', 'orange', 'red', 'purple', 'blue', 'pink'],
  ['purple', 'pink', 'blue', 'orange', 'yellow', 'red'],
];

// Egzotik Çiçek Renk Kümeleri (Level 41+ için: Beyaz Nilüfer, Zümrüt Yeşili, Turkuaz, Gece Menekşesi, Yakut Gülü, Altın Çiçek)
const exoticColorSets3: Array<Array<FlowerColor>> = [
  ['white', 'emerald', 'cyan'],
  ['violet', 'gold', 'ruby'],
  ['white', 'ruby', 'emerald'],
  ['cyan', 'gold', 'violet'],
  ['emerald', 'gold', 'pink'],
  ['white', 'cyan', 'purple'],
  ['ruby', 'violet', 'yellow'],
];

const exoticColorSets4: Array<Array<FlowerColor>> = [
  ['white', 'emerald', 'cyan', 'gold'],
  ['violet', 'ruby', 'white', 'emerald'],
  ['cyan', 'violet', 'gold', 'ruby'],
  ['emerald', 'cyan', 'pink', 'white'],
  ['ruby', 'gold', 'purple', 'violet'],
  ['white', 'emerald', 'blue', 'ruby'],
];

const exoticColorSets5: Array<Array<FlowerColor>> = [
  ['white', 'emerald', 'cyan', 'violet', 'gold'],
  ['ruby', 'emerald', 'white', 'cyan', 'gold'],
  ['violet', 'ruby', 'white', 'emerald', 'pink'],
  ['cyan', 'gold', 'violet', 'ruby', 'blue'],
  ['emerald', 'white', 'cyan', 'ruby', 'purple'],
];

const exoticColorSets6: Array<Array<FlowerColor>> = [
  ['white', 'emerald', 'cyan', 'violet', 'ruby', 'gold'],
  ['white', 'emerald', 'pink', 'blue', 'cyan', 'gold'],
  ['violet', 'ruby', 'gold', 'purple', 'emerald', 'white'],
];

// 200 Levels: Strictly starting with seeds, 5-stage progression (Tohum -> Cicek 1 -> Cicek 2 -> Cicek 3 -> En Buyuk Cicek)
export const LEVELS: LevelConfig[] = [
  // Level 1: Initial seeds (Pembe, Mavi, Sarı tohumları)
  createLevel(
    1,
    'İlk Tohumlar',
    'Tohum ➔ Çiçek 1 ➔ Çiçek 2 ➔ Çiçek 3 ➔ En Büyük Çiçek',
    ['pink', 'blue', 'yellow'],
    {
      tutorialTip:
        'Aynı renkten 3 tohumu birleştirerek büyüt: Tohum ➔ Çiçek 1 ➔ Çiçek 2 ➔ Çiçek 3 ➔ En Büyük Çiçek!',
    }
  ),

  // Level 2: Saray Tohumları (Mor, Turuncu, Kırmızı tohumları)
  createLevel(
    2,
    'Saray Tohumları',
    'Mor Orkide, Turuncu Zambak ve Kırmızı Kamelya tohumları',
    ['purple', 'orange', 'red'],
    {
      specialFeatureIntroduced: 'Yeni Çiçek Tohumları',
      tutorialTip: 'Tohumları sırasıyla birleştirip her renkten en büyük çiçeği açtır!',
    }
  ),

  // Level 3: Gökkuşağı Bahçesi (4 Renk)
  createLevel(
    3,
    'Gökkuşağı Bahçesi',
    '4 Renk Tohum: Pembe, Mavi, Sarı ve Mor',
    ['pink', 'blue', 'yellow', 'purple'],
    {
      specialFeatureIntroduced: '4 Sütunlu Bahçe',
      tutorialTip: 'Boş sütunu kullanarak tohumları renklerine göre ayır ve birleştir!',
    }
  ),

  // Level 4: Amber Çardağı (4 Renk)
  createLevel(
    4,
    'Amber Çardağı',
    'Turuncu, Kırmızı, Sarı ve Mavi Tohumlar',
    ['orange', 'red', 'yellow', 'blue']
  ),

  // Level 5: Kraliyet Koruluğu (5 Renk)
  createLevel(
    5,
    'Kraliyet Koruluğu',
    '5 Renk: Pembe, Mavi, Sarı, Mor ve Kırmızı Tohumları',
    ['pink', 'blue', 'yellow', 'purple', 'red'],
    {
      specialFeatureIntroduced: '5 Sütunlu Bahçe',
    }
  ),

  // Level 6: Nilüfer Çayı
  createLevel(
    6,
    'Nilüfer Çayı',
    'Turuncu, Mor, Mavi ve Pembe Tohumlar',
    ['orange', 'purple', 'blue', 'pink']
  ),

  // Level 7: Muhteşem Bahçe (Tüm 6 Renk Tohumları)
  createLevel(
    7,
    'Muhteşem Bahçe',
    'Tüm 6 Renk Tohumu Birlikte!',
    ['pink', 'blue', 'yellow', 'purple', 'orange', 'red'],
    {
      specialFeatureIntroduced: '6 Sütunlu Büyük Bahçe',
    }
  ),

  // Levels 8 to 200: 20 Tematik Bölüm
  ...Array.from({ length: 193 }).map((_, idx) => {
    const levelId = 8 + idx;
    const chapterIndex = Math.min(19, Math.floor((levelId - 1) / 10));
    const chapterName = CHAPTER_NAMES[chapterIndex] || 'Gizemli Bahçe';

    let chosenColors: FlowerColor[];
    if (levelId <= 20) {
      chosenColors = idx % 2 === 0
        ? colorSets3[idx % colorSets3.length]
        : colorSets4[idx % colorSets4.length];
    } else if (levelId <= 40) {
      // Levels 21 to 40: Classic 6 colors
      const pool = [colorSets3[idx % colorSets3.length], colorSets4[idx % colorSets4.length], colorSets5[idx % colorSets5.length]];
      chosenColors = pool[idx % pool.length];
    } else if (levelId <= 70) {
      // Levels 41 to 70: Introduction of Exotic Colors (White, Emerald, Cyan, Gold, Ruby, Violet)!
      const pool = [
        exoticColorSets3[idx % exoticColorSets3.length],
        exoticColorSets4[idx % exoticColorSets4.length],
        exoticColorSets5[idx % exoticColorSets5.length],
      ];
      chosenColors = pool[idx % pool.length];
    } else if (levelId <= 120) {
      // Levels 71 to 120: Rich exotic & hybrid palettes
      const pool = [
        exoticColorSets4[idx % exoticColorSets4.length],
        exoticColorSets5[idx % exoticColorSets5.length],
        exoticColorSets6[idx % exoticColorSets6.length],
      ];
      chosenColors = pool[idx % pool.length];
    } else {
      // Levels 121 to 200: Master botanical gardens with full 12-color variety
      const pool = [
        exoticColorSets4[idx % exoticColorSets4.length],
        exoticColorSets5[idx % exoticColorSets5.length],
        exoticColorSets6[idx % exoticColorSets6.length],
      ];
      chosenColors = pool[idx % pool.length];
    }

    const hasFrozen = levelId >= 15 && (levelId % 3 === 0 || levelId % 7 === 0);
    const hasWild = levelId >= 25 && (levelId % 4 === 0 || levelId % 9 === 0);
    const hasLocked = levelId >= 35 && (levelId % 5 === 0 || levelId % 11 === 0);

    return createLevel(
      levelId,
      `${chapterName} - ${((levelId - 1) % 10) + 1}`,
      levelId === 41
        ? 'Yeni Egzotik Çiçekler: Beyaz Nilüfer, Zümrüt Yeşili ve Turkuaz!'
        : `${chosenColors.length} Sütun Tohum Bahçesi`,
      chosenColors,
      {
        hasFrozen,
        hasWild,
        hasLocked,
        specialFeatureIntroduced:
          levelId === 15
            ? 'Buzlu Tohumlar (Hareket ettirerek erit!)'
            : levelId === 25
            ? 'Joker Tohum (Tüm renklerle birleşir!)'
            : levelId === 35
            ? 'Sarmaşık Kilitler (Birleşme yaparak çöz!)'
            : levelId === 41
            ? 'Yeni Egzotik Çiçekler Açıldı: Beyaz Nilüfer, Zümrüt Yeşili, Turkuaz, Yakut, Gece Menekşesi ve Altın Çiçek!'
            : undefined,
        tutorialTip:
          levelId === 41
            ? 'Level 40 sonrasında yeni egzotik çiçek türleri ve renkler bahçene katıldı!'
            : 'Tohumları sırayla birleştirerek her sütunda en büyük çiçekleri açtır!',
      }
    );
  }),
];
