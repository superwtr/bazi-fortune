/**
 * Yi Jing (易经) Integration — Trigrams, Hexagrams, and Element Mapping
 * For nayin interpretation and life trajectory enrichment
 */

import { Element, BilingualText } from '../types';

export interface TrigramInfo {
  symbol: string;
  name: BilingualText;
  element: Element;
  attribute: BilingualText;
  nature: BilingualText;
}

export const TRIGRAMS: Record<string, TrigramInfo> = {
  '乾': {
    symbol: '☰',
    name: { zh: '乾', en: 'Qian (Heaven)' },
    element: 'metal',
    attribute: { zh: '刚健', en: 'Strength' },
    nature: { zh: '天行健，君子以自强不息。乾为天为父为首，主进取开拓。', en: 'Heaven moves ceaselessly. Qian represents initiative, leadership, and the drive to create.' },
  },
  '坤': {
    symbol: '☷',
    name: { zh: '坤', en: 'Kun (Earth)' },
    element: 'earth',
    attribute: { zh: '柔顺', en: 'Receptivity' },
    nature: { zh: '地势坤，君子以厚德载物。坤为地为母为腹，主包容承载。', en: 'Earth is receptive and nurturing. Kun represents acceptance, patience, and supportive strength.' },
  },
  '震': {
    symbol: '☳',
    name: { zh: '震', en: 'Zhen (Thunder)' },
    element: 'wood',
    attribute: { zh: '动', en: 'Movement' },
    nature: { zh: '震惊百里，不丧匕鬯。震为雷为长男，主行动和觉醒。', en: 'Thunder startles but brings awakening. Zhen represents action, initiative, and new beginnings.' },
  },
  '巽': {
    symbol: '☴',
    name: { zh: '巽', en: 'Xun (Wind)' },
    element: 'wood',
    attribute: { zh: '入', en: 'Penetration' },
    nature: { zh: '随风巽，君子以申命行事。巽为风为长女，主渗透和传播。', en: 'Wind penetrates everywhere. Xun represents gentle influence, communication, and gradual change.' },
  },
  '坎': {
    symbol: '☵',
    name: { zh: '坎', en: 'Kan (Water)' },
    element: 'water',
    attribute: { zh: '陷', en: 'Danger/Depth' },
    nature: { zh: '习坎，有孚维心亨。坎为水为中男，主智慧和险阻中的机遇。', en: 'Water flows through danger with sincerity. Kan represents wisdom, depth, and opportunity within adversity.' },
  },
  '离': {
    symbol: '☲',
    name: { zh: '离', en: 'Li (Fire)' },
    element: 'fire',
    attribute: { zh: '丽', en: 'Radiance' },
    nature: { zh: '离，利贞，亨。离为火为中女，主光明和文明。', en: 'Fire illuminates and refines. Li represents clarity, beauty, and the power of civilization.' },
  },
  '艮': {
    symbol: '☶',
    name: { zh: '艮', en: 'Gen (Mountain)' },
    element: 'earth',
    attribute: { zh: '止', en: 'Stillness' },
    nature: { zh: '兼山，艮。君子以思不出其位。艮为山为少男，主止静和沉思。', en: 'Mountain stands still. Gen represents meditation, boundaries, and knowing when to stop.' },
  },
  '兑': {
    symbol: '☱',
    name: { zh: '兑', en: 'Dui (Lake)' },
    element: 'metal',
    attribute: { zh: '悦', en: 'Joy' },
    nature: { zh: '丽泽，兑。君子以朋友讲习。兑为泽为少女，主愉悦和社交。', en: 'Two lakes enrich each other. Dui represents joy, communication, and mutual benefit.' },
  },
};

// Map five elements to their primary trigrams
export const ELEMENT_TRIGRAM_MAP: Record<Element, string[]> = {
  metal: ['乾', '兑'],
  wood: ['震', '巽'],
  water: ['坎'],
  fire: ['离'],
  earth: ['坤', '艮'],
};

// Get primary trigram for an element
export function getPrimaryTrigram(element: Element): TrigramInfo {
  const trigramKey = ELEMENT_TRIGRAM_MAP[element][0];
  return TRIGRAMS[trigramKey];
}

// Hexagram descriptions for element combinations (upper trigram x lower trigram)
// We use the DM element as lower and favorable element as upper
interface HexagramReading {
  name: BilingualText;
  meaning: BilingualText;
}

