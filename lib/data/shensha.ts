// ─── Shensha (神煞) Lookup Tables & Bilingual Descriptions ───────────────────
// Based on traditional references from 《三命通会》
// Each shensha has an accurate lookup table, bilingual descriptions,
// and positional meanings for year/month/day/hour pillars.

import { HeavenlyStem, EarthlyBranch, ShenshaName, ShenshaEntry, BilingualText } from '../types';

// ─── ShenshaRule Interface ───────────────────────────────────────────────────

export interface ShenshaRule {
  name: ShenshaName;
  category: 'auspicious' | 'inauspicious' | 'special';
  derivation: 'fromDayStem' | 'fromDayBranch' | 'fromYearBranch' | 'fromDayPillar';
  lookupTable: Record<string, EarthlyBranch[]>;
  description: BilingualText;
  positionalMeaning: Record<string, BilingualText>; // 'year' | 'month' | 'day' | 'hour'
}

// ─── Shensha Rules Array ─────────────────────────────────────────────────────

export const SHENSHA_RULES: ShenshaRule[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // 天乙贵人 - Heavenly Noble (Tianyi Guiren)
  // Derivation: from Day Stem
  // Traditional table from 《三命通会》:
  //   甲戊庚牛羊 (丑未), 乙己鼠猴乡 (子申),
  //   丙丁猪鸡位 (亥酉), 壬癸兔蛇藏 (卯巳),
  //   庚辛逢虎马 (寅午 for 辛), but 庚→丑未 per standard texts.
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '天乙贵人',
    category: 'auspicious',
    derivation: 'fromDayStem',
    lookupTable: {
      '甲': ['丑', '未'],
      '乙': ['子', '申'],
      '丙': ['亥', '酉'],
      '丁': ['亥', '酉'],
      '戊': ['丑', '未'],
      '己': ['子', '申'],
      '庚': ['丑', '未'],
      '辛': ['寅', '午'],
      '壬': ['卯', '巳'],
      '癸': ['卯', '巳'],
    },
    description: {
      zh: '天乙贵人是最重要的吉神之一。主逢凶化吉、遇难呈祥，能得贵人相助，一生多遇扶持。为人聪明灵敏，有领导才能和社交魅力。',
      en: 'Tianyi Noble is one of the most important auspicious stars. It attracts help from influential people, provides protection from disasters, and turns misfortune into blessings. The native is intelligent, charismatic, and socially adept.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见天乙贵人：出身家庭条件好，祖上有余荫，少年时期容易得到长辈提携。',
        en: 'In the Year Pillar: Born into a favorable family background, blessed by ancestral fortune, and receives support from elders in youth.',
      },
      month: {
        zh: '月柱见天乙贵人：中年运势顺遂，事业上容易得到上司和同事的帮助，社交能力强。',
        en: 'In the Month Pillar: Smooth fortune in middle age, easily gains help from superiors and colleagues at work, and has strong social skills.',
      },
      day: {
        zh: '日柱见天乙贵人：配偶条件优越或能得配偶之助，一生贵人运强，为人处事聪慧圆融。',
        en: 'In the Day Pillar: Spouse is of excellent quality or provides great assistance. Lifelong noble-person luck is strong; the native is wise and diplomatic.',
      },
      hour: {
        zh: '时柱见天乙贵人：子女孝顺有出息，晚年运势好，能得子女和晚辈的帮助。',
        en: 'In the Hour Pillar: Children are filial and accomplished. Late-life fortune is good, with help from children and younger generations.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 文昌 - Literary Star (Wenchang)
  // Derivation: from Day Stem
  // Traditional method: 文昌星以天干所坐食神长生之位查之
  //   甲→巳, 乙→午, 丙→申, 丁→酉, 戊→申, 己→酉,
  //   庚→亥, 辛→子, 壬→寅, 癸→卯
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '文昌',
    category: 'auspicious',
    derivation: 'fromDayStem',
    lookupTable: {
      '甲': ['巳'],
      '乙': ['午'],
      '丙': ['申'],
      '丁': ['酉'],
      '戊': ['申'],
      '己': ['酉'],
      '庚': ['亥'],
      '辛': ['子'],
      '壬': ['寅'],
      '癸': ['卯'],
    },
    description: {
      zh: '文昌星主聪明才智、学业有成，利于考试和文学创作。命带文昌者，思维敏捷，学习能力强，适合从事学术、文化、教育相关工作。',
      en: 'The Literary Star governs intelligence, academic success, and literary talent. Those with Wenchang have sharp minds, strong learning abilities, and are suited for careers in academia, culture, and education.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见文昌：少年聪慧，学业基础好，家庭重视教育，容易在考试中取得好成绩。',
        en: 'In the Year Pillar: Intelligent in youth, strong academic foundation, family values education, and excels in examinations.',
      },
      month: {
        zh: '月柱见文昌：青中年时期学业或事业与文化、学术相关，能凭才华获得认可。',
        en: 'In the Month Pillar: Career or studies in middle years are related to culture and academia; gains recognition through talent.',
      },
      day: {
        zh: '日柱见文昌：本人聪明好学，配偶可能是文化人或有学识，思维能力出众。',
        en: 'In the Day Pillar: The native is intelligent and studious. Spouse may be educated or scholarly. Exceptional analytical abilities.',
      },
      hour: {
        zh: '时柱见文昌：子女聪明好学，晚年可能从事教育或写作，精神生活丰富。',
        en: 'In the Hour Pillar: Children are intelligent and studious. May engage in teaching or writing in later years. Rich intellectual life.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 华盖 - Canopy Star (Huagai)
  // Derivation: from Year Branch
  // Traditional table: 三合局最后一字
  //   寅午戌→戌, 巳酉丑→丑, 申子辰→辰, 亥卯未→未
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '华盖',
    category: 'special',
    derivation: 'fromYearBranch',
    lookupTable: {
      '寅': ['戌'],
      '午': ['戌'],
      '戌': ['戌'],
      '巳': ['丑'],
      '酉': ['丑'],
      '丑': ['丑'],
      '申': ['辰'],
      '子': ['辰'],
      '辰': ['辰'],
      '亥': ['未'],
      '卯': ['未'],
      '未': ['未'],
    },
    description: {
      zh: '华盖为艺术之星，也是孤高之星。命带华盖者，聪明超群，才华出众，喜好哲学、宗教、艺术。但性格偏于孤僻，不喜社交应酬，有独处的倾向。',
      en: 'The Canopy Star represents artistic and spiritual talent. Those with Huagai are exceptionally intelligent and talented, drawn to philosophy, religion, and art. However, they tend toward solitude, prefer isolation, and have independent thinking.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见华盖：少年早慧但孤独，可能与家人缘分较浅，从小有独特的思维方式。',
        en: 'In the Year Pillar: Precocious but solitary in youth. May have weaker bonds with family. Develops unique thinking from an early age.',
      },
      month: {
        zh: '月柱见华盖：工作中偏好独立性强的岗位，适合研究、创作等不需要太多社交的领域。',
        en: 'In the Month Pillar: Prefers independent work roles. Suited for research, creative work, and fields that do not require extensive socializing.',
      },
      day: {
        zh: '日柱见华盖：性格内向高洁，婚姻中可能因性格孤傲影响感情，适宜找志趣相投的伴侣。',
        en: 'In the Day Pillar: Introverted and noble personality. May affect marriage due to aloofness. Best paired with a like-minded partner.',
      },
      hour: {
        zh: '时柱见华盖：晚年清闲，喜好修行或文艺活动，子女可能较少或聚少离多。',
        en: 'In the Hour Pillar: Leisurely later years, drawn to spiritual practice or literary pursuits. May have few children or spend much time apart from them.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 驿马 - Traveling Horse (Yima)
  // Derivation: from Year Branch
  // Traditional table: 三合局冲位
  //   寅午戌→申, 巳酉丑→亥, 申子辰→寅, 亥卯未→巳
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '驿马',
    category: 'special',
    derivation: 'fromYearBranch',
    lookupTable: {
      '寅': ['申'],
      '午': ['申'],
      '戌': ['申'],
      '巳': ['亥'],
      '酉': ['亥'],
      '丑': ['亥'],
      '申': ['寅'],
      '子': ['寅'],
      '辰': ['寅'],
      '亥': ['巳'],
      '卯': ['巳'],
      '未': ['巳'],
    },
    description: {
      zh: '驿马主迁动、奔波、变化。命带驿马者，一生多走动，适合从事需要出差、旅行的工作。性格好动不安定，喜欢追求变化和新鲜感。',
      en: 'The Traveling Horse signifies movement, relocation, and change. Those with Yima travel frequently throughout life and are suited for careers requiring mobility. They are restless by nature and thrive on variety and novelty.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见驿马：祖辈有迁移经历，少年时期可能搬迁或离乡求学，早年生活环境不稳定。',
        en: 'In the Year Pillar: Ancestors experienced migration. May relocate or study away from home in youth. Unstable living conditions in early years.',
      },
      month: {
        zh: '月柱见驿马：工作中多变动、出差频繁，职业可能涉及交通、物流、外交等需要奔走的行业。',
        en: 'In the Month Pillar: Frequent job changes or business travel. Career may involve transportation, logistics, diplomacy, or other mobile industries.',
      },
      day: {
        zh: '日柱见驿马：婚姻中聚少离多，配偶可能是外地人或经常出差，本人也闲不住。',
        en: 'In the Day Pillar: Spouses may spend much time apart. Partner may be from another region or travels often. The native is also restless.',
      },
      hour: {
        zh: '时柱见驿马：晚年不安定，子女可能在外地发展，自己也可能旅居他方。',
        en: 'In the Hour Pillar: Restless later years. Children may develop careers far away. The native may also live abroad in old age.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 桃花 - Peach Blossom (Taohua)
  // Derivation: from Day Branch (can also derive from Year Branch; here we use Day Branch)
  // Traditional table: 三合局沐浴位
  //   寅午戌→卯, 巳酉丑→午, 申子辰→酉, 亥卯未→子
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '桃花',
    category: 'special',
    derivation: 'fromDayBranch',
    lookupTable: {
      '寅': ['卯'],
      '午': ['卯'],
      '戌': ['卯'],
      '巳': ['午'],
      '酉': ['午'],
      '丑': ['午'],
      '申': ['酉'],
      '子': ['酉'],
      '辰': ['酉'],
      '亥': ['子'],
      '卯': ['子'],
      '未': ['子'],
    },
    description: {
      zh: '桃花主人缘、感情、魅力。命带桃花者，相貌端正，风流多情，异性缘好，擅长社交。若桃花为吉则主才艺出众、人缘极佳；若为凶则主感情纠纷、沉迷声色。',
      en: 'Peach Blossom governs romantic attraction, charm, and interpersonal appeal. Those with Taohua are attractive, charismatic, and popular with the opposite sex. When auspicious, it brings artistic talent and excellent social connections; when inauspicious, it may lead to romantic entanglements.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见桃花：少年时期就有异性缘，外表出众，家庭环境中异性关系较活跃。',
        en: 'In the Year Pillar: Attractive to the opposite sex from a young age. Outstanding appearance. Active romantic environment in family setting.',
      },
      month: {
        zh: '月柱见桃花：工作中人缘极好，适合从事与人打交道的行业，如公关、销售、演艺等。',
        en: 'In the Month Pillar: Excellent interpersonal relations at work. Suited for people-facing industries such as PR, sales, or entertainment.',
      },
      day: {
        zh: '日柱见桃花：配偶颜值高或魅力出众，本人也重视感情生活，婚姻中需要注意第三者问题。',
        en: 'In the Day Pillar: Spouse is attractive or very charming. The native values emotional life. Should be cautious of third-party interference in marriage.',
      },
      hour: {
        zh: '时柱见桃花：晚年桃花运旺，子女外表出众有魅力，但需注意晚年感情纠纷。',
        en: 'In the Hour Pillar: Strong romantic luck in later years. Children are attractive and charming. Be cautious of romantic complications in old age.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 将星 - General Star (Jiangxing)
  // Derivation: from Year Branch
  // Traditional table: 三合局帝旺位
  //   寅午戌→午, 巳酉丑→酉, 申子辰→子, 亥卯未→卯
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '将星',
    category: 'auspicious',
    derivation: 'fromYearBranch',
    lookupTable: {
      '寅': ['午'],
      '午': ['午'],
      '戌': ['午'],
      '巳': ['酉'],
      '酉': ['酉'],
      '丑': ['酉'],
      '申': ['子'],
      '子': ['子'],
      '辰': ['子'],
      '亥': ['卯'],
      '卯': ['卯'],
      '未': ['卯'],
    },
    description: {
      zh: '将星为权力之星，主有领导能力和号召力。命带将星者，做事有魄力、有权威，适合担任管理职务或在军政领域发展。为人端正严肃，有统帅之才。',
      en: 'The General Star represents authority and leadership. Those with Jiangxing possess decisiveness, commanding presence, and are suited for management roles or careers in military and government. They are dignified, serious, and have the talent to lead.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见将星：出身有势力的家庭，祖上可能从政或从军，少年时就表现出领导气质。',
        en: 'In the Year Pillar: Born into an influential family. Ancestors may have been in politics or military. Shows leadership qualities from a young age.',
      },
      month: {
        zh: '月柱见将星：事业上能掌握实权，适合管理岗位，中年时期在职场上有较高地位。',
        en: 'In the Month Pillar: Holds real power in career. Suited for management positions. Achieves high status in the workplace during middle age.',
      },
      day: {
        zh: '日柱见将星：本人有领袖气质，在家庭中有主导地位，配偶也可能有权势或社会地位。',
        en: 'In the Day Pillar: The native has natural leadership charisma and dominates in the household. Spouse may also hold power or social status.',
      },
      hour: {
        zh: '时柱见将星：子女有领导才能，可能从政或从军，晚年受人尊敬。',
        en: 'In the Hour Pillar: Children have leadership talent and may enter politics or military. The native is respected in old age.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 金舆 - Golden Carriage (Jinyu)
  // Derivation: from Day Stem
  // Traditional table:
  //   甲→辰, 乙→巳, 丙→未, 丁→申, 戊→未,
  //   己→申, 庚→戌, 辛→亥, 壬→丑, 癸→寅
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '金舆',
    category: 'auspicious',
    derivation: 'fromDayStem',
    lookupTable: {
      '甲': ['辰'],
      '乙': ['巳'],
      '丙': ['未'],
      '丁': ['申'],
      '戊': ['未'],
      '己': ['申'],
      '庚': ['戌'],
      '辛': ['亥'],
      '壬': ['丑'],
      '癸': ['寅'],
    },
    description: {
      zh: '金舆为华贵之星，主有车马之福、物质享受。命带金舆者，一生衣食丰足，出入有车马相随，生活品质较高。女命带金舆尤为佳，主嫁贵夫。',
      en: 'The Golden Carriage is a star of luxury and material comfort. Those with Jinyu enjoy abundance in clothing and food, travel in comfort, and maintain a high quality of life. Especially favorable for women, indicating marriage to a distinguished partner.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见金舆：出身富裕家庭，少年时期物质条件优越，家中有车马产业。',
        en: 'In the Year Pillar: Born into a wealthy family with excellent material conditions in youth. Family may own vehicles or transportation businesses.',
      },
      month: {
        zh: '月柱见金舆：事业中物质回报丰厚，工作可能涉及高端商品、奢侈品或交通行业。',
        en: 'In the Month Pillar: Career offers generous material rewards. Work may involve luxury goods, high-end products, or the transportation industry.',
      },
      day: {
        zh: '日柱见金舆：配偶家境好或自身物质运佳，婚后生活富足，注重生活品质。',
        en: 'In the Day Pillar: Spouse comes from a good family or the native has strong material fortune. Comfortable life after marriage with emphasis on quality of living.',
      },
      hour: {
        zh: '时柱见金舆：晚年生活富足安逸，子女有能力赡养，出行方便舒适。',
        en: 'In the Hour Pillar: Affluent and comfortable later years. Children are capable of providing support. Travel is convenient and comfortable.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 魁罡 - Kuigang (Fierce Authority)
  // Derivation: from Day Pillar (specific stem+branch combinations)
  // Traditional four pillars: 壬辰, 庚戌, 庚辰, 戊戌
  // This is checked differently - we look at the day pillar stem+branch combo
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '魁罡',
    category: 'special',
    derivation: 'fromDayPillar',
    // The lookupTable here is a special case; keys are stem+branch combos
    // We handle this specially in computeShensha
    lookupTable: {
      '壬辰': ['辰'],
      '庚戌': ['戌'],
      '庚辰': ['辰'],
      '戊戌': ['戌'],
    },
    description: {
      zh: '魁罡为刚猛之星，主为人正直刚强、有决断力和权威。命带魁罡者，做事果断，不畏强权，有领导才能。但性格过于刚硬，容易得罪人。女命带魁罡则性格强势，婚姻中主导性强。魁罡忌见财官，喜身旺。',
      en: 'Kuigang is a star of fierce authority. Natives are upright, strong-willed, decisive, and commanding. They act with resolve and do not fear power, possessing natural leadership. However, their rigid personality may offend others. For women, it indicates a dominant personality in marriage. Kuigang dislikes Wealth and Officer stars but favors a strong Day Master.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见魁罡：祖上有威严之人，家风严厉，少年时受到严格管教。',
        en: 'In the Year Pillar: Ancestors included people of authority. Strict family tradition. Receives strict discipline in youth.',
      },
      month: {
        zh: '月柱见魁罡：事业上有魄力和权威，适合执法、军事或管理领域，做事雷厉风行。',
        en: 'In the Month Pillar: Demonstrates authority and boldness in career. Suited for law enforcement, military, or management. Acts swiftly and decisively.',
      },
      day: {
        zh: '日柱见魁罡：本人性格刚毅果断，有领袖风范，但婚姻中需注意过于强势的问题。',
        en: 'In the Day Pillar: The native is resolute and decisive with leadership charisma. However, should be mindful of being overly dominant in marriage.',
      },
      hour: {
        zh: '时柱见魁罡：子女性格刚强独立，晚年有权威地位，但也可能因性格刚硬而孤独。',
        en: 'In the Hour Pillar: Children are strong-willed and independent. The native holds an authoritative position in old age, but may face loneliness due to a rigid personality.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 劫煞 - Robbery Star (Jiesha)
  // Derivation: from Year Branch
  // Traditional table: 三合局绝位
  //   寅午戌→亥, 巳酉丑→寅, 申子辰→巳, 亥卯未→申
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '劫煞',
    category: 'inauspicious',
    derivation: 'fromYearBranch',
    lookupTable: {
      '寅': ['亥'],
      '午': ['亥'],
      '戌': ['亥'],
      '巳': ['寅'],
      '酉': ['寅'],
      '丑': ['寅'],
      '申': ['巳'],
      '子': ['巳'],
      '辰': ['巳'],
      '亥': ['申'],
      '卯': ['申'],
      '未': ['申'],
    },
    description: {
      zh: '劫煞为凶星之一，主突发灾祸、意外损失。命带劫煞者，一生中可能遭遇突如其来的挫折或破财，需要谨慎行事，尤其注意防范小人和意外事故。若有吉星化解则可转化为机敏果敢。',
      en: 'The Robbery Star is an inauspicious star indicating sudden setbacks and unexpected losses. Those with Jiesha may encounter abrupt misfortune or financial loss throughout life and should act with caution, guarding against treachery and accidents. If mitigated by auspicious stars, it can transform into alertness and boldness.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见劫煞：少年时期家中可能有突发变故，或者早年生活不安稳，需注意安全。',
        en: 'In the Year Pillar: Family may experience sudden upheaval in youth. Early life may be unstable. Pay attention to safety.',
      },
      month: {
        zh: '月柱见劫煞：工作中容易遭遇突发困难或小人陷害，事业上需要多加防范，谨慎决策。',
        en: 'In the Month Pillar: May encounter sudden difficulties or betrayal at work. Career requires vigilance and cautious decision-making.',
      },
      day: {
        zh: '日柱见劫煞：婚姻中可能有波折，配偶或自身可能遭遇意外，日常生活中需注意安全。',
        en: 'In the Day Pillar: Marriage may face turbulence. Spouse or self may encounter accidents. Daily life requires attention to safety.',
      },
      hour: {
        zh: '时柱见劫煞：晚年需注意健康和安全，子女的发展可能有波折，需未雨绸缪。',
        en: 'In the Hour Pillar: Pay attention to health and safety in later years. Children may face setbacks in development. Plan ahead for contingencies.',
      },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // 亡神 - Death God (Wangshen)
  // Derivation: from Year Branch
  // Traditional table:
  //   寅午戌→巳, 巳酉丑→申, 申子辰→亥, 亥卯未→寅
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: '亡神',
    category: 'inauspicious',
    derivation: 'fromYearBranch',
    lookupTable: {
      '寅': ['巳'],
      '午': ['巳'],
      '戌': ['巳'],
      '巳': ['申'],
      '酉': ['申'],
      '丑': ['申'],
      '申': ['亥'],
      '子': ['亥'],
      '辰': ['亥'],
      '亥': ['寅'],
      '卯': ['寅'],
      '未': ['寅'],
    },
    description: {
      zh: '亡神为隐患之星，主暗中的危险和欺骗。命带亡神者，一生中需要警惕隐藏的风险和不实之人。亡神也主聪明狡黠，善于谋略，若用于正途则可以化险为夷。',
      en: 'The Death God star represents hidden dangers and deception. Those with Wangshen must remain vigilant against concealed risks and dishonest people throughout life. It also signifies cunning intelligence and strategic thinking; when channeled positively, it can help navigate through peril.',
    },
    positionalMeaning: {
      year: {
        zh: '年柱见亡神：少年时期可能被人欺骗或家中有隐患，需要从小培养警觉性。',
        en: 'In the Year Pillar: May be deceived or face hidden family problems in youth. Should cultivate vigilance from an early age.',
      },
      month: {
        zh: '月柱见亡神：职场中暗流涌动，需要防范同事或合作伙伴的不诚实行为，谨慎处理人际关系。',
        en: 'In the Month Pillar: Undercurrents at work require guarding against dishonesty from colleagues or partners. Handle interpersonal relationships carefully.',
      },
      day: {
        zh: '日柱见亡神：婚姻中可能有隐瞒或不信任的问题，需要加强沟通，坦诚相待。',
        en: 'In the Day Pillar: Marriage may involve issues of concealment or distrust. Communication and mutual honesty are essential.',
      },
      hour: {
        zh: '时柱见亡神：晚年需防小人暗算，子女之间可能有暗中矛盾，需要家庭和睦。',
        en: 'In the Hour Pillar: Guard against scheming individuals in later years. There may be hidden conflicts among children. Family harmony is important.',
      },
    },
  },
];

// ─── Position Labels ─────────────────────────────────────────────────────────

const POSITION_LABELS: Record<string, string> = {
  year: 'year',
  month: 'month',
  day: 'day',
  hour: 'hour',
};

// ─── Helper: Get all pillar branches with positions ──────────────────────────

type PillarData = {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
};

type PillarsInput = {
  year: PillarData;
  month: PillarData;
  day: PillarData;
  hour: PillarData | null;
};

// ─── computeShensha Function ─────────────────────────────────────────────────

/**
 * Compute all Shensha (神煞) present in the Four Pillars.
 *
 * For each shensha rule:
 * - Determine the source key based on derivation type
 *   (day stem, day branch, year branch, or day pillar stem+branch combo)
 * - Check all pillar branches for matches against the lookup table
 * - Return matched ShenshaEntry objects with position, branch, category, and description
 *
 * @param pillars - The Four Pillars (year, month, day, hour)
 * @param dayMaster - The Day Master (day stem), used for stem-based lookups
 * @returns Array of ShenshaEntry objects for all matched shensha
 */
export function computeShensha(
  pillars: PillarsInput,
  dayMaster: HeavenlyStem
): ShenshaEntry[] {
  const results: ShenshaEntry[] = [];

  // Build an array of (position, branch) pairs for all available pillars
  const pillarEntries: Array<{ position: string; branch: EarthlyBranch }> = [
    { position: 'year', branch: pillars.year.branch },
    { position: 'month', branch: pillars.month.branch },
    { position: 'day', branch: pillars.day.branch },
  ];
  if (pillars.hour) {
    pillarEntries.push({ position: 'hour', branch: pillars.hour.branch });
  }

  for (const rule of SHENSHA_RULES) {
    // ── Special handling for 魁罡 (checks day pillar stem+branch combo) ──
    if (rule.derivation === 'fromDayPillar') {
      const dayPillarKey = `${pillars.day.stem}${pillars.day.branch}`;
      if (rule.lookupTable[dayPillarKey]) {
        const positionalDesc = rule.positionalMeaning['day'];
        results.push({
          name: rule.name,
          position: 'day',
          branch: pillars.day.branch,
          category: rule.category,
          description: positionalDesc
            ? {
                zh: `${rule.description.zh} ${positionalDesc.zh}`,
                en: `${rule.description.en} ${positionalDesc.en}`,
              }
            : rule.description,
        });
        continue;
      }
      continue;
    }

    // ── Determine the source key based on derivation ──
    let sourceKey: string;
    switch (rule.derivation) {
      case 'fromDayStem':
        sourceKey = dayMaster;
        break;
      case 'fromDayBranch':
        sourceKey = pillars.day.branch;
        break;
      case 'fromYearBranch':
        sourceKey = pillars.year.branch;
        break;
      default:
        continue;
    }

    // ── Look up the target branches from the lookup table ──
    const targetBranches = rule.lookupTable[sourceKey];
    if (!targetBranches || targetBranches.length === 0) {
      continue;
    }

    // ── Check each pillar branch for matches ──
    for (const entry of pillarEntries) {
      if (targetBranches.includes(entry.branch)) {
        const positionalDesc = rule.positionalMeaning[entry.position];
        results.push({
          name: rule.name,
          position: entry.position,
          branch: entry.branch,
          category: rule.category,
          description: positionalDesc
            ? {
                zh: `${rule.description.zh} ${positionalDesc.zh}`,
                en: `${rule.description.en} ${positionalDesc.en}`,
              }
            : rule.description,
        });
      }
    }
  }

  return results;
}
