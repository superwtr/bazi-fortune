// 纳音 (Nayin / Sound Element) - maps each pair in the 60-cycle to a poetic element name
// Index is floor(cyclePosition / 2)

export const NAYIN_TABLE: string[] = [
  '海中金', // 甲子/乙丑 0,1
  '炉中火', // 丙寅/丁卯 2,3
  '大林木', // 戊辰/己巳 4,5
  '路旁土', // 庚午/辛未 6,7
  '剑锋金', // 壬申/癸酉 8,9
  '山头火', // 甲戌/乙亥 10,11
  '涧下水', // 丙子/丁丑 12,13
  '城头土', // 戊寅/己卯 14,15
  '白蜡金', // 庚辰/辛巳 16,17
  '杨柳木', // 壬午/癸未 18,19
  '泉中水', // 甲申/乙酉 20,21
  '屋上土', // 丙戌/丁亥 22,23
  '霹雳火', // 戊子/己丑 24,25
  '松柏木', // 庚寅/辛卯 26,27
  '长流水', // 壬辰/癸巳 28,29
  '砂中金', // 甲午/乙未 30,31
  '山下火', // 丙申/丁酉 32,33
  '平地木', // 戊戌/己亥 34,35
  '壁上土', // 庚子/辛丑 36,37
  '金箔金', // 壬寅/癸卯 38,39
  '覆灯火', // 甲辰/乙巳 40,41
  '天河水', // 丙午/丁未 42,43
  '大驿土', // 戊申/己酉 44,45
  '钗钏金', // 庚戌/辛亥 46,47
  '桑柘木', // 壬子/癸丑 48,49
  '大溪水', // 甲寅/乙卯 50,51
  '砂中土', // 丙辰/丁巳 52,53
  '天上火', // 戊午/己未 54,55
  '石榴木', // 庚申/辛酉 56,57
  '大海水', // 壬戌/癸亥 58,59
];

export const NAYIN_EN: Record<string, string> = {
  '海中金': 'Gold in the Sea',
  '炉中火': 'Fire in the Furnace',
  '大林木': 'Wood of the Great Forest',
  '路旁土': 'Earth by the Roadside',
  '剑锋金': 'Metal of the Sword Edge',
  '山头火': 'Fire atop the Mountain',
  '涧下水': 'Water beneath the Valley',
  '城头土': 'Earth of the City Wall',
  '白蜡金': 'White Wax Metal',
  '杨柳木': 'Willow Wood',
  '泉中水': 'Water in the Spring',
  '屋上土': 'Earth on the Rooftop',
  '霹雳火': 'Thunderbolt Fire',
  '松柏木': 'Pine & Cypress Wood',
  '长流水': 'Long-flowing Water',
  '砂中金': 'Gold in the Sand',
  '山下火': 'Fire beneath the Mountain',
  '平地木': 'Wood of the Flatlands',
  '壁上土': 'Earth on the Wall',
  '金箔金': 'Gold Leaf Metal',
  '覆灯火': 'Lamp Fire',
  '天河水': 'Heavenly River Water',
  '大驿土': 'Earth of the Great Post Road',
  '钗钏金': 'Hairpin Metal',
  '桑柘木': 'Mulberry Wood',
  '大溪水': 'Water of the Great Stream',
  '砂中土': 'Earth in the Sand',
  '天上火': 'Celestial Fire',
  '石榴木': 'Pomegranate Wood',
  '大海水': 'Water of the Great Sea',
};

export function getNayin(cycleIndex: number): string {
  return NAYIN_TABLE[Math.floor(cycleIndex / 2)] || '海中金';
}
