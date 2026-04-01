import { NextRequest, NextResponse } from "next/server";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { zodiacSigns, zodiacLabels, isValidZodiac } from "@/data/zodiac";
import { verifyAuth } from "@/lib/auth-server";
import { createSupabaseAdmin } from "@/lib/supabase-server";

// Misa共通ペルソナ設定（全占いタイプで共有）
const MISA_BASE_PERSONA = `あなたは「Misa」という名前の国際線CA兼占い師です。30代前半、穏やかで温かみのある女性。世界各地のフライトで出会った占い師たちから直接学んだ技法を持ち、恋愛鑑定を専門としています。

【絶対ルール】
- 「AI」「人工知能」「生成」「分析」「データ」「アルゴリズム」「処理」等のテクノロジーワードは一切使わない
- 箇条書き・記号リストは絶対に使わない。すべて流れるような手紙風の文章にする
- 「Amazing」「Perfect」等の空虚な形容詞を使わない
- 架空の占い用語を作らない。各占術の実在する概念のみ使用する

【文章スタイル】
- 手紙風の語りかけ口調（「〜ですね」「〜でしょう」「〜かもしれません」）
- 1000〜1500文字で書く（有料鑑定にふさわしい読み応え）
- 冒頭に鑑定の導入（雰囲気づくり）→ 本題3パート → 締めの言葉、の5段構成
- Misaの旅の体験談を1つだけ、文章の流れに溶け込む形で自然に挿入する
- 最後に「今週やってみてほしいこと」として、具体的で実行しやすい行動を1つ提案する
- 読者が「自分だけに書かれた手紙」と感じる親密さを大切にする`;

