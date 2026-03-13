/**
 * readings.ts — Deep chart interpretation engine
 * 
 * Unlike the previous template-based approach, this module computes
 * dozens of chart-specific signals and assembles unique paragraphs.
 * Two charts with different pillars will get meaningfully different readings.
 */

import { 
  HeavenlyStem, EarthlyBranch, Element, Language, BirthInput,
  FourPillars, ElementCount, TenGodName, DayunPeriod, StemBranch,
  BaziAnalysis, YearEntry 
} from './types';

// ─── Re-import constants we need ─────────────────────────────────

const S_EL: Record<string, Element> = {'甲':'wood','乙':'wood','丙':'fire','丁':'fire','戊':'earth','己':'earth','庚':'metal','辛':'metal','壬':'water','癸':'water'};
const S_YY: Record<string, string> = {'甲':'yang','乙':'yin','丙':'yang','丁':'yin','戊':'yang','己':'yin','庚':'yang','辛':'yin','壬':'yang','癸':'yin'};
const B_EL: Record<string, Element> = {'子':'water','丑':'earth','寅':'wood','卯':'wood','辰':'earth','巳':'fire','午':'fire','未':'earth','申':'metal','酉':'metal','戌':'earth','亥':'water'};
const HIDDEN: Record<string, string[]> = {'子':['癸'],'丑':['己','癸','辛'],'寅':['甲','丙','戊'],'卯':['乙'],'辰':['戊','乙','癸'],'巳':['丙','庚','戊'],'午':['丁','己'],'未':['己','丁','乙'],'申':['庚','壬','戊'],'酉':['辛'],'戌':['戊','辛','丁'],'亥':['壬','甲']};
const PROD: Record<Element, Element> = {wood:'fire',fire:'earth',earth:'metal',metal:'water',water:'wood'};
const CTRL: Record<Element, Element> = {wood:'earth',earth:'water',water:'fire',fire:'metal',metal:'wood'};
const PROD_BY: Record<Element, Element> = {fire:'wood',earth:'fire',metal:'earth',water:'metal',wood:'water'};
const CTRL_BY: Record<Element, Element> = {earth:'wood',water:'earth',fire:'water',metal:'fire',wood:'metal'};
const EL_CN: Record<Element, string> = {wood:'木',fire:'火',earth:'土',metal:'金',water:'水'};
const EL_EN: Record<Element, string> = {wood:'Wood',fire:'Fire',earth:'Earth',metal:'Metal',water:'Water'};
const TG_EN: Record<string, string> = {'比肩':'Peer','劫财':'Rob Wealth','食神':'Eating God','伤官':'Hurting Officer','偏财':'Indirect Wealth','正财':'Direct Wealth','七杀':'Seven Killings','正官':'Direct Officer','偏印':'Indirect Seal','正印':'Direct Seal'};

// ─── Chart feature detection ─────────────────────────────────────

const STEM_COMBOS: [string, string][] = [['甲','己'],['乙','庚'],['丙','辛'],['丁','壬'],['戊','癸']];
const SIX_CLASHES: [string, string][] = [['子','午'],['丑','未'],['寅','申'],['卯','酉'],['辰','戌'],['巳','亥']];
const SIX_HARMONIES: [string, string][] = [['子','丑'],['寅','亥'],['卯','戌'],['辰','酉'],['巳','申'],['午','未']];
const SELF_PUNISH = ['辰','午','酉','亥'];

interface ChartFeatures {
  // Internal clashes between natal branches
  internalClashes: { b1: string; b2: string; pos1: string; pos2: string }[];
  // Internal harmonies between natal branches
  internalHarmonies: { b1: string; b2: string; pos1: string; pos2: string }[];
  // Stem combinations within natal chart
  stemCombos: { s1: string; s2: string; pos1: string; pos2: string }[];
  // Self-punishment
  selfPunish: string[];
  // Season born in (month branch element)
  season: Element;
  seasonInPhase: boolean; // DM in season?
  // Count of each ten god in stems (not hidden)
  prominentGods: Map<TenGodName, number>;
  // Which elements are missing
  missingElements: Element[];
  // Which elements are excessive (>3)
  excessElements: Element[];
  // Day branch (spouse palace) element
  spouseEl: Element;
  spouseBranch: string;
  // Year branch (ancestry)
  yearBranch: string;
  // Hour branch (ambition/future)
  hourBranch: string | null;
  // DM specifics
  dmElement: Element;
  dmYinYang: string;
  dmStem: string;
  isStrong: boolean;
  // Water-fire clash (specific pattern)
  hasWaterFireTension: boolean;
  // Wood weakness
  woodWeak: boolean;
  metalWeak: boolean;
  // Wealth star prominence
  wealthStarCount: number;
  // Officer star prominence
  officerStarCount: number;
  // Seal star prominence
  sealStarCount: number;
  // Output star (食伤) prominence
  outputStarCount: number;
}

function getTG(dm: string, other: string): TenGodName {
  const de = S_EL[dm], oe = S_EL[other], sp = S_YY[dm] === S_YY[other];
  if (de === oe) return sp ? '比肩' : '劫财';
  if (PROD[de] === oe) return sp ? '食神' : '伤官';
  if (CTRL[de] === oe) return sp ? '偏财' : '正财';
  if (CTRL_BY[de] === oe) return sp ? '七杀' : '正官';
  if (PROD_BY[de] === oe) return sp ? '偏印' : '正印';
  return '比肩';
}

export function extractFeatures(a: BaziAnalysis, input: BirthInput): ChartFeatures {
  const p = a.pillars;
  const dm = a.dayMaster;
  const de = a.dayMasterElement;
  
  // Collect positions
  const positions: { branch: string; stem: string; label: string }[] = [
    { branch: p.year.branch, stem: p.year.stem, label: 'year' },
    { branch: p.month.branch, stem: p.month.stem, label: 'month' },
    { branch: p.day.branch, stem: p.day.stem, label: 'day' },
  ];
  if (p.hour) positions.push({ branch: p.hour.branch, stem: p.hour.stem, label: 'hour' });

  // Internal clashes
  const internalClashes: ChartFeatures['internalClashes'] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      for (const [c1, c2] of SIX_CLASHES) {
        if ((positions[i].branch === c1 && positions[j].branch === c2) ||
            (positions[i].branch === c2 && positions[j].branch === c1)) {
          internalClashes.push({ b1: positions[i].branch, b2: positions[j].branch, pos1: positions[i].label, pos2: positions[j].label });
        }
      }
    }
  }

  // Internal harmonies
  const internalHarmonies: ChartFeatures['internalHarmonies'] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      for (const [h1, h2] of SIX_HARMONIES) {
        if ((positions[i].branch === h1 && positions[j].branch === h2) ||
            (positions[i].branch === h2 && positions[j].branch === h1)) {
          internalHarmonies.push({ b1: positions[i].branch, b2: positions[j].branch, pos1: positions[i].label, pos2: positions[j].label });
        }
      }
    }
  }

  // Stem combos
  const stemCombos: ChartFeatures['stemCombos'] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      for (const [s1, s2] of STEM_COMBOS) {
        if ((positions[i].stem === s1 && positions[j].stem === s2) ||
            (positions[i].stem === s2 && positions[j].stem === s1)) {
          stemCombos.push({ s1: positions[i].stem, s2: positions[j].stem, pos1: positions[i].label, pos2: positions[j].label });
        }
      }
    }
  }

  // Self punishment
  const branches = positions.map(p => p.branch);
  const selfPunish = branches.filter(b => SELF_PUNISH.includes(b));
  const branchCounts = new Map<string, number>();
  branches.forEach(b => branchCounts.set(b, (branchCounts.get(b) || 0) + 1));
  const selfPunishActual: string[] = [];
  branchCounts.forEach((count, branch) => {
    if (count >= 2 && SELF_PUNISH.includes(branch)) selfPunishActual.push(branch);
  });

  // Season
  const season = B_EL[p.month.branch];
  const seasonInPhase = season === de || season === PROD_BY[de];

  // Prominent gods (from heavenly stems only)
  const prominentGods = new Map<TenGodName, number>();
  positions.forEach(pos => {
    if (pos.label === 'day') return; // DM itself
    const g = getTG(dm, pos.stem);
    prominentGods.set(g, (prominentGods.get(g) || 0) + 1);
  });

  // Element analysis
  const ec = a.elementCounts;
  const missingElements = (['wood','fire','earth','metal','water'] as Element[]).filter(e => ec[e] < 0.5);
  const excessElements = (['wood','fire','earth','metal','water'] as Element[]).filter(e => ec[e] > 3.5);

  // Wealth/Officer/Seal/Output counts
  let wealthStarCount = 0, officerStarCount = 0, sealStarCount = 0, outputStarCount = 0;
  a.tenGods.forEach(t => {
    if (t.god === '正财' || t.god === '偏财') wealthStarCount++;
    if (t.god === '正官' || t.god === '七杀') officerStarCount++;
    if (t.god === '正印' || t.god === '偏印') sealStarCount++;
    if (t.god === '食神' || t.god === '伤官') outputStarCount++;
  });

  // Water-fire tension
  const hasWaterFireTension = ec.water >= 2 && ec.fire >= 2;

  return {
    internalClashes, internalHarmonies, stemCombos,
    selfPunish: selfPunishActual,
    season, seasonInPhase,
    prominentGods, missingElements, excessElements,
    spouseEl: B_EL[p.day.branch], spouseBranch: p.day.branch,
    yearBranch: p.year.branch,
    hourBranch: p.hour?.branch || null,
    dmElement: de, dmYinYang: S_YY[dm], dmStem: dm,
    isStrong: a.isStrong,
    hasWaterFireTension,
    woodWeak: ec.wood < 1,
    metalWeak: ec.metal < 1,
    wealthStarCount, officerStarCount, sealStarCount, outputStarCount,
  };
}