const HEXAGRAM_READINGS: Record<string, HexagramReading> = {
  // Format: "upper_lower" using element names
  'metal_metal': {
    name: { zh: '乾为天', en: 'Heaven over Heaven' },
    meaning: { zh: '纯阳至刚，自强不息。你的一生是不断攀登的旅程，永不满足于现状。', en: 'Pure yang strength. Your life is a relentless ascent, never satisfied with the status quo.' },
  },
  'metal_wood': {
    name: { zh: '天风姤', en: 'Heaven over Wind' },
    meaning: { zh: '天下有风，施命四方。你的影响力通过传播和沟通而扩大。', en: 'Wind beneath heaven spreads influence. Your impact expands through communication and networking.' },
  },
  'metal_water': {
    name: { zh: '天水讼', en: 'Heaven over Water' },
    meaning: { zh: '天与水违行，讼。一生中需解决内在矛盾和外在冲突才能成功。', en: 'Heaven and water move apart. Success requires resolving inner contradictions and external conflicts.' },
  },
  'metal_fire': {
    name: { zh: '天火同人', en: 'Heaven over Fire' },
    meaning: { zh: '火在天上，同人。你的成功来自团结志同道合的人，共同追求光明目标。', en: 'Fire rises to heaven, uniting people. Success comes through rallying kindred spirits toward a shared vision.' },
  },
  'metal_earth': {
    name: { zh: '天地否', en: 'Heaven over Earth' },
    meaning: { zh: '天地不交，否。逆境中蕴藏转机，困难时期是你蜕变的契机。', en: 'Heaven and earth do not communicate. Adversity conceals transformation — difficulty is your chrysalis.' },
  },
  'wood_metal': {
    name: { zh: '风天小畜', en: 'Wind over Heaven' },
    meaning: { zh: '风行天上，密云不雨。积蓄力量等待时机，厚积薄发。', en: 'Wind over heaven — clouds gather but no rain yet. Accumulate strength and wait for the right moment.' },
  },
  'wood_wood': {
    name: { zh: '巽为风', en: 'Wind over Wind' },
    meaning: { zh: '随风巽，重巽以申命。持续而温和地推进目标，渗透力极强。', en: 'Double wind — persistent gentle influence. Achieve through continuous, soft but penetrating effort.' },
  },
  'wood_water': {
    name: { zh: '风水涣', en: 'Wind over Water' },
    meaning: { zh: '风行水上，涣。有化解困局的天赋，能将分散的力量凝聚起来。', en: 'Wind disperses water. You have a gift for dissolving obstacles and reuniting scattered forces.' },
  },
  'wood_fire': {
    name: { zh: '风火家人', en: 'Wind over Fire' },
    meaning: { zh: '风自火出，家人。家庭和团队是你力量的源泉，温暖辐射给周围的人。', en: 'Wind from fire — the family. Your strength comes from family and team. Warmth radiates outward.' },
  },
  'wood_earth': {
    name: { zh: '风地观', en: 'Wind over Earth' },
    meaning: { zh: '风行地上，观。善于观察和学习，从大地的纹理中读取智慧。', en: 'Wind over earth — contemplation. You learn by observing patterns and extracting wisdom from experience.' },
  },
  'water_metal': {
    name: { zh: '水天需', en: 'Water over Heaven' },
    meaning: { zh: '云上于天，需。有等待的智慧，知道何时该蓄力，何时该出手。', en: 'Clouds above heaven — waiting. You know when to gather strength and when to strike.' },
  },
  'water_wood': {
    name: { zh: '水风井', en: 'Water over Wind' },
    meaning: { zh: '木上有水，井。你是取之不竭的资源泉——为他人提供养分。', en: 'Water drawn up by wood — the well. You are an inexhaustible resource nourishing others.' },
  },
  'water_water': {
    name: { zh: '坎为水', en: 'Water over Water' },
    meaning: { zh: '习坎，重险。虽遭遇重重困难，但水流不息终将找到出路。', en: 'Double water — repeated danger. Despite obstacles, flowing water always finds its way through.' },
  },
  'water_fire': {
    name: { zh: '水火既济', en: 'Water over Fire' },
    meaning: { zh: '水在火上，既济。阴阳调和，万事已成。但盛极必衰，需防安逸中的危机。', en: 'Water over fire — completion. Yin and yang in harmony. Success achieved, but guard against complacency.' },
  },
  'water_earth': {
    name: { zh: '水地比', en: 'Water over Earth' },
    meaning: { zh: '地上有水，比。亲近和联盟是你的力量——善于凝聚人心。', en: 'Water on earth — alliance. Your power lies in bringing people together and fostering closeness.' },
  },
  'fire_metal': {
    name: { zh: '火天大有', en: 'Fire over Heaven' },
    meaning: { zh: '火在天上，大有。光明在上，万物归附。你有获得丰盛成就的格局。', en: 'Fire above heaven — great abundance. Supreme radiance attracts all things. You have the pattern for magnificent achievement.' },
  },
  'fire_wood': {
    name: { zh: '火风鼎', en: 'Fire over Wind' },
    meaning: { zh: '木上有火，鼎。你是转化者——将原材料炼成精品，旧事物革新为新局面。', en: 'Fire over wood — the cauldron. You are a transformer — refining raw material into excellence, revolutionizing the old.' },
  },
  'fire_water': {
    name: { zh: '火水未济', en: 'Fire over Water' },
    meaning: { zh: '火在水上，未济。尚未完成——一生在追求完整的旅途上。但正因未完成，才有无限可能。', en: 'Fire over water — not yet complete. A lifelong journey toward wholeness. Incompleteness means infinite possibility.' },
  },
  'fire_fire': {
    name: { zh: '离为火', en: 'Fire over Fire' },
    meaning: { zh: '明两作，离。光明叠加，辉煌灿烂。你的影响力如太阳——普照一切。', en: 'Double fire — brilliance upon brilliance. Your influence shines like the sun, illuminating everything.' },
  },
  'fire_earth': {
    name: { zh: '火地晋', en: 'Fire over Earth' },
    meaning: { zh: '明出地上，晋。光明升起于大地——你的事业是一个不断上升的过程。', en: 'Light rises from the earth — progress. Your career is a steady ascent from solid ground toward radiance.' },
  },
  'earth_metal': {
    name: { zh: '地天泰', en: 'Earth over Heaven' },
    meaning: { zh: '天地交，泰。阴阳和谐，万事通泰。你有创造和谐环境的天赋。', en: 'Heaven and earth unite — peace. Yin and yang in perfect exchange. You create harmony wherever you go.' },
  },
  'earth_wood': {
    name: { zh: '地风升', en: 'Earth over Wind' },
    meaning: { zh: '地中生木，升。稳步上升，扎根大地而向上生长。你的成功是渐进式的。', en: 'Wood grows within earth — ascending. Rooted in earth, growing upward. Your success is gradual and organic.' },
  },
  'earth_water': {
    name: { zh: '地水师', en: 'Earth over Water' },
    meaning: { zh: '地中有水，师。善于组织和调动资源，天生的指挥者和管理者。', en: 'Water within earth — the army. Natural at organizing resources and leading. Born commander and manager.' },
  },
  'earth_fire': {
    name: { zh: '地火明夷', en: 'Earth over Fire' },
    meaning: { zh: '明入地中，明夷。光明暂时被掩藏，但只是蛰伏等待时机。韬光养晦的智慧。', en: 'Light enters the earth — concealment. Brilliance temporarily hidden, biding time. The wisdom of lying low.' },
  },
  'earth_earth': {
    name: { zh: '坤为地', en: 'Earth over Earth' },
    meaning: { zh: '地势坤，君子以厚德载物。你的格局是承载万物的大地——以包容成就伟业。', en: 'Double earth — supreme receptivity. Your pattern is the earth itself — achieving greatness through boundless acceptance.' },
  },
};