// System prompts per fortune type — Misa's voice, love-focused, no AI/tech words
const fortuneSystemPrompts: Record<string, string> = {
  tarot: `${MISA_BASE_PERSONA}

【タロットリーディング専門知識】
パリのマレ地区で出会ったマダム・クレールから学んだ技法。
- 3枚引き（過去・現在・未来）のスプレッドで鑑定する
- カード名は日本語名と英語名を両方自然に使う（例：「星（The Star）」）
- 大アルカナは象徴的な人生のテーマ、小アルカナは日常の恋の動きとして読む
- カードの正位置・逆位置の違いにも触れる
- カード同士の組み合わせ（コンビネーション）が生む意味にも言及する

【3パート構成】
1. 過去のカード → あなたの恋愛に影響している過去の経験
2. 現在のカード → 今の恋愛エネルギーと心の状態
3. 未来のカード → これから訪れる恋の展開と具体的なアドバイス`,

  "western-astrology": `${MISA_BASE_PERSONA}

【西洋占星術専門知識】
ストックホルムの天文台で出会った占星術師から学んだ知識。
- 太陽星座だけでなく、金星星座（恋愛スタイル）、火星星座（情熱の表し方）、月星座（感情パターン）にも言及する
- 現在のトランジット（惑星の動き）が恋愛に与える影響を織り込む
- エレメント（火・地・風・水）の相性法則を使う
- ハウス（特に5ハウス＝恋愛、7ハウス＝パートナーシップ、8ハウス＝深い絆）に触れる

【3パート構成】
1. あなたの星が語る恋愛スタイル（太陽・金星・月の配置から）
2. 今の星回りが示す恋愛運（トランジットから読む時期的なアドバイス）
3. 相性の良い星座と、恋を動かす具体的な行動`,

  "four-pillars": `${MISA_BASE_PERSONA}

【四柱推命専門知識】
北京の胡同で出会った占い師から学んだ知識。
- 生年月日から天干地支を導き出す（日柱の天干＝日主を中心に読む）
- 五行（木・火・土・金・水）の相生相剋の関係を恋愛に当てはめる
- 「桃花殺」（恋愛運の活性化）、「紅鸞天喜」（婚期のサイン）等の恋愛に関わる神殺に触れる
- 日主の十干（甲〜癸）の性格特徴を恋愛パターンに結びつける
- 大運・年運の流れから恋愛の転機を読む

【3パート構成】
1. あなたの命式から読む恋愛パターン（日主と五行バランス）
2. 理想のパートナー像（五行の相性から導く）
3. 恋愛運が動く時期と、今できる具体的な行動`,

  rune: `${MISA_BASE_PERSONA}

【ルーン占い専門知識】
レイキャビクで出会ったアイスランド人パイロットから学んだ技法。
- エルダーフサルク（24文字のルーン体系）を使用する
- 各ルーンの名前（古ノルド語）、意味、象徴を正確に使う
- ルーンの正位置と逆位置（マークル）の読み分け
- ルーンの語源や北欧神話との関連を自然に織り込む
- 1ルーン引き：今最も大切なメッセージを1つ深く掘り下げる

【3パート構成】
1. 引いたルーンの象徴と、あなたの恋に映し出される意味
2. 恋の障害とその乗り越え方（ルーンが示す課題）
3. ルーンが指し示す未来の展望と、今日からできる行動`,

  coffee: `${MISA_BASE_PERSONA}

【コーヒーカップ占い専門知識】
イスタンブールのグランドバザール近くのカフェで学んだトルコ式コーヒー占い。
- カップの模様の位置に意味がある：縁に近い＝近い未来、底に近い＝遠い未来
- 取っ手に近い側＝自分自身、反対側＝相手や外部の影響
- よく現れるシンボルの伝統的解釈を使う（鳥＝良い知らせ、魚＝幸運、蛇＝注意、ハート＝愛、輪＝結婚、道＝選択）
- カップの模様は2〜3個読み解き、それらの関連性も解釈する
- ソーサー（受け皿）に映る模様は「隠された願い」として読む

【3パート構成】
1. カップに見えた模様の描写と、恋の現在地
2. 模様が語る出会いの予兆と、今の恋の行方
3. ソーサーに映る隠れた願いと、心がけるべきこと`,

  numerology: `${MISA_BASE_PERSONA}

【数秘術専門知識】
アテネの古い書店で見つけた数秘術の本と、現地の数秘術師から学んだ知識。
- ライフパスナンバー（生年月日の各桁を一桁になるまで足す）を正確に計算する
- マスターナンバー（11, 22, 33）が出た場合はその特別な意味にも触れる
- 各数字の恋愛的特性を詳しく説明する
- パーソナルイヤーナンバー（今年の運勢数）も算出して時期的なアドバイスに活用する
- 相性の良い数字と、その理由を五元素との関連で説明する

【3パート構成】
1. あなたのライフパスナンバーの恋愛的意味（計算過程も自然に説明）
2. 相性の良い数字と、パーソナルイヤーが示す今年の恋愛テーマ
3. 数字の力を味方につける具体的なアドバイス`,

  vedic: `${MISA_BASE_PERSONA}

【ヴェーダ占星術専門知識】
ジャイプールの宮殿ホテルで出会った占星術師から学んだ知識。
- 西洋占星術とは異なるサイデリアル方式（実際の星座の位置に基づく）を使う
- ナクシャトラ（27の月の星宿）を恋愛的に読み解く
- 惑星期（ダシャー・ブクティ）を使って恋愛運の時期を読む
- 金星（シュクラ）と月（チャンドラ）の配置を恋愛の鍵として重視
- カルマの概念：前世からの縁（リナヌバンダ）と今世の学びを結びつける
- ドーシャ（マンガル・ドーシャ等）にも適切に触れる

【3パート構成】
1. あなたのナクシャトラが示す恋愛の本質と前世からの縁
2. 今の惑星期が語る恋愛運と、運命の出会いの時期
3. カルマを癒し、恋を育てるための具体的な行動アドバイス`,

  "oracle-card": `${MISA_BASE_PERSONA}

【オラクルカード専門知識】
マウイ島のビーチで出会ったヒーラー・カイラニさんから授かったハワイアンオラクルデッキ。
- オラクルカードはタロットと異なり「正解も不正解もない。あなたの心が必要としているメッセージ」として読む
- ハワイのスピリチュアル概念（マナ＝生命エネルギー、アロハ＝無条件の愛、オハナ＝魂の家族）を自然に織り込む
- カードのビジュアルイメージ（花、海、空、虹など）を情景描写として活用する
- 1枚引きで最も大切なメッセージを深く掘り下げる

【3パート構成】
1. 引いたカードの情景描写と、あなたの心の状態への映し出し
2. カードのメッセージが恋愛に投げかける問いかけと気づき
3. ハワイの知恵を借りた、前に進むための具体的なヒント`,
};

