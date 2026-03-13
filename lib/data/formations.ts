/**
 * BaZi Formation (格局) Detection Rules and Bilingual Descriptions
 *
 * Based on classical texts:
 *   - 《子平真诠》(Ziping Zhenyuan) by Shen Xiaozhan
 *   - 《滴天髓》(Ditian Sui) attributed to Jing Tu / Liu Bowen
 *
 * Formation priority:
 *   1. Special structures (从格) — require extreme weakness, no root
 *   2. Problematic patterns — detected early to surface warnings
 *   3. Combination formations — refined multi-god interactions
 *   4. Standard formations — month pillar main hidden stem ten god
 */

import {
  HeavenlyStem,
  EarthlyBranch,
  Element,
  TenGodName,
  FormationType,
  FormationResult,
  BilingualText,
} from '../types';

// ─── Formation Context ──────────────────────────────────────────

export interface FormationContext {
  dayMaster: HeavenlyStem;
  monthBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  isStrong: boolean;
  hasRoot: boolean;
  tenGodCounts: Record<TenGodName, number>;
  /** The ten god of the month branch's primary hidden stem */
  monthMainHiddenStemGod: TenGodName;
  /** Ten god prominence derived from heavenly stems only */
  prominentGods: Map<TenGodName, number>;
  dmElement: Element;
}

// ─── Formation Rule Interface ───────────────────────────────────

interface FormationRule {
  type: FormationType;
  quality: 'noble' | 'positive' | 'neutral' | 'challenging';
  detect: (ctx: FormationContext) => boolean;
  description: BilingualText;
  careerHint: BilingualText;
  warnings: BilingualText[];
}

// ─── Helper predicates ──────────────────────────────────────────

function isWealthGod(g: TenGodName): boolean {
  return g === '正财' || g === '偏财';
}

function isOfficerGod(g: TenGodName): boolean {
  return g === '正官' || g === '七杀';
}

function isOutputGod(g: TenGodName): boolean {
  return g === '食神' || g === '伤官';
}

function isSealGod(g: TenGodName): boolean {
  return g === '正印' || g === '偏印';
}

function isPeerGod(g: TenGodName): boolean {
  return g === '比肩' || g === '劫财';
}

function totalCount(ctx: FormationContext, predicate: (g: TenGodName) => boolean): number {
  let total = 0;
  for (const [god, count] of Object.entries(ctx.tenGodCounts)) {
    if (predicate(god as TenGodName)) total += count;
  }
  return total;
}

function prominentTotal(ctx: FormationContext, predicate: (g: TenGodName) => boolean): number {
  let total = 0;
  for (const [god, count] of ctx.prominentGods.entries()) {
    if (predicate(god as TenGodName)) total += count;
  }
  return total;
}

function hasProminent(ctx: FormationContext, god: TenGodName): boolean {
  return (ctx.prominentGods.get(god) ?? 0) >= 1;
}

// ─── Formation Rules (priority order) ───────────────────────────

