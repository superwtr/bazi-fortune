import { Language, TenGodName, Element, HeavenlyStem } from './types';

interface Translations {
  [key: string]: string;
}

const zh: Translations = {
  title: '八字命理',
  subtitle: '四柱推命 · 洞察天机',
  personalReading: '个人命盘',
  compatibility: '合婚配对',
  birthDate: '出生日期',
  birthYear: '年',
  birthMonth: '月',
  birthDay: '日',
  birthHour: '出生时辰',
  unknownHour: '时辰不详',
  unknownHourNote: '（仅三柱分析，准确度降低）',
  gender: '性别',
  male: '男',
  female: '女',
  calculate: '排盘',
  fourPillars: '四柱命盘',
  hourPillar: '时柱',
  dayPillar: '日柱',
  monthPillar: '月柱',
  yearPillar: '年柱',
  heavenlyStem: '天干',
  earthlyBranch: '地支',
  hiddenStems: '藏干',
  dayMaster: '日主',
  dayMasterAnalysis: '日主分析',
  strong: '身旺',
  weak: '身弱',
  fiveElements: '五行分析',
  favorableElement: '用神',
  unfavorableElement: '忌神',
  tenGods: '十神分析',
  decadeLuck: '大运',
  age: '岁',
  career: '事业财运',
  relationships: '姻缘',
  health: '健康',
  overallTrajectory: '大运总论',
  currentYear: '流年运势',
  nayin: '纳音',
  zodiac: '生肖',
  person1: '甲方',
  person2: '乙方',
  compatibilityScore: '合配指数',
  stemCombos: '天干合',
  sixHarmonies: '六合',
  threeHarmonies: '三合',
  sixClashes: '六冲',
  punishments: '相刑',
  elementComplement: '五行互补',
  tenGodRelation: '日主关系',
  checkCompatibility: '合婚',
  narrative: '总评',
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
  createdBy: 'Created by Luwei Xiong',
  yearTimeline: '流年轨迹',
  yearTimelineDesc: '大运轨迹 × 流年天干地支',
  yearSummary: '年总结',
  enterBirthFirst: '请先在「个人命盘」中输入生日并排盘',
  decade: '大运',
  entering: '交入',
  // Day Master descriptions
  '甲_desc': '甲木如参天大树，正直挺拔，有领袖气质。志向远大但有时过于固执，如树根深扎不移。',
  '乙_desc': '乙木如藤蔓花草，柔韧灵活，善于变通。外柔内刚，适应力极强，以柔克刚。',
  '丙_desc': '丙火如太阳普照，光芒四射，热情慷慨。天生的聚光灯，温暖众人，但有时过于张扬。',
  '丁_desc': '丁火如烛光温暖，细腻入微，洞察力强。内心如灯火，照亮幽暗，善解人意。',
  '戊_desc': '戊土如巍峨高山，稳重可靠，包容万物。为人厚道踏实，但有时过于固执保守。',
  '己_desc': '己土如肥沃田园，温柔包容，滋养万物。务实细腻，善于照顾他人，是天生的守护者。',
  '庚_desc': '庚金如利剑锋刃，果断刚毅，竞争力强。直来直去，有魄力有行动力，但有时过于直接。',
  '辛_desc': '辛金如珠宝玉器，精致完美，品味独到。追求极致，敏感细腻，是天生的美学家。',
  '壬_desc': '壬水如江海奔流，智慧深沉，胸怀广阔。善于谋略，适应力强，能屈能伸。',
  '癸_desc': '癸水如细雨甘露，直觉敏锐，温柔神秘。内心丰富，洞察力强，如润物无声。',
};