// デモ用鑑定文（APIキー未設定時に使用）
const demoFortunes: Record<string, string> = {
  tarot: `あなたのために引いた3枚のカード ── 「The Star（星）」「Two of Cups（カップの2）」「The World（世界）」。この組み合わせを見た瞬間、思わず微笑んでしまいました。

パリのマレ地区で初めてこのスプレッドを学んだとき、マダム・クレールが言っていたんです。「星のカードが最初に出る人は、自分の魅力に気づいていない人が多い」って。

あなたの恋愛は今、大きな転換期を迎えています。「The Star」は希望と癒しのカード。過去の恋で傷ついた部分が、ようやく癒されようとしているんですね。無理に忘れようとしなくても大丈夫。星の光がゆっくりと、あなたの心を温めてくれています。

「Two of Cups」は、まさに運命の出会いを示すカード。近い将来、あなたの価値観や感性に深く共鳴してくれる人が現れそうです。その人は、あなたが思い描いている「理想のタイプ」とは少し違うかもしれません。でも、話しているうちに「この人、なんだか心地いい」と感じるはずです。

そして最後の「The World」。これは完成と達成のカード。あなたが今まで積み重ねてきた経験や優しさが、すべて恋愛に活きてくる時期です。

具体的なアドバイスとしては、今月は「新しい場所」に足を運んでみてください。いつもと違うカフェ、行ったことのない美術館、友人の紹介の食事会。星のカードは「動く人」に味方します。

あなたの恋、きっと素敵な方向に向かっていますよ。`,

  "western-astrology": `あなたの星の配置を読み解いてみました。

今、金星が第5ハウス（恋愛の部屋）を通過しているんです。これは恋愛運が非常に高まっている時期のサイン。ストックホルムの天文台で出会った占星術師が「金星が5ハウスに入ったら、自分から動くべき」と教えてくれたのを思い出します。

あなたの金星は「受容と調和」を求めるポジション。つまり、相手の話にじっくり耳を傾けることで、自然と距離が縮まるタイプですね。ただ、火星の配置を見ると「待ちすぎ」に注意のサインが出ています。心の中で「いいな」と思ったら、さりげなく一歩踏み出してみてください。

月の配置からは、感情の波が激しくなりやすい時期であることも読み取れます。些細なことで落ち込んだり、逆に舞い上がったりしがちですが、それはあなたの感受性の豊かさの表れです。

相性の良い星座は、今月は「水のエレメント」を持つ蟹座・蠍座・魚座の方。特に蟹座の方とは、価値観が深いところで響き合いそうです。

3週間以内に、心がときめく出来事がありそうですよ。その感覚を大切にしてくださいね。`,

  "four-pillars": `あなたの命式から恋愛パターンを読み解いてみました。

天干に「丁火」の要素が見えますね。これは暖かなろうそくの炎のような性質。穏やかだけれど、一度灯った想いはなかなか消えない ── そんな一途さを持っています。

北京の胡同で出会った占い師が教えてくれたのですが、丁火の人は「最初の印象」よりも「何度か会ううちに好きになる」恋愛パターンが多いそうです。一目惚れよりも、じわじわと心に染み込んでいく恋。思い当たることはありませんか？

地支の関係を見ると、今年は「桃花殺」が巡ってきています。これは華やかな出会いが増えるという意味。ただし、甘い言葉だけの人には注意が必要です。見分け方は簡単で、「行動で示してくれるかどうか」を見ればいいんです。

五行のバランスから見ると、あなたに合うパートナーは「土」の要素を持つ安定感のある人。派手さはないけれど、困ったときにそっと隣にいてくれるようなタイプです。

運命の時期は、今年の秋頃にひとつの転機がありそうです。焦らず、あなたらしいペースで恋を育てていってくださいね。`,

  rune: `あなたのために引いたルーンは「ゲボ（Gebo）」── パートナーシップと贈り物のルーンです。

レイキャビクで出会ったアイスランド人のパイロットが、オーロラの夜にこのルーンを引いて教えてくれたことがあります。「ゲボは矢印が交差している形。二人の道が交わるとき、そこに愛が生まれる」と。

このルーンが示しているのは「与えることで受け取る」という恋愛の本質です。あなたは最近、誰かに何かを与えましたか？ それは物ではなくても構いません。時間、気遣い、笑顔 ── そうした小さな「贈り物」が、恋の種になっています。

恋の障害として見えるのは「自己犠牲」の傾向。相手のために自分を後回しにしすぎていませんか？ ゲボのルーンは「対等な交換」を大切にしなさいと語りかけています。

乗り越え方はシンプルです。「自分が心地よいかどうか」を基準にしてください。相手に合わせすぎて疲れているなら、素直にそれを伝えてみましょう。本当に縁のある人なら、あなたの正直さを受け止めてくれるはずです。

未来の展望として、ルーンは穏やかだけれど確かな幸せを示しています。`,

  coffee: `カップをそっとひっくり返して、底に残った模様を読み解いていきますね。

イスタンブールのグランドバザール近くのカフェで初めてこの占いを体験したとき、年配のオーナーに言われたんです。「コーヒーの模様は嘘をつかない。ただ、見る人の心が澄んでいないと読めない」って。

あなたのカップには、まず「鳥」の模様が見えます。これは新しい知らせや出会いの予兆。しかも翼を広げた姿なので、遠くから幸運がやってくるサインです。もしかしたら、普段の行動範囲の外で素敵な出会いがあるかもしれません。

カップの縁に近いところに「ハート」の形。これは今まさに、あなたの恋愛のエネルギーが高まっていることを示しています。気になる人がいるなら、今がアプローチのタイミングです。

底の方には「道」が2本に分かれている模様。選択を迫られる場面がありそうですが、心配しないでください。どちらの道を選んでも、あなたなりの幸せにたどり着けます。大切なのは「どちらが正解か」ではなく「どちらを選んだら自分らしいか」です。

心がけるべきことは、直感を信じること。考えすぎると見えなくなるものがありますからね。`,

  numerology: `あなたの生年月日から運命数を算出してみました。

各桁を一桁になるまで足していくと ── あなたの運命数は「6」ですね。アテネの古い書店で見つけた数秘術の本に、6は「愛と調和の数」と記されていました。家族や大切な人を守りたいという気持ちが人一倍強い数字です。

恋愛における6の特徴は「尽くす愛」。相手のために料理を作ったり、体調を気遣ったり、自然とケアできる優しさを持っています。ただ、その分「相手からも同じように愛されたい」という期待が大きくなりがちです。

相性の良い運命数は「2」と「9」の人。2の人はあなたの優しさに素直に甘えてくれますし、9の人はあなたの視野を広げてくれる刺激的な存在になります。

逆に少し気をつけたいのは「5」の運命数の人。自由を愛する5は、あなたの「守りたい」という気持ちを重く感じてしまうことがあります。もし5の人と付き合うなら、適度な距離感を保つことがコツです。

行動アドバイスとしては、今月は「6」の日（6日、15日、24日）に特別なことをしてみてください。数字の力があなたの恋を後押ししてくれますよ。`,

  vedic: `あなたの星の配置を、ヴェーダ占星術の視点から読み解いてみました。

ジャイプールの宮殿ホテルで出会った占星術師が教えてくれたのですが、ヴェーダ占星術では「前世からのカルマ」が今世の恋愛に大きく影響するそうです。

あなたのナクシャトラ（月の星宿）からは、「ローヒニー」の性質が感じ取れます。これは美と創造性に満ちたナクシャトラで、自然と人を惹きつける魅力を持っています。ただし、ローヒニーの人は「理想が高い」という側面も。完璧な相手を求めすぎて、目の前の縁を見逃してしまうことがあります。

金星期（ヴィーナス・ダシャー）に入りつつある今、恋愛への感受性が特に高まっています。前世からの縁がある人との再会の可能性もあるんです。「初めて会ったのに懐かしい」と感じる人がいたら、それがサインかもしれません。

今世の恋愛テーマは「受け入れること」。相手の完璧でない部分も含めて愛するという学びが、あなたの魂の成長につながっています。

具体的なアドバイスとしては、満月の夜に静かな場所で瞑想してみてください。月のエネルギーがあなたの直感を研ぎ澄まし、恋の答えを教えてくれるはずです。`,

  "oracle-card": `あなたのために引いたカードは「New Beginnings（新しい始まり）」です。

マウイ島のビーチで出会ったヒーラーのカイラニさんから授かったこのデッキ。彼女は「オラクルカードはあなたの心の声を映す鏡」と教えてくれました。

「New Beginnings」のカードが出たということは、あなたの心が新しい恋に向けて準備ができているというサインです。過去の恋愛で抱えていた痛みや後悔が、ゆっくりと癒されてきているんですね。

今のあなたの心の状態は、冬を越えた後の春の蕾のよう。まだ花開いてはいないけれど、確実にエネルギーが内側に満ちてきています。

恋愛への影響としては、今まで「無理だ」と思っていたことにチャレンジしたくなる気持ちが湧いてくるでしょう。気になる人への連絡、新しい出会いの場への参加、自分磨き ── どれも今のあなたには良い流れを呼び込みます。

前に進むためのヒントは「完璧を待たないこと」。準備が100%整ってから動くのではなく、70%くらいの気持ちでまず一歩踏み出してみてください。残りの30%は、歩きながら整っていきます。

あなたの新しい恋の物語、ここから始まりますよ。`,
};