export const FORMATION_RULES: FormationRule[] = [
  // ═══════════════════════════════════════════════════════════════
  // SPECIAL STRUCTURES (从格) — must be checked first
  // Require: DM very weak (!isStrong), no root, dominant category
  // ═══════════════════════════════════════════════════════════════

  {
    type: '从财格',
    quality: 'noble',
    detect: (ctx) =>
      !ctx.isStrong &&
      !ctx.hasRoot &&
      totalCount(ctx, isWealthGod) >= 3,
    description: {
      zh: '日主极弱，全局财星当令透旺，命主弃身从财。此格得之者，富贵可期，但需顺财势而行，不宜见比劫分夺。《滴天髓》云：「从之真者名公巨卿」。',
      en: 'The Day Master is extremely weak with no root support, while wealth stars dominate the chart. The native surrenders to wealth energy. This noble formation promises material success when one aligns with the wealth flow. Peers and rob-wealth stars must be avoided.',
    },
    careerHint: {
      zh: '宜从事金融、商贸、投资类行业，或依附富贵之人成就事业。',
      en: 'Suited for finance, commerce, and investment sectors, or building a career through wealthy patrons and partnerships.',
    },
    warnings: [
      {
        zh: '行运遇比劫（比肩、劫财），则从格被破，易有破财之灾。',
        en: 'Luck periods bringing peer stars (Bijian, Jiecai) can break this formation, risking financial loss.',
      },
      {
        zh: '从财格忌印星，印星生身克财，反为不美。',
        en: 'Seal stars are unfavorable — they strengthen the DM and restrain wealth, disrupting the formation.',
      },
    ],
  },

  {
    type: '从官格',
    quality: 'noble',
    detect: (ctx) =>
      !ctx.isStrong &&
      !ctx.hasRoot &&
      totalCount(ctx, isOfficerGod) >= 3,
    description: {
      zh: '日主极弱无根，官杀星旺盛当权，命主顺势从官。此格清贵，主官禄亨通，宜顺从权威体制，不可抗逆。《子平真诠》以从官为上格。',
      en: 'The Day Master is extremely weak with no root, while officer and power stars dominate. The native submits to authority energy. This formation signifies a distinguished career in governance or structured institutions.',
    },
    careerHint: {
      zh: '宜仕途、公务员、大型企业管理层，或法律、军事等权力体系内发展。',
      en: 'Best suited for government service, corporate management, law, or military careers within established power structures.',
    },
    warnings: [
      {
        zh: '行运遇食伤制官，或比劫助身，从格易破，恐有官灾。',
        en: 'Luck periods with output stars restraining officers, or peer stars strengthening the DM, can break this formation and bring authority conflicts.',
      },
    ],
  },

  {
    type: '从儿格',
    quality: 'noble',
    detect: (ctx) =>
      !ctx.isStrong &&
      !ctx.hasRoot &&
      totalCount(ctx, isOutputGod) >= 3,
    description: {
      zh: '日主极弱，食伤星旺盛泄秀，命主弃身从儿（食伤为子女星，古称"儿"）。此格主聪明才艺超群，适合自由发挥才华。《滴天髓》以从儿格为秀气格局。',
      en: 'The Day Master is extremely weak with no root, while output stars (Eating God and Hurting Officer) dominate. The native channels all energy into creative expression and talent. This formation signifies exceptional intellect and artistry.',
    },
    careerHint: {
      zh: '宜从事艺术、文学、教育、演艺、自由职业等需要才华展示的领域。',
      en: 'Ideal for arts, literature, education, entertainment, freelancing, and any field requiring creative talent and self-expression.',
    },
    warnings: [
      {
        zh: '从儿格忌印星，印星克制食伤，才华受阻；行运遇印则不利。',
        en: 'Seal stars are strongly unfavorable as they restrain output stars and suppress creative talent. Luck periods with seals bring difficulties.',
      },
    ],
  },

  {
    type: '从势格',
    quality: 'neutral',
    detect: (ctx) =>
      !ctx.isStrong &&
      !ctx.hasRoot &&
      totalCount(ctx, isWealthGod) >= 1 &&
      totalCount(ctx, isOfficerGod) >= 1 &&
      totalCount(ctx, isOutputGod) >= 1,
    description: {
      zh: '日主极弱无根，但全局并非单一十神独旺，而是财、官、食伤混杂皆强。命主从势而行，随大势所趋，灵活变通。格局成败视行运而定。',
      en: 'The Day Master is extremely weak with no root, but no single star category dominates. Wealth, officer, and output stars are all present. The native adapts to prevailing circumstances. Success depends heavily on luck period alignment.',
    },
    careerHint: {
      zh: '宜灵活多变的职业，如创业、咨询、外交、中介等能借势而为的领域。',
      en: 'Suited for flexible and adaptive careers such as entrepreneurship, consulting, diplomacy, or brokerage, where riding momentum is key.',
    },
    warnings: [
      {
        zh: '从势格最忌比劫助身破格，一旦行运生身则诸事不顺。',
        en: 'Peer stars strengthening the DM break this formation. Luck periods that bolster the self bring instability and adversity.',
      },
      {
        zh: '此格变化多端，一生起伏较大，需审时度势。',
        en: 'This formation is inherently volatile with significant life fluctuations. Careful timing and adaptability are essential.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PROBLEMATIC PATTERNS — detect before standard to surface warnings
  // ═══════════════════════════════════════════════════════════════

  {
    type: '伤官见官',
    quality: 'challenging',
    detect: (ctx) =>
      hasProminent(ctx, '伤官') && hasProminent(ctx, '正官'),
    description: {
      zh: '伤官与正官同透天干，形成「伤官见官」之忌。《子平真诠》云：「伤官见官，为祸百端」。伤官克制正官，主是非口舌、仕途不顺，为命理大忌之一。',
      en: 'Hurting Officer and Direct Officer both appear prominently in the heavenly stems, creating the dreaded clash. The Hurting Officer attacks the Direct Officer, causing conflicts with authority, legal troubles, and career instability. This is one of the most cautioned patterns in classical BaZi.',
    },
    careerHint: {
      zh: '不宜稳定体制内工作，可转向自由职业、创意行业或法律（以攻为守）。',
      en: 'Avoid rigid institutional careers. Consider freelancing, creative industries, or legal work where confrontation can be channeled constructively.',
    },
    warnings: [
      {
        zh: '行运再逢正官，祸患加重；若有印星化解（伤官佩印），可减轻凶性。',
        en: 'Luck periods bringing more Direct Officer stars intensify problems. Seal stars can mitigate this pattern (Hurting Officer with Seal).',
      },
      {
        zh: '感情婚姻方面亦多波折，尤其女命以官星为夫星，伤官见官主婚姻不稳。',
        en: 'Relationship and marriage difficulties are common. For female charts especially, this pattern indicates marital instability since the Officer represents the spouse.',
      },
    ],
  },

  {
    type: '枭印夺食',
    quality: 'challenging',
    detect: (ctx) =>
      hasProminent(ctx, '偏印') && ctx.tenGodCounts['食神'] >= 1,
    description: {
      zh: '偏印（枭神）透干且食神现于命局，形成「枭印夺食」。偏印克制食神，夺去命主的才华发挥与财路来源。主思维受阻、谋事难成、福禄减损。《子平真诠》视此为大忌。',
      en: 'The Indirect Seal (Owl) appears prominently while the Eating God is present, forming the "Owl Seizes Food" pattern. The Indirect Seal suppresses the Eating God, blocking creative expression and financial channels. This indicates mental frustration and thwarted ambitions.',
    },
    careerHint: {
      zh: '需找到偏印的正面发挥（学术、玄学、冷门研究），同时用财星制衡偏印以保护食神。',
      en: 'Channel the Indirect Seal positively through academia, metaphysics, or niche research. Wealth stars can restrain the Owl and protect the Eating God.',
    },
    warnings: [
      {
        zh: '女命遇枭印夺食，古论有产厄之虑，需注意生育健康。',
        en: 'In female charts, this pattern traditionally warns of complications in childbirth or reproductive health.',
      },
      {
        zh: '行运再遇偏印，凶象加重；见财星则可解。',
        en: 'Luck periods with additional Indirect Seal stars worsen the situation. Wealth stars in transit can provide relief.',
      },
    ],
  },

  {
    type: '身弱官杀混杂',
    quality: 'challenging',
    detect: (ctx) =>
      !ctx.isStrong &&
      ctx.tenGodCounts['正官'] >= 1 &&
      ctx.tenGodCounts['七杀'] >= 1 &&
      (ctx.tenGodCounts['正官'] + ctx.tenGodCounts['七杀']) >= 2,
    description: {
      zh: '日主身弱，正官与七杀同现命局，官杀混杂无制。《子平真诠》云：「官杀混杂，不清不贵」。身弱难以承受官杀之压力，主事业多阻、小人暗害、精神压力大。',
      en: 'The Day Master is weak while both Direct Officer and Seven Killings appear, creating a muddled authority pattern. The weak DM cannot withstand the combined pressure from both officer types, leading to career obstacles, political intrigue, and mental stress.',
    },
    careerHint: {
      zh: '宜去一留一（合杀留官或制杀护官），寻找能化解官杀压力的岗位，避免高压管理职。',
      en: 'Best to neutralize one authority star. Seek roles that reduce hierarchical pressure. Avoid high-stress managerial positions until the pattern is mitigated by luck periods.',
    },
    warnings: [
      {
        zh: '若命中有食神制杀或印星化杀，则官杀混杂之忌可解。',
        en: 'If the Eating God restrains the Killings, or Seal stars transform them, the negative effects can be neutralized.',
      },
    ],
  },

  {
    type: '比劫夺财',
    quality: 'challenging',
    detect: (ctx) =>
      totalCount(ctx, isPeerGod) >= 3 &&
      totalCount(ctx, isWealthGod) <= 1,
    description: {
      zh: '比肩劫财过旺（三个以上），而财星薄弱（仅一个或无）。群比争财，犹如众人分食一饼，主破财、合伙不利、兄弟朋友夺财。《滴天髓》云：「群劫争财，富屋贫人」。',
      en: 'Peer stars (Shoulder and Rob Wealth) are excessively strong with three or more present, while wealth stars are scarce. Multiple peers compete for limited wealth, indicating financial losses, failed partnerships, and friends or siblings causing monetary harm.',
    },
    careerHint: {
      zh: '不宜合伙经营，宜独立创业或从事技术类、凭手艺吃饭的职业。需用食伤泄比劫生财。',
      en: 'Avoid business partnerships. Solo entrepreneurship or skilled technical work is preferred. Output stars can redirect peer energy into wealth generation.',
    },
    warnings: [
      {
        zh: '行运遇比劫旺地，破财更甚；遇食伤运则可化劫生财。',
        en: 'Luck periods strengthening peers bring greater financial loss. Output star periods can transform peer energy into wealth.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // COMBINATION FORMATIONS — refined multi-god interactions
  // Check before standard because they are more specific
  // ═══════════════════════════════════════════════════════════════

  {
    type: '食神生财格',
    quality: 'noble',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '食神' &&
      prominentTotal(ctx, isWealthGod) >= 1,
    description: {
      zh: '月令食神当令，又见财星透干，形成食神生财之美格。食神泄日主之秀气而生财，主人聪慧温和、财源广进、一生衣食无忧。《子平真诠》以此格为上吉。',
      en: 'The Eating God rules the month branch and wealth stars appear in the stems, forming the elegant "Eating God Generating Wealth" pattern. The Eating God channels the DM\'s talent into wealth creation, signifying intelligence, gentle temperament, and abundant prosperity.',
    },
    careerHint: {
      zh: '宜餐饮、文化创意、教育培训、投资理财等行业，以才华换取财富。',
      en: 'Excellent for food industry, cultural/creative enterprises, education, and investment — careers that convert talent into financial returns.',
    },
    warnings: [],
  },

  {
    type: '伤官生财格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '伤官' &&
      prominentTotal(ctx, isWealthGod) >= 1,
    description: {
      zh: '月令伤官当令，财星透出天干，伤官泄秀生财。伤官虽烈，得财星引化则才华有出口，变锋芒为财源。主人性格张扬但能力出众，善于开拓创新。',
      en: 'The Hurting Officer rules the month branch with wealth stars in the stems, channeling aggressive creativity into profit. The sharp-edged Hurting Officer finds a productive outlet through wealth, transforming boldness into financial success and innovative achievement.',
    },
    careerHint: {
      zh: '宜律师、营销策划、创业、竞技体育等需要锋芒与创新的领域。',
      en: 'Suited for law, marketing, entrepreneurship, competitive sports, and fields demanding bold innovation and assertive talent.',
    },
    warnings: [
      {
        zh: '伤官生财忌见正官，若官星出现则伤官攻官，反成祸端。',
        en: 'Direct Officer stars must be absent. If the Officer appears, the Hurting Officer attacks it, turning this positive pattern into conflict.',
      },
    ],
  },

  {
    type: '杀印相生格',
    quality: 'noble',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '七杀' &&
      prominentTotal(ctx, isSealGod) >= 1,
    description: {
      zh: '月令七杀当令，印星透出天干，杀印相生化杀为权。七杀本为凶神，得印星化泄，转凶为吉、化压力为权柄。《子平真诠》视此格极贵，主掌权施令。',
      en: 'Seven Killings rules the month branch while seal stars appear in the stems, forming the prestigious "Killings and Seal Mutual Generation" pattern. The seal transforms the aggressive Killings into authoritative power, converting pressure into command.',
    },
    careerHint: {
      zh: '宜军警、司法、政界、大型企业高管等需要魄力与权柄的职位，主大贵。',
      en: 'Ideal for military, law enforcement, judiciary, politics, or senior corporate executive roles demanding decisiveness and authority.',
    },
    warnings: [
      {
        zh: '忌财星破印，若财星旺则印星受克，杀星无化，反成大凶。',
        en: 'Wealth stars that damage the seal are dangerous. If wealth overpowers the seal, the Killings lose their transformer and become destructive.',
      },
    ],
  },

  {
    type: '官印相生格',
    quality: 'noble',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '正官' &&
      prominentTotal(ctx, isSealGod) >= 1 &&
      !hasProminent(ctx, '伤官'),
    description: {
      zh: '月令正官当令，印星透出天干，官印相生为命理最贵格局之一。正官代表正统权力，印星代表学识涵养，二者相生则文武兼备、仕途亨通。《子平真诠》以此为正格之首。',
      en: 'Direct Officer rules the month branch with seal stars in the stems, forming one of the most prestigious classical formations. The Officer represents legitimate authority and the Seal represents scholarly refinement — their combination produces distinguished government officials and respected leaders.',
    },
    careerHint: {
      zh: '宜公务员、学者型官员、教育界领导、企业高管等正统体制内发展，主清贵。',
      en: 'Best for civil service, scholar-officials, academic leadership, and senior corporate governance. This formation classically denotes honorable prestige.',
    },
    warnings: [],
  },

  {
    type: '伤官佩印格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '伤官' &&
      prominentTotal(ctx, isSealGod) >= 1,
    description: {
      zh: '月令伤官当令，但印星透干制伤官，形成伤官佩印。印星如缰绳驾驭烈马，使伤官之才华不至于失控，反成大才大用。主人既有锋芒又有涵养，能成大事。',
      en: 'The Hurting Officer rules the month branch while seal stars appear in the stems to restrain it. The seal acts as a bridle on a spirited horse, channeling the Hurting Officer\'s fierce creativity into disciplined achievement. This produces individuals of both sharp talent and scholarly depth.',
    },
    careerHint: {
      zh: '宜学术研究、高端技术、文艺创作、中医等需要天赋加修养的领域。',
      en: 'Suited for academic research, advanced technology, literary creation, traditional medicine — fields requiring both raw talent and cultivated wisdom.',
    },
    warnings: [
      {
        zh: '忌财星坏印，财星旺则印星受克制，伤官失控，反为不吉。',
        en: 'Wealth stars damaging the seal are dangerous. If wealth overpowers the seal, the Hurting Officer loses restraint and becomes destructive.',
      },
    ],
  },

  {
    type: '食神制杀格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '食神' &&
      hasProminent(ctx, '七杀'),
    description: {
      zh: '月令食神当令，七杀透出天干，食神制杀得宜。食神以柔克刚，温和制服七杀之暴烈，化险为夷。主人外柔内刚，能以智慧化解危机，掌控局面。',
      en: 'The Eating God rules the month branch while Seven Killings appears in the stems. The gentle Eating God precisely restrains the fierce Killings — softness conquers hardness. The native possesses inner steel beneath a mild exterior, using wisdom to resolve crises and command situations.',
    },
    careerHint: {
      zh: '宜军事策略、危机管理、执法、外交谈判等需要以柔克刚的职业。',
      en: 'Suited for military strategy, crisis management, law enforcement, diplomatic negotiation — careers demanding the art of subduing force with finesse.',
    },
    warnings: [
      {
        zh: '忌偏印（枭神）夺食，一旦偏印出现克制食神，七杀失制反伤日主。',
        en: 'The Indirect Seal (Owl) stealing the Eating God is the greatest danger. Without the Eating God\'s restraint, the uncontrolled Killings attack the Day Master.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // STANDARD FORMATIONS — based on month pillar main hidden stem
  // ═══════════════════════════════════════════════════════════════

  {
    type: '正官格',
    quality: 'noble',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '正官' &&
      !hasProminent(ctx, '伤官'),
    description: {
      zh: '月令正官当令，正官为十神之首，代表正统、秩序与权力。取正官格者，品行端正、行事光明磊落，有管理领导之才。《子平真诠》以正官为第一贵格。',
      en: 'The Direct Officer dominates the month branch, representing orthodoxy, order, and legitimate authority. Those with this formation possess upright character, transparent conduct, and natural leadership ability. Classical texts rank this as the premier prestigious formation.',
    },
    careerHint: {
      zh: '宜公务员、企业管理、法律、金融等需要信誉和领导力的职业。',
      en: 'Ideal for civil service, corporate management, law, and finance — careers demanding integrity and leadership.',
    },
    warnings: [
      {
        zh: '正官格最忌伤官破格，伤官见官为祸百端。',
        en: 'The greatest threat is the Hurting Officer clashing with the Direct Officer, which brings numerous calamities.',
      },
    ],
  },

  {
    type: '七杀格',
    quality: 'neutral',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '七杀',
    description: {
      zh: '月令七杀当令，七杀为偏官，代表权威、魄力与压力。七杀有制化则为权柄，无制化则为灾祸。身强能任杀者，主武贵；身弱无制则受其害。',
      en: 'Seven Killings dominates the month branch, representing bold authority, assertive power, and intense pressure. When properly restrained or transformed, it grants commanding authority. Without restraint, it brings adversity. A strong DM that can bear the Killings achieves martial distinction.',
    },
    careerHint: {
      zh: '宜军事、警察、外科医生、竞技运动、创业等需要果断魄力的领域。',
      en: 'Suited for military, police, surgery, competitive sports, and entrepreneurship — fields requiring decisiveness and bold action.',
    },
    warnings: [
      {
        zh: '七杀无制（无食神制或印星化），则凶暴难当，主灾祸伤病。',
        en: 'Unrestrained Seven Killings (lacking Eating God control or Seal transformation) brings calamity, injury, or illness.',
      },
    ],
  },

  {
    type: '正财格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '正财',
    description: {
      zh: '月令正财当令，正财代表稳定的财源、正当的收入与务实的理财能力。取正财格者，为人勤劳踏实、善于持家，重视稳定与安全感。',
      en: 'The Direct Wealth dominates the month branch, representing stable income, legitimate earnings, and practical financial management. Those with this formation are diligent, grounded, and skilled at building household prosperity through steady accumulation.',
    },
    careerHint: {
      zh: '宜稳定收入类工作：会计、银行、房地产、实业经营等。',
      en: 'Best for stable-income careers: accounting, banking, real estate, and established business operations.',
    },
    warnings: [
      {
        zh: '正财格忌比劫夺财；若比劫旺而财弱，则辛苦劳碌而财难聚。',
        en: 'Peer stars competing for wealth are the main threat. When peers are strong and wealth is weak, hard work yields little financial gain.',
      },
    ],
  },

  {
    type: '偏财格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '偏财',
    description: {
      zh: '月令偏财当令，偏财代表意外之财、投资收益与人际交往能力。取偏财格者，为人豪爽大方、交际广泛、善于把握商机，但财来财去波动较大。',
      en: 'The Indirect Wealth dominates the month branch, representing windfall gains, investment returns, and social networking ability. Those with this formation are generous, sociable, and adept at seizing business opportunities, though wealth tends to fluctuate.',
    },
    careerHint: {
      zh: '宜投资、贸易、销售、社交型职业、娱乐行业等流动性强的领域。',
      en: 'Suited for investment, trading, sales, social-oriented professions, and entertainment — fields with high liquidity and dynamic income.',
    },
    warnings: [
      {
        zh: '偏财忌比劫分夺；行运遇比劫则破财明显。',
        en: 'Peer stars are especially damaging to Indirect Wealth. Luck periods with peers bring conspicuous financial losses.',
      },
    ],
  },

  {
    type: '正印格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '正印',
    description: {
      zh: '月令正印当令，正印代表学识、涵养、慈爱与贵人扶持。取正印格者，为人仁慈厚道、好学博闻、重感情、有长辈缘。《子平真诠》以正印格为文贵之格。',
      en: 'The Direct Seal dominates the month branch, representing scholarship, nurturing, benevolence, and noble patronage. Those with this formation are kind-hearted, learned, emotionally rich, and enjoy strong support from elders and mentors.',
    },
    careerHint: {
      zh: '宜教育、学术研究、出版、医疗、社会服务等需要仁德与学识的职业。',
      en: 'Ideal for education, academic research, publishing, healthcare, and social services — careers demanding benevolence and erudition.',
    },
    warnings: [
      {
        zh: '正印格忌财星坏印；财旺破印则贵人失、学业阻。',
        en: 'Wealth stars damaging the seal are the chief concern. When wealth overpowers the seal, patronage is lost and academic pursuits are hindered.',
      },
    ],
  },

  {
    type: '偏印格',
    quality: 'neutral',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '偏印',
    description: {
      zh: '月令偏印当令，偏印又名枭神，代表偏门学问、直觉灵感与独特思维。取偏印格者，思维独特、善于钻研冷门领域、有艺术天赋，但性格较孤僻。',
      en: 'The Indirect Seal (Owl Star) dominates the month branch, representing esoteric knowledge, intuitive insight, and unconventional thinking. Those with this formation possess unique perspectives, talent for niche subjects, and artistic gifts, though they tend toward introversion.',
    },
    careerHint: {
      zh: '宜玄学命理、中医、心理学、科研、IT技术等偏门或高深领域。',
      en: 'Suited for metaphysics, traditional medicine, psychology, scientific research, and IT — specialized or profound fields rewarding unconventional expertise.',
    },
    warnings: [
      {
        zh: '偏印见食神则成枭印夺食之忌，需特别留意行运中偏印与食神的冲突。',
        en: 'When the Indirect Seal encounters the Eating God, the "Owl Seizes Food" pattern forms. Watch carefully for this conflict in luck periods.',
      },
    ],
  },

  {
    type: '食神格',
    quality: 'positive',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '食神',
    description: {
      zh: '月令食神当令，食神代表才华、口福、温和、创造力与子女缘。取食神格者，为人温厚聪慧、生活品味高、善于表达，是十神中最和善的吉神。',
      en: 'The Eating God dominates the month branch, representing talent, culinary appreciation, gentleness, creativity, and affinity with children. Those with this formation are warm, intelligent, refined in taste, and expressive — the Eating God is considered the most benevolent of the ten gods.',
    },
    careerHint: {
      zh: '宜餐饮、文艺、教育、设计、策划等需要创意和表达能力的行业。',
      en: 'Ideal for food service, arts, education, design, and event planning — industries valuing creativity, expression, and aesthetic sensibility.',
    },
    warnings: [
      {
        zh: '食神格忌枭神（偏印）夺食；遇偏印则才华受阻、福气减损。',
        en: 'The Owl Star (Indirect Seal) stealing the Eating God is the primary threat. When encountered, talent is blocked and blessings diminish.',
      },
    ],
  },

  {
    type: '伤官格',
    quality: 'neutral',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '伤官',
    description: {
      zh: '月令伤官当令，伤官代表才华横溢、叛逆不羁、锋芒毕露与创新精神。取伤官格者，聪明过人但性格桀骜、不服管束、善于批判创新。伤官用好则大才，用坏则大祸。',
      en: 'The Hurting Officer dominates the month branch, representing overflowing talent, rebellious spirit, sharp edge, and innovative drive. Those with this formation are brilliantly intelligent but defiant, resistant to authority, and fiercely original. Well-directed, it produces greatness; poorly managed, it invites disaster.',
    },
    careerHint: {
      zh: '宜律师、艺术家、作家、创业者、技术专家等需要突破与创新的领域。',
      en: 'Suited for law, art, writing, entrepreneurship, and technical expertise — fields demanding breakthroughs and creative disruption.',
    },
    warnings: [
      {
        zh: '伤官格最忌见正官（伤官见官为祸百端）；宜佩印或生财以化其锋芒。',
        en: 'The Direct Officer is the greatest threat (Hurting Officer clashing with Officer brings calamity). Seal stars or wealth stars can redirect the sharp energy constructively.',
      },
    ],
  },

  {
    type: '建禄格',
    quality: 'neutral',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '比肩',
    description: {
      zh: '月令比肩当令（日主临月建之禄位），称为建禄格。比肩为同类相助，主人自立自强、独立性强，但建禄格本身不显贵，需借用他神成格。《子平真诠》云：「建禄之格，无贵可取，须看四柱有无财官」。',
      en: 'The Shoulder (peer) star dominates the month branch at the DM\'s prosperity position, forming the Established Salary formation. This indicates strong self-reliance and independence, but the formation alone lacks distinction. Success depends on other gods — wealth or officer stars — appearing elsewhere in the chart.',
    },
    careerHint: {
      zh: '需结合其他十神判断，单纯建禄格宜自主创业、自由职业或技术工种。',
      en: 'Career direction depends on supporting gods. Pure Established Salary types suit self-employment, freelancing, or skilled trades.',
    },
    warnings: [
      {
        zh: '建禄格若无财官食伤配合，则一生平淡劳碌，难有大成就。',
        en: 'Without wealth, officer, or output stars in support, this formation indicates an ordinary, laborious life with limited advancement.',
      },
    ],
  },

  {
    type: '月刃格',
    quality: 'challenging',
    detect: (ctx) =>
      ctx.monthMainHiddenStemGod === '劫财',
    description: {
      zh: '月令劫财当令，劫财为月刃（阳刃），代表刚强果敢但也主争斗劫夺。月刃格者，性格刚烈、行事果断，但易冲动惹祸。《子平真诠》以月刃格需官杀制之方成大器。',
      en: 'The Rob Wealth star dominates the month branch as the Blade formation, representing fierce determination but also contention and seizure. Those with this formation are strong-willed and decisive but prone to impulsive conflicts. Classical texts emphasize that officer or killings stars are needed to temper the blade.',
    },
    careerHint: {
      zh: '宜军警、体育、外科手术、竞争激烈的商业领域；需有官杀制衡方能成就。',
      en: 'Suited for military, police, athletics, surgery, and fiercely competitive business. Officer or Killings stars are essential for tempering and achieving success.',
    },
    warnings: [
      {
        zh: '月刃格无官杀制则刚暴难驯，主灾祸争斗；行运再遇比劫则凶。',
        en: 'Without officer/killings restraint, the blade is untamed and brings conflict and disaster. Peer-star luck periods intensify the danger.',
      },
      {
        zh: '月刃格者婚姻感情多波折，需注意夫妻关系的经营。',
        en: 'Marriage and relationships tend to be turbulent. Careful cultivation of spousal bonds is essential.',
      },
    ],
  },
];

// ─── Key God Mapping ────────────────────────────────────────────

function getKeyGod(type: FormationType): TenGodName {
  const keyGodMap: Partial<Record<FormationType, TenGodName>> = {
    '正官格': '正官',
    '七杀格': '七杀',
    '正财格': '正财',
    '偏财格': '偏财',
    '正印格': '正印',
    '偏印格': '偏印',
    '食神格': '食神',
    '伤官格': '伤官',
    '建禄格': '比肩',
    '月刃格': '劫财',
    '食神生财格': '食神',
    '伤官生财格': '伤官',
    '杀印相生格': '七杀',
    '官印相生格': '正官',
    '伤官佩印格': '伤官',
    '食神制杀格': '食神',
    '从财格': '正财',
    '从官格': '正官',
    '从儿格': '食神',
    '从势格': '七杀',
    '身弱官杀混杂': '七杀',
    '比劫夺财': '劫财',
    '伤官见官': '伤官',
    '枭印夺食': '偏印',
    '无格局': '比肩',
  };
  return keyGodMap[type] ?? '比肩';
}

// ─── Default Formation ──────────────────────────────────────────

const DEFAULT_FORMATION: FormationResult = {
  type: '无格局',
  quality: 'neutral',
  keyGod: '比肩',
  isSpecialStructure: false,
  description: {
    zh: '命局未形成明显格局，十神力量较为分散，无单一主导力量。此类命局需综合分析日主强弱及行运变化来判断吉凶。',
    en: 'No distinct formation is established in the chart. The ten gods are dispersed without a single dominant force. Analysis must rely on the Day Master\'s strength and luck period transitions to assess fortune.',
  },
  careerHint: {
    zh: '职业方向需结合日主喜用神及大运流年综合判断，灵活应变为宜。',
    en: 'Career direction should be determined by analyzing the DM\'s favorable elements and luck periods. Flexibility and adaptability are advised.',
  },
  warnings: [],
};

// ─── Special Structure Types ────────────────────────────────────

const SPECIAL_FORMATION_TYPES: Set<FormationType> = new Set([
  '从财格',
  '从官格',
  '从儿格',
  '从势格',
]);

// ─── Main Detection Function ────────────────────────────────────

/**
 * Detect the primary BaZi formation (格局) from the given context.
 *
 * Iterates through FORMATION_RULES in priority order:
 *   1. Special structures (从格)
 *   2. Problematic patterns
 *   3. Combination formations
 *   4. Standard formations
 *
 * Returns the first matching formation, or the default '无格局' if none match.
 */
export function detectFormation(ctx: FormationContext): FormationResult {
  for (const rule of FORMATION_RULES) {
    if (rule.detect(ctx)) {
      return {
        type: rule.type,
        quality: rule.quality,
        keyGod: getKeyGod(rule.type),
        isSpecialStructure: SPECIAL_FORMATION_TYPES.has(rule.type),
        description: rule.description,
        careerHint: rule.careerHint,
        warnings: rule.warnings,
      };
    }
  }

  return DEFAULT_FORMATION;
}