/**
 * Get a hexagram reading based on two elements
 * Upper trigram = favorable element (the aspiration)
 * Lower trigram = DM element (the foundation)
 */
export function getHexagramReading(upperElement: Element, lowerElement: Element): HexagramReading {
  const key = `${upperElement}_${lowerElement}`;
  return HEXAGRAM_READINGS[key] || {
    name: { zh: '未知', en: 'Unknown' },
    meaning: { zh: '天机不可尽泄。', en: 'Some mysteries remain unrevealed.' },
  };
}

/**
 * Get a trigram compatibility reading for two people based on their DM elements
 */
export function getTrigramCompatibility(element1: Element, element2: Element): BilingualText {
  const t1 = getPrimaryTrigram(element1);
  const t2 = getPrimaryTrigram(element2);

  // Same element
  if (element1 === element2) {
    return {
      zh: `${t1.symbol}${t2.symbol} 同卦相遇——性情相近，相互理解。但缺少互补可能导致停滞。`,
      en: `${t1.symbol}${t2.symbol} Same trigrams meet — deep mutual understanding. But lack of complementarity may cause stagnation.`,
    };
  }

  // Producing relationship (element1 produces element2)
  const PRODUCES: Record<Element, Element> = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  if (PRODUCES[element1] === element2) {
    return {
      zh: `${t1.symbol}生${t2.symbol}——${t1.name.zh}滋养${t2.name.zh}，一方付出一方成长。关系中需防过度给予。`,
      en: `${t1.symbol} nourishes ${t2.symbol} — ${t1.name.en} feeds ${t2.name.en}. One gives, the other grows. Guard against over-giving.`,
    };
  }
  if (PRODUCES[element2] === element1) {
    return {
      zh: `${t2.symbol}生${t1.symbol}——${t2.name.zh}滋养${t1.name.zh}，被滋养的一方需主动回馈。`,
      en: `${t2.symbol} nourishes ${t1.symbol} — the nourished party should actively reciprocate.`,
    };
  }

  // Controlling relationship
  const CONTROLS: Record<Element, Element> = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };
  if (CONTROLS[element1] === element2) {
    return {
      zh: `${t1.symbol}克${t2.symbol}——${t1.name.zh}制约${t2.name.zh}，关系中有权力张力。需以尊重化解控制。`,
      en: `${t1.symbol} controls ${t2.symbol} — ${t1.name.en} restrains ${t2.name.en}. Power tension requires mutual respect to dissolve.`,
    };
  }
  if (CONTROLS[element2] === element1) {
    return {
      zh: `${t2.symbol}克${t1.symbol}——${t2.name.zh}制约${t1.name.zh}，被克的一方需在包容中成长。`,
      en: `${t2.symbol} controls ${t1.symbol} — the controlled party grows through acceptance and adaptation.`,
    };
  }

  // Default
  return {
    zh: `${t1.symbol}与${t2.symbol}相遇——两种截然不同的力量碰撞，产生新的可能。`,
    en: `${t1.symbol} meets ${t2.symbol} — two distinct forces collide, creating new possibilities.`,
  };
}