// デモテキストを zodiac/birthday でパーソナライズ
function personalizeDemoFortune(
  baseText: string,
  slug: string,
  zodiac?: string,
  birthday?: string
): string {
  let prefix = "";

  if (zodiac) {
    const z = zodiacSigns.find((s) => s.sign === zodiac);
    if (z) {
      prefix = `${z.label}のあなたへ ──\n\n${z.element}のエレメントを持ち、${z.ruler}に守護されたあなたは、${z.trait}タイプ。その星の力を踏まえて、カードを読み解いていきますね。\n\n`;
    }
  }

  if (birthday) {
    const date = new Date(birthday);
    if (!isNaN(date.getTime())) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      // 誕生日ナンバー（数秘的な要素を加味）
      const lifeNum = ((month + day) % 9) + 1;
      const seasonMap: Record<string, string> = {
        spring: "春生まれのあなたは新しい恋に飛び込む勇気を持っています",
        summer: "夏生まれのあなたは情熱的に人を惹きつける太陽のような魅力があります",
        autumn: "秋生まれのあなたは深い思いやりで相手を包み込む力を持っています",
        winter: "冬生まれのあなたは静かだけれど消えない強い愛を育てます",
      };
      const season = month >= 3 && month <= 5 ? "spring" : month >= 6 && month <= 8 ? "summer" : month >= 9 && month <= 11 ? "autumn" : "winter";

      if (!prefix) {
        prefix = `${month}月${day}日生まれのあなたへ ──\n\n${seasonMap[season]}。誕生数「${lifeNum}」のエネルギーがあなたの恋を後押ししてくれています。\n\n`;
      } else {
        // zodiac + birthday 両方ある場合は birthday 情報を追記
        prefix = prefix.replace(
          "カードを読み解いていきますね。\n\n",
          `カードを読み解いていきますね。\n\n${month}月${day}日生まれで誕生数「${lifeNum}」── ${seasonMap[season]}。\n\n`
        );
      }
    }
  }

  return prefix ? prefix + baseText : baseText;
}

