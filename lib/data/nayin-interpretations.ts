/**
 * Nayin (纳音) personality, compatibility, and Yi Jing interpretations
 * Based on 《三命通会》and Yi Jing symbolism
 */

import { Element, NayinInterpretation, BilingualText } from '../types';

const metal: Element = 'metal';
const wood: Element = 'wood';
const water: Element = 'water';
const fire: Element = 'fire';
const earth: Element = 'earth';

export const NAYIN_INTERPRETATIONS: Record<string, NayinInterpretation> = {
  '海中金': {
    nayin: '海中金',
    element: metal,
    personality: {
      zh: '海中金，金沉水底，内敛深藏。外表平静如水，内心坚韧如金。潜力巨大但不轻易展现，如珍珠藏于蚌中，需要时间和磨砺才能绽放光芒。',
      en: 'Gold in the Sea — deeply hidden potential beneath a calm surface. Like a pearl inside an oyster, your true value emerges through time and pressure. Reserved but resilient.',
    },
    compatibility: {
      zh: '与大林木、杨柳木相合，金需木之生机激发。与天上火、霹雳火相忌，火蒸水灼金。',
      en: 'Harmonizes with Great Forest Wood and Willow Wood. Clashes with Celestial Fire and Thunderbolt Fire.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——险中藏金，水中有宝。行事需耐心等待时机，忌急躁冒进。',
      en: 'Image of Kan (Water) — treasure hidden in danger. Patience reveals value; avoid rash action.',
    },
  },
  '炉中火': {
    nayin: '炉中火',
    element: fire,
    personality: {
      zh: '炉中火，炼金化物之火。热情有力但受控于炉，有方向感和目的性。善于将原材料转化为精品，是天生的加工者和改造者。',
      en: 'Fire in the Furnace — controlled, purposeful heat that transforms raw material into refined products. Passionate with direction, a natural transformer.',
    },
    compatibility: {
      zh: '与松柏木、大林木相生，木助火势。与大海水、长流水相克，水灭炉火。',
      en: 'Strengthened by Pine Wood and Forest Wood. Weakened by Great Sea Water and Long-flowing Water.',
    },
    yijingTrigram: '☲',
    yijingMapping: {
      zh: '离卦之象——文明之火，附丽于物。需要依托平台或事业才能发挥最大能量。',
      en: 'Image of Li (Fire) — civilizing flame that needs something to illuminate. Thrives when attached to a worthy cause.',
    },
  },
  '大林木': {
    nayin: '大林木',
    element: wood,
    personality: {
      zh: '大林木，参天巨木成林。气势磅礴，有集体力量。善于建立组织和团队，在群体中发挥最大价值。独木难成林，与人合作是成功之道。',
      en: 'Wood of the Great Forest — majestic trees forming a collective. Power comes from community. You build organizations and thrive in teams.',
    },
    compatibility: {
      zh: '与长流水、天河水相生，水润木茂。与剑锋金、砂中金相克，利斧伐木。',
      en: 'Nourished by Long-flowing Water and Heavenly River Water. Threatened by Sword Metal and Sand Metal.',
    },
    yijingTrigram: '☳',
    yijingMapping: {
      zh: '震卦之象——雷动万物，生机勃发。行事果断有魄力，但需防雷声大雨点小。',
      en: 'Image of Zhen (Thunder) — awakening vitality. Act decisively but ensure follow-through.',
    },
  },
  '路旁土': {
    nayin: '路旁土',
    element: earth,
    personality: {
      zh: '路旁土，大道旁的沃土。开放包容，任人行走而不损自身。务实接地气，善于为他人提供平台和基础。',
      en: 'Earth by the Roadside — open, accessible, practical. You provide the foundation others build upon, grounded and generous.',
    },
    compatibility: {
      zh: '与天上火、炉中火相生，火暖土生。与大林木、松柏木相克，木克土。',
      en: 'Warmed by Celestial Fire and Furnace Fire. Challenged by Forest Wood and Pine Wood.',
    },
    yijingTrigram: '☷',
    yijingMapping: {
      zh: '坤卦之象——大地承载，厚德载物。以柔顺包容之道成就大业。',
      en: 'Image of Kun (Earth) — the receptive ground that supports all. Achievement through nurturing acceptance.',
    },
  },
  '剑锋金': {
    nayin: '剑锋金',
    element: metal,
    personality: {
      zh: '剑锋金，百炼成钢的利器。锋利果断，行动力极强。经历千锤百炼方成大器，需要高压环境磨砺才能发挥潜力。',
      en: 'Metal of the Sword Edge — forged through intense pressure into a decisive instrument. You thrive under pressure and need challenge to sharpen your edge.',
    },
    compatibility: {
      zh: '与大林木、桑柘木相合，金劈木成器。与天上火、山头火相忌，烈火熔金。',
      en: 'Effective with Forest Wood and Mulberry Wood. Vulnerable to Celestial Fire and Mountain Fire.',
    },
    yijingTrigram: '☰',
    yijingMapping: {
      zh: '乾卦之象——天行健，君子以自强不息。以刚健之力开拓进取。',
      en: 'Image of Qian (Heaven) — ceaseless strength. Advance with unwavering determination.',
    },
  },
  '山头火': {
    nayin: '山头火',
    element: fire,
    personality: {
      zh: '山头火，高山之巅的野火。气势恢宏，声势浩大。有极高的理想和抱负，光芒照耀四方，但难以持久——需要源源不断的燃料支撑。',
      en: 'Fire atop the Mountain — visible from afar, ambitious and grand. Your vision inspires but sustaining the flame requires constant fuel.',
    },
    compatibility: {
      zh: '与松柏木、大林木相生。与大海水相克，水火不容。',
      en: 'Fed by Pine Wood and Forest Wood. Extinguished by Great Sea Water.',
    },
    yijingTrigram: '☲',
    yijingMapping: {
      zh: '离卦之象——高处之火，光明远照。虽光芒万丈但需注意可持续性。',
      en: 'Image of Li (Fire) — brilliant illumination from high ground. Magnificent but guard sustainability.',
    },
  },
  '涧下水': {
    nayin: '涧下水',
    element: water,
    personality: {
      zh: '涧下水，山涧清泉。纯净清澈，内心宁静。善于在幽静中找到力量，不喜张扬。虽小溪涓涓，终能汇成大河。',
      en: 'Water beneath the Valley — a pure mountain spring. Quiet strength in solitude. Though a gentle stream, you steadily build toward something vast.',
    },
    compatibility: {
      zh: '与砂中金、白蜡金相生，金生水源。与路旁土、壁上土相克，土阻水流。',
      en: 'Sourced by Sand Metal and White Wax Metal. Blocked by Roadside Earth and Wall Earth.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——水流不息，柔中有刚。坚持本心则能穿石。',
      en: 'Image of Kan (Water) — persevering flow, soft yet penetrating. Persistence erodes stone.',
    },
  },
  '城头土': {
    nayin: '城头土',
    element: earth,
    personality: {
      zh: '城头土，城墙之土。坚固防御，保护一方。有守护精神，善于建立安全感和秩序。适合制度化和组织化的事业。',
      en: 'Earth of the City Wall — protective, structured, securing boundaries. You build order and safety, suited for institutional roles.',
    },
    compatibility: {
      zh: '与天上火相生。与大林木相克，大木动摇城基。',
      en: 'Strengthened by Celestial Fire. Challenged by Great Forest Wood which can shake foundations.',
    },
    yijingTrigram: '☶',
    yijingMapping: {
      zh: '艮卦之象——止而不动，守正不移。以稳定换取安全。',
      en: 'Image of Gen (Mountain) — stillness and steadfastness. Stability is your greatest asset.',
    },
  },
  '白蜡金': {
    nayin: '白蜡金',
    element: metal,
    personality: {
      zh: '白蜡金，初炼之金。质地柔软有延展性，尚未成器但可塑性极强。适合在年轻时接受教育和培训，假以时日必成大器。',
      en: 'White Wax Metal — newly smelted, soft and malleable. Tremendous potential that requires education and mentorship to take final form.',
    },
    compatibility: {
      zh: '与涧下水相合。忌炉中火，烈火使其变形。',
      en: 'Harmonizes with Valley Water. Avoid Furnace Fire which warps without refining.',
    },
    yijingTrigram: '☱',
    yijingMapping: {
      zh: '兑卦之象——悦泽润物，以柔美之态待人。外柔内刚，和悦中有坚持。',
      en: 'Image of Dui (Lake) — joyful and pleasant exterior with inner firmness.',
    },
  },
  '杨柳木': {
    nayin: '杨柳木',
    element: wood,
    personality: {
      zh: '杨柳木，柳枝依依。柔韧灵活，随风摆动却不折断。适应力极强，善于在逆境中生存。外表柔美，内在坚韧。',
      en: 'Willow Wood — gracefully bending with the wind yet never breaking. Extraordinary adaptability, beauty in resilience.',
    },
    compatibility: {
      zh: '与长流水、泉中水相合，水生木。与剑锋金相克。',
      en: 'Flourishes with Long-flowing Water and Spring Water. Cut by Sword Metal.',
    },
    yijingTrigram: '☴',
    yijingMapping: {
      zh: '巽卦之象——风行天下，无孔不入。以柔顺渗透之力达成目标。',
      en: 'Image of Xun (Wind) — penetrating softly everywhere. Achieve goals through gentle persistence.',
    },
  },
  '泉中水': {
    nayin: '泉中水',
    element: water,
    personality: {
      zh: '泉中水，源头活水。知识的源泉，智慧的起点。有持续输出的能力，思维清澈通透。适合教育、研究、咨询等需要持续产出的行业。',
      en: 'Water in the Spring — the living source. Clear thinking and continuous output. Suited for education, research, and advisory roles.',
    },
    compatibility: {
      zh: '与砂中金相生，金生水。忌路旁土，土塞泉眼。',
      en: 'Enriched by Sand Metal. Blocked by Roadside Earth which plugs the spring.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——源源不竭，润泽万物。保持学习和输出的习惯。',
      en: 'Image of Kan (Water) — inexhaustible source nourishing all. Maintain habits of learning and sharing.',
    },
  },
  '屋上土': {
    nayin: '屋上土',
    element: earth,
    personality: {
      zh: '屋上土，屋顶之土。居高而稳，保护家庭。有较高的社会地位追求和家庭责任感。重视安全感和稳定的居所。',
      en: 'Earth on the Rooftop — elevated protection and shelter. You value security, family, and social status. A natural protector.',
    },
    compatibility: {
      zh: '与山头火、炉中火相生。忌大林木动摇根基。',
      en: 'Supported by Mountain Fire and Furnace Fire. Unsettled by Forest Wood.',
    },
    yijingTrigram: '☶',
    yijingMapping: {
      zh: '艮卦之象——高处安居，稳如泰山。地位稳固但需防孤高。',
      en: 'Image of Gen (Mountain) — securely positioned high. Stable but guard against isolation.',
    },
  },
  '霹雳火': {
    nayin: '霹雳火',
    element: fire,
    personality: {
      zh: '霹雳火，雷电之火。爆发力极强，瞬间照亮天地。有突然出手的能力，善于抓住关键时刻。但持久力不足，需要学会持续发力。',
      en: 'Thunderbolt Fire — explosive lightning that illuminates everything in an instant. You seize critical moments brilliantly but must learn sustained effort.',
    },
    compatibility: {
      zh: '与松柏木相合，雷劈枯木生新芽。忌大海水，水势太大灭电。',
      en: 'Sparks new life with Pine Wood (lightning splits dead wood for renewal). Overwhelmed by Great Sea Water.',
    },
    yijingTrigram: '☳',
    yijingMapping: {
      zh: '震卦之象——雷霆万钧，惊天动地。行事果断但需防虎头蛇尾。',
      en: 'Image of Zhen (Thunder) — tremendous initial force. Act decisively but follow through.',
    },
  },
  '松柏木': {
    nayin: '松柏木',
    element: wood,
    personality: {
      zh: '松柏木，四季常青之木。坚贞不屈，经冬不凋。有极强的原则性和耐力，不因环境变化而改变本质。',
      en: 'Pine & Cypress Wood — evergreen through all seasons. Unwavering principles and endurance. You maintain your essence regardless of circumstances.',
    },
    compatibility: {
      zh: '与长流水、涧下水相合，水润松柏。与剑锋金相克。',
      en: 'Nourished by flowing waters. Threatened by Sword Metal.',
    },
    yijingTrigram: '☶',
    yijingMapping: {
      zh: '艮卦之象——岿然不动，四季常青。以不变应万变的智慧。',
      en: 'Image of Gen (Mountain) — immovable and perennial. Wisdom in constancy.',
    },
  },
  '长流水': {
    nayin: '长流水',
    element: water,
    personality: {
      zh: '长流水，奔流不息的江河。生命力旺盛，永不停歇。有持续前进的动力和宽广的胸怀，能容纳百川。',
      en: 'Long-flowing Water — the ever-flowing river. Relentless vitality and breadth of vision. You move forward ceaselessly, accepting all tributaries.',
    },
    compatibility: {
      zh: '与大林木、松柏木相生。与路旁土、壁上土相克。',
      en: 'Enriches Forest Wood and Pine Wood. Blocked by Roadside Earth and Wall Earth.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——奔流到海不复回，一往无前。确定方向后不再犹豫。',
      en: 'Image of Kan (Water) — flowing to the sea without return. Once your direction is set, never hesitate.',
    },
  },
  '砂中金': {
    nayin: '砂中金',
    element: metal,
    personality: {
      zh: '砂中金，沙砾中的金粒。需要淘洗才能发现价值。大器晚成型，早年可能不被看好，但坚持到底终能证明自身。',
      en: 'Gold in the Sand — precious metal hidden among grains. Requires panning to reveal value. A late bloomer who proves worth through persistence.',
    },
    compatibility: {
      zh: '与泉中水、涧下水相合，水淘金现。与山下火相克。',
      en: 'Revealed by Spring Water and Valley Water. Scorched by Fire beneath the Mountain.',
    },
    yijingTrigram: '☷',
    yijingMapping: {
      zh: '坤卦之象——厚积薄发，沉淀后方显价值。耐心是最大的武器。',
      en: 'Image of Kun (Earth) — accumulated value revealed over time. Patience is your greatest weapon.',
    },
  },
  '山下火': {
    nayin: '山下火',
    element: fire,
    personality: {
      zh: '山下火，山脚篝火。温暖亲切，照亮周围的人。不如山头火那般张扬，但更持久实用。是团队中的温暖核心。',
      en: 'Fire beneath the Mountain — a campfire that warms those nearby. Less dramatic than mountaintop fire but more enduring and practical.',
    },
    compatibility: {
      zh: '与松柏木相生。与大海水相克，水量大灭火。',
      en: 'Fed by Pine Wood. Extinguished by Great Sea Water.',
    },
    yijingTrigram: '☲',
    yijingMapping: {
      zh: '离卦之象——依附于山的温火，稳定而持久。找到根基才能持续发光。',
      en: 'Image of Li (Fire) — steady warmth anchored to the mountain. Find your base to shine consistently.',
    },
  },
  '平地木': {
    nayin: '平地木',
    element: wood,
    personality: {
      zh: '平地木，平原上的树木。根基扎实，生长空间广阔。不受高山遮挡，能充分吸收阳光。适合在开放的环境中发展。',
      en: 'Wood of the Flatlands — trees on open plains with solid roots and unlimited growth space. You thrive in open, unrestricted environments.',
    },
    compatibility: {
      zh: '与天河水相生，雨露滋润。与砂中金相克。',
      en: 'Nourished by Heavenly River Water. Cut by Sand Metal.',
    },
    yijingTrigram: '☴',
    yijingMapping: {
      zh: '巽卦之象——风行大地，树木茁壮。在开阔环境中才能施展拳脚。',
      en: 'Image of Xun (Wind) — wind across the plain strengthens trees. Seek open environments.',
    },
  },
  '壁上土': {
    nayin: '壁上土',
    element: earth,
    personality: {
      zh: '壁上土，粉刷墙壁之土。装饰美化的功能强，善于展示和表达。重视外在形象和社会认可，有艺术天赋。',
      en: 'Earth on the Wall — decorative plaster that beautifies surfaces. You value presentation, social recognition, and have artistic sensibility.',
    },
    compatibility: {
      zh: '与天上火相生。忌大林木冲破墙壁。',
      en: 'Supported by Celestial Fire. Threatened by Forest Wood breaking through.',
    },
    yijingTrigram: '☶',
    yijingMapping: {
      zh: '艮卦之象——装饰外表，美化环境。注重形象但不可流于表面。',
      en: 'Image of Gen (Mountain) — beautifying the exterior. Value appearance but cultivate substance.',
    },
  },
  '金箔金': {
    nayin: '金箔金',
    element: metal,
    personality: {
      zh: '金箔金，薄如蝉翼的金叶。精致华美但脆弱。有极高的审美和品味，善于点缀装饰。需要依附于坚固的载体才能发挥价值。',
      en: 'Gold Leaf Metal — exquisitely thin and beautiful but fragile. Superior aesthetics requiring a strong substrate to express value.',
    },
    compatibility: {
      zh: '与涧下水相合，水映金光。忌炉中火，烈火毁金箔。',
      en: 'Reflected beautifully by Valley Water. Destroyed by Furnace Fire.',
    },
    yijingTrigram: '☱',
    yijingMapping: {
      zh: '兑卦之象——华美悦目，点缀世界。以美的力量影响他人。',
      en: 'Image of Dui (Lake) — beauty that adorns the world. Influence through aesthetic power.',
    },
  },
  '覆灯火': {
    nayin: '覆灯火',
    element: fire,
    personality: {
      zh: '覆灯火，罩中灯火。光芒被罩住但不会熄灭，内敛而持久。善于在有限空间内发挥最大光亮。专注力强，适合精细工作。',
      en: 'Lamp Fire — covered but never extinguished. Reserved yet persistent, maximizing light within constraints. Strong focus for detailed work.',
    },
    compatibility: {
      zh: '与杨柳木相合，小木助灯。忌大海水熄灯。',
      en: 'Sustained by Willow Wood. Extinguished by Great Sea Water.',
    },
    yijingTrigram: '☲',
    yijingMapping: {
      zh: '离卦之象——内守其明，不事张扬。在专注中发挥最大效力。',
      en: 'Image of Li (Fire) — guarding inner light without display. Maximum effect through focus.',
    },
  },
  '天河水': {
    nayin: '天河水',
    element: water,
    personality: {
      zh: '天河水，银河之水。格局宏大，思维超脱世俗。有极高的精神追求和理想主义。善于从高维视角看待问题。',
      en: 'Heavenly River Water — the Milky Way. Grand vision transcending the mundane. High spiritual aspirations and idealism, viewing life from elevated perspectives.',
    },
    compatibility: {
      zh: '与大林木、平地木相生，天降甘霖。忌城头土阻隔。',
      en: 'Bestows blessings on Forest Wood and Flatland Wood. Blocked by City Wall Earth.',
    },
    yijingTrigram: '☰',
    yijingMapping: {
      zh: '乾卦之象——天行健，水润万物。以高远格局行事，不拘小节。',
      en: 'Image of Qian (Heaven) — celestial waters nourishing all. Act with grand vision, beyond petty concerns.',
    },
  },
  '大驿土': {
    nayin: '大驿土',
    element: earth,
    personality: {
      zh: '大驿土，驿站之土。四通八达，来者不拒。有极强的社交能力和信息整合能力。是天生的枢纽和中转站。',
      en: 'Earth of the Great Post Road — the crossroads hub. Exceptional networking and information synthesis. A natural connector and facilitator.',
    },
    compatibility: {
      zh: '与天上火相生。忌大林木克土。',
      en: 'Strengthened by Celestial Fire. Weakened by Forest Wood.',
    },
    yijingTrigram: '☷',
    yijingMapping: {
      zh: '坤卦之象——大地承载四方来客，开放包容。以平台思维建事业。',
      en: 'Image of Kun (Earth) — hosting travelers from all directions. Build your career as a platform.',
    },
  },
  '钗钏金': {
    nayin: '钗钏金',
    element: metal,
    personality: {
      zh: '钗钏金，首饰发钗之金。精巧美观，装饰性强。有极好的人缘和审美品味，善于在社交场合绽放。但过于精致可能缺乏刚性。',
      en: 'Hairpin Metal — ornamental gold, elegant and social. Excellent taste and interpersonal charm. Beautiful but may lack structural toughness.',
    },
    compatibility: {
      zh: '与涧下水、泉中水相合，水映金辉。忌炉中火重炼。',
      en: 'Shines with Valley Water and Spring Water. Avoid Furnace Fire which melts ornaments.',
    },
    yijingTrigram: '☱',
    yijingMapping: {
      zh: '兑卦之象——以悦服人，社交润滑。人脉是最大的资产。',
      en: 'Image of Dui (Lake) — charm and social grace. Your network is your greatest asset.',
    },
  },
  '桑柘木': {
    nayin: '桑柘木',
    element: wood,
    personality: {
      zh: '桑柘木，桑树柘木。实用性极强的树种——桑叶养蚕，柘木做弓。有极强的功能导向和实用主义精神。',
      en: 'Mulberry Wood — highly functional trees (silkworm leaves, bow-making wood). Supremely practical and purpose-driven.',
    },
    compatibility: {
      zh: '与大溪水、长流水相合。忌剑锋金砍伐。',
      en: 'Nourished by Great Stream Water and Long-flowing Water. Cut by Sword Metal.',
    },
    yijingTrigram: '☴',
    yijingMapping: {
      zh: '巽卦之象——务实而柔顺，以有用之身服务于人。实用是最好的浪漫。',
      en: 'Image of Xun (Wind) — practical service to others. Utility is the highest romance.',
    },
  },
  '大溪水': {
    nayin: '大溪水',
    element: water,
    personality: {
      zh: '大溪水，山间溪流。活泼灵动，自由奔放。有极强的创造力和表达欲，不喜被束缚。在自由环境中才能发挥最大潜力。',
      en: 'Water of the Great Stream — lively mountain creek, free-spirited and creative. Needs freedom to express full potential.',
    },
    compatibility: {
      zh: '与桑柘木、杨柳木相生。忌壁上土、城头土阻流。',
      en: 'Feeds Mulberry Wood and Willow Wood. Dammed by Wall Earth and City Wall Earth.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——流水不争，以柔克刚。在自由中找到力量。',
      en: 'Image of Kan (Water) — the stream that does not compete yet overcomes all. Find power in freedom.',
    },
  },
  '砂中土': {
    nayin: '砂中土',
    element: earth,
    personality: {
      zh: '砂中土，砂砾混合之土。坚实耐用，是建筑的基础材料。善于在混杂环境中筛选精华，从细节处发现真相。',
      en: 'Earth in the Sand — mixed aggregate, the foundation of construction. Skilled at sifting essentials from chaos, finding truth in details.',
    },
    compatibility: {
      zh: '与山下火相生。忌大林木克土。',
      en: 'Strengthened by Mountain Fire. Weakened by Forest Wood.',
    },
    yijingTrigram: '☷',
    yijingMapping: {
      zh: '坤卦之象——沙中取金，去伪存真。以耐心和细致赢得机会。',
      en: 'Image of Kun (Earth) — panning for gold in sand. Win through patience and meticulous attention.',
    },
  },
  '天上火': {
    nayin: '天上火',
    element: fire,
    personality: {
      zh: '天上火，日月星辰之火。光芒普照天下，格局宏大。有极高的影响力和号召力，是天生的公众人物。',
      en: 'Celestial Fire — the light of sun, moon, and stars. Universal illumination. Born for public influence with grand-scale impact.',
    },
    compatibility: {
      zh: '与大林木、松柏木相生。与大海水相克。',
      en: 'Fed by Forest Wood and Pine Wood. Challenged by Great Sea Water.',
    },
    yijingTrigram: '☲',
    yijingMapping: {
      zh: '离卦之象——光明遍照，引领方向。以光明正大之心行事。',
      en: 'Image of Li (Fire) — universal illumination guiding direction. Act with transparency and righteousness.',
    },
  },
  '石榴木': {
    nayin: '石榴木',
    element: wood,
    personality: {
      zh: '石榴木，果实累累之木。外表坚硬但内含丰富的种子。有极强的生产力和繁殖力，善于创造价值并传播影响。',
      en: 'Pomegranate Wood — hard exterior packed with abundant seeds. Exceptional productivity and ability to multiply value and influence.',
    },
    compatibility: {
      zh: '与大海水相合，大水灌溉。忌剑锋金砍伐。',
      en: 'Irrigated by Great Sea Water. Cut down by Sword Metal.',
    },
    yijingTrigram: '☳',
    yijingMapping: {
      zh: '震卦之象——硕果累累，生生不息。以成果说话，用实力证明。',
      en: 'Image of Zhen (Thunder) — abundant fruit, endless renewal. Let results speak for themselves.',
    },
  },
  '大海水': {
    nayin: '大海水',
    element: water,
    personality: {
      zh: '大海水，浩瀚大海。胸怀宽广如大海，能容纳百川。有极强的包容力和战略眼光，不拘小节但大局观超群。',
      en: 'Water of the Great Sea — vast and all-encompassing. Tremendous capacity for acceptance and strategic vision. Grand perspective beyond petty details.',
    },
    compatibility: {
      zh: '与石榴木、大林木相合。忌路旁土、城头土。',
      en: 'Nourishes Pomegranate Wood and Forest Wood. Impeded by Roadside Earth and City Wall Earth.',
    },
    yijingTrigram: '☵',
    yijingMapping: {
      zh: '坎卦之象——海纳百川，有容乃大。以包容成就伟业。',
      en: 'Image of Kan (Water) — all rivers flow to the sea. Greatness through boundless acceptance.',
    },
  },
};