// ─── Position labels ─────────────────────────────────────────────

const POS_ZH: Record<string, string> = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
const POS_EN: Record<string, string> = { year: 'Year Pillar', month: 'Month Pillar', day: 'Day Pillar', hour: 'Hour Pillar' };
const POS_MEANING_ZH: Record<string, string> = { year: '祖上、童年', month: '父母、青年、事业宫', day: '自我、配偶宫', hour: '子女、晚年、志向' };
const POS_MEANING_EN: Record<string, string> = { year: 'ancestry & childhood', month: 'parents, youth & career palace', day: 'self & spouse palace', hour: 'children, later life & ambitions' };

// ─── DM character database ───────────────────────────────────────

const DM_DB: Record<string, { icon: string; nameZh: string; nameEn: string; zhFull: string; enFull: string }> = {
'甲': { icon: '🌲', nameZh: '参天大树', nameEn: 'The Towering Tree',
  zhFull: '甲木如参天大树，正直挺拔，有领袖气质。你天生适合站在高处——组织架构的顶端、决策链的上游。志向远大，组织能力强。弱点是过于固执，像树根一旦扎下就难以移动。甲木人的事业多在中年后发力：大树需要时间扎根才能参天。你的成功模式是"先深后广"——专注一个领域，扎透了再横向扩展。',
  enFull: "Yang Wood — the towering tree. You lead instinctively, organizing hierarchies and seeing from high vantage points. Ambitious, structured, principled. The weakness: rigidity. Once rooted, you resist change even when the soil is exhausted. Career accelerates in your 30s-40s — trees need time to root before they tower. Your success pattern is 'depth first, breadth later.'"},
'乙': { icon: '🌿', nameZh: '花草藤蔓', nameEn: 'The Vine & Wildflower',
  zhFull: '乙木如藤蔓花草，柔韧灵活，善于变通。你不会正面冲突，但总能找到绕过障碍的路。外柔内刚——别人低估你是常态，但你总是最后站着的人。人际关系是乙木的核心资产：你的成功通过关系网而非个人硬实力实现。这不是缺点，这是你的命格特质。',
  enFull: "Yin Wood — the vine and wildflower. Flexible, diplomatic, resilient. You never confront directly but always find a way around. Soft outside, steel within — being underestimated is your default, but you're always the last one standing. Your network IS your net worth. Success comes through relationships, not brute-force competence. That's not a weakness — it's your structural advantage."},
'丙': { icon: '☀️', nameZh: '烈日太阳', nameEn: 'The Blazing Sun',
  zhFull: '丙火如太阳普照，光芒四射，热情慷慨。天生的聚光灯体质——走到哪里都是焦点。你需要舞台，没有观众的丙火会黯淡。慷慨大方是真实的，但有时过于张扬容易树敌。你的能量是外放型的——适合public-facing角色、演讲、销售、领导力展示。对人的温暖是真诚的，但要学会辨别谁只想取暖不想给热。',
  enFull: "Yang Fire — the blazing sun. Charismatic, generous, magnetic. You light up every room instinctively. You NEED a stage — without an audience, your fire dims. Your generosity is genuine but can attract takers. Best suited for public-facing roles: leadership visibility, sales, presentations, industry thought leadership. Learn to distinguish those who reciprocate warmth from those who just want to bask."},
'丁': { icon: '🕯️', nameZh: '烛火灯光', nameEn: 'The Candle Flame',
  zhFull: '丁火如烛光温暖，细腻入微，洞察力强。不像丙火那般张扬——丁火的力量在于精准，照亮别人看不到的角落。你善于分析、洞察人心，适合需要精细判断的行业：金融、咨询、心理、调查。你的安静不是软弱，是精准的力量。在一群人里你可能不是最闪耀的，但你是看得最清楚的那个。',
  enFull: "Yin Fire — the candle flame. Perceptive, warm, surgically precise. Not the blazing sun but the light that reveals what others miss. You read people effortlessly and excel in fields requiring fine judgment: finance, consulting, psychology, investigation. Your quietness isn't weakness — it's precision. In a room, you may not shine brightest, but you see clearest."},
'戊': { icon: '⛰️', nameZh: '巍峨高山', nameEn: 'The Great Mountain',
  zhFull: '戊土如巍峨高山，稳重可靠，包容万物。你是朋友圈里的"定海神针"——大家遇事找你稳。但有时过于保守、固执，错失需要快速转向的机会。你的财富来自积累而非投机——马拉松选手，不是短跑冲刺者。适合需要耐心和信任的行业：地产、基础设施、长周期投资、大型机构管理。',
  enFull: "Yang Earth — the great mountain. Stable, reliable, the anchor in every group. Everyone leans on you in crisis. But sometimes too conservative — you miss opportunities that require quick pivots. Your wealth comes from accumulation, not speculation. You're a marathon runner, not a sprinter. Best suited for patience-intensive fields: real estate, infrastructure, long-cycle investing, institutional management."},
'己': { icon: '🌾', nameZh: '肥沃田园', nameEn: 'The Fertile Farmland',
  zhFull: '己土如肥沃田园，温柔包容，滋养万物。你的成功模式是"被需要"——通过服务他人实现自身价值。务实细腻，善于照顾他人。适合平台型事业和team environments，而非单打独斗。你的温柔是真实的力量——但要防止被过度索取。学会说"不"是己土人一生的功课。',
  enFull: "Yin Earth — fertile farmland. Nurturing, practical, grounding. Your success model is 'being needed.' You create value through service and support. Platform businesses and team environments suit you better than solo ventures. Your warmth is real power — but guard against being over-extracted. Learning to say 'no' is your lifelong lesson."},
'庚': { icon: '⚔️', nameZh: '利剑锋刃', nameEn: "The Sword's Edge",
  zhFull: '庚金如利剑锋刃，果断刚毅，竞争力强。直来直去，有魄力有行动力。越有挑战越兴奋——高压高竞争的环境是你的主场。你的决断力是核心竞争力：别人还在分析的时候你已经出手了。弱点是过于直接——锋利的剑不加剑鞘容易伤人伤己。适合交易、PE、法律、军事等需要快速决策的领域。',
  enFull: "Yang Metal — the sword's edge. Decisive, competitive, direct. You take action while others are still analyzing. High-pressure, high-competition environments are your home turf. Your decisiveness is your core edge. The weakness: too blunt. A sharp sword without a sheath cuts everyone, including you. Best suited for trading, PE, law, military — fields demanding rapid judgment under pressure."},
'辛': { icon: '💎', nameZh: '珠宝美玉', nameEn: 'The Polished Jewel',
  zhFull: '辛金如珠宝玉器，精致完美，品味独到。追求极致，敏感细腻。对品质的要求极高——无论工作成果还是生活品质。你的审美和判断力是顶级的，适合需要"品鉴"能力的行业：奢侈品、艺术、精品投资、品质管理。弱点是完美主义→自我否定循环。学会"done beats perfect"是辛金人早期职业生涯的关键突破。',
  enFull: "Yin Metal — the polished jewel. Refined, perfectionist, sensitive. You instinctively appreciate quality and beauty. Exceptional taste and judgment — suited for fields requiring discernment: luxury, art, boutique investing, quality control. The trap: perfectionism spiraling into self-doubt. Learning that 'done beats perfect' is YOUR critical career breakthrough."},
'壬': { icon: '🌊', nameZh: '江海奔流', nameEn: 'The Vast Ocean',
  zhFull: '壬水如江海奔流，智慧深沉，胸怀广阔。你不走直线，你走水路——绕过障碍，渗透一切。思维是系统性的，不是线性的。你说服人不靠音量，靠逻辑和深度。适应力极强，能屈能伸。壬水的致命弱点是弥漫——精力容易分散，什么都想做但哪个都做不深。你人生最重要的功课是：选定最深的河道，全力灌注。散则为泽，聚则成海。',
  enFull: "Yang Water — the vast ocean. Wise, strategic, deep. You don't walk straight lines; you flow like water — around obstacles, through cracks, absorbing everything. Your mind works in systems, not sequences. You persuade through logic and depth, not volume. The fatal flaw: diffusion. Water spreads everywhere but nowhere deep. Your life's most critical lesson: pick the deepest channel and pour yourself in completely. Scattered, you're a puddle. Focused, you're the ocean."},
'癸': { icon: '🌧️', nameZh: '细雨甘露', nameEn: 'The Morning Dew',
  zhFull: '癸水如细雨甘露，直觉敏锐，温柔神秘。你影响他人的方式是潜移默化——不靠冲击，靠渗透。内心丰富但不轻易展示。适合幕后工作、策略制定、创意产业、研究型职位。你的直觉比你的逻辑更准——学会信任它。癸水人的事业爆发往往不是正面进攻，而是在某个关键节点上的"恰好在场"。',
  enFull: "Yin Water — morning dew. Intuitive, gentle, mysterious. You influence through osmosis, not impact. Your inner world is rich but rarely displayed. Best suited for behind-the-scenes roles: strategy, creative industries, research. Your intuition is more accurate than your logic — learn to trust it. Career breakthroughs come not from frontal assault but from 'being in the right place at the right moment.'"},
};

