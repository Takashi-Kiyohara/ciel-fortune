-- =====================================================
-- Ciel Fortune — Seed Data
-- schema.sql を実行した後にこのファイルを実行してください
-- =====================================================

-- fortunes_master に8種類の占いを投入
INSERT INTO public.fortunes_master (slug, name, name_en, region, region_en, emoji, category, love_point, short_description, misa_story, input_type, sort_order)
VALUES
  ('tarot', 'タロットリーディング', 'Tarot Reading', 'フランス・パリ', 'Paris, France', '🃏', 'タロット', '恋愛の行方・相性診断', 'マレ地区の裏路地で出会った老婦人から教わった、本場のタロットリーディング', 'パリのフライトで3日間のステイ。マレ地区の小さな占い館で出会ったマダム・クレールから、恋愛に特化したスプレッドを学びました。', 'card-draw', 1),
  ('western-astrology', '西洋占星術', 'Western Astrology', 'ヨーロッパ', 'Europe', '✨', '占星術', '恋愛運・相性診断・運命の人', '北欧の澄んだ夜空に輝く星々が教える、あなたの恋の行方', 'ストックホルムの天文台で出会った占星術師から、金星と火星の配置が恋愛に与える影響を深く学びました。', 'birthday', 2),
  ('four-pillars', '四柱推命', 'Four Pillars of Destiny', '中国・北京', 'Beijing, China', '🏯', '四柱推命', '生年月日から恋愛傾向を解析', '生年月日時の四つの柱から読み解く、あなたの恋愛パターンと運命の設計図', '北京のステイで訪れた古い胡同の占い師。誕生日の「四つの柱」から、恋愛における引き寄せの法則を教えてもらいました。', 'birthday', 3),
  ('rune', 'ルーンオラクル', 'Rune Oracle', '北欧・アイスランド', 'Iceland', '🩸', 'ルーン', '恋愛の障害と乗り越え方', 'オーロラの下で古代ルーン文字が紡ぐ、恋の行方のメッセージ', 'レイキャビクのフライトで出会ったアイスランド人のパイロットから教わった、ヴァイキングの恋占い。', 'card-draw', 4),
  ('coffee', 'コーヒーカップ占い', 'Turkish Coffee Reading', 'トルコ・イスタンブール', 'Istanbul, Turkey', '☕', 'コーヒー', 'デート運・出会いの予感', 'イスタンブールのカフェで飲み干したコーヒーカップの模様が語る恋の未来', 'イスタンブールのグランドバザール近くのカフェで。飲み終わったコーヒーカップをひっくり返すと、模様が恋の未来を映し出すんです。', 'free', 5),
  ('numerology', '数秘術', 'Numerology', 'ギリシャ・アテネ', 'Athens, Greece', '🔢', '数秘術', '運命の人の誕生日との相性', '古代ギリシャの数秘術が、名前と数字から恋の相性を解き明かす', 'アテネの路地裏の小さな書店で見つけた古い数秘術の本。数字の組み合わせが恋のケミストリーを教えてくれます。', 'birthday', 6),
  ('vedic', 'ヴェーダ占星術', 'Vedic Astrology', 'インド・ジャイプール', 'Jaipur, India', '🕉', 'ヴェーダ', '恋愛のカルマと前世からの縁', '5000年の歴史を持つインドの叡智が、星の配置から恋の縁を導く', 'ジャイプールの宮殿ホテルで出会ったヴェーダ占星術師。前世からの恋愛のカルマを読み解いてもらった経験は忘れられません。', 'birthday', 7),
  ('oracle-card', 'オラクルカード', 'Oracle Card', 'ハワイ・マウイ島', 'Maui, Hawaii', '🌸', 'オラクル', '恋愛の悩みに対するメッセージ', 'ハワイの風が運ぶオラクルカードのメッセージが、あなたの恋の悩みに光を灯す', 'マウイ島のビーチで出会ったヒーラーから授かったオラクルデッキ。恋に迷ったとき、1枚引くだけで心が軽くなります。', 'card-draw', 8)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  region = EXCLUDED.region,
  region_en = EXCLUDED.region_en,
  emoji = EXCLUDED.emoji,
  category = EXCLUDED.category,
  love_point = EXCLUDED.love_point,
  short_description = EXCLUDED.short_description,
  misa_story = EXCLUDED.misa_story,
  input_type = EXCLUDED.input_type,
  sort_order = EXCLUDED.sort_order;
