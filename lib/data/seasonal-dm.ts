import { HeavenlyStem, Season, BilingualText } from '../types';

/**
 * Seasonal Day Master Readings based on 《穷通宝鉴》(Qiong Tong Bao Jian)
 *
 * Maps each of the 10 Heavenly Stems (Day Masters) to each of 5 seasons,
 * providing bilingual descriptions and favorable advice rooted in classical
 * BaZi principles.
 *
 * Season mapping:
 *   spring    = 寅卯月 (Feb–Apr)
 *   summer    = 巳午月 (May–Jul)
 *   autumn    = 申酉月 (Aug–Oct)
 *   winter    = 亥子月 (Nov–Jan)
 *   lateSummer = 辰未戌丑月 (earth months / seasonal transitions)
 */
export const SEASONAL_DM_DATA: Record<
  HeavenlyStem,
  Record<Season, { description: BilingualText; favorableAdvice: BilingualText }>
> = {
  // ══════════════════════════════════════════════════════════════════
  // 甲木 — Yang Wood (towering tree, tall timber)
  // ══════════════════════════════════════════════════════════════════
  '甲': {
    spring: {
      description: {
        zh: '甲木生于春季，正值木旺之时，犹如参天大树逢春发芽，枝繁叶茂，生机勃勃。然木太旺则需庚金修剪枝叶，方能成栋梁之材。若无金来雕琢，则枝叶散漫，难成大器。',
        en: 'Jia Wood born in spring is at its peak strength, like a towering tree bursting with new growth and vitality. However, when Wood is overly abundant, Geng Metal is needed to prune and shape it into useful timber. Without Metal to refine it, the growth becomes unruly and the native may struggle to focus their talents.',
      },
      favorableAdvice: {
        zh: '宜见庚金修剪成材，兼取丁火配合；忌木多无金，反成散漫之局。',
        en: 'Geng Metal is the key beneficial element for pruning and discipline. Ding Fire as a secondary support is also favorable. Avoid charts with excessive Wood and no Metal.',
      },
    },
    summer: {
      description: {
        zh: '甲木生于夏季，火势炎炎，木遭火焚，有干枯之象。犹如烈日之下大树缺水，叶焦根弱。急需壬水或癸水滋润根基，方能保持生机。若有水润泽，则木火通明，才华出众。',
        en: 'Jia Wood born in summer faces scorching Fire that threatens to burn the timber dry. Like a great tree under intense sun without rain, the roots weaken and leaves wither. Water — especially Ren Water — is urgently needed to nourish the roots and sustain vitality. With proper Water support, the Wood-Fire brilliance produces outstanding talent.',
      },
      favorableAdvice: {
        zh: '急需壬水滋润，癸水亦可辅助；若火太旺无水，主枯焦无成。',
        en: 'Ren Water is critically needed for nourishment. Gui Water can serve as auxiliary support. A chart with raging Fire but no Water indicates burnout and difficulties.',
      },
    },
    autumn: {
      description: {
        zh: '甲木生于秋季，金气当令，金克木，如利斧伐木，甲木受克严重。此时需丁火制金护木，方可化险为夷。若有丁火炼金，则斧化为器，反成贵格。',
        en: 'Jia Wood born in autumn confronts Metal at its seasonal peak. Metal chops Wood like an axe felling a tree — the Day Master is under severe pressure. Ding Fire is essential to restrain Metal and protect the Wood. When Fire successfully tempers the Metal, the threatening axe is transformed into a refined instrument, creating a distinguished chart.',
      },
      favorableAdvice: {
        zh: '首取丁火制金，兼以壬水滋木根基；若金重无火，则为伐尽之木，主艰辛困苦。',
        en: 'Ding Fire to control Metal is the primary need. Ren Water as secondary support nourishes the roots. Heavy Metal without Fire suggests a tree being felled — hardship and struggle.',
      },
    },
    winter: {
      description: {
        zh: '甲木生于冬季，水旺木寒，犹如严冬之树，表面萧索但根深蒂固。寒木须有丙火温暖，方能回春发芽。若水太旺无火，则成漂木，根基不稳。',
        en: 'Jia Wood born in winter stands amid abundant Water and freezing cold, like a tree in deep winter — outwardly barren but with deep roots. The chilled Wood desperately needs Bing Fire for warmth to trigger the return of spring growth. If Water is excessive without Fire, the tree becomes driftwood — uprooted and unstable.',
      },
      favorableAdvice: {
        zh: '首取丙火解冻暖身，庚金劈甲引丁亦佳；忌水多无火，漂泊不定。',
        en: 'Bing Fire for warmth is the foremost need. Geng Metal splitting Jia to kindle Ding Fire is also excellent. Excessive Water without Fire leads to a drifting, unsettled life.',
      },
    },
    lateSummer: {
      description: {
        zh: '甲木生于四季土月，土气厚重，木扎根于厚土之中。辰未戌丑月土旺，甲木需奋力扎根，宜见壬水润土养木，兼用庚金松土透气，方能茁壮成长。',
        en: 'Jia Wood born in the transitional earth months encounters thick, heavy Earth. In these Chen, Wei, Xu, and Chou months, the soil is dense and the tree must struggle to establish its roots. Ren Water to moisten the soil and nourish the Wood, combined with Geng Metal to loosen the earth and allow air circulation, enables healthy growth.',
      },
      favorableAdvice: {
        zh: '宜取壬水润土生木，庚金疏土通根；若土重无水，则木困土中，难以伸展。',
        en: 'Ren Water to moisten the earth and Geng Metal to break up the soil are both favorable. Heavy Earth without Water traps the Wood, preventing growth and expression.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 乙木 — Yin Wood (flower, vine, grass)
  // ══════════════════════════════════════════════════════════════════
  '乙': {
    spring: {
      description: {
        zh: '乙木生于春季，花草逢春，欣欣向荣，犹如百花绽放于春风之中。乙木柔韧而有生气，得时令之助自然繁盛。宜见丙火温暖阳光照耀，癸水春雨润泽，则花木更加繁茂。',
        en: 'Yi Wood born in spring is like flowers and grasses greeting the season — blooming and flourishing in the spring breeze. This tender, flexible Wood thrives naturally with seasonal support. Bing Fire as warm sunshine and Gui Water as spring rain together make the blossoms even more luxuriant.',
      },
      favorableAdvice: {
        zh: '宜取丙火阳光、癸水春雨相配；春木虽旺，乙木柔嫩，不宜见庚金强克。',
        en: 'Bing Fire for sunshine and Gui Water for gentle rain are the ideal combination. Though spring Wood is strong, delicate Yi Wood should avoid harsh Geng Metal attacks.',
      },
    },
    summer: {
      description: {
        zh: '乙木生于夏季，烈日炎炎，花草焦枯。柔嫩之乙木最怕酷暑烤灼，急需癸水如甘霖降下，滋润根苗。若无水来救，则花萎草枯，难以维持生机。',
        en: 'Yi Wood born in summer withers under the blazing sun — delicate flowers and grasses scorch in the heat. The tender Yi Wood most fears the summer blaze and urgently needs Gui Water as life-giving rain to nourish its roots. Without Water relief, the flowers wilt and the grasses dry up, unable to sustain vitality.',
      },
      favorableAdvice: {
        zh: '急取癸水滋润，壬水亦可解渴；忌火土太旺而无水，主干涸枯萎。',
        en: 'Gui Water for gentle nourishment is urgently needed; Ren Water can also provide relief. Excessive Fire and Earth without Water indicates drought and decline.',
      },
    },
    autumn: {
      description: {
        zh: '乙木生于秋季，金风萧瑟，草木凋零。乙木柔弱遇金秋更显脆弱，然乙木有合庚之妙，可化敌为友。若不见庚合，则需丙火暖局驱寒，丁火制金护木。',
        en: 'Yi Wood born in autumn faces the cutting Metal winds as grasses wither and leaves fall. The delicate Yi Wood appears especially vulnerable in this season. However, Yi has the special ability to combine with Geng Metal, transforming the adversary into an ally. If this combination is absent, Bing Fire for warmth or Ding Fire to control Metal is needed.',
      },
      favorableAdvice: {
        zh: '若有庚金合化，则化险为夷为上格；无庚则取丙丁火制金暖身。',
        en: 'If Geng Metal is present for the Yi-Geng combination, this transforms danger into fortune — a superior configuration. Without Geng, use Bing or Ding Fire to restrain Metal and provide warmth.',
      },
    },
    winter: {
      description: {
        zh: '乙木生于冬季，草木凋零，万物肃杀。乙木如冬日枯草，全赖丙火太阳照耀方能复苏。冬水虽旺，对乙木反为寒湿所困。必须有火温暖，才有回春之望。',
        en: 'Yi Wood born in winter is like withered grass amid the dormant landscape — all growth has ceased. The fragile Yi Wood depends entirely on Bing Fire as warming sunlight to revive it. Though winter Water is abundant, it only creates cold dampness that further distresses the tender Wood. Fire for warmth is absolutely essential for any hope of renewal.',
      },
      favorableAdvice: {
        zh: '首取丙火解冻，甲木并透可助引火；忌水多无火，湿寒困木，一生蹉跎。',
        en: 'Bing Fire for warmth is the primary need. Jia Wood appearing alongside can help kindle Fire. Excessive Water without Fire creates cold, damp conditions that trap the Wood — a life of frustration.',
      },
    },
    lateSummer: {
      description: {
        zh: '乙木生于四季土月，土气杂重，花草扎根不易。乙木如花栽于硬土之中，需癸水松润土壤，丙火提供阳光温暖，方能绽放美丽之花。',
        en: 'Yi Wood born in the earth-dominant transitional months faces dense, compacted soil where flowers struggle to take root. Like a blossom planted in hard ground, it needs Gui Water to soften and moisten the earth, and Bing Fire to provide warm sunshine, so the flower can bloom beautifully.',
      },
      favorableAdvice: {
        zh: '宜取癸水润土、丙火照暖并用；土重木折，须有水火协调方佳。',
        en: 'Gui Water to moisten the soil and Bing Fire for sunshine should be used together. Heavy Earth can snap the delicate Wood — Water and Fire in harmony are needed.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 丙火 — Yang Fire (sun, blazing fire)
  // ══════════════════════════════════════════════════════════════════
  '丙': {
    spring: {
      description: {
        zh: '丙火生于春季，木旺生火，如春日暖阳冉冉升起，光芒万丈。木能生火，火势自然旺盛。宜取壬水映照，壬水如湖海映日，相辉相映，格局最为壮丽。',
        en: 'Bing Fire born in spring receives abundant fuel from the thriving Wood, like the warm spring sun rising with radiant brilliance. Wood naturally feeds Fire, making the flame strong and steady. Ren Water for reflection is ideal — like a great lake mirroring the sun, creating a magnificent and harmonious configuration.',
      },
      favorableAdvice: {
        zh: '首取壬水辉映成格，有壬水则如日照江湖，光辉灿烂；忌木多火炎无水，过刚则折。',
        en: 'Ren Water as a reflecting counterbalance creates an outstanding chart — the sun shining upon vast waters. Excessive Wood fueling Fire without Water leads to a blaze too intense to sustain.',
      },
    },
    summer: {
      description: {
        zh: '丙火生于夏季，烈日当空，火势太过炽烈。如正午骄阳，热力逼人，万物皆受其灼。此时必须壬水制衡，方能使烈日不至焦灼大地。若无水制，则过刚易折，性烈难驯。',
        en: 'Bing Fire born in summer blazes at its most extreme — like the scorching midday sun whose intensity overwhelms everything beneath it. Ren Water is absolutely necessary to balance and moderate this overwhelming heat. Without Water restraint, the excessive force becomes self-destructive, producing a temperament that is fierce and difficult to manage.',
      },
      favorableAdvice: {
        zh: '急取壬水制火，庚辛金生水亦佳；忌无水纯火，主性情暴烈、一生波折。',
        en: 'Ren Water to temper the Fire is urgently needed. Geng or Xin Metal generating Water is also beneficial. A chart of pure Fire without Water indicates a volatile temperament and a turbulent life.',
      },
    },
    autumn: {
      description: {
        zh: '丙火生于秋季，如夕阳西照，光辉渐收。金旺泄火之气，丙火渐弱。此时宜有甲木生火续力，壬水辉映提格。秋日虽非盛时，若配置得当仍有落日余晖之美。',
        en: 'Bing Fire born in autumn is like the setting sun — its brilliance gradually dimming as Metal draws away its energy. The Fire weakens as Metal dominates. Jia Wood is needed to feed the flame and sustain its power, while Ren Water provides the reflective contrast that elevates the chart. Though past its peak, a well-configured autumn sun still radiates the beauty of a glorious sunset.',
      },
      favorableAdvice: {
        zh: '宜取甲木生火续力，壬水辉映提格；忌金多无木，火气耗尽，暗淡无光。',
        en: 'Jia Wood to fuel the Fire and Ren Water for reflective balance are both needed. Heavy Metal without Wood exhausts the Fire completely, leaving it dim and powerless.',
      },
    },
    winter: {
      description: {
        zh: '丙火生于冬季，水旺火衰，犹如冬日暖阳，虽光芒微弱却弥足珍贵。寒夜之中一轮太阳，能驱散阴寒。急需甲木生火助焰，方能使冬日太阳温暖大地。',
        en: 'Bing Fire born in winter is a weak sun amid dominant Water — though its light is faint, it is immensely precious, like winter sunshine that dispels the bitter cold. Jia Wood is urgently needed to fuel the Fire and strengthen its flame, enabling the winter sun to bring warmth to the frozen earth.',
      },
      favorableAdvice: {
        zh: '首取甲木生火，戊土制水护火亦可；忌水多无木，日沉大海，终无光明。',
        en: 'Jia Wood to generate Fire is the foremost need. Wu Earth to control Water and protect Fire also helps. Excessive Water without Wood means the sun sinks into the ocean — a life without brightness.',
      },
    },
    lateSummer: {
      description: {
        zh: '丙火生于四季土月，火生土而泄气，太阳被厚云遮蔽之象。土重晦火，丙火光芒受损。宜甲木疏土生火，壬水洗涤尘埃，使太阳重新放射光芒。',
        en: 'Bing Fire born in the transitional earth months loses energy as Fire generates Earth — like the sun obscured by thick clouds. Heavy Earth dims the Fire and diminishes its radiance. Jia Wood to break up the Earth and feed the Fire, along with Ren Water to clear away the haze, helps the sun shine brilliantly once again.',
      },
      favorableAdvice: {
        zh: '宜取甲木克土生火，壬水辅助；忌土重无木，光芒全失，碌碌无为。',
        en: 'Jia Wood to overcome Earth and fuel Fire is essential, with Ren Water as support. Heavy Earth without Wood causes total loss of brilliance — a life of mediocrity.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 丁火 — Yin Fire (candle flame, lamplight, starlight)
  // ══════════════════════════════════════════════════════════════════
  '丁': {
    spring: {
      description: {
        zh: '丁火生于春季，灯烛遇春风，木旺自能生火。然丁火为烛光，非猛烈之火，须有甲木劈开方能引出真火。春风虽暖，灯烛仍需甲木为薪方能持久明亮。',
        en: 'Ding Fire born in spring is a candle flame meeting the spring breeze — abundant Wood naturally fuels the Fire. Yet Ding is a gentle lamplight, not a raging blaze, and specifically needs Jia Wood split open as kindling to draw out its true brightness. Though spring is warm, the candle still requires Jia Wood as fuel to burn steadily and brightly.',
      },
      favorableAdvice: {
        zh: '首取甲木引丁，庚金劈甲为用最妙；忌乙木争合无甲，烛光暗淡。',
        en: 'Jia Wood to kindle Ding Fire is primary. Geng Metal splitting Jia Wood to create kindling is the most elegant configuration. Yi Wood competing without Jia leads to a dim flame.',
      },
    },
    summer: {
      description: {
        zh: '丁火生于夏季，火势得令而旺。烛火在夏日虽得势，却有被烈阳掩盖之嫌。丁火须取壬水相配，壬丁相合化木，反能增辉。夏季丁火以壬水为贵。',
        en: 'Ding Fire born in summer gains seasonal strength as Fire is in command. However, a candle flame in summer risks being outshone by the blazing sun. Ding Fire benefits most from Ren Water as its partner — the Ren-Ding combination can transform into Wood, actually enhancing the Fire. In summer, Ren Water is the most valued element for Ding Fire.',
      },
      favorableAdvice: {
        zh: '首取壬水调候，甲木辅助；忌丙火夺丁之光，夏日灯烛需壬水映衬方显珍贵。',
        en: 'Ren Water for balance is the primary need, with Jia Wood as support. Avoid Bing Fire overpowering Ding. A summer candle needs Ren Water contrast to reveal its unique preciousness.',
      },
    },
    autumn: {
      description: {
        zh: '丁火生于秋季，金旺泄火气，烛光摇曳于秋风之中，随时有熄灭之险。此时急需甲木续燃添薪，方能维持火苗不灭。若无木助火，金风吹烛，黯然失色。',
        en: 'Ding Fire born in autumn faces dominant Metal that drains its energy — the candle flame flickers in the autumn wind, in constant danger of being extinguished. Jia Wood is urgently needed to add fuel and keep the flame alive. Without Wood to sustain the Fire, the Metal wind snuffs out the candle, leaving darkness.',
      },
      favorableAdvice: {
        zh: '首取甲木生火续力，庚金劈甲引丁；忌金多无木，烛灭灯残，晦暗不明。',
        en: 'Jia Wood to sustain the flame is essential. Geng Metal to split Jia and kindle Ding is the classic technique. Heavy Metal without Wood extinguishes the candle completely.',
      },
    },
    winter: {
      description: {
        zh: '丁火生于冬季，水旺火微，如寒夜孤灯，虽光芒微弱却能照亮黑暗。冬夜之烛火最需甲木为薪，方能在风雪中持续燃烧。寒冬丁火，有甲则明，无甲则灭。',
        en: 'Ding Fire born in winter is a solitary lamp in the cold night — though its light is faint, it can illuminate the darkness. The winter candle most needs Jia Wood as fuel to keep burning through the wind and snow. For Ding Fire in deep winter, the presence of Jia Wood means light; its absence means extinction.',
      },
      favorableAdvice: {
        zh: '首取甲木引火续明，庚金劈甲更妙；忌水势太旺无木，灯灭烛残，一片漆黑。',
        en: 'Jia Wood to kindle and sustain the flame is paramount. Geng Metal splitting Jia is even better. Overwhelming Water without Wood snuffs out the lamp entirely — utter darkness.',
      },
    },
    lateSummer: {
      description: {
        zh: '丁火生于四季土月，火生土而泄气，灯烛之光被灰土掩埋。土多晦火，丁火需甲木疏土续火，方能重新绽放光明。辰戌丑未月丁火以甲木为第一要务。',
        en: 'Ding Fire born in the transitional earth months loses its energy as Fire generates Earth — the candle light is buried under ashes and dust. Excessive Earth smothers the Fire. Jia Wood is needed to break up the Earth and replenish the flame, restoring its brightness. In Chen, Xu, Chou, and Wei months, Jia Wood is the top priority for Ding Fire.',
      },
      favorableAdvice: {
        zh: '首取甲木克土生火，庚金辅助劈甲；忌土重埋火，暗淡无光，才华难展。',
        en: 'Jia Wood to overcome Earth and fuel Fire is essential, with Geng Metal to assist by splitting Jia. Heavy Earth burying the Fire causes dimness — talent remains hidden and unexpressed.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 戊土 — Yang Earth (mountain, great wall, massive rock)
  // ══════════════════════════════════════════════════════════════════
  '戊': {
    spring: {
      description: {
        zh: '戊土生于春季，木旺克土，山体遭树根侵蚀，土气虚弱。春季木盛土薄，戊土急需丙火来生扶，火能生土固本。若有丙火温暖照耀，则大山得阳光而稳固雄伟。',
        en: 'Wu Earth born in spring faces dominant Wood that erodes the mountain — tree roots penetrate the rock and soil, weakening the Earth. In spring, Wood is vigorous and Earth is thin. Bing Fire is urgently needed to support the Earth, as Fire generates Earth and strengthens the foundation. With Bing Fire shining warmly, the great mountain stands firm and majestic.',
      },
      favorableAdvice: {
        zh: '首取丙火生土固本，甲木虽克土但可取贵；忌木多无火，山崩土裂。',
        en: 'Bing Fire to generate and strengthen Earth is the primary need. Though Jia Wood controls Earth, its presence can create a noble configuration. Excessive Wood without Fire causes the mountain to crumble.',
      },
    },
    summer: {
      description: {
        zh: '戊土生于夏季，火旺土燥，如大地龟裂，焦土遍野。火太旺虽生土，但过于干燥无法孕育万物。急需壬水甘霖滋润，使焦土恢复生机。水火既济，则大地肥沃丰饶。',
        en: 'Wu Earth born in summer encounters blazing Fire that bakes the Earth dry — like parched land cracking under scorching heat. Though Fire generates Earth, excessive heat leaves the soil barren and unable to nurture life. Ren Water as nourishing rain is urgently needed to restore vitality. When Water and Fire are balanced, the land becomes fertile and abundant.',
      },
      favorableAdvice: {
        zh: '急取壬水润土调候，甲木疏土亦佳；忌火土燥烈无水，干裂贫瘠，百事难成。',
        en: 'Ren Water to moisten and moderate the Earth is urgently needed. Jia Wood to loosen the soil is also beneficial. Scorching Fire and dry Earth without Water yields barren conditions — nothing prospers.',
      },
    },
    autumn: {
      description: {
        zh: '戊土生于秋季，金旺泄土之气，山体矿石外露，土气流失。金多盗泄戊土元气，须有丙火生土补元，同时制金护土。若火土配合得当，则如金山银矿，蕴含丰富宝藏。',
        en: 'Wu Earth born in autumn loses energy as dominant Metal drains the Earth — minerals are exposed as the mountain erodes. Excessive Metal depletes Wu Earth of its vitality. Bing Fire is needed to replenish the Earth and simultaneously restrain the Metal. When Fire and Earth are properly balanced, the mountain becomes like a rich mine full of treasures.',
      },
      favorableAdvice: {
        zh: '首取丙火生土制金，壬水辅助调候；忌金多无火，土气耗尽，空山无宝。',
        en: 'Bing Fire to generate Earth and control Metal is the primary need, with Ren Water for seasonal balance. Heavy Metal without Fire exhausts the Earth — an empty mountain devoid of treasure.',
      },
    },
    winter: {
      description: {
        zh: '戊土生于冬季，水旺土寒，犹如冰封之山，冻结僵硬。寒土无法生养万物，急需丙火太阳照耀，融冰化雪，使大地回春。冬季戊土，无丙火则如死土，毫无生机。',
        en: 'Wu Earth born in winter faces abundant Water and bitter cold — like a frozen mountain, rigid and lifeless. The frozen earth cannot nurture anything. Bing Fire as the warming sun is desperately needed to melt the ice, thaw the snow, and bring the land back to life. Wu Earth in winter without Bing Fire is dead soil, utterly devoid of vitality.',
      },
      favorableAdvice: {
        zh: '首取丙火解冻回春，甲木引火辅助；忌水多土寒无火，冻土难耕，困顿一生。',
        en: 'Bing Fire to thaw the frozen Earth is absolutely essential, with Jia Wood to help kindle Fire. Excessive Water and cold without Fire leaves the soil permanently frozen — a life of hardship.',
      },
    },
    lateSummer: {
      description: {
        zh: '戊土生于四季土月，土气当令，比肩叠叠，土势过于厚重。如群山堆积，虽然稳固却缺乏变化与生机。宜取甲木疏松厚土，壬水滋润灌溉，使厚土化为沃野良田。',
        en: 'Wu Earth born in the transitional earth months is in its own season — Earth upon Earth creates an overwhelmingly massive and heavy formation. Like mountains piled upon mountains, it is stable but lacks dynamism and vitality. Jia Wood is needed to break through and loosen the dense soil, and Ren Water to irrigate, transforming the thick earth into fertile farmland.',
      },
      favorableAdvice: {
        zh: '首取甲木疏土，壬水润泽并用；忌土重无木无水，愚钝固执，难有作为。',
        en: 'Jia Wood to break up the heavy Earth is essential, used alongside Ren Water for irrigation. Excessive Earth without Wood or Water produces stubbornness and stagnation.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 己土 — Yin Earth (farmland, garden soil, clay)
  // ══════════════════════════════════════════════════════════════════
  '己': {
    spring: {
      description: {
        zh: '己土生于春季，田园初耕之象。春木旺盛克土，田土松软却缺乏暖意。需丙火阳光温暖大地，催发种子萌芽。同时癸水春雨润泽，则春耕有望，五谷丰登。',
        en: 'Ji Earth born in spring represents farmland at the start of the plowing season. Vigorous spring Wood loosens the soil, but the earth still lacks warmth. Bing Fire as sunshine is needed to warm the land and coax seeds to sprout. With Gui Water providing spring rain, the planting season holds great promise for a bountiful harvest.',
      },
      favorableAdvice: {
        zh: '首取丙火暖土催耕，癸水润泽辅助；忌木多土薄无火，田土流失难丰收。',
        en: 'Bing Fire to warm the soil and initiate planting is primary, with Gui Water for moisture. Excessive Wood without Fire thins the soil excessively — the farmland washes away with no harvest.',
      },
    },
    summer: {
      description: {
        zh: '己土生于夏季，田地干裂，火烤土焦。烈日之下土壤失去水分，禾苗枯萎。己土最需癸水甘露滋润，如久旱逢甘霖。若有癸水灌溉，焦土化为沃野，庄稼茂盛。',
        en: 'Ji Earth born in summer is farmland cracking under the blazing heat — moisture evaporates and crops wilt under the fierce sun. Gui Water as gentle, nourishing rain is what Ji Earth needs most, like a long drought finally broken by sweet rainfall. With Gui Water for irrigation, the parched land transforms into fertile fields with flourishing crops.',
      },
      favorableAdvice: {
        zh: '急取癸水润田解渴，辛金生水辅助；忌火土燥烈无水，庄稼枯死，贫穷困苦。',
        en: 'Gui Water to irrigate and relieve the drought is urgently needed. Xin Metal generating Water provides support. Blazing Fire and dry Earth without Water means withered crops — poverty and hardship.',
      },
    },
    autumn: {
      description: {
        zh: '己土生于秋季，田园丰收之际。金气当令泄土，宜见丙火温暖收获后的田地，为下一季蓄力。秋日己土虽泄气于金，但正是收获成果之时，配以丙火则收获满满。',
        en: 'Ji Earth born in autumn arrives at harvest time. Metal in command draws energy from the Earth. Bing Fire is beneficial to warm the post-harvest fields and store energy for the next season. Though autumn Metal drains the Earth, this is the time to reap rewards. With Bing Fire support, the harvest is abundant and fulfilling.',
      },
      favorableAdvice: {
        zh: '首取丙火暖土固本，癸水调润辅助；忌金多泄尽土气，田荒地废。',
        en: 'Bing Fire to warm and strengthen the Earth is the primary need, with Gui Water for moisture balance. Excessive Metal draining all Earth energy leaves the farmland barren and abandoned.',
      },
    },
    winter: {
      description: {
        zh: '己土生于冬季，冻土封田，万物不生。田园被冰雪覆盖，完全丧失耕作能力。己土冬生首重丙火太阳解冻，融雪暖地，方可恢复田园之功能。无丙火则一片荒芜。',
        en: 'Ji Earth born in winter is frozen farmland sealed under ice and snow — nothing grows. The fields are blanketed by frost, completely unable to support cultivation. The foremost need is Bing Fire as the warming sun to thaw the earth and melt the snow, restoring the land to productivity. Without Bing Fire, the farm remains a desolate wasteland.',
      },
      favorableAdvice: {
        zh: '首取丙火解冻暖田，甲木引火辅助；忌水多土寒无火，冻土千里，贫寒一生。',
        en: 'Bing Fire to thaw and warm the farmland is paramount, with Jia Wood to help kindle Fire. Excessive Water and cold without Fire means endless frozen soil — a life of poverty.',
      },
    },
    lateSummer: {
      description: {
        zh: '己土生于四季土月，土气过重，田地板结。犹如土壤过于黏厚，透气排水不良。需甲木松土疏通，癸水灌溉滋养，方能使田园恢复生机，适宜耕种。',
        en: 'Ji Earth born in the transitional earth months encounters excessive Earth energy — the farmland becomes compacted and hardened. Like clay soil that is too dense for drainage or aeration, it cannot support growth. Jia Wood to loosen and break up the soil, and Gui Water for irrigation and nourishment, are needed to restore the land to productive condition.',
      },
      favorableAdvice: {
        zh: '首取甲木疏土，癸水润田并用；忌土重无木水，板结荒田，无法播种。',
        en: 'Jia Wood to loosen the compacted soil is essential, used together with Gui Water for irrigation. Excessive Earth without Wood or Water means hardened, barren fields — nothing can be planted.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 庚金 — Yang Metal (raw ore, sword, axe, steel)
  // ══════════════════════════════════════════════════════════════════
  '庚': {
    spring: {
      description: {
        zh: '庚金生于春季，困于木旺之地。春天万木争荣，庚金如未炼之粗矿，被草木掩埋。须有丁火锻炼，方能化顽铁为利器。甲木虽克金，但庚金劈甲反显英雄本色。',
        en: 'Geng Metal born in spring is trapped amid the dominance of thriving Wood. Like unrefined ore buried beneath dense vegetation, the raw metal needs the forge to reveal its potential. Ding Fire for smelting is essential to transform the crude iron into a sharp weapon. Though Jia Wood opposes Metal, Geng Metal splitting Jia actually reveals its heroic nature.',
      },
      favorableAdvice: {
        zh: '首取丁火锻炼成器，甲木为财可取；忌木多埋金无火，顽铁无用。',
        en: 'Ding Fire for forging is the primary need to refine the Metal into a useful instrument. Jia Wood as wealth can be claimed. Excessive Wood burying Metal without Fire leaves it as useless crude iron.',
      },
    },
    summer: {
      description: {
        zh: '庚金生于夏季，烈火锻金，正是百炼成钢之时。夏火虽猛克金，却是庚金成器的关键时刻。丁火炉火纯青之炼，配壬水淬锋，则宝剑锋从磨砺出，成就非凡。',
        en: 'Geng Metal born in summer is forged in the fierce flames — this is the critical moment of tempering steel through a hundred refinements. Though summer Fire aggressively attacks Metal, it is precisely this process that transforms Geng Metal into a finished instrument. Ding Fire for smelting combined with Ren Water for quenching produces a sharp blade from the grinding — extraordinary achievement.',
      },
      favorableAdvice: {
        zh: '首取丁火锻炼，壬水淬火并用；忌火太旺无水，金被熔化，反主灾殃。',
        en: 'Ding Fire for forging with Ren Water for quenching are used together. Excessive Fire without Water melts the Metal completely — this brings disaster rather than refinement.',
      },
    },
    autumn: {
      description: {
        zh: '庚金生于秋季，金气当令，庚金得时而旺。犹如锋利宝剑出鞘，锐不可当。然金太刚则易折，需丁火淬炼、壬水洗润方能刚柔并济。秋庚以丁壬并用为上格。',
        en: 'Geng Metal born in autumn is at its peak seasonal strength — like a keen sword unsheathed, unstoppably sharp. However, Metal that is too rigid easily breaks. Ding Fire for tempering and Ren Water for polishing are needed to achieve the balance of hardness and flexibility. Autumn Geng Metal with both Ding Fire and Ren Water is a superior configuration.',
      },
      favorableAdvice: {
        zh: '首取丁火炼金，壬水淘洗并用；忌金多无火水，刚愎自用，虽利实脆。',
        en: 'Ding Fire for tempering and Ren Water for refining should be used together. Heavy Metal without Fire or Water produces stubbornness — seemingly strong but actually brittle.',
      },
    },
    winter: {
      description: {
        zh: '庚金生于冬季，金寒水冷，宝剑冻僵难以出鞘。水旺金寒，犹如废铁沉于冰河之中。急需丙火温暖解冻，丁火辅炼。若有火暖金活，则寒铁化为宝器。',
        en: 'Geng Metal born in winter suffers from bitter cold — the sword freezes in its scabbard, unable to be drawn. Abundant Water chills the Metal further, like scrap iron sinking in an icy river. Bing Fire for warmth is urgently needed to thaw the frozen Metal, with Ding Fire for additional tempering. When Fire warms the Metal back to life, the frozen iron transforms into a precious instrument.',
      },
      favorableAdvice: {
        zh: '首取丙火解冻暖金，丁火锻炼辅助，戊土制水护金；忌水寒无火，废铁沉沦。',
        en: 'Bing Fire for thawing and warming is the primary need, with Ding Fire for forging and Wu Earth to control Water. Cold Water without Fire leaves the Metal as sunken scrap — a wasted life.',
      },
    },
    lateSummer: {
      description: {
        zh: '庚金生于四季土月，土多埋金，矿藏深埋地底难以开采。土生金虽好，但土过重则金被埋没。需甲木克土露金，丁火锻炼成器，方能使深埋之矿石成为有用之材。',
        en: 'Geng Metal born in the transitional earth months is buried under heavy Earth — like ore deposits deep underground, difficult to mine. Though Earth generating Metal is positive in principle, excessive Earth buries the Metal completely. Jia Wood to break through the Earth and reveal the Metal, with Ding Fire to forge it into useful form, transforms hidden ore into valuable material.',
      },
      favorableAdvice: {
        zh: '首取甲木疏土露金，丁火锻炼并用；忌土重埋金，虽有才华却无法施展。',
        en: 'Jia Wood to break through Earth and expose the Metal is essential, with Ding Fire for forging. Heavy Earth burying the Metal means talent exists but cannot be expressed.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 辛金 — Yin Metal (jewelry, pearl, gemstone, refined gold)
  // ══════════════════════════════════════════════════════════════════
  '辛': {
    spring: {
      description: {
        zh: '辛金生于春季，珠玉蒙尘于木旺之地。春天万物生发，辛金如美玉被泥土草木掩盖，需壬水冲洗方能重现光华。壬水如大江之水洗涤珠玉，使之光彩照人。',
        en: 'Xin Metal born in spring is a precious gem covered in dust amid flourishing Wood. In spring, everything sprouts and grows, and the fine Metal is concealed beneath soil and vegetation. Ren Water is needed to wash away the grime and restore the jewel to its radiant brilliance — like a great river cleansing pearls until they gleam.',
      },
      favorableAdvice: {
        zh: '首取壬水洗涤生辉，己土生金辅助；忌木多克金无水，美玉蒙尘，才华埋没。',
        en: 'Ren Water to cleanse and reveal the luster is the primary need. Ji Earth generating Metal provides support. Excessive Wood attacking Metal without Water leaves the gem buried in dust — talent goes unrecognized.',
      },
    },
    summer: {
      description: {
        zh: '辛金生于夏季，烈火烤金，珠宝有熔毁之险。辛金柔弱，不耐烈火。急需壬水保护，如清泉环绕珠玉，既降温又增辉。若无壬水，辛金被烈火所熔，美玉尽毁。',
        en: 'Xin Metal born in summer faces fierce Fire that threatens to melt the precious gem. Delicate Xin Metal cannot endure intense heat. Ren Water is urgently needed for protection — like a cool spring encircling the jewels, both lowering the temperature and enhancing their sparkle. Without Ren Water, the Fire melts the Metal and the precious gem is destroyed.',
      },
      favorableAdvice: {
        zh: '急取壬水护金降温，己土生金辅助；忌火旺无水，珠毁玉碎，一败涂地。',
        en: 'Ren Water to protect the Metal and reduce heat is urgently needed. Ji Earth generating Metal provides backup. Fierce Fire without Water shatters the gem — total ruin and failure.',
      },
    },
    autumn: {
      description: {
        zh: '辛金生于秋季，金气当令，珠宝得时而贵。犹如宝石经打磨后光彩夺目，辛金在秋季自然尊贵。然仍需壬水淘洗增辉，方能达到珠光宝气之极致。秋辛配壬，富贵可期。',
        en: 'Xin Metal born in autumn is in its element — precious gems are at their most valuable when Metal is in season. Like a gemstone after expert polishing, Xin Metal naturally possesses dignity and worth in autumn. Ren Water for washing and enhancing the luster is still needed to achieve the ultimate brilliance. Autumn Xin Metal paired with Ren Water promises wealth and honor.',
      },
      favorableAdvice: {
        zh: '首取壬水洗金增辉，丙火暖局提格；忌金多无水，虽贵却暗淡无光。',
        en: 'Ren Water to polish and enhance brilliance is essential. Bing Fire for warmth elevates the chart. Heavy Metal without Water produces value but no sparkle — dull and lackluster.',
      },
    },
    winter: {
      description: {
        zh: '辛金生于冬季，金寒水冷，珠玉失去光泽。冬日辛金如冰冻之玉，虽质地纯美却寒光逼人。急需丙火太阳温暖照耀，使玉石恢复温润之感。丙辛相合化水，冬日最喜此配。',
        en: 'Xin Metal born in winter loses its luster in the freezing cold — the gem becomes like frozen jade, beautiful in substance but emitting a chilling, uninviting light. Bing Fire as the warming sun is urgently needed to restore the jade to its warm, gentle glow. The Bing-Xin combination that transforms into Water is the most desirable pairing for winter.',
      },
      favorableAdvice: {
        zh: '首取丙火温暖解寒，戊土制水护金辅助；忌水多金寒无火，珠玉冰冷，无人赏识。',
        en: 'Bing Fire for warmth is the foremost need. Wu Earth to control Water and protect Metal provides support. Excessive Water and cold without Fire leaves the gem ice-cold — no one appreciates it.',
      },
    },
    lateSummer: {
      description: {
        zh: '辛金生于四季土月，土多埋玉，珠宝深藏于厚土之下。辛金虽得土生，但土过重反使珠玉被掩埋无法示人。需壬水冲土洗金，甲木克土露玉，方能使珍宝重见天日。',
        en: 'Xin Metal born in the transitional earth months finds jewels buried under heavy soil. Though Earth generates Metal, excessive Earth conceals the precious gem from view. Ren Water to wash away the soil and Jia Wood to break through the Earth are needed to bring the treasure back into the light of day.',
      },
      favorableAdvice: {
        zh: '首取壬水冲洗出金，甲木疏土辅助；忌土厚无水，宝藏深埋，终身不遇。',
        en: 'Ren Water to wash and reveal the Metal is essential, with Jia Wood to loosen the Earth. Thick Earth without Water keeps the treasure permanently buried — a lifetime without recognition.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 壬水 — Yang Water (ocean, great river, flood)
  // ══════════════════════════════════════════════════════════════════
  '壬': {
    spring: {
      description: {
        zh: '壬水生于春季，水生木而泄气，犹如江河春汛化为万亩灌溉。春木旺盛，大量消耗壬水之力，水势渐弱。需庚金生水补源，方能维持大江大河之势。若无金源，则水尽木枯。',
        en: 'Ren Water born in spring sees its energy drained as Water generates the thriving Wood — like a great river channeled into vast irrigation. The vigorous spring Wood heavily consumes Ren Water, gradually weakening its flow. Geng Metal is needed to generate Water and replenish the source, maintaining the power of the mighty river. Without Metal as a source, the water dries up.',
      },
      favorableAdvice: {
        zh: '首取庚金发水源，辛金辅助亦可；忌木多泄尽水气无金补源，水竭木枯。',
        en: 'Geng Metal to replenish the Water source is the primary need. Xin Metal can also serve as support. Excessive Wood draining Water without Metal to replenish leads to complete exhaustion.',
      },
    },
    summer: {
      description: {
        zh: '壬水生于夏季，火旺水涸，犹如烈日蒸发江河，水源枯竭。夏季壬水最为虚弱，急需庚辛金生水续源。若有金水相生，则虽处夏日仍能保持大江奔流之势。',
        en: 'Ren Water born in summer is evaporated by the blazing Fire — like rivers drying up under the scorching sun, the water source is depleted. Summer is when Ren Water is at its weakest. Geng and Xin Metal are urgently needed to generate Water and sustain the flow. With Metal-Water mutual generation, the great river can maintain its current even in midsummer.',
      },
      favorableAdvice: {
        zh: '急取庚辛金生水续源，壬水透干自助亦佳；忌火旺无金水，涸泽而渔，穷困潦倒。',
        en: 'Geng and Xin Metal to generate Water are urgently needed. Additional Ren Water appearing in the chart also helps. Fierce Fire without Metal or Water means the reservoir runs dry — poverty and destitution.',
      },
    },
    autumn: {
      description: {
        zh: '壬水生于秋季，金水相生，源源不绝。秋金当令生水，壬水如得泉源活水，气势磅礴。江河得金源之助，浩浩荡荡奔流不息。此时宜取甲木泄秀，丙火暖局。',
        en: 'Ren Water born in autumn benefits from the Metal-Water generating cycle — an endless supply of fresh water. Autumn Metal produces Water continuously, giving Ren Water the power of a spring-fed river, flowing with magnificent force. With this abundant source, Jia Wood to channel the energy productively and Bing Fire for warmth create an ideal balance.',
      },
      favorableAdvice: {
        zh: '宜取甲木泄秀引化，丙火暖局调候；忌金水太旺无木火，汪洋泛滥，反成灾害。',
        en: 'Jia Wood to channel the energy gracefully and Bing Fire for warmth and balance are recommended. Excessive Metal and Water without Wood or Fire creates a destructive flood — power without direction.',
      },
    },
    winter: {
      description: {
        zh: '壬水生于冬季，水势当令，波涛汹涌。犹如冬日洪水泛滥成灾，水势过于猛烈。急需戊土筑堤制水，引导水流归于正途。若无土制，则洪水肆虐，漂泊无依。',
        en: 'Ren Water born in winter is at full seasonal power — surging waves and raging torrents. Like winter floods bursting their banks, the Water is overwhelmingly powerful. Wu Earth is urgently needed to build embankments and channel the flood, directing the flow along a proper course. Without Earth to control it, the floodwaters rage unchecked — drifting and rootless.',
      },
      favorableAdvice: {
        zh: '首取戊土制水导流，丙火暖局解寒；忌水多无土，洪水泛滥，一生漂泊不定。',
        en: 'Wu Earth to dam and direct the Water is the primary need. Bing Fire for warmth resolves the bitter cold. Excessive Water without Earth means unchecked flooding — a life of restless wandering.',
      },
    },
    lateSummer: {
      description: {
        zh: '壬水生于四季土月，土旺克水，大河被厚土阻塞。壬水受土之克制，流势受阻，难以畅通。需甲木克土开路，庚金生水助源，方能使江河恢复畅流之态。',
        en: 'Ren Water born in the transitional earth months faces dominant Earth that blocks and absorbs the Water — like a great river dammed by thick sediment. Earth restrains Water and impedes its flow. Jia Wood to break through the Earth and clear the path, along with Geng Metal to replenish the Water source, restores the river to free-flowing vigor.',
      },
      favorableAdvice: {
        zh: '首取甲木克土疏通，庚金生水辅助；忌土重无木，河道淤塞，才能受阻。',
        en: 'Jia Wood to overcome Earth and clear the channel is essential, with Geng Metal to sustain the Water flow. Heavy Earth without Wood blocks the riverbed — talent and ability are obstructed.',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // 癸水 — Yin Water (rain, dew, mist, spring water)
  // ══════════════════════════════════════════════════════════════════
  '癸': {
    spring: {
      description: {
        zh: '癸水生于春季，雨露滋润万物，春雨贵如油。癸水化为春雨浇灌大地，木旺泄水之力，水势渐弱。需庚辛金生水补源，方能使春雨绵绵不绝，润泽苍生。',
        en: 'Gui Water born in spring becomes precious rain and dew nourishing all living things — spring rain is as valuable as oil. The Water transforms into life-giving rainfall to irrigate the earth, but vigorous Wood drains its strength. Geng or Xin Metal is needed to generate Water and replenish the source, ensuring the spring rain continues endlessly to bless all creation.',
      },
      favorableAdvice: {
        zh: '首取辛金生水续源，庚金亦佳；忌木多泄尽水源，春旱无雨，生机断绝。',
        en: 'Xin Metal to sustain the Water source is the primary need; Geng Metal is also beneficial. Excessive Wood draining all Water creates a spring drought — vitality is cut off.',
      },
    },
    summer: {
      description: {
        zh: '癸水生于夏季，烈日蒸发，雨露干涸。如夏日晨露，阳光一照便消散无踪。癸水极度虚弱，急需辛金生水补源，庚金亦可。若无金助，则水尽人困。',
        en: 'Gui Water born in summer is evaporated by the blazing sun — the dew and rain dry up completely. Like morning dew in summer that vanishes the moment sunlight touches it, Gui Water is extremely weak. Xin Metal is urgently needed to generate Water and restore the source; Geng Metal also works. Without Metal support, the Water is exhausted and the native faces dire difficulties.',
      },
      favorableAdvice: {
        zh: '急取辛金生水，庚金辅助；忌火旺土燥无金水，露干泉枯，穷途末路。',
        en: 'Xin Metal to generate Water is urgently needed, with Geng Metal as support. Fierce Fire and dry Earth without Metal or Water means the dew evaporates and the spring dries up — desperation.',
      },
    },
    autumn: {
      description: {
        zh: '癸水生于秋季，金旺生水，源头活水汩汩而来。秋金当令化为生水之源，癸水如山泉涌出，清澈甘甜。此时水势渐强，宜丙火温暖提格，丁火辅助，可成清贵之格。',
        en: 'Gui Water born in autumn receives continuous nourishment from dominant Metal — fresh spring water bubbles up from its source. Autumn Metal in command becomes the wellspring, and Gui Water flows like a mountain spring, clear and sweet. As the Water gradually strengthens, Bing Fire for warmth elevates the chart, and Ding Fire as support can create a refined and distinguished configuration.',
      },
      favorableAdvice: {
        zh: '宜取丙火暖局提格，丁火辅助；忌金水过旺无火土，泛滥成灾，淹没前程。',
        en: 'Bing Fire for warmth and chart elevation is recommended, with Ding Fire as support. Excessive Metal and Water without Fire or Earth creates a flood — overwhelming and destructive to prospects.',
      },
    },
    winter: {
      description: {
        zh: '癸水生于冬季，水势当令，雨雪纷飞，泛滥成灾。冬日癸水如暴雨倾盆，阴寒彻骨。急需戊土堤防制水，丙火温暖驱寒。若水势无制，则寒湿过重，百病丛生。',
        en: 'Gui Water born in winter is at peak seasonal strength — rain and snow pour down ceaselessly, causing floods. Winter Gui Water is like a torrential downpour, bitterly cold and penetrating. Wu Earth for embankments to control the Water and Bing Fire for warmth to drive away the cold are urgently needed. If the Water is uncontrolled, excessive cold and dampness breed countless ailments.',
      },
      favorableAdvice: {
        zh: '首取戊土制水，丙火温暖并用；忌水多无土火，阴寒泛滥，体弱多病。',
        en: 'Wu Earth to control the Water and Bing Fire for warmth should be used together. Excessive Water without Earth or Fire brings cold, damp flooding — poor health and weakness.',
      },
    },
    lateSummer: {
      description: {
        zh: '癸水生于四季土月，土旺克水，雨露被厚土吸收殆尽。犹如泉水被泥沙淤堵，难以流出。需辛金生水通源，甲木克土开渠，方能使泉水重新涌出，滋润大地。',
        en: 'Gui Water born in the transitional earth months is absorbed by dominant Earth — rain and dew are completely soaked up by the thick soil. Like a spring blocked by mud and sediment, the water cannot flow. Xin Metal to generate Water and open the source, along with Jia Wood to break through the Earth and dig channels, allows the spring to flow once more and nourish the land.',
      },
      favorableAdvice: {
        zh: '首取辛金生水通源，甲木疏土辅助；忌土重无金，水源断绝，枯竭无援。',
        en: 'Xin Metal to generate Water and open the source is essential, with Jia Wood to loosen the Earth. Heavy Earth without Metal cuts off the water supply — drought with no relief.',
      },
    },
  },
};