const en: Translations = {
  title: 'BaZi Fortune Teller',
  subtitle: 'Four Pillars of Destiny · Unveil Your Fate',
  personalReading: 'Personal Reading',
  compatibility: 'Compatibility',
  birthDate: 'Birth Date',
  birthYear: 'Year',
  birthMonth: 'Month',
  birthDay: 'Day',
  birthHour: 'Birth Hour',
  unknownHour: 'Unknown birth hour',
  unknownHourNote: '(3-pillar analysis, reduced accuracy)',
  gender: 'Gender',
  male: 'Male',
  female: 'Female',
  calculate: 'Calculate',
  fourPillars: 'Four Pillars Chart',
  hourPillar: 'Hour',
  dayPillar: 'Day',
  monthPillar: 'Month',
  yearPillar: 'Year',
  heavenlyStem: 'Heavenly Stem',
  earthlyBranch: 'Earthly Branch',
  hiddenStems: 'Hidden Stems',
  dayMaster: 'Day Master',
  dayMasterAnalysis: 'Day Master Analysis',
  strong: 'Strong',
  weak: 'Weak',
  fiveElements: 'Five Elements',
  favorableElement: 'Favorable',
  unfavorableElement: 'Unfavorable',
  tenGods: 'Ten Gods',
  decadeLuck: 'Decade Luck',
  age: 'Age',
  career: 'Career & Wealth',
  relationships: 'Relationships',
  health: 'Health',
  overallTrajectory: 'Life Trajectory',
  currentYear: 'Current Year',
  nayin: 'Nayin',
  zodiac: 'Zodiac',
  person1: 'Person A',
  person2: 'Person B',
  compatibilityScore: 'Compatibility Score',
  stemCombos: 'Stem Combinations',
  sixHarmonies: 'Six Harmonies',
  threeHarmonies: 'Three Harmonies',
  sixClashes: 'Six Clashes',
  punishments: 'Punishments',
  elementComplement: 'Element Balance',
  tenGodRelation: 'Day Master Relation',
  checkCompatibility: 'Check',
  narrative: 'Summary',
  wood: 'Wood',
  fire: 'Fire',
  earth: 'Earth',
  metal: 'Metal',
  water: 'Water',
  createdBy: 'Created by Luwei Xiong',
  yearTimeline: 'Year Timeline',
  yearTimelineDesc: 'Decade luck × annual stem-branch',
  yearSummary: '-Year Summary',
  enterBirthFirst: 'Please enter your birth date in Personal Reading first and click Calculate',
  decade: 'Decade',
  entering: 'Entering',
  '甲_desc': 'Like a towering tree — ambitious, upright, a natural leader. Firm convictions, sometimes rigid. Stands tall through storms.',
  '乙_desc': 'Like a vine or wildflower — flexible, diplomatic, resilient. Soft on the outside, steel within. Adapts and thrives anywhere.',
  '丙_desc': 'Like the blazing sun — charismatic, generous, magnetic. Lights up every room, warms every heart. Sometimes too intense.',
  '丁_desc': 'Like a candle flame — perceptive, warm, detail-oriented. Illuminates subtlety others miss. A quiet but powerful presence.',
  '戊_desc': 'Like a mountain — stable, reliable, immovable. A rock for others to lean on. Patient and enduring, sometimes stubborn.',
  '己_desc': 'Like fertile farmland — nurturing, practical, grounding. Provides what others need to grow. A natural caretaker.',
  '庚_desc': 'Like a sword\'s edge — decisive, competitive, direct. Takes action without hesitation. Blunt honesty, powerful energy.',
  '辛_desc': 'Like polished jewelry — refined, perfectionist, sensitive. Appreciates beauty and precision. A natural aesthete.',
  '壬_desc': 'Like the vast ocean — wise, strategic, deep. Adapts to any container while maintaining its essence. A visionary.',
  '癸_desc': 'Like morning dew — intuitive, gentle, mysterious. Quietly perceptive, deeply emotional. Nourishes without force.',
};

const translations: Record<Language, Translations> = { zh, en };

export function t(lang: Language, key: string): string {
  return translations[lang][key] || translations['en'][key] || key;
}

// Ten God translations
export const TEN_GOD_EN: Record<TenGodName, string> = {
  '比肩': 'Peer',
  '劫财': 'Rob Wealth',
  '食神': 'Eating God',
  '伤官': 'Hurting Officer',
  '偏财': 'Indirect Wealth',
  '正财': 'Direct Wealth',
  '七杀': 'Seven Killings',
  '正官': 'Direct Officer',
  '偏印': 'Indirect Seal',
  '正印': 'Direct Seal',
};

export const TEN_GOD_BRIEF: Record<TenGodName, { zh: string; en: string }> = {
  '比肩': { zh: '独立、竞争、同辈', en: 'Independence, competition, peers' },
  '劫财': { zh: '果断、争夺、社交', en: 'Decisiveness, rivalry, socializing' },
  '食神': { zh: '才华、享乐、创造', en: 'Talent, pleasure, creativity' },
  '伤官': { zh: '叛逆、表达、突破', en: 'Rebellion, expression, breakthroughs' },
  '偏财': { zh: '投机、意外财、人缘', en: 'Speculation, windfalls, charm' },
  '正财': { zh: '稳定收入、踏实、节俭', en: 'Steady income, diligence, frugality' },
  '七杀': { zh: '权威、压力、魄力', en: 'Authority, pressure, ambition' },
  '正官': { zh: '规矩、名声、责任', en: 'Order, reputation, duty' },
  '偏印': { zh: '独特思维、学术、孤独', en: 'Unconventional thinking, scholarship' },
  '正印': { zh: '学习、贵人、温暖', en: 'Learning, mentors, warmth' },
};