// ─── Core Reading Generator ──────────────────────────────────────

export function generateDayMasterReading(f: ChartFeatures, L: boolean): { icon: string; nameZh: string; nameEn: string; text: string; strengthText: string } {
  const db = DM_DB[f.dmStem];
  
  // Strength text customized to actual chart
  let sText: string;
  if (L) {
    sText = f.isStrong 
      ? `日主${f.dmStem}${EL_CN[f.dmElement]}${f.seasonInPhase ? '生于当令之月' : '虽不当令但得助力'}，身旺。自我意志坚定，有余力生财克官——你的事业格局由此奠基。${f.excessElements.length > 0 ? `但${f.excessElements.map(e => EL_CN[e]).join('、')}过旺，需泄耗以平衡。` : ''}`
      : `日主${f.dmStem}${EL_CN[f.dmElement]}${f.seasonInPhase ? '虽当令' : '不当令'}，整体偏弱。需要印星和比劫的扶助才能发挥潜力。${f.sealStarCount > 0 ? '好在命中有印星暗助。' : '命中印星不显，需主动寻找贵人和机构支持。'}`;
  } else {
    sText = f.isStrong
      ? `Day Master ${f.dmStem} (${f.dmYinYang === 'yang' ? 'Yang' : 'Yin'} ${EL_EN[f.dmElement]}) is strong — ${f.seasonInPhase ? 'born in season' : 'supported despite being out of season'}. Your willpower is robust, with surplus energy to generate wealth and command authority.${f.excessElements.length > 0 ? ` But ${f.excessElements.map(e => EL_EN[e]).join(' and ')} are excessive — needs draining for balance.` : ''}`
      : `Day Master ${f.dmStem} (${f.dmYinYang === 'yang' ? 'Yang' : 'Yin'} ${EL_EN[f.dmElement]}) is on the gentler side — ${f.seasonInPhase ? 'in season but outnumbered' : 'out of season'}. Needs Seal and Peer support to fully activate. ${f.sealStarCount > 0 ? 'Fortunately, hidden Seal stars provide backup.' : 'Seal stars are absent — actively seek institutional backing and mentors.'}`;
  }
  
  return { icon: db.icon, nameZh: db.nameZh, nameEn: db.nameEn, text: L ? db.zhFull : db.enFull, strengthText: sText };
}