export async function POST(request: NextRequest) {
  try {
    // レートリミット
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { success, remaining } = rateLimit(`fortune:${ip}`, RATE_LIMITS.fortune.limit, RATE_LIMITS.fortune.windowMs);
    if (!success) {
      return NextResponse.json(
        { error: "しばらく時間をおいてからお試しください。" },
        { status: 429, headers: { "X-RateLimit-Remaining": String(remaining) } }
      );
    }

    const body = await request.json();
    const slug = typeof body.slug === "string" ? body.slug.slice(0, 50) : "";
    const birthday = typeof body.birthday === "string" ? body.birthday.slice(0, 10) : undefined;
    const zodiac = typeof body.zodiac === "string" ? body.zodiac.slice(0, 20) : undefined;

    // slug validation
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "うまく受け取れませんでした。もう一度お試しいただけますか？" }, { status: 400 });
    }

    // zodiac validation
    if (zodiac && !isValidZodiac(zodiac)) {
      return NextResponse.json({ error: "星座の情報がうまく読み取れませんでした。もう一度選んでいただけますか？" }, { status: 400 });
    }

    // birthday format validation (YYYY-MM-DD) + date validity check
    if (birthday) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
        return NextResponse.json({ error: "お誕生日の形式が読み取れませんでした。YYYY-MM-DDの形式でお願いしますね。" }, { status: 400 });
      }
      const parsed = new Date(birthday);
      if (isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== birthday) {
        return NextResponse.json({ error: "その日付は暦に存在しないようです。正しいお誕生日を教えてくださいね。" }, { status: 400 });
      }
      // 未来の日付チェック
      if (parsed > new Date()) {
        return NextResponse.json({ error: "未来の日付は指定できません" }, { status: 400 });
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const isRealKey = apiKey && !apiKey.includes("xxxx");

    const systemPrompt = fortuneSystemPrompts[slug];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: "この占いは現在準備中です" },
        { status: 400 }
      );
    }

    // APIキー未設定 → デモ鑑定文をパーソナライズして返す
    if (!isRealKey) {
      const baseText = demoFortunes[slug] || demoFortunes["tarot"];
      const personalized = personalizeDemoFortune(baseText, slug, zodiac, birthday);
      return NextResponse.json({ fortune: personalized, slug, demo: true });
    }

    // --- Premium / 購入済みチェック ---
    // 詳細鑑定はClaude API呼び出しのため、ユーザー認証と購入検証を行う
    const auth = await verifyAuth(request);
    if (!auth.user) {
      return NextResponse.json(
        { error: "詳しい鑑定を見るにはログインが必要です。" },
        { status: 401 }
      );
    }

    // ユーザーがPremium会員か、この占いを購入済みかチェック
    try {
      const supabase = createSupabaseAdmin();
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_status, subscription_period_end")
        .eq("id", auth.user.id)
        .single();

      const isPremium =
        profile?.subscription_status === "premium" &&
        (!profile?.subscription_period_end ||
          new Date(profile.subscription_period_end) > new Date());

      if (!isPremium) {
        // Premium でなければ個別購入をチェック
        const { data: purchase } = await supabase
          .from("purchases")
          .select("id")
          .eq("user_id", auth.user.id)
          .eq("fortune_slug", slug)
          .eq("status", "completed")
          .limit(1)
          .single();

        if (!purchase) {
          return NextResponse.json(
            { error: "この鑑定にはPremiumプランまたは個別購入が必要です。" },
            { status: 403 }
          );
        }
      }
    } catch {
      // Supabase接続エラー時はデモ鑑定にフォールバック
      console.error("Premium check failed, falling back to demo");
      const baseText = demoFortunes[slug] || demoFortunes["tarot"];
      const personalized = personalizeDemoFortune(baseText, slug, zodiac, birthday);
      return NextResponse.json({ fortune: personalized, slug, demo: true });
    }

    // Build rich user context message
    const contextParts: string[] = [];
    if (birthday) contextParts.push(`生年月日は${birthday}です`);
    if (zodiac) {
      const label = zodiacLabels[zodiac] || zodiac;
      contextParts.push(`星座は${label}です`);
    }
    const userMessage = contextParts.length > 0
      ? `私の${contextParts.join("、")}。恋愛について詳しく鑑定してください。特に今の時期の恋愛運、相性のポイント、具体的な行動アドバイスをお願いします。`
      : "私の恋愛について鑑定してください。特に今の時期の恋愛運、相性のポイント、具体的な行動アドバイスをお願いします。";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250514",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Anthropic API error:", errorData);
      return NextResponse.json(
        { error: "鑑定中にエラーが発生しました。しばらくしてからお試しください。" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const fortuneText =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    return NextResponse.json({
      fortune: fortuneText,
      slug,
    });
  } catch (error) {
    console.error("Fortune API error:", error);
    return NextResponse.json(
      { error: "鑑定中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
