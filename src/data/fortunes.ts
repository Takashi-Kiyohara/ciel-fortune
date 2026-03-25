export const categories = [
  { id: "all", label: "全て表示" },
  { id: "tarot-card", label: "タロット・カード" },
  { id: "astrology", label: "占星術・星占い" },
  { id: "numerology", label: "数秘術・暦" },
  { id: "palmistry", label: "手相・身体" },
  { id: "tasseography", label: "飲み物・食べ物" },
  { id: "crystal", label: "水晶・クリスタル" },
  { id: "nature", label: "骨・自然物" },
  { id: "rune", label: "ルーン・文字" },
  { id: "dream", label: "夢・精霊" },
  { id: "fengshui", label: "風水・環境" },
  { id: "oracle", label: "詩・神託" },
  { id: "ritual", label: "儀式・伝統" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type Fortune = {
  slug: string;
  country: string;
  city?: string;
  name: string;
  category: Exclude<Category, "all">;
  lat: number;
  lng: number;
  shortDescription: string;
  comingSoon: boolean;
};

export const fortunes: Fortune[] = [
  // ===== ヨーロッパ — 15 =====
  { slug: "france-tarot", country: "フランス", city: "パリ", name: "タロットリーディング", category: "tarot-card", lat: 48.8566, lng: 2.3522, shortDescription: "マレ地区の裏路地で出会った老婦人から教わった、本場のタロットリーディング", comingSoon: true },
  { slug: "uk-tea-leaf", country: "イギリス", city: "ロンドン", name: "ティーリーフ占い", category: "tasseography", lat: 51.5074, lng: -0.1278, shortDescription: "ロンドンの老舗ティーハウスで受け継がれる、茶葉が語る未来の物語", comingSoon: true },
  { slug: "iceland-rune", country: "アイスランド", name: "ルーン占い", category: "rune", lat: 64.1466, lng: -21.9426, shortDescription: "オーロラの下で古代ルーン文字が紡ぐ、北の大地のメッセージ", comingSoon: true },
  { slug: "greece-oracle", country: "ギリシャ", name: "オラクル神託占い", category: "oracle", lat: 37.9838, lng: 23.7275, shortDescription: "デルフォイの神殿に響く、古代ギリシャの神託の声", comingSoon: true },
  { slug: "italy-cartomancy", country: "イタリア", name: "ナポリ式カルトマンシー", category: "tarot-card", lat: 40.8518, lng: 14.2681, shortDescription: "ナポリの路地裏で密かに受け継がれる、イタリア伝統のカード占い", comingSoon: true },
  { slug: "spain-flamenco-card", country: "スペイン", name: "フラメンコ・カード占い", category: "tarot-card", lat: 40.4168, lng: -3.7038, shortDescription: "情熱の国スペインで生まれた、フラメンコの魂を宿すカード占い", comingSoon: true },
  { slug: "germany-lenormand", country: "ドイツ", name: "レノルマンカード占い", category: "tarot-card", lat: 52.52, lng: 13.405, shortDescription: "19世紀ドイツで生まれた、36枚のカードが織りなす人生の物語", comingSoon: true },
  { slug: "ireland-ogham", country: "アイルランド", name: "ケルティック・オガム占い", category: "rune", lat: 53.3498, lng: -6.2603, shortDescription: "ケルトの聖なる木々に刻まれた、古代オガム文字の導き", comingSoon: true },
  { slug: "norway-viking-rune", country: "ノルウェー", name: "ヴァイキング・ルーン占い", category: "rune", lat: 59.9139, lng: 10.7522, shortDescription: "フィヨルドの地で受け継がれる、ヴァイキングのルーン石の知恵", comingSoon: true },
  { slug: "russia-slavic-card", country: "ロシア", name: "スラヴ式カード占い", category: "tarot-card", lat: 55.7558, lng: 37.6173, shortDescription: "ロシアの長い冬の夜に紡がれてきた、スラヴ民族のカード占い", comingSoon: true },
  { slug: "portugal-fado", country: "ポルトガル", name: "ファド占い", category: "oracle", lat: 38.7223, lng: -9.1393, shortDescription: "リスボンの路地に響くファドの旋律が伝える、運命のメッセージ", comingSoon: true },
  { slug: "czech-crystal", country: "チェコ", city: "プラハ", name: "ボヘミアン水晶占い", category: "crystal", lat: 50.0755, lng: 14.4378, shortDescription: "ボヘミアガラスの都で磨かれた、水晶球が映す未来の景色", comingSoon: true },
  { slug: "romania-gypsy-card", country: "ルーマニア", name: "ジプシー・カード占い", category: "tarot-card", lat: 44.4268, lng: 26.1025, shortDescription: "カルパチアの森を旅する民が伝える、古くからのカード占いの知恵", comingSoon: true },
  { slug: "sweden-nordic-astrology", country: "スウェーデン", name: "北欧星座占い", category: "astrology", lat: 59.3293, lng: 18.0686, shortDescription: "北欧の澄んだ夜空に輝く星々が教える、あなたの運命の道筋", comingSoon: true },
  { slug: "poland-beeswax", country: "ポーランド", name: "スラヴ式蜜蝋占い", category: "nature", lat: 52.2297, lng: 21.0122, shortDescription: "溶けた蜜蝋が冷水の中で描く形が、未来のヒントを語りかける", comingSoon: true },

  // ===== アジア — 18 =====
  { slug: "japan-palmistry", country: "日本", city: "京都", name: "手相鑑定", category: "palmistry", lat: 35.0116, lng: 135.7681, shortDescription: "祇園で出会った100歳のおばあちゃんが教えてくれた、手のひらの秘密", comingSoon: true },
  { slug: "japan-omikuji", country: "日本", city: "東京", name: "おみくじ", category: "oracle", lat: 35.6762, lng: 139.6503, shortDescription: "浅草寺の朝靄の中で引いた一枚が、今日の指針を示してくれる", comingSoon: true },
  { slug: "china-four-pillars", country: "中国", city: "北京", name: "四柱推命", category: "numerology", lat: 39.9042, lng: 116.4074, shortDescription: "生年月日時の四つの柱から読み解く、あなたの運命の設計図", comingSoon: true },
  { slug: "china-fengshui", country: "中国", city: "香港", name: "風水鑑定", category: "fengshui", lat: 22.3193, lng: 114.1694, shortDescription: "香港の摩天楼を支える風水の知恵を、あなたの暮らしにも", comingSoon: true },
  { slug: "korea-saju", country: "韓国", name: "サジュ（四柱推命）", category: "numerology", lat: 37.5665, lng: 126.978, shortDescription: "韓国で広く親しまれる四柱推命。生まれた時間が運命の鍵を握る", comingSoon: true },
  { slug: "india-vedic", country: "インド", name: "ヴェーダ占星術", category: "astrology", lat: 28.6139, lng: 77.209, shortDescription: "5000年の歴史を持つインドの叡智が、星の配置からあなたを導く", comingSoon: true },
  { slug: "indonesia-aura", country: "インドネシア", city: "バリ", name: "オーラカラー診断", category: "palmistry", lat: -8.3405, lng: 115.092, shortDescription: "バリのヒーラーが見つめるあなたのオーラの色が、心の状態を映し出す", comingSoon: true },
  { slug: "thailand-birthday", country: "タイ", name: "仏教式誕生曜日占い", category: "astrology", lat: 13.7563, lng: 100.5018, shortDescription: "タイでは誕生曜日があなたの性格と運命を決める、と信じられています", comingSoon: true },
  { slug: "vietnam-zodiac", country: "ベトナム", name: "十二支占い", category: "numerology", lat: 21.0285, lng: 105.8542, shortDescription: "ベトナムの十二支は猫年がある独自の暦で、あなたの本質を読み解く", comingSoon: true },
  { slug: "philippines-hilot", country: "フィリピン", name: "ヒロット・ヒーリング占い", category: "palmistry", lat: 14.5995, lng: 120.9842, shortDescription: "フィリピン伝統のヒーリング術が、身体の声を通じて未来を伝える", comingSoon: true },
  { slug: "myanmar-weekday", country: "ミャンマー", name: "ビルマ式曜日占い", category: "astrology", lat: 16.8661, lng: 96.1951, shortDescription: "パゴダの八曜日の守護動物が、あなたの運勢を見守る", comingSoon: true },
  { slug: "nepal-mo", country: "ネパール", name: "チベット密教モー占い", category: "dream", lat: 27.7172, lng: 85.324, shortDescription: "ヒマラヤの修行僧がサイコロで読み解く、チベット密教の神秘の占い", comingSoon: true },
  { slug: "sri-lanka-ayurveda", country: "スリランカ", name: "アーユルヴェーダ体質占い", category: "palmistry", lat: 6.9271, lng: 79.8612, shortDescription: "古代インドの医学が教える、あなたの体質と心のバランス", comingSoon: true },
  { slug: "malaysia-dream", country: "マレーシア", name: "イスラム式夢占い", category: "dream", lat: 3.139, lng: 101.6869, shortDescription: "イスラムの伝統に基づく夢の解釈が、あなたの深層心理を照らす", comingSoon: true },
  { slug: "mongolia-bone", country: "モンゴル", name: "シャーマン骨占い", category: "nature", lat: 47.8864, lng: 106.9057, shortDescription: "大草原のシャーマンが羊の骨で読む、遊牧民の知恵の占い", comingSoon: true },
  { slug: "cambodia-khmer", country: "カンボジア", name: "クメール暦占い", category: "numerology", lat: 11.5564, lng: 104.9282, shortDescription: "アンコールワットの遺跡に刻まれた暦が、あなたの周期を教える", comingSoon: true },
  { slug: "taiwan-ziwei", country: "台湾", name: "紫微斗数", category: "astrology", lat: 25.033, lng: 121.5654, shortDescription: "台湾で人気の紫微斗数。生まれた瞬間の星の配置が人生の地図になる", comingSoon: true },
  { slug: "singapore-jiuxing", country: "シンガポール", name: "九星気学", category: "fengshui", lat: 1.3521, lng: 103.8198, shortDescription: "東洋の叡智・九星気学で、あなたの運気の流れと方位を読み解く", comingSoon: true },

  // ===== 中東・アフリカ — 10 =====
  { slug: "turkey-coffee", country: "トルコ", name: "コーヒー占い", category: "tasseography", lat: 41.0082, lng: 28.9784, shortDescription: "イスタンブールのカフェで飲み干したコーヒーカップの模様が語る未来", comingSoon: true },
  { slug: "egypt-tarot", country: "エジプト", name: "エジプシャン・タロット", category: "tarot-card", lat: 30.0444, lng: 31.2357, shortDescription: "ピラミッドの地で生まれたとされる、最古のタロットの系譜", comingSoon: true },
  { slug: "morocco-sand", country: "モロッコ", name: "砂占い", category: "nature", lat: 31.6295, lng: -7.9811, shortDescription: "サハラの砂漠で砂に描かれた模様が、旅人の運命を教える", comingSoon: true },
  { slug: "israel-kabbalah", country: "イスラエル", name: "カバラ数秘術", category: "numerology", lat: 31.7683, lng: 35.2137, shortDescription: "ユダヤ神秘主義カバラの数秘術が、名前と数字から魂の目的を解き明かす", comingSoon: true },
  { slug: "iran-hafez", country: "イラン", name: "ハーフェズ詩占い", category: "oracle", lat: 35.6892, lng: 51.389, shortDescription: "ペルシャの詩聖ハーフェズの詩集を開き、偶然の一節が答えを示す", comingSoon: true },
  { slug: "ethiopia-coffee", country: "エチオピア", name: "コーヒーセレモニー占い", category: "tasseography", lat: 9.145, lng: 40.4897, shortDescription: "コーヒー発祥の地で行われる神聖なセレモニーが、吉凶を告げる", comingSoon: true },
  { slug: "nigeria-ifa", country: "ナイジェリア", name: "イファ占い", category: "ritual", lat: 9.082, lng: 8.6753, shortDescription: "ヨルバ族の神官が椰子の実で読む、ユネスコ無形文化遺産の占い", comingSoon: true },
  { slug: "kenya-maasai-bead", country: "ケニア", name: "マサイ族のビーズ占い", category: "nature", lat: -1.2921, lng: 36.8219, shortDescription: "マサイの戦士が色鮮やかなビーズの配列で読む、大地の声", comingSoon: true },
  { slug: "ghana-akan-day", country: "ガーナ", name: "アカン族の曜日占い", category: "astrology", lat: 5.6037, lng: -0.187, shortDescription: "生まれた曜日が魂の名前を決める、アカン族の伝統的な命名占い", comingSoon: true },
  { slug: "south-africa-sangoma", country: "南アフリカ", name: "サンゴーマ骨占い", category: "nature", lat: -33.9249, lng: 18.4241, shortDescription: "南アフリカの伝統的ヒーラーが動物の骨を投げて読む、祖先の声", comingSoon: true },

  // ===== 北米・中南米 — 12 =====
  { slug: "usa-numerology", country: "アメリカ", city: "ニューヨーク", name: "数秘術", category: "numerology", lat: 40.7128, lng: -74.006, shortDescription: "NYのスピリチュアルサロンで出会った、数字が語る人生のブループリント", comingSoon: true },
  { slug: "usa-crystal", country: "アメリカ", city: "ロサンゼルス", name: "クリスタルヒーリング占い", category: "crystal", lat: 34.0522, lng: -118.2437, shortDescription: "LAのヒーラーが選ぶクリスタルが、あなたのエネルギーを映し出す", comingSoon: true },
  { slug: "usa-voodoo-tarot", country: "アメリカ", city: "ニューオーリンズ", name: "ブードゥー・タロット", category: "ritual", lat: 29.9511, lng: -90.0715, shortDescription: "ニューオーリンズの夜に息づくブードゥーの伝統が宿るタロット", comingSoon: true },
  { slug: "mexico-maya", country: "メキシコ", name: "マヤ暦占い", category: "numerology", lat: 19.4326, lng: -99.1332, shortDescription: "古代マヤ文明が残した精緻な暦が、あなたの魂の役割を教える", comingSoon: true },
  { slug: "brazil-candomble", country: "ブラジル", name: "カンドンブレ貝殻占い", category: "ritual", lat: -12.9714, lng: -38.5124, shortDescription: "ブラジルの聖なる貝殻が床に描く模様から、オリシャの声を聴く", comingSoon: true },
  { slug: "peru-coca-leaf", country: "ペルー", name: "コカの葉占い", category: "nature", lat: -13.5319, lng: -71.9675, shortDescription: "アンデスの高地でシャーマンがコカの葉を読む、インカの聖なる占い", comingSoon: true },
  { slug: "argentina-mate", country: "アルゼンチン", name: "ガウチョ式マテ茶占い", category: "tasseography", lat: -34.6037, lng: -58.3816, shortDescription: "パンパの草原でガウチョが飲み干したマテ茶の残りが語る物語", comingSoon: true },
  { slug: "colombia-ayahuasca", country: "コロンビア", name: "シャーマン・アヤワスカ占い", category: "dream", lat: 4.711, lng: -74.0721, shortDescription: "アマゾンの奥地でシャーマンが導く、精霊との対話の占い", comingSoon: true },
  { slug: "cuba-santeria", country: "キューバ", name: "サンテリア占い", category: "ritual", lat: 23.1136, lng: -82.3666, shortDescription: "キューバの街角で出会った、アフリカとカリブが融合した神秘の占い", comingSoon: true },
  { slug: "guatemala-maya-nawal", country: "グアテマラ", name: "マヤ・ナワール占い", category: "numerology", lat: 14.6349, lng: -90.5069, shortDescription: "マヤのナワール（守護霊）があなたの生まれ持った使命を教える", comingSoon: true },
  { slug: "chile-mapuche", country: "チリ", name: "マプチェ族の夢占い", category: "dream", lat: -33.4489, lng: -70.6693, shortDescription: "パタゴニアの先住民マプチェ族が大切にする、夢を通じた精霊の導き", comingSoon: true },
  { slug: "haiti-voodoo-card", country: "ハイチ", name: "ブードゥー式カード占い", category: "ritual", lat: 18.9712, lng: -72.2852, shortDescription: "カリブの島に息づくブードゥーの精霊が、カードを通じて語りかける", comingSoon: true },

  // ===== オセアニア — 5 =====
  { slug: "australia-dreamtime", country: "オーストラリア", name: "アボリジニ・ドリームタイム占い", category: "dream", lat: -33.8688, lng: 151.2093, shortDescription: "大地の記憶「ドリームタイム」が伝える、太古からの魂のメッセージ", comingSoon: true },
  { slug: "new-zealand-maori", country: "ニュージーランド", name: "マオリ族のタトゥー占い", category: "palmistry", lat: -36.8485, lng: 174.7633, shortDescription: "マオリのモコ（タトゥー）の模様が語る、あなたの魂の系譜", comingSoon: true },
  { slug: "hawaii-hooponopono", country: "ハワイ", name: "ホ・オポノポノ占い", category: "fengshui", lat: 21.3069, lng: -157.8583, shortDescription: "ハワイの伝統的な癒しの儀式が、心のバランスを整える", comingSoon: true },
  { slug: "fiji-kava", country: "フィジー", name: "カバ茶占い", category: "tasseography", lat: -17.7134, lng: 178.065, shortDescription: "フィジーの村で酋長と囲むカバの杯が、島の精霊の声を伝える", comingSoon: true },
  { slug: "papua-new-guinea-spirit", country: "パプアニューギニア", name: "精霊交信占い", category: "dream", lat: -6.314, lng: 143.9555, shortDescription: "ジャングルの奥地で精霊と交信する、太古から続く神秘の占い", comingSoon: true },
];

// おすすめ占い（Misaのおすすめカードに使用）
export const recommendedSlugs = [
  "france-tarot",
  "sweden-nordic-astrology",
  "usa-numerology",
  "japan-palmistry",
];

// 相性マトリクスのデータ
export const matrixPurposes = [
  "恋愛", "仕事", "人間関係", "金運", "健康", "転機", "命名", "引越し", "自己理解",
] as const;

export const matrixCategories = [
  "タロット・カード",
  "占星術・星占い",
  "数秘術・暦",
  "手相・身体",
  "飲み物・食べ物",
  "水晶・クリスタル",
  "ルーン・文字",
  "夢・精霊",
  "風水・環境",
] as const;

// ◎ = 2, ○ = 1, △ = 0.5, (空白) = 0
export const matrixData: number[][] = [
  // 恋  仕  人  金  健  転  命  引  自
  [  2,  2,  2,  1, .5,  2, .5,  1,  2 ], // タロット
  [  2,  2,  1,  1,  1,  2,  2,  2,  2 ], // 占星術
  [  1,  2,  1,  2, .5,  2,  2,  1,  2 ], // 数秘術
  [  2,  1,  1,  1,  2,  1, .5, .5,  2 ], // 手相
  [  1, .5,  2, .5, .5,  1, .5, .5,  1 ], // 飲み物
  [  2,  1,  1,  1,  2,  2, .5,  1,  2 ], // 水晶
  [  1,  1,  1, .5, .5,  2,  1,  1,  2 ], // ルーン
  [  1, .5,  1, .5,  1,  2, .5,  1,  2 ], // 夢
  [ .5,  2,  1,  2,  1,  1,  1,  2,  1 ], // 風水
];