export function generateChartStructure(a: BaziAnalysis, f: ChartFeatures, L: boolean): string {
  const ec = a.elementCounts;
  const els = (Object.entries(ec) as [Element, number][]).sort((a, b) => b[1] - a[1]);
  const strongest = els[0], weakest = els[els.length - 1];
  
  const parts: string[] = [];
  
  // Core balance
  if (L) {
    parts.push(`命局五行以${EL_CN[strongest[0]]}为主导（${strongest[1].toFixed(1)}），${EL_CN[weakest[0]]}最弱（${weakest[1].toFixed(1)}）。`);
  } else {
    parts.push(`Your chart is dominated by ${EL_EN[strongest[0]]} (${strongest[1].toFixed(1)}) with ${EL_EN[weakest[0]]} as the weakest element (${weakest[1].toFixed(1)}).`);
  }
  
  // Internal clashes
  if (f.internalClashes.length > 0) {
    const clash = f.internalClashes[0];
    if (L) {
      parts.push(`${POS_ZH[clash.pos1]}（${POS_MEANING_ZH[clash.pos1]}）与${POS_ZH[clash.pos2]}（${POS_MEANING_ZH[clash.pos2]}）之间存在${clash.b1}${clash.b2}冲——这是命局的核心张力。${clash.pos1 === 'month' && clash.pos2 === 'day' ? '月日相冲意味着事业宫与配偶宫有冲突，需要主动给感情和事业划清边界。' : clash.pos1 === 'year' && clash.pos2 === 'day' ? '年日相冲意味着你的家族背景与个人选择可能产生碰撞。' : '这个冲带来内在的紧张感，但也是推动你前进的引擎。'}`);
    } else {
      parts.push(`${POS_EN[clash.pos1]} (${POS_MEANING_EN[clash.pos1]}) clashes with ${POS_EN[clash.pos2]} (${POS_MEANING_EN[clash.pos2]}) via ${clash.b1}-${clash.b2} clash — this is the core tension in your chart. ${clash.pos1 === 'month' && clash.pos2 === 'day' ? 'Month-Day clash means your career palace and spouse palace are in opposition. Consciously separate relationship identity from work.' : clash.pos1 === 'year' && clash.pos2 === 'day' ? 'Year-Day clash means your ancestral background may conflict with personal choices.' : 'This clash creates internal pressure but also drives ambition.'}`);
    }
  }
  
  // Stem combos
  if (f.stemCombos.length > 0) {
    const combo = f.stemCombos[0];
    if (L) {
      parts.push(`${combo.s1}${combo.s2}合（${POS_ZH[combo.pos1]}与${POS_ZH[combo.pos2]}天干相合）——这个合代表${combo.pos1 === 'year' && combo.pos2 === 'day' ? '你的事业推进通过关系和战略联盟，而非纯靠个人硬实力' : '命中有深层的合作倾向，遇到对的人/机构会产生强烈的绑定效应'}。`);
    } else {
      parts.push(`${combo.s1}-${combo.s2} combination (${POS_EN[combo.pos1]} and ${POS_EN[combo.pos2]} stems combine) — this means ${combo.pos1 === 'year' && combo.pos2 === 'day' ? 'your career advances through relationships and strategic alliances, not just raw performance' : 'you have a deep structural tendency toward binding partnerships — the right person or institution creates a powerful lock-in effect'}.`);
    }
  }
  
  // Water-fire tension
  if (f.hasWaterFireTension) {
    if (L) parts.push(`命局中水火交战是核心动力——${EL_CN[f.dmElement]}克${EL_CN[CTRL[f.dmElement]]}，形成"以势制财"的格局。水火的碰撞产生蒸汽（动力），但也带来心脏和视力的健康隐患。`);
    else parts.push(`Water-Fire tension is the engine of your chart. ${EL_EN[f.dmElement]} controls ${EL_EN[CTRL[f.dmElement]]}, forming a 'power-generates-wealth' structure. The collision produces steam (drive), but also poses health risks to heart and vision.`);
  }
  
  // Missing elements
  if (f.missingElements.length > 0) {
    if (L) parts.push(`五行缺${f.missingElements.map(e => EL_CN[e]).join('、')}，需要后天补充——通过方位、颜色、行业、饮食来弥补。`);
    else parts.push(`Missing elements: ${f.missingElements.map(e => EL_EN[e]).join(', ')} — compensate through environment, colors, career choice, and diet.`);
  }
  
  return parts.join(' ');
}