// Dayun interpretations by ten god
export const DAYUN_INTERP: Record<TenGodName, { zh: string; en: string }> = {
  '比肩': {
    zh: '同辈竞争加剧，适合合作创业，但需防兄弟争财。',
    en: 'Peer competition intensifies. Good for partnerships, but watch for rivalry over resources.',
  },
  '劫财': {
    zh: '社交活跃，花销增大，谨防投资损失和人际纠纷。',
    en: 'Active social life, higher spending. Guard against investment losses and interpersonal disputes.',
  },
  '食神': {
    zh: '创造力旺盛，享受生活，适合表达才华和创作。心情愉悦。',
    en: 'Creativity peaks. A time for expression, enjoyment, and showcasing talent. Generally happy.',
  },
  '伤官': {
    zh: '思维活跃但叛逆，容易与领导冲突。适合自由职业或创新突破。',
    en: 'Sharp mind but rebellious energy. May clash with authority. Great for freelance or innovation.',
  },
  '偏财': {
    zh: '财运不错但多为偶然之财。人际关系活跃，异性缘佳。',
    en: 'Financial luck through unexpected channels. Active social and romantic life.',
  },
  '正财': {
    zh: '正财稳定，事业稳步上升。适合储蓄、投资房产等长期规划。',
    en: 'Stable finances, career steadily advancing. Good for saving and long-term investments.',
  },
  '七杀': {
    zh: '压力与挑战并存，职场升迁机会大但竞争激烈。需注意健康。',
    en: 'High pressure but high reward. Career advancement through intense competition. Watch health.',
  },
  '正官': {
    zh: '贵人运旺，适合体制内发展，名声和地位提升。',
    en: 'Strong mentor energy. Good for corporate/institutional advancement. Rising reputation.',
  },
  '偏印': {
    zh: '适合学术研究和独立思考。可能有些孤独，但内心成长快。',
    en: 'Good for academic pursuits and independent thinking. May feel isolated but growing fast internally.',
  },
  '正印': {
    zh: '学习运佳，有长辈贵人相助。内心温暖，适合深造或教学。',
    en: 'Excellent for learning, with mentor support. Warm period. Good for education or teaching.',
  },
};

// Career reading by element strength
export function getCareerReading(lang: Language, favorable: string, unfavorable: string, isStrong: boolean): string {
  if (lang === 'zh') {
    return isStrong
      ? `日主身旺，适合外向型事业，如管理、创业、销售。用神为${favorable}，宜从事与${favorable}相关行业。忌${unfavorable}方位和行业。财星和官星的位置决定了财富积累和仕途发展的关键节点。`
      : `日主身弱，适合稳健发展，寻找贵人扶持。用神为${favorable}，宜向${favorable}方向发展。避免高风险投资和过度竞争。多借助印星和比劫的力量。`;
  }
  return isStrong
    ? `Strong Day Master — suited for outward-facing careers: management, entrepreneurship, sales. Your favorable element (${favorable}) points to ideal industries. The positions of wealth and officer stars indicate key milestones for accumulation and advancement.`
    : `Weaker Day Master — build steadily, seek mentors and allies. Your favorable element (${favorable}) guides your ideal direction. Avoid high-risk ventures and over-competition. Lean on supportive energies.`;
}

export function getRelationshipReading(lang: Language, spousePalace: string, isStrong: boolean): string {
  if (lang === 'zh') {
    return `日支（配偶宫）为${spousePalace}，${isStrong ? '日主偏强，感情中宜多包容让步，以柔克刚方能和谐。' : '日主偏弱，感情中需要伴侣的支持与理解，宜找五行互补之人。'}建议参考合婚配对功能，了解与特定对象的缘分深浅。`;
  }
  return `Spouse Palace is ${spousePalace}. ${isStrong ? 'As a strong Day Master, practice patience and flexibility in relationships — softness creates harmony.' : 'As a gentler Day Master, seek a partner who supports and complements your energy.'} Use the compatibility checker for specific match insights.`;
}

export function getHealthReading(lang: Language, weakElement: string, strongElement: string): string {
  const organMap: Record<string, { zh: string; en: string }> = {
    wood: { zh: '肝胆', en: 'liver and gallbladder' },
    fire: { zh: '心脏、小肠', en: 'heart and small intestine' },
    earth: { zh: '脾胃', en: 'spleen and stomach' },
    metal: { zh: '肺、大肠', en: 'lungs and large intestine' },
    water: { zh: '肾、膀胱', en: 'kidneys and bladder' },
  };
  const weak = organMap[weakElement] || { zh: '', en: '' };
  if (lang === 'zh') {
    return `五行中${weakElement}偏弱，需注意${weak.zh}方面的健康。日常保养宜补充${weakElement}属性的食物和活动。五行平衡则身体康健。`;
  }
  return `Your weaker element suggests watching your ${weak.en}. Incorporate activities and foods that nourish this element. Five element balance is key to vitality.`;
}

// Footer quotes
export interface Quote {
  zh: string;
  en: string;
}

