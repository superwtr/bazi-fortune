/**
 * Ten God Positional Meanings — different interpretations based on pillar position
 * Based on 《神峰通考》
 */

import { TenGodName, BilingualText } from '../types';

// position keys: 'year-stem', 'month-stem', 'hour-stem', 'year-hidden', 'month-hidden', 'day-hidden', 'hour-hidden'
export const TEN_GOD_POSITIONAL: Record<TenGodName, Record<string, BilingualText>> = {
  '正官': {
    'year-stem': {
      zh: '年干正官：祖辈有社会地位或从政经历，少年时期守规矩、尊师重道，家教严格但受益终身。',
      en: 'Direct Officer in Year Stem: Ancestors held social status. Disciplined upbringing with lasting benefits.',
    },
    'month-stem': {
      zh: '月干正官：正官格的核心标志。事业宫有正官，仕途顺利或从事管理工作，年轻时即有权威和社会认可。',
      en: 'Direct Officer in Month Stem: Core marker of DO formation. Early career authority and institutional recognition.',
    },
    'hour-stem': {
      zh: '时干正官：晚年得名声地位，子女有出息，多半从事体制内或正规行业。',
      en: 'Direct Officer in Hour Stem: Reputation elevates in later years. Children tend toward institutional or formal careers.',
    },
    'year-hidden': {
      zh: '年支藏正官：家族有隐性的社会资源，祖上的关系网对你有潜在助力。',
      en: 'Hidden DO in Year Branch: Ancestral social networks provide subtle support.',
    },
    'month-hidden': {
      zh: '月支藏正官：事业宫暗含权威因子，适合在组织中稳步上升，不宜太过张扬。',
      en: 'Hidden DO in Month Branch: Quiet authority within organizations. Rise steadily without being too conspicuous.',
    },
    'day-hidden': {
      zh: '日支藏正官：配偶可能有社会地位或管理能力，婚姻中对方偏强势。',
      en: 'Hidden DO in Day Branch: Spouse may hold authority or managerial ability. Partner tends to be dominant.',
    },
    'hour-hidden': {
      zh: '时支藏正官：晚年有暗贵人相助，子女在体制内有发展。',
      en: 'Hidden DO in Hour Branch: Hidden mentors support later years. Children thrive in institutions.',
    },
  },
  '七杀': {
    'year-stem': {
      zh: '年干七杀：少年家境有压力，可能有来自家庭的严厉管教或竞争环境。但这种压力铸就了你的抗压能力。',
      en: 'Seven Killings in Year Stem: Childhood under pressure — strict discipline or competitive family. This forged resilience.',
    },
    'month-stem': {
      zh: '月干七杀：事业宫有七杀，职场竞争激烈，适合高压环境如金融、军事、执法。有魄力但需防小人。',
      en: 'Seven Killings in Month Stem: Intense career competition. Suited for high-pressure fields: finance, military, law enforcement.',
    },
    'hour-stem': {
      zh: '时干七杀：晚年仍有竞争压力，或子女性格刚强独立。需注意老年健康。',
      en: 'Seven Killings in Hour Stem: Competitive pressure continues into later years. Children are strong-willed and independent.',
    },
    'year-hidden': {
      zh: '年支藏七杀：祖上可能有军政背景，早年暗中有竞争对手或潜在威胁。',
      en: 'Hidden 7K in Year Branch: Ancestral military or political connections. Early hidden rivalries.',
    },
    'month-hidden': {
      zh: '月支藏七杀：事业中有隐性的竞争者和压力源，需时刻保持警觉。',
      en: 'Hidden 7K in Month Branch: Covert competition in career. Stay vigilant.',
    },
    'day-hidden': {
      zh: '日支藏七杀：配偶宫有七杀——伴侣性格强势或婚姻中有紧张的动力关系。',
      en: 'Hidden 7K in Day Branch: Spouse palace contains authority — partner is strong-willed or marriage has intense dynamics.',
    },
    'hour-hidden': {
      zh: '时支藏七杀：子女宫有竞争因子，子女可能在竞争激烈的领域发展。',
      en: 'Hidden 7K in Hour Branch: Children may pursue competitive fields.',
    },
  },
  '正财': {
    'year-stem': {
      zh: '年干正财：祖辈殷实，少年家境较好。对金钱有天然的安全感，理财观念从小建立。',
      en: 'Direct Wealth in Year Stem: Family was financially comfortable. Natural financial security and early money awareness.',
    },
    'month-stem': {
      zh: '月干正财：事业宫有正财，通过正当努力获得稳定收入。适合实业、金融等需要稳健经营的行业。',
      en: 'Direct Wealth in Month Stem: Stable income through legitimate effort. Suited for business, finance, and steady industries.',
    },
    'hour-stem': {
      zh: '时干正财：晚年财运稳定，老来有积蓄。子女可能从事商业或金融。',
      en: 'Direct Wealth in Hour Stem: Financial stability in later years. Children may pursue business or finance.',
    },
    'year-hidden': {
      zh: '年支藏正财：家族有隐性财富或资产，祖业可能对你有经济帮助。',
      en: 'Hidden DW in Year Branch: Family has hidden assets or inherited wealth potential.',
    },
    'month-hidden': {
      zh: '月支藏正财：事业中有稳定但不显眼的收入来源，闷声发大财型。',
      en: 'Hidden DW in Month Branch: Steady but unobvious income sources. Quiet wealth accumulation.',
    },
    'day-hidden': {
      zh: '日支藏正财：配偶持家有道，善于理财。婚后经济状况通常改善。',
      en: 'Hidden DW in Day Branch: Spouse is financially capable. Economic situation typically improves after marriage.',
    },
    'hour-hidden': {
      zh: '时支藏正财：晚年有隐性财源，退休后经济无忧。',
      en: 'Hidden DW in Hour Branch: Hidden financial sources support retirement years.',
    },
  },
  '偏财': {
    'year-stem': {
      zh: '年干偏财：父亲有社交能力和经商才华，少年时见识广泛。偏财透年干，人缘好从小就是社交达人。',
      en: 'Indirect Wealth in Year Stem: Father was socially adept. You developed wide horizons and social skills early.',
    },
    'month-stem': {
      zh: '月干偏财：事业宫有偏财，有意外之财或投机收入的机会。人际关系广，异性缘佳。适合需要人脉的行业。',
      en: 'Indirect Wealth in Month Stem: Windfall opportunities in career. Broad social network. Suited for relationship-driven industries.',
    },
    'hour-stem': {
      zh: '时干偏财：晚年有意外收获或遗产。对子女慷慨，但需防晚年投资失利。',
      en: 'Indirect Wealth in Hour Stem: Unexpected gains or inheritance later. Generous to children but guard late investments.',
    },
    'year-hidden': {
      zh: '年支藏偏财：祖上可能有经商背景，早年有隐性的财务支持。',
      en: 'Hidden IW in Year Branch: Ancestral business background. Hidden early financial support.',
    },
    'month-hidden': {
      zh: '月支藏偏财：事业中暗藏商机，善于发现别人看不到的赚钱机会。',
      en: 'Hidden IW in Month Branch: Business opportunities hidden in your career. You spot what others miss.',
    },
    'day-hidden': {
      zh: '日支藏偏财：配偶可能有商业头脑或社交能力强。婚姻中有财务方面的波动。',
      en: 'Hidden IW in Day Branch: Spouse has business acumen or strong social skills. Financial fluctuations in marriage.',
    },
    'hour-hidden': {
      zh: '时支藏偏财：子女有赚钱天赋，或晚年有偏门收入。',
      en: 'Hidden IW in Hour Branch: Children have money-making talent. Unconventional income in later years.',
    },
  },
  '正印': {
    'year-stem': {
      zh: '年干正印：祖上有文化根基，少年时学习环境好，受母亲或长辈关爱多。',
      en: 'Direct Seal in Year Stem: Cultural family roots. Good early education and strong maternal/elder care.',
    },
    'month-stem': {
      zh: '月干正印：事业宫有印星——组织对你有背书，容易获得文凭、头衔和制度性支持。适合学术、教育、公务员。',
      en: 'Direct Seal in Month Stem: Institutional backing — titles, credentials, organizational support. Suited for academia, education, civil service.',
    },
    'hour-stem': {
      zh: '时干正印：晚年有学习成果，可能晚年进修或著书立说。子女重视教育。',
      en: 'Direct Seal in Hour Stem: Late-life scholarly achievement or further education. Children value learning.',
    },
    'year-hidden': {
      zh: '年支藏正印：祖上的文化遗产对你有隐性影响，家族教育传统深厚。',
      en: 'Hidden DS in Year Branch: Ancestral cultural heritage subtly influences you. Deep family education traditions.',
    },
    'month-hidden': {
      zh: '月支藏正印：事业中有隐性的制度保护和贵人支持，虽不明显但关键时刻发挥作用。',
      en: 'Hidden DS in Month Branch: Subtle institutional protection and mentor support — invisible but crucial when needed.',
    },
    'day-hidden': {
      zh: '日支藏正印：配偶温柔贴心，善于照顾家庭，有母性/父性光辉。',
      en: 'Hidden DS in Day Branch: Spouse is nurturing and supportive, with strong parental instincts.',
    },
    'hour-hidden': {
      zh: '时支藏正印：子女孝顺有教养，晚年精神生活丰富。',
      en: 'Hidden DS in Hour Branch: Children are dutiful and well-educated. Rich spiritual life in later years.',
    },
  },
  '偏印': {
    'year-stem': {
      zh: '年干偏印：少年时期思维独特，可能有些孤僻或偏科。与母亲关系有一定距离感。',
      en: 'Indirect Seal in Year Stem: Unconventional thinking in youth. Possibly introverted or academically specialized. Some distance from mother.',
    },
    'month-stem': {
      zh: '月干偏印：事业宫有偏印——适合技术、研究、独立工作。思维方式非主流，不走寻常路。',
      en: 'Indirect Seal in Month Stem: Suited for technical, research, or independent work. Unconventional approach to career.',
    },
    'hour-stem': {
      zh: '时干偏印：晚年偏向精神追求，可能研究宗教、哲学或深度学术领域。',
      en: 'Indirect Seal in Hour Stem: Spiritual or philosophical pursuits in later years. Deep academic interests.',
    },
    'year-hidden': {
      zh: '年支藏偏印：家族中有非主流思想者或技术人才，早年受其隐性影响。',
      en: 'Hidden IS in Year Branch: Unconventional thinkers or technical talent in family lineage.',
    },
    'month-hidden': {
      zh: '月支藏偏印：事业中暗含独特的技术优势或非主流的方法论。',
      en: 'Hidden IS in Month Branch: Hidden technical edge or unconventional methodology in career.',
    },
    'day-hidden': {
      zh: '日支藏偏印：配偶思维独特，可能有些固执或不善表达感情。',
      en: 'Hidden IS in Day Branch: Spouse thinks unconventionally. May be stubborn or emotionally reserved.',
    },
    'hour-hidden': {
      zh: '时支藏偏印：子女可能在非主流领域有天赋，如技术、艺术、研究。',
      en: 'Hidden IS in Hour Branch: Children may have talent in non-mainstream fields: tech, art, research.',
    },
  },
  '食神': {
    'year-stem': {
      zh: '年干食神：少年聪颖，才华早显。家庭氛围轻松愉快，重视享受和创造。',
      en: 'Eating God in Year Stem: Talented from childhood. Relaxed family environment valuing creativity and enjoyment.',
    },
    'month-stem': {
      zh: '月干食神：事业宫有食神——才华直接用于事业，适合创作、写作、表演、烹饪等表达型工作。食神生财之源。',
      en: 'Eating God in Month Stem: Talent directly fuels career. Creative output leads to wealth. Writing, performing, culinary arts.',
    },
    'hour-stem': {
      zh: '时干食神：晚年有创作成果，生活品质高。子女有艺术天赋。',
      en: 'Eating God in Hour Stem: Creative achievement in later years. High quality of life. Children have artistic talent.',
    },
    'year-hidden': {
      zh: '年支藏食神：家族有艺术或手工传统，早年的兴趣爱好为后来的事业埋下伏笔。',
      en: 'Hidden EG in Year Branch: Family artisan or creative traditions. Early hobbies foreshadow future career.',
    },
    'month-hidden': {
      zh: '月支藏食神：事业中有隐性的创造力优势，看似普通的工作中能产出独特价值。',
      en: 'Hidden EG in Month Branch: Hidden creative advantage in career. Unique value from seemingly ordinary work.',
    },
    'day-hidden': {
      zh: '日支藏食神：配偶有才华且生活品味高，婚姻生活丰富多彩。',
      en: 'Hidden EG in Day Branch: Spouse is talented with good taste. Colorful married life.',
    },
    'hour-hidden': {
      zh: '时支藏食神：子女有创造力，晚年享受子女带来的精神满足。',
      en: 'Hidden EG in Hour Branch: Creative children bring spiritual fulfillment in later years.',
    },
  },
  '伤官': {
    'year-stem': {
      zh: '年干伤官：少年叛逆聪明，可能与长辈或老师有冲突。思维超前，不走寻常路。',
      en: 'Hurting Officer in Year Stem: Rebellious and brilliant youth. May clash with elders. Ahead-of-time thinking.',
    },
    'month-stem': {
      zh: '月干伤官：事业宫有伤官——有独立开创的能力，但容易与上级冲突。适合自由职业、创业、技术创新。伤官佩印则为大才。',
      en: 'Hurting Officer in Month Stem: Independent and innovative but friction with authority. Suited for entrepreneurship or tech innovation.',
    },
    'hour-stem': {
      zh: '时干伤官：晚年思想前卫，可能不服老。子女个性鲜明，有创新精神。',
      en: 'Hurting Officer in Hour Stem: Progressive thinking in later years. Children are strong-willed innovators.',
    },
    'year-hidden': {
      zh: '年支藏伤官：家族中有不按常规做事的人，早年受反叛精神影响。',
      en: 'Hidden HO in Year Branch: Unconventional figures in family lineage. Early exposure to rebellious thinking.',
    },
    'month-hidden': {
      zh: '月支藏伤官：事业中有暗中突破规矩的创新能力，在体制内也能找到独特路径。',
      en: 'Hidden HO in Month Branch: Covert innovation within established systems. Finding unique paths within institutions.',
    },
    'day-hidden': {
      zh: '日支藏伤官：配偶聪明但口直心快，婚姻中容易因言语产生摩擦。',
      en: 'Hidden HO in Day Branch: Spouse is sharp-witted but blunt. Verbal friction possible in marriage.',
    },
    'hour-hidden': {
      zh: '时支藏伤官：子女有独立思考能力，可能在创新领域有成就。',
      en: 'Hidden HO in Hour Branch: Children are independent thinkers with potential in innovation.',
    },
  },
  '比肩': {
    'year-stem': {
      zh: '年干比肩：少年时期有同龄玩伴和竞争者，独立性从小培养。家中可能有兄弟姐妹的竞争。',
      en: 'Peer in Year Stem: Grew up with sibling rivalry or strong peer competition. Independence cultivated early.',
    },
    'month-stem': {
      zh: '月干比肩：事业宫有比肩——适合合伙经营或在同行中竞争。但需防同行争利和内部分裂。',
      en: 'Peer in Month Stem: Partnership-oriented career. Good for co-ventures but guard against internal rivalry.',
    },
    'hour-stem': {
      zh: '时干比肩：晚年朋友多，社交圈广。子女和自己性格相似。',
      en: 'Peer in Hour Stem: Many friends in later years. Children share your temperament.',
    },
    'year-hidden': {
      zh: '年支藏比肩：家族中有与你性格相似的长辈，早年受同类人影响。',
      en: 'Hidden Peer in Year Branch: Similar-tempered elders in family lineage.',
    },
    'month-hidden': {
      zh: '月支藏比肩：事业中有隐性的同行竞争者，但也可能成为你的同盟。',
      en: 'Hidden Peer in Month Branch: Covert industry competitors who may become allies.',
    },
    'day-hidden': {
      zh: '日支藏比肩：配偶与你性格相似或从事同类行业，夫妻之间既是伴侣也是竞争者。',
      en: 'Hidden Peer in Day Branch: Spouse has similar personality or career. Partners and competitors simultaneously.',
    },
    'hour-hidden': {
      zh: '时支藏比肩：子女独立性强，可能继承你的事业或在同领域发展。',
      en: 'Hidden Peer in Hour Branch: Independent children who may follow in your professional footsteps.',
    },
  },
  '劫财': {
    'year-stem': {
      zh: '年干劫财：少年时期社交活跃，花销大。家中可能因经济问题产生过争执。',
      en: 'Rob Wealth in Year Stem: Socially active youth with high spending. Family may have had financial disagreements.',
    },
    'month-stem': {
      zh: '月干劫财：事业宫有劫财——社交能力强但需防投资合伙中的财务纠纷。适合需要人际网络的行业，但要守住核心利益。',
      en: 'Rob Wealth in Month Stem: Strong networking but guard finances in partnerships. Protect core interests in collaborations.',
    },
    'hour-stem': {
      zh: '时干劫财：晚年花销较大，可能因子女或社交而有额外支出。需提前做好退休规划。',
      en: 'Rob Wealth in Hour Stem: Higher expenses in later years from children or social commitments. Plan retirement carefully.',
    },
    'year-hidden': {
      zh: '年支藏劫财：家族中有因钱财起纷争的历史，早年就对"守财"有深刻认识。',
      en: 'Hidden RW in Year Branch: Family history of financial disputes. Early awareness of wealth protection.',
    },
    'month-hidden': {
      zh: '月支藏劫财：事业中有隐性的利益争夺者，合作时需留后手。',
      en: 'Hidden RW in Month Branch: Hidden rivals for resources in career. Maintain safeguards in partnerships.',
    },
    'day-hidden': {
      zh: '日支藏劫财：配偶消费观可能与你不同，婚姻中财务管理需要共识。',
      en: 'Hidden RW in Day Branch: Spouse may have different spending habits. Financial consensus needed in marriage.',
    },
    'hour-hidden': {
      zh: '时支藏劫财：子女可能有较大的财务需求，或在竞争激烈的行业发展。',
      en: 'Hidden RW in Hour Branch: Children may have significant financial needs or compete in demanding industries.',
    },
  },
};