export function generateCareerReading(a: BaziAnalysis, f: ChartFeatures, L: boolean): string {
  const parts: string[] = [];
  const ec = a.elementCounts;
  const fav = a.favorableElement;
  
  // Element-specific industry map
  const industries: Record<Element, { zh: string; en: string }> = {
    fire: { zh: '能源、科技、教育、传媒、餐饮、美容', en: 'energy, technology, education, media, food & beverage, beauty' },
    earth: { zh: '地产、基建、农业、大型机构管理、仓储物流、矿业', en: 'real estate, infrastructure, agriculture, institutional management, logistics, mining' },
    metal: { zh: '金融、银行、法律、精密制造、汽车、军工', en: 'finance, banking, law, precision manufacturing, automotive, defense' },
    water: { zh: '贸易、物流、旅游、传播、航运、咨询', en: 'trade, logistics, tourism, communications, shipping, consulting' },
    wood: { zh: '教育、出版、医药、服装、设计、环保', en: 'education, publishing, pharmaceuticals, fashion, design, sustainability' },
  };
  
  // DM-element specific career framing
  const dmFraming: Record<Element, { strongZh: string; strongEn: string; weakZh: string; weakEn: string }> = {
    water: {
      strongZh: '壬/癸水身强——你是天生的战略家。水主智，你的优势在于信息整合、系统思维和长线布局。适合需要"谋略"而非"蛮力"的行业。',
      strongEn: "Strong Water Day Master — you're a natural strategist. Water governs intelligence; your edge is information synthesis, systems thinking, and long-horizon positioning. You excel where strategy beats brute force.",
      weakZh: '水弱需金生——你需要制度性的平台和资源支持来放大自身能量。独立创业风险高，依托大机构发展是更安全的路径。',
      weakEn: "Weak Water needs Metal (institutional support) to flow. Solo ventures are risky — anchoring to established platforms and leveraging their resources is your safer path to wealth.",
    },
    fire: {
      strongZh: '丙/丁火身强——你的能量是外放型的，需要舞台。适合public-facing角色：演讲、销售、领导力展示、品牌建设。',
      strongEn: "Strong Fire Day Master — your energy is outward-facing. You need a stage. Public-facing roles suit you: presentations, sales, leadership visibility, brand building.",
      weakZh: '火弱需木助——你需要贵人引燃你的潜力。寻找能激发你的mentor和团队，比自己死磕更有效。',
      weakEn: "Weak Fire needs Wood (mentors/fuel) to ignite. Finding the right mentor or team who sparks your potential is more effective than grinding alone.",
    },
    wood: {
      strongZh: '甲/乙木身强——你的成长型人格是核心资产。适合需要"持续学习"的行业：科技、医药、教育、咨询。',
      strongEn: "Strong Wood Day Master — your growth-oriented personality is your core asset. Industries requiring continuous learning suit you: technology, pharma, education, consulting.",
      weakZh: '木弱需水养——你需要滋养型的环境才能发芽。加入一个能"浇灌"你的团队或机构，比在贫瘠的土壤里硬撑强得多。',
      weakEn: "Weak Wood needs Water (nurturing environment). Join a team or institution that 'waters' you — thriving in fertile soil beats struggling in barren ground.",
    },
    earth: {
      strongZh: '戊/己土身强——稳重是你的品牌。适合需要耐心和信任的行业：大型资产管理、地产、长周期投资、机构运营。你不是短跑冲刺者，你是马拉松选手。',
      strongEn: "Strong Earth Day Master — stability is your brand. Industries requiring patience and trust suit you: large-scale asset management, real estate, long-cycle investing, institutional operations. You're a marathon runner, not a sprinter.",
      weakZh: '土弱需火生——你需要激情和动力来推动自己。找到能点燃你的行业或搭档，比在舒适区里温水煮青蛙强。',
      weakEn: "Weak Earth needs Fire (passion/momentum). Find an industry or partner that ignites your drive — better than slowly stagnating in comfort.",
    },
    metal: {
      strongZh: '庚/辛金身强——决断力是你的核心竞争力。适合高压快节奏环境：交易、PE/VC、法律、危机管理。',
      strongEn: "Strong Metal Day Master — decisiveness is your core edge. High-pressure, fast-paced environments suit you: trading, PE/VC, law, crisis management.",
      weakZh: '金弱需土培——你需要稳固的组织基础来支撑你的锋芒。进入成熟的大平台，比自己磨刀强。',
      weakEn: "Weak Metal needs Earth (organizational foundation). Established platforms support your edge better than sharpening alone.",
    },
  };
  
  const dmF = dmFraming[f.dmElement];
  if (L) {
    parts.push(f.isStrong ? dmF.strongZh : dmF.weakZh);
  } else {
    parts.push(f.isStrong ? dmF.strongEn : dmF.weakEn);
  }
  
  // Wealth star analysis with specific numbers
  if (L) {
    if (f.wealthStarCount >= 4) parts.push(`命中财星高达${f.wealthStarCount}颗——与"钱"的缘分极深。但财多身弱则守不住，${f.isStrong ? '好在你身强足以驾驭这些财富。' : '需借助印星（贵人、资质、学历）来增强自身承载力。'}`);
    else if (f.wealthStarCount >= 2) parts.push(`命中${f.wealthStarCount}颗财星，财富来源多元——${f.isStrong ? '身强能够驾驭，财源稳定可期。' : '身弱需要借力，不宜过度冒险扩张。'}`);
    else if (f.wealthStarCount === 1) parts.push('财星单一，收入来源集中。适合专注一个赛道做深做透，而非多线并行。');
    else parts.push('命中财星不显——你的致富路径不是"直接赚钱"，而是"先建名声再变现"。专业声誉就是你最大的资产。');
  } else {
    if (f.wealthStarCount >= 4) parts.push(`${f.wealthStarCount} wealth stars in your chart — exceptional financial affinity. ${f.isStrong ? "Your strong constitution can handle this abundance." : "But wealth without strength is hard to retain — lean on institutional support and credentials to anchor yourself."}`);
    else if (f.wealthStarCount >= 2) parts.push(`${f.wealthStarCount} wealth stars — multiple income streams are structurally possible. ${f.isStrong ? "You have the constitution to manage them." : "Don't overextend — consolidate before expanding."}`);
    else if (f.wealthStarCount === 1) parts.push("Single wealth star — income concentrates in one channel. Go deep in one lane rather than spreading across many.");
    else parts.push("No prominent wealth stars — your wealth path is indirect: build reputation first, monetize later. Professional expertise IS your primary asset.");
  }
  
  // Officer stars — authority and structure
  if (f.officerStarCount >= 3) {
    if (L) parts.push(`官杀星${f.officerStarCount}颗，权威压力大。你的事业与"被管理/管理他人"紧密相关——适合有明确层级的组织，如大型基金、政府机构、跨国企业。`);
    else parts.push(`${f.officerStarCount} Officer/Authority stars — significant institutional pressure shapes your career. You thrive in hierarchical organizations: large funds, government, multinationals.`);
  } else if (f.officerStarCount >= 1) {
    if (L) parts.push('官星适中——体制和规矩对你有益，但不会压死你。你能在结构中保持自己的空间。');
    else parts.push("Moderate Officer presence — structure benefits you without suffocating. You maintain autonomy within institutions.");
  } else {
    if (L) parts.push('官星不显——你不太适合纯体制环境。偏向自由度高、规矩少的工作模式：创业、自由职业、小团队。');
    else parts.push("No prominent Officers — rigid institutions may feel stifling. You lean toward high-autonomy environments: startups, freelance, small teams.");
  }

  // Output stars
  if (f.outputStarCount >= 3) {
    if (L) parts.push(`食伤星${f.outputStarCount}颗，创造力和表达欲极强。食伤生财的格局意味着你可以把才华直接变现——写作、分析、投资研究、内容创作都是你的变现渠道。`);
    else parts.push(`${f.outputStarCount} Output stars — exceptional creative and expressive capacity. The talent-to-wealth chain is active: writing, analysis, research, and content creation are your monetization channels.`);
  } else if (f.outputStarCount === 0) {
    if (L) parts.push('食伤星不显——你的财富不来自"秀才华"，而来自直接的管理、控制和资源调配。执行力>创意力。');
    else parts.push("No Output stars — your wealth doesn't come from showcasing talent. It comes from direct management, control, and resource allocation. Execution > creativity.");
  }
  
  // Specific industry recommendation based on favorable element
  const ind = industries[fav];
  if (L) parts.push(`用神${EL_CN[fav]}，最适合的行业方向：${ind.zh}。朝${fav === 'fire' ? '南' : fav === 'water' ? '北' : fav === 'wood' ? '东' : fav === 'metal' ? '西' : '中部'}方向发展有地利之助。`);
  else parts.push(`Favorable element ${EL_EN[fav]} points to specific industries: ${ind.en}. Geographic direction: ${fav === 'fire' ? 'south' : fav === 'water' ? 'north' : fav === 'wood' ? 'east' : fav === 'metal' ? 'west' : 'central'} is auspicious.`);
  
  // Stem combo career implications (position-specific)
  if (f.stemCombos.length > 0) {
    const combo = f.stemCombos[0];
    if (combo.pos1 === 'year' && combo.pos2 === 'day') {
      if (L) parts.push(`${combo.s1}${combo.s2}合连接年柱（祖上/社会）与日柱（自我）——你的事业突破来自与社会大趋势的契合，以及家族或老一辈人脉的激活。`);
      else parts.push(`${combo.s1}-${combo.s2} combination links Year Pillar (society/ancestry) with Day Pillar (self) — your career breakthroughs come from aligning with macro trends and activating ancestral or elder networks.`);
    } else if (combo.pos1 === 'year' && combo.pos2 === 'month') {
      if (L) parts.push(`${combo.s1}${combo.s2}合连接年柱与月柱——早期人生中的某个关键关系（家族、老师、早期职场贵人）对你的事业走向产生长期影响。`);
      else parts.push(`${combo.s1}-${combo.s2} combination between Year and Month pillars — an early-life relationship (family, teacher, early-career mentor) shapes your long-term trajectory.`);
    } else {
      if (L) parts.push(`${combo.s1}${combo.s2}合（${POS_ZH[combo.pos1]}与${POS_ZH[combo.pos2]}）——事业进步依赖关系网络和战略合作，而非单打独斗。`);
      else parts.push(`${combo.s1}-${combo.s2} combination (${POS_EN[combo.pos1]} with ${POS_EN[combo.pos2]}) — career advances through partnership rather than solo effort.`);
    }
  }

  // Missing elements impact on career
  if (f.missingElements.length > 0) {
    const missing = f.missingElements;
    if (L) parts.push(`五行缺${missing.map(e => EL_CN[e]).join('、')}——${missing.includes('fire') ? '缺火则缺行动力和曝光度，需主动争取展示机会。' : ''}${missing.includes('metal') ? '缺金则缺决断力，决策时容易犹豫不决。' : ''}${missing.includes('water') ? '缺水则缺灵活性，需要培养应变能力。' : ''}${missing.includes('wood') ? '缺木则缺持续成长力，需要持续学习投资自己。' : ''}${missing.includes('earth') ? '缺土则缺稳定性，需要找到一个"锚定点"。' : ''}`);
    else parts.push(`Missing ${missing.map(e => EL_EN[e]).join(' and ')} — ${missing.includes('fire') ? 'lacking Fire means less visibility and drive; proactively seek exposure. ' : ''}${missing.includes('metal') ? 'lacking Metal means indecisiveness; train yourself to commit faster. ' : ''}${missing.includes('water') ? 'lacking Water means less adaptability; cultivate flexibility. ' : ''}${missing.includes('wood') ? 'lacking Wood means growth stalls; invest continuously in learning. ' : ''}${missing.includes('earth') ? 'lacking Earth means instability; find an anchor point. ' : ''}`);
  }
  
  return parts.join('\n\n');
}