export const QUOTES: Quote[] = [
  { zh: '命里有时终须有，命里无时莫强求', en: "What's meant for you will always find you. What's not, let it go." },
  { zh: '三分天注定，七分靠打拼', en: 'Destiny writes 30% of the story. You write the other 70%.' },
  { zh: '算命不如改命', en: 'Knowing your fate is good. Changing it is better.' },
  { zh: '信则有，不信则无——但还是算一下比较安心', en: "Believe it or not — but you'll feel better after checking." },
  { zh: '你的八字说你会看完这个网站', en: "Your BaZi predicted you'd visit this site." },
  { zh: '宇宙的安排，不接受差评', en: "The universe's plan: no refunds, no reviews." },
  { zh: '命好不如运好，运好不如心态好', en: 'A good fate < good timing < good mindset.' },
  { zh: '别问算命的你能不能发财，先问自己今天努力了没', en: "Don't ask a fortune teller if you'll be rich. Ask yourself if you worked hard today." },
];

// Year-by-year analysis text by ten god
import { StemBranch } from './types';
import { STEM_ELEMENT } from './bazi';

const YEAR_TEXTS: Record<TenGodName, { zh: (s: string, b: string, el: string) => string; en: (s: string, b: string) => string }> = {
  '比肩': {
    zh: (s,b,el) => `${s}${el}比肩+${b}。同辈竞争加剧，适合合伙创业，但需防同行争利。独立意识增强。`,
    en: (s,b) => `${s}${b} brings peer energy. Competition intensifies — good for partnerships. Independence strengthens.`,
  },
  '劫财': {
    zh: (s,b,el) => `${s}${el}劫财+${b}。社交活跃花销增大，谨防投资损失。人际圈扩大但需辨真伪。`,
    en: (s,b) => `${s}${b} activates social energy. Spending rises — guard investments. Expand your circle wisely.`,
  },
  '食神': {
    zh: (s,b,el) => `${s}${el}食神+${b}。创造力旺盛，才华有施展空间。享受生活的一年，学业/事业运佳。`,
    en: (s,b) => `${s}${b} unleashes creativity. Talent peaks — a year of expression and enjoyment. Strong academic/career fortune.`,
  },
  '伤官': {
    zh: (s,b,el) => `${s}${el}伤官+${b}。思维活跃但叛逆，容易与权威冲突。适合创新突破，情绪波动大但倒逼成长。`,
    en: (s,b) => `${s}${b} sparks rebellion and brilliance. May clash with authority but break through creatively. Growth through turbulence.`,
  },
  '偏财': {
    zh: (s,b,el) => `${s}${el}偏财+${b}。财运不错但多为偶然之财。人际关系活跃，眼界大开。`,
    en: (s,b) => `${s}${b} brings unexpected financial luck. Social life thrives, horizons expand.`,
  },
  '正财': {
    zh: (s,b,el) => `${s}${el}正财+${b}。正财稳定，事业稳步上升。适合储蓄和长期规划，付出与回报成正比。`,
    en: (s,b) => `${s}${b} stabilizes finances. Career advances steadily — effort equals reward. Good for long-term planning.`,
  },
  '七杀': {
    zh: (s,b,el) => `${s}${el}七杀+${b}。压力与挑战并存，职场升迁机会大但竞争激烈。需注意健康。`,
    en: (s,b) => `${s}${b} brings intense pressure but forges resilience. Career advances through competition. Watch health.`,
  },
  '正官': {
    zh: (s,b,el) => `${s}${el}正官+${b}。贵人运旺，名声地位提升。适合体制内发展，可能遇到关键人脉。`,
    en: (s,b) => `${s}${b} elevates reputation. Mentor energy strong — key connections form. A pivotal year.`,
  },
  '偏印': {
    zh: (s,b,el) => `${s}${el}偏印+${b}。适合学术研究和独立思考。内心可能孤独，但成长迅速。`,
    en: (s,b) => `${s}${b} favors deep study. May feel isolated but inner growth accelerates.`,
  },
  '正印': {
    zh: (s,b,el) => `${s}${el}正印+${b}。学习运佳，有贵人相助。自信心回升，可能获得正式认可。`,
    en: (s,b) => `${s}${b} blesses learning with mentor support. Confidence rebuilds — recognition may arrive.`,
  },
};

const EL_CN_MAP: Record<string, string> = { wood:'木', fire:'火', earth:'土', metal:'金', water:'水' };

export function getYearAnalysisText(tenGod: TenGodName, sb: StemBranch, lang: Language): string {
  const fn = YEAR_TEXTS[tenGod] || YEAR_TEXTS['比肩'];
  const el = STEM_ELEMENT[sb.stem];
  if (lang === 'zh') return fn.zh(sb.stem, sb.branch, EL_CN_MAP[el] || '');
  return fn.en(sb.stem, sb.branch);
}
