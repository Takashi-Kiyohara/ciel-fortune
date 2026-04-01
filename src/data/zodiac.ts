export type ZodiacSign = {
  sign: string;
  label: string;
  emoji: string;
  dates: string;
  element: "火" | "地" | "風" | "水";
  ruler: string;
  trait: string;
};

/**
 * 12星座マスターデータ
 * fortune ページの星座セレクターと API のパーソナライズで共通使用
 */
export const zodiacSigns: ZodiacSign[] = [
  { sign: "aries",       label: "牡羊座", emoji: "\u2648", dates: "3/21-4/19",   element: "火", ruler: "火星",   trait: "情熱的で直感的な恋をする" },
  { sign: "taurus",      label: "牡牛座", emoji: "\u2649", dates: "4/20-5/20",   element: "地", ruler: "金星",   trait: "安定した深い愛情を育む" },
  { sign: "gemini",      label: "双子座", emoji: "\u264A", dates: "5/21-6/21",   element: "風", ruler: "水星",   trait: "知的な会話から恋が始まる" },
  { sign: "cancer",      label: "蟹座",   emoji: "\u264B", dates: "6/22-7/22",   element: "水", ruler: "月",     trait: "包み込むような優しさで愛する" },
  { sign: "leo",         label: "獅子座", emoji: "\u264C", dates: "7/23-8/22",   element: "火", ruler: "太陽",   trait: "ドラマチックで一途な恋をする" },
  { sign: "virgo",       label: "乙女座", emoji: "\u264D", dates: "8/23-9/22",   element: "地", ruler: "水星",   trait: "繊細な気遣いで愛を示す" },
  { sign: "libra",       label: "天秤座", emoji: "\u264E", dates: "9/23-10/23",  element: "風", ruler: "金星",   trait: "調和と美しさを大切にする" },
  { sign: "scorpio",     label: "蠍座",   emoji: "\u264F", dates: "10/24-11/22", element: "水", ruler: "冥王星", trait: "深く激しい愛に生きる" },
  { sign: "sagittarius", label: "射手座", emoji: "\u2650", dates: "11/23-12/21", element: "火", ruler: "木星",   trait: "自由で冒険的な恋を好む" },
  { sign: "capricorn",   label: "山羊座", emoji: "\u2651", dates: "12/22-1/19",  element: "地", ruler: "土星",   trait: "誠実にゆっくりと愛を深める" },
  { sign: "aquarius",    label: "水瓶座", emoji: "\u2652", dates: "1/20-2/18",   element: "風", ruler: "天王星", trait: "独自の価値観で相手を選ぶ" },
  { sign: "pisces",      label: "魚座",   emoji: "\u2653", dates: "2/19-3/20",   element: "水", ruler: "海王星", trait: "夢見るようなロマンチストの恋" },
];

/** sign key → label の変換マップ */
export const zodiacLabels: Record<string, string> = Object.fromEntries(
  zodiacSigns.map((z) => [z.sign, z.label])
);

/** sign key が有効かどうか */
export function isValidZodiac(sign: string): boolean {
  return zodiacSigns.some((z) => z.sign === sign);
}

/** sign key → 完全情報 */
export function getZodiacInfo(sign: string): ZodiacSign | undefined {
  return zodiacSigns.find((z) => z.sign === sign);
}