export function generateRelationshipReading(a: BaziAnalysis, f: ChartFeatures, L: boolean): string {
  const parts: string[] = [];
  const spEl = f.spouseEl;
  
  if (L) {
    parts.push(`日支（配偶宫）为${f.spouseBranch}${EL_CN[spEl]}。`);
    
    // Spouse element description
    const spDesc: Record<Element, string> = {
      fire: '配偶热情务实，注重生活品质，有经济头脑。性格直接有行动力。',
      water: '配偶聪明深沉，善于沟通，适应力强。但两水相遇可能缺乏稳定感。',
      earth: '配偶稳重踏实，可靠厚道。是你的"定海神针"型伴侣。',
      metal: '配偶果断精致，有原则有底线。审美品味可能很高。',
      wood: '配偶温和有爱，成长型人格。可能从事教育、创意或健康相关行业。',
    };
    parts.push(spDesc[spEl]);
    
    // Hidden stems in spouse palace
    const spHidden = HIDDEN[f.spouseBranch];
    if (spHidden.length > 1) {
      const gods = spHidden.map(s => getTG(f.dmStem, s));
      parts.push(`配偶宫藏${spHidden.join('、')}（${gods.join('、')}），说明配偶性格复杂——表面一层，内里另一层。`);
    }
    
    // Internal clashes affecting spouse palace
    const spouseClash = f.internalClashes.find(c => c.pos1 === 'day' || c.pos2 === 'day');
    if (spouseClash) {
      const otherPos = spouseClash.pos1 === 'day' ? spouseClash.pos2 : spouseClash.pos1;
      parts.push(`配偶宫与${POS_ZH[otherPos]}相冲——感情容易受到${otherPos === 'month' ? '工作环境或父母' : otherPos === 'year' ? '原生家庭' : '事业规划'}的冲击。需要主动给感情留出独立空间。`);
    }
    
    parts.push(f.isStrong ? '日主偏强，感情中宜多包容让步——以柔克刚方能和谐。' : '日主偏弱，需要伴侣的支持和理解，宜找五行互补之人。');
    parts.push(`从择偶角度，${EL_CN[a.favorableElement]}型的伴侣与你最契合。`);
  } else {
    parts.push(`Spouse Palace (Day Branch): ${f.spouseBranch} (${EL_EN[spEl]}).`);
    
    const spDesc: Record<Element, string> = {
      fire: 'Partner tends to be passionate, practical, quality-oriented, with financial acumen.',
      water: 'Partner is intelligent, communicative, adaptable. But two waters together may lack grounding.',
      earth: 'Partner is stable, reliable, grounded — your anchor.',
      metal: 'Partner is decisive, refined, principled. May have high aesthetic standards.',
      wood: 'Partner is nurturing, growth-oriented. Possibly in education, creative, or health fields.',
    };
    parts.push(spDesc[spEl]);
    
    const spHidden = HIDDEN[f.spouseBranch];
    if (spHidden.length > 1) {
      const gods = spHidden.map(s => TG_EN[getTG(f.dmStem, s)]);
      parts.push(`Spouse palace contains hidden ${spHidden.join(', ')} (${gods.join(', ')}) — indicating a complex partner personality with layers beneath the surface.`);
    }
    
    const spouseClash = f.internalClashes.find(c => c.pos1 === 'day' || c.pos2 === 'day');
    if (spouseClash) {
      const otherPos = spouseClash.pos1 === 'day' ? spouseClash.pos2 : spouseClash.pos1;
      parts.push(`Spouse palace clashes with the ${POS_EN[otherPos]} — relationships can be disrupted by ${otherPos === 'month' ? 'work environment or parental expectations' : otherPos === 'year' ? 'family background' : 'career ambitions'}. Consciously carve out independent space for love.`);
    }
    
    parts.push(f.isStrong ? "As a strong Day Master, practice patience and flexibility in relationships. Softness creates harmony." : 'Seek a partner who supports and complements your energy.');
    parts.push(`Elementally, a ${EL_EN[a.favorableElement]}-type partner suits you best.`);
  }
  
  return parts.join(' ');
}

export function generateHealthReading(a: BaziAnalysis, f: ChartFeatures, L: boolean): string {
  const parts: string[] = [];
  const organs: Record<Element, { zh: string; en: string }> = {
    wood: { zh: '肝胆、筋腱', en: 'liver, gallbladder, tendons' },
    fire: { zh: '心脏、小肠、眼睛', en: 'heart, small intestine, eyes' },
    earth: { zh: '脾胃、消化系统', en: 'spleen, stomach, digestion' },
    metal: { zh: '肺、大肠、皮肤、呼吸系统', en: 'lungs, large intestine, skin, respiratory' },
    water: { zh: '肾、膀胱、生殖系统', en: 'kidneys, bladder, reproductive system' },
  };
  
  const ec = a.elementCounts;
  const weakest = (Object.entries(ec) as [Element, number][]).reduce((a, b) => a[1] < b[1] ? a : b);
  const w = organs[weakest[0]];
  
  if (L) {
    parts.push(`五行薄弱环节在${EL_CN[weakest[0]]}（${weakest[1].toFixed(1)}）——对应${w.zh}。`);
    
    if (f.hasWaterFireTension) {
      parts.push('命局水火交战，心血管和视力是长期需要关注的部位。压力大时这两个区域最先报警。');
    }
    
    if (f.selfPunish.length > 0) {
      parts.push(`${f.selfPunish.join('、')}自刑——代表同一种能量过度集中，容易在对应器官出现慢性问题。`);
    }
    
    parts.push(f.isStrong ? '身强的人容易"火旺伤阴"，需注意休息和情绪管理。' : '身弱的人容易疲劳和免疫力低下，需加强锻炼和营养补充。');
    parts.push(`保养建议：多接触${EL_CN[a.favorableElement]}属性的环境和食物。运动非常重要——生${EL_CN[PROD[a.dayMasterElement]]}耗${EL_CN[a.dayMasterElement]}，保持元素流通。`);
  } else {
    parts.push(`Elemental weak point: ${EL_EN[weakest[0]]} (${weakest[1].toFixed(1)}) — watch your ${w.en}.`);
    
    if (f.hasWaterFireTension) {
      parts.push('Water-Fire tension means cardiovascular health and vision are long-term watch areas. These are the first systems to flag under stress.');
    }
    
    if (f.selfPunish.length > 0) {
      parts.push(`Self-punishment in ${f.selfPunish.join(', ')} — excess concentration of one energy type can cause chronic issues in the corresponding organs.`);
    }
    
    parts.push(f.isStrong ? 'Strong constitutions tend toward burnout and inflammation. Prioritize rest and emotional regulation.' : 'Gentler constitutions are prone to fatigue and immune weakness. Strengthen through exercise and nutrition.');
    parts.push(`Maintain ${EL_EN[a.favorableElement]}-aligned environments. Exercise is critical — it generates ${EL_EN[PROD[a.dayMasterElement]]} and keeps elements circulating.`);
  }
  
  return parts.join(' ');
}

