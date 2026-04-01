// v2: 8占い（恋愛特化・深く）
export type Fortune = {
  slug: string;
  name: string;
  nameEn: string;
  region: string;
  regionEn: string;
  emoji: string;
  category: string;
  lovePoint: string;
  shortDescription: string;
  misaStory: string;
  inputType: "zodiac" | "birthday" | "free" | "card-draw";
  comingSoon: boolean;
};

// 相性の良い占いの組み合わせ（slug → complementary slugs）
export const fortunePairs: Record<string, string[]> = {
  tarot: ["western-astrology", "oracle-card"],
  "western-astrology": ["four-pillars", "numerology"],
  "four-pillars": ["vedic", "western-astrology"],
  rune: ["tarot", "coffee"],
  coffee: ["oracle-card", "rune"],
  numerology: ["four-pillars", "vedic"],
  vedic: ["numerology", "western-astrology"],
  "oracle-card": ["tarot", "coffee"],
};

export const fortunes: Fortune[] = [
  {
    slug: "tarot",
    name: "タロットリーディング",
    nameEn: "Tarot Reading",
    region: "フランス・パリ",
    regionEn: "Paris, France",
    emoji: "\u{1F0CF}",
    category: "タロット",
    lovePoint: "恋愛の行方・相性診断",
    shortDescription: "マレ地区の裏路地で出会った老婦人から教わった、本場のタロットリーディング",
    misaStory: "パリのフライトで3日間のステイ。マレ地区の小さな占い館で出会ったマダム・クレールから、恋愛に特化したスプレッドを学びました。",
    inputType: "card-draw",
    comingSoon: false,
  },
  {
    slug: "western-astrology",
    name: "西洋占星術",
    nameEn: "Western Astrology",
    region: "ヨーロッパ",
    regionEn: "Europe",
    emoji: "\u2728",
    category: "占星術",
    lovePoint: "恋愛運・相性診断・運命の人",
    shortDescription: "北欧の澄んだ夜空に輝く星々が教える、あなたの恋の行方（太陽星座版）",
    misaStory: "ストックホルムの天文台で出会った占星術師から、太陽星座が恋愛に与える影響を学びました。出生時刻がわかれば月星座や金星の位置も読めるのですが、まずは太陽星座から恋のヒントをお届けしますね。",
    inputType: "birthday",
    comingSoon: false,
  },
  {
    slug: "four-pillars",
    name: "四柱推命",
    nameEn: "Four Pillars of Destiny",
    region: "中国・北京",
    regionEn: "Beijing, China",
    emoji: "\u{1F3EF}",
    category: "四柱推命",
    lovePoint: "生年月日から恋愛傾向を読み解く",
    shortDescription: "生年月日から四つの柱を読み解く、あなたの恋愛パターンと運命の設計図（簡易版）",
    misaStory: "北京のステイで訪れた古い胡同の占い師。誕生日の「四つの柱」から、恋愛における引き寄せの法則を教えてもらいました。",
    inputType: "birthday",
    comingSoon: false,
  },
  {
    slug: "rune",
    name: "ルーンオラクル",
    nameEn: "Rune Oracle",
    region: "北欧・アイスランド",
    regionEn: "Iceland",
    emoji: "\u{1FA78}",
    category: "ルーン",
    lovePoint: "恋愛の障害と乗り越え方",
    shortDescription: "オーロラの下で古代ルーン文字が紡ぐ、恋の行方のメッセージ",
    misaStory: "レイキャビクのフライトで出会ったアイスランド人のパイロットから教わった、ヴァイキングの恋占い。",
    inputType: "card-draw",
    comingSoon: false,
  },
  {
    slug: "coffee",
    name: "コーヒーカップ占い",
    nameEn: "Turkish Coffee Reading",
    region: "トルコ・イスタンブール",
    regionEn: "Istanbul, Turkey",
    emoji: "\u2615",
    category: "コーヒー",
    lovePoint: "デート運・出会いの予感",
    shortDescription: "イスタンブールのカフェで飲み干したコーヒーカップの模様が語る恋の未来",
    misaStory: "イスタンブールのグランドバザール近くのカフェで。飲み終わったコーヒーカップをひっくり返すと、模様が恋の未来を映し出すんです。",
    inputType: "free",
    comingSoon: false,
  },
  {
    slug: "numerology",
    name: "数秘術",
    nameEn: "Numerology",
    region: "ギリシャ・アテネ",
    regionEn: "Athens, Greece",
    emoji: "\u{1F522}",
    category: "数秘術",
    lovePoint: "運命の人の誕生日との相性",
    shortDescription: "古代ギリシャの数秘術が、名前と数字から恋の相性を解き明かす",
    misaStory: "アテネの路地裏の小さな書店で見つけた古い数秘術の本。数字の組み合わせが恋のケミストリーを教えてくれます。",
    inputType: "birthday",
    comingSoon: false,
  },
  {
    slug: "vedic",
    name: "ヴェーダ占星術",
    nameEn: "Vedic Astrology",
    region: "インド・ジャイプール",
    regionEn: "Jaipur, India",
    emoji: "\u{1F549}",
    category: "ヴェーダ",
    lovePoint: "恋愛のカルマと前世からの縁",
    shortDescription: "5000年の歴史を持つインドの叡智が、誕生日から恋の縁を導く（簡易版）",
    misaStory: "ジャイプールの宮殿ホテルで出会ったヴェーダ占星術師。本来は出生時刻と場所から詳細なチャートを作りますが、ここでは誕生日をもとに恋愛のカルマを簡易的に読み解きます。",
    inputType: "birthday",
    comingSoon: false,
  },
  {
    slug: "oracle-card",
    name: "オラクルカード",
    nameEn: "Oracle Card",
    region: "ハワイ・マウイ島",
    regionEn: "Maui, Hawaii",
    emoji: "\u{1F338}",
    category: "オラクル",
    lovePoint: "恋愛の悩みに対するメッセージ",
    shortDescription: "ハワイの風が運ぶオラクルカードのメッセージが、あなたの恋の悩みに光を灯す",
    misaStory: "マウイ島のビーチで出会ったヒーラーから授かったオラクルデッキ。恋に迷ったとき、1枚引くだけで心が軽くなります。",
    inputType: "card-draw",
    comingSoon: false,
  },
];