export function generateTrajectory(a: BaziAnalysis, f: ChartFeatures, birthYear: number, L: boolean): string {
  const dy = a.dayun;
  if (dy.length < 4) return '';
  
  if (L) {
    return `人生轨迹三段论：\n\n• 基础期（约${dy[0].startAge}–${dy[0].endAge}岁，${birthYear + dy[0].startAge}–${birthYear + dy[0].endAge}年）：走${dy[0].stemBranch.stem}${dy[0].stemBranch.branch}运（${dy[0].tenGod}）。${dy[0].tenGod === '食神' || dy[0].tenGod === '伤官' ? '食伤运——智识成长和表达能力发展期。' : dy[0].tenGod === '正印' || dy[0].tenGod === '偏印' ? '印星运——学业顺利，有贵人扶持。' : dy[0].tenGod === '正官' || dy[0].tenGod === '七杀' ? '官杀运——纪律性和抗压能力在此期间奠基。' : '基础建设期，为后续发力蓄能。'}\n\n• 黄金期（约${dy[1].startAge}–${dy[2].endAge}岁，${birthYear + dy[1].startAge}–${birthYear + dy[2].endAge}年）：${dy[1].stemBranch.stem}${dy[1].stemBranch.branch}→${dy[2].stemBranch.stem}${dy[2].stemBranch.branch}运（${dy[1].tenGod}→${dy[2].tenGod}）。这是你事业和财富的主建设期——${dy[1].tenGod === '正财' || dy[1].tenGod === '偏财' ? '财运直接进入正轨' : dy[1].tenGod === '正官' || dy[1].tenGod === '七杀' ? '权力和地位在此期间确立' : dy[1].tenGod === '食神' || dy[1].tenGod === '伤官' ? '才华变现的关键窗口' : '核心能力在此期间成形'}。\n\n• 收获期（${birthYear + dy[3].startAge}年后）：${dy[3].stemBranch.stem}${dy[3].stemBranch.branch}运开始。${dy[3].tenGod === '正财' || dy[3].tenGod === '偏财' ? '财运达到峰值' : dy[3].tenGod === '正官' || dy[3].tenGod === '七杀' ? '社会地位和影响力到达顶点' : '运势进入新的转型周期'}。但也需要主动管理健康和精力分配。`;
  }
  
  return `Your life unfolds in three acts:\n\n• Foundation (ages ~${dy[0].startAge}–${dy[0].endAge}, ${birthYear + dy[0].startAge}–${birthYear + dy[0].endAge}): ${dy[0].stemBranch.stem}${dy[0].stemBranch.branch} decade — ${TG_EN[dy[0].tenGod]}. ${dy[0].tenGod === '食神' || dy[0].tenGod === '伤官' ? 'Expression era — intellectual growth and communication skills develop.' : dy[0].tenGod === '正印' || dy[0].tenGod === '偏印' ? 'Seal era — academic success and mentor support.' : dy[0].tenGod === '正官' || dy[0].tenGod === '七杀' ? 'Authority era — discipline and resilience are forged here.' : 'Foundation-building, storing energy for later acceleration.'}\n\n• Prime (ages ~${dy[1].startAge}–${dy[2].endAge}, ${birthYear + dy[1].startAge}–${birthYear + dy[2].endAge}): ${dy[1].stemBranch.stem}${dy[1].stemBranch.branch} → ${dy[2].stemBranch.stem}${dy[2].stemBranch.branch} — ${TG_EN[dy[1].tenGod]} → ${TG_EN[dy[2].tenGod]}. Your golden window. ${dy[1].tenGod === '正财' || dy[1].tenGod === '偏财' ? 'Wealth track activates directly.' : dy[1].tenGod === '正官' || dy[1].tenGod === '七杀' ? 'Authority and institutional power crystallize.' : dy[1].tenGod === '食神' || dy[1].tenGod === '伤官' ? 'The talent-to-wealth conversion window.' : 'Core competencies solidify.'}\n\n• Harvest (${birthYear + dy[3].startAge}+): ${dy[3].stemBranch.stem}${dy[3].stemBranch.branch} decade. ${dy[3].tenGod === '正财' || dy[3].tenGod === '偏财' ? 'Wealth peaks.' : dy[3].tenGod === '正官' || dy[3].tenGod === '七杀' ? 'Status and influence reach their apex.' : 'A new cycle of transformation begins.'} Health management becomes critical.`;
}

export function generateSummary(a: BaziAnalysis, f: ChartFeatures, L: boolean): string {
  const parts: string[] = [];
  const ec = a.elementCounts;
  const els = (Object.entries(ec) as [Element, number][]).sort((a, b) => b[1] - a[1]);
  
  if (L) {
    parts.push(`你的八字画像：${f.dmStem}${EL_CN[f.dmElement]}日主，${f.isStrong ? '身强' : '身弱'}。五行格局：${els.map(([e, v]) => `${EL_CN[e]}${v.toFixed(1)}`).join('、')}。${f.wealthStarCount >= 2 ? `财星${f.wealthStarCount}颗，财缘深厚。` : ''}${f.officerStarCount >= 2 ? `官杀星${f.officerStarCount}颗，权威运强。` : ''}${f.outputStarCount >= 2 ? `食伤${f.outputStarCount}颗，表达力突出。` : ''}`);
    
    if (f.internalClashes.length > 0) {
      parts.push(`命中${f.internalClashes.map(c => `${c.b1}${c.b2}冲（${POS_ZH[c.pos1]}↔${POS_ZH[c.pos2]}）`).join('、')}——内在张力大，驱动你不断前进，但也消耗精力。学会在冲突中找到平衡点。`);
    }
    if (f.stemCombos.length > 0) {
      parts.push(`${f.stemCombos.map(c => `${c.s1}${c.s2}合（${POS_ZH[c.pos1]}↔${POS_ZH[c.pos2]}）`).join('、')}——你的关键突破通过"合"来实现。遇到对的人、对的机构会产生乘数效应。主动寻找你的"合"。`);
    }
    if (f.missingElements.length > 0) {
      parts.push(`五行缺${f.missingElements.map(e => EL_CN[e]).join('、')}——这些是你需要后天补足的短板。通过环境、饮食、穿着颜色和行业选择来弥补。`);
    }
    
    parts.push(`核心行动指南：用神${EL_CN[a.favorableElement]}，忌神${EL_CN[a.unfavorableElement]}。居住朝${a.favorableElement === 'fire' ? '南' : a.favorableElement === 'water' ? '北' : a.favorableElement === 'wood' ? '东' : a.favorableElement === 'metal' ? '西' : '中'}向，多用${a.favorableElement === 'fire' ? '红、橙、暖色' : a.favorableElement === 'water' ? '蓝、黑、深色' : a.favorableElement === 'wood' ? '绿、青色' : a.favorableElement === 'metal' ? '白、银、灰色' : '黄、棕、土色'}系。`);
    
    // DM-specific final advice
    const dmAdvice: Record<Element, string> = {
      water: '水命人最忌弥漫——散则为泽，聚则成海。选定一条河道，全力灌注。',
      fire: '火命人最忌燃尽——热情需要燃料。学会蓄能，别让自己烧空。',
      wood: '木命人最忌固执——大树经风才知弯腰。该转向的时候别硬撑。',
      metal: '金命人最忌锋利伤人——刀鞘不是软弱，是智慧。学会圆融。',
      earth: '土命人最忌迟缓——稳不等于慢。该出手时绝不犹豫。',
    };
    parts.push(dmAdvice[f.dmElement]);
  } else {
    parts.push(`Your chart profile: ${f.dmStem} ${EL_EN[f.dmElement]} Day Master, ${f.isStrong ? 'strong' : 'gentle'} constitution. Element balance: ${els.map(([e, v]) => `${EL_EN[e]} ${v.toFixed(1)}`).join(', ')}.${f.wealthStarCount >= 2 ? ` ${f.wealthStarCount} wealth stars — strong financial affinity.` : ''}${f.officerStarCount >= 2 ? ` ${f.officerStarCount} authority stars — institutional power.` : ''}${f.outputStarCount >= 2 ? ` ${f.outputStarCount} output stars — exceptional expressiveness.` : ''}`);
    
    if (f.internalClashes.length > 0) {
      parts.push(`Internal ${f.internalClashes.map(c => `${c.b1}-${c.b2} clash (${POS_EN[c.pos1]} ↔ ${POS_EN[c.pos2]})`).join('; ')} — high internal tension drives ambition but drains energy. Find balance within the conflict.`);
    }
    if (f.stemCombos.length > 0) {
      parts.push(`${f.stemCombos.map(c => `${c.s1}-${c.s2} combination (${POS_EN[c.pos1]} ↔ ${POS_EN[c.pos2]})`).join('; ')} — your breakthroughs come through binding with the right people and institutions. Seek your 'combination' actively.`);
    }
    if (f.missingElements.length > 0) {
      parts.push(`Missing ${f.missingElements.map(e => EL_EN[e]).join(' and ')} — compensate through environment, diet, wardrobe colors, and career choices.`);
    }
    
    parts.push(`Action guide: strengthen ${EL_EN[a.favorableElement]}, minimize ${EL_EN[a.unfavorableElement]}. Face ${a.favorableElement === 'fire' ? 'south' : a.favorableElement === 'water' ? 'north' : a.favorableElement === 'wood' ? 'east' : a.favorableElement === 'metal' ? 'west' : 'center'}. Use ${a.favorableElement === 'fire' ? 'red, orange, warm tones' : a.favorableElement === 'water' ? 'blue, black, deep tones' : a.favorableElement === 'wood' ? 'green, teal' : a.favorableElement === 'metal' ? 'white, silver, gray' : 'yellow, brown, earth tones'}.`);
    
    const dmAdvice: Record<Element, string> = {
      water: "Water's fatal flaw is diffusion — scattered, you're a puddle; focused, you're the ocean. Pick one channel.",
      fire: "Fire's fatal flaw is burnout — passion needs fuel. Learn to recharge before you burn empty.",
      wood: "Wood's fatal flaw is rigidity — the tree that bends in wind survives; the one that doesn't, breaks.",
      metal: "Metal's fatal flaw is cutting too sharp — a sheath isn't weakness, it's wisdom. Learn diplomacy.",
      earth: "Earth's fatal flaw is inertia — stable doesn't mean slow. When it's time to move, move decisively.",
    };
    parts.push(dmAdvice[f.dmElement]);
  }
  
  return parts.join('\n\n');
}

// ─── Year timeline with natal chart interaction ──────────────────

export function generateYearText(
  tenGod: TenGodName, 
  yearSB: StemBranch, 
  a: BaziAnalysis, 
  f: ChartFeatures, 
  birthYear: number, 
  targetYear: number, 
  L: boolean
): string {
  const age = targetYear - birthYear;
  const isStudent = age < 22;
  const s = yearSB.stem, b = yearSB.branch;
  const el = EL_CN[S_EL[s]];
  const elEn = EL_EN[S_EL[s]];
  
  const parts: string[] = [];
  
  // Base ten-god meaning
  const tgBase: Record<TenGodName, { studentZh: string; studentEn: string; careerZh: string; careerEn: string }> = {
    '比肩': { studentZh: '同龄竞争意识觉醒，找到同频伙伴。', studentEn: 'Peer awareness sharpens. You find your tribe.', careerZh: '同辈竞争加剧，适合合作但防争利。独立意识增强。', careerEn: 'Peer competition heats up. Good for partnerships but guard against rivalry.' },
    '劫财': { studentZh: '社交圈扩大，花销增加，需辨别真朋友。', studentEn: 'Social circle expands. Spending rises. Discern real friends.', careerZh: '社交活跃花销增大，谨防投资损失。', careerEn: 'Active networking, higher spending. Guard investments carefully.' },
    '食神': { studentZh: '创造力爆发，学业运佳，才华有施展空间。', studentEn: 'Creativity peaks. Academic talent shines.', careerZh: '输出能力被看到，食伤生财格局启动——才华开始产生经济回报。', careerEn: 'Your output gets recognized. The talent-to-wealth chain activates.' },
    '伤官': { studentZh: '思维活跃但叛逆，可能与权威冲突。成长的阵痛。', studentEn: 'Sharp mind but rebellious. Clashes with authority drive growth.', careerZh: '思维锋利但容易与上级冲突。适合创新突破或自由职业。', careerEn: 'Brilliant but friction with authority. Great for innovation or going independent.' },
    '偏财': { studentZh: '眼界大开，接触新世界。父辈影响增大。', studentEn: 'Horizons expand. New worlds open. Elder influence grows.', careerZh: '意外之财或新财源出现。人际活跃，异性缘佳。', careerEn: 'Unexpected financial opportunities. Social and romantic life activates.' },
    '正财': { studentZh: '踏实稳定，学业稳步上升，付出=回报。', studentEn: 'Steady progress. Effort equals reward.', careerZh: '正财稳定，事业稳步上升。适合储蓄和长期规划。', careerEn: 'Stable finances. Career advances steadily. Good for long-term planning.' },
    '七杀': { studentZh: '压力大但锻炼魄力，可能有重大考试挑战。', studentEn: 'Pressure peaks. Major exams or challenges forge resilience.', careerZh: '压力与机会并存——有人给你位置和权力，但竞争激烈。', careerEn: 'Intense pressure but someone gives you a seat at the table. Career through competition.' },
    '正官': { studentZh: '贵人运旺，可能遇到影响一生的老师。方向明确。', studentEn: 'Mentor energy arrives. A teacher or elder shapes your path.', careerZh: '贵人运旺，名声地位提升。适合体制内发展，关键人脉出现。', careerEn: 'Reputation elevates. Key mentors and connections form. Institutional advancement.' },
    '偏印': { studentZh: '适合深度学习，可能偏科。内心孤独但成长快。', studentEn: 'Deep study thrives. May feel isolated but inner growth accelerates.', careerZh: '适合技能深化和独立思考。方向可能模糊但独立判断力增强。', careerEn: 'Good for skill-building and independent thinking. Direction unclear but judgment sharpens.' },
    '正印': { studentZh: '学习运最佳，有贵人提携，可能获奖或被推荐。', studentEn: 'Peak learning luck. Elder support, awards, or recommendations arrive.', careerZh: '印星代表制度性支持——组织背书、头衔、资源。自信回升。', careerEn: 'Institutional backing arrives — titles, resources, organizational support. Confidence rebuilds.' },
  };
  
  const base = tgBase[tenGod] || tgBase['比肩'];
  if (L) {
    parts.push(`${s}${el}${tenGod}+${b}。${isStudent ? base.studentZh : base.careerZh}`);
  } else {
    parts.push(`${s}${b} (${TG_EN[tenGod]}). ${isStudent ? base.studentEn : base.careerEn}`);
  }
  
  // Check if this year's branch clashes with any natal branch
  const natalBranches: string[] = [a.pillars.year.branch, a.pillars.month.branch, a.pillars.day.branch];
  if (a.pillars.hour) natalBranches.push(a.pillars.hour.branch);
  
  for (const [c1, c2] of SIX_CLASHES) {
    if (b === c1 || b === c2) {
      const target = b === c1 ? c2 : c1;
      const hitIdx = natalBranches.indexOf(target);
      if (hitIdx >= 0) {
        const hitPos = ['year','month','day','hour'][hitIdx];
        if (L) parts.push(`流年${b}冲命中${target}（${POS_ZH[hitPos]}）——${hitPos === 'day' ? '感情或自我认知有冲击' : hitPos === 'month' ? '事业环境有变动' : hitPos === 'year' ? '家族或长辈方面有变化' : '子女或未来规划有调整'}。`);
        else parts.push(`Annual ${b} clashes natal ${target} (${POS_EN[hitPos]}) — ${hitPos === 'day' ? 'relationships or identity face disruption' : hitPos === 'month' ? 'career environment shifts' : hitPos === 'year' ? 'family dynamics change' : 'plans for the future adjust'}.`);
      }
    }
  }
  
  // Check if this year's stem combines with DM
  for (const [s1, s2] of STEM_COMBOS) {
    if ((s === s1 && f.dmStem === s2) || (s === s2 && f.dmStem === s1)) {
      if (L) parts.push(`${s}${f.dmStem}合！流年天干与日主正合——代表深度的联结和承诺，可能遇到命中注定的人或机构。`);
      else parts.push(`${s}-${f.dmStem} combination! Annual stem combines with your Day Master — deep bonding, commitment, possibly a fated encounter.`);
    }
  }
  
  return parts.join(' ');
}
