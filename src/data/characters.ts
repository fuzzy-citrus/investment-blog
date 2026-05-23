// バリュー商会 キャラクターデータ
// このファイルをプロジェクトの src/data/ に配置してください

export type Team = "founder" | "manager" | "teamA" | "teamB" | "cross" | "rival";

export interface Character {
  id: string;
  name: string;
  reading: string;
  title: string;
  team: Team;
  species: string;
  emoji: string;
  avatarColor: string;
  catchphrase: string;
  quote: string;
  tags: string[];
}

export const characters: Character[] = [
  // ── FOUNDER ──────────────────────────────────────────────
  {
    id: "nomura",
    name: "野村 沼之助",
    reading: "のむら ぬまのすけ",
    title: "野村の錬金術師・創業者",
    team: "founder",
    species: "人間 ／ 野村信用口座歴10年",
    emoji: "🧓",
    avatarColor: "#E1F5EE",
    catchphrase: "気づいたら会社になってた。部下も知らん間に増えとった",
    quote: "低金利で借りて、割安で買う。それだけじゃ。なぜ誰もやらんのか儂には謎じゃ。バフェット爺さんは海外からでもやっとる",
    tags: ["低金利レバ原点", "不干渉主義"],
  },

  // ── MANAGER ──────────────────────────────────────────────
  {
    id: "numata",
    name: "沼田 堅一",
    reading: "ぬまた けんいち",
    title: "課長・プレイングマネージャー",
    team: "manager",
    species: "人間 ／ 投資歴9年",
    emoji: "🧑‍💼",
    avatarColor: "#E6F1FB",
    catchphrase: "部下が優秀すぎて、自分の存在意義を毎朝確認している",
    quote: "インデックスで満足できてたら、今ごろ楽やったんやろな……",
    tags: ["TOB20件超", "コア逆転済み"],
  },

  // ── TEAM A : バリュー発掘班 ────────────────────────────
  {
    id: "machibuse",
    name: "待伏 静江",
    reading: "まちぶせ しずえ",
    title: "TOB担当",
    team: "teamA",
    species: "ワニ ／ 忍耐と精度の人",
    emoji: "🐊",
    avatarColor: "#E1F5EE",
    catchphrase: "3年待った銘柄のTOBが来た朝だけ、少し口角が上がる",
    quote: "まだです。もう少し待ちます",
    tags: ["TOB専門", "忍耐型"],
  },
  {
    id: "kawachi",
    name: "河内 拾造",
    reading: "かわち しゅうぞう",
    title: "低PBR発掘担当",
    team: "teamA",
    species: "カワウソ ／ 誰も見ない石をめくる係",
    emoji: "🦦",
    avatarColor: "#FAEEDA",
    catchphrase: "PBR0.2を見つけた時の顔が、毎回同じなのが怖い",
    quote: "これ、誰も見てないですよね？　じゃあ拾います",
    tags: ["低PBR専門", "分散型"],
  },
  {
    id: "hotta",
    name: "堀田 独占",
    reading: "ほった どくせん",
    title: "競合優位性担当",
    team: "teamA",
    species: "ビーバー ／ 参入障壁（堀）の評論家",
    emoji: "🦫",
    avatarColor: "#EEF2FF",
    catchphrase: "競合が少ない市場しか興味がない。多かったら帰る",
    quote: "なぜ競合が入ってこないんですか。そこを先に教えてください",
    tags: ["ニッチトップ", "モート"],
  },
  {
    id: "yomi",
    name: "夜見 賢三",
    reading: "よみ けんぞう",
    title: "財務分析担当",
    team: "teamA",
    species: "フクロウ ／ 眠らない参謀",
    emoji: "🦉",
    avatarColor: "#EEEDFE",
    catchphrase: "有報を3回読んで異常なければ、ようやく存在を認める",
    quote: "注記に書いてあります。読みましたか",
    tags: ["財務分析", "長期視点"],
  },

  // ── TEAM B : インカム・優待班 ──────────────────────────
  {
    id: "yuda",
    name: "優田 雅代",
    reading: "ゆうた まさよ",
    title: "株主優待担当",
    team: "teamB",
    species: "フラミンゴ ／ 優待利回り計算の達人",
    emoji: "🦩",
    avatarColor: "#FDEDF4",
    catchphrase: "QUOカード200円の差を1時間議論できる",
    quote: "配当利回りだけで見ちゃダメです。優待込みで計算しました？",
    tags: ["優待専門", "優待利回り"],
  },
  {
    id: "hanaoka",
    name: "花岡 利次郎",
    reading: "はなおか りじろう",
    title: "高配当担当",
    team: "teamB",
    species: "ミツバチ ／ 減配の匂いを嗅ぎ取る男",
    emoji: "🐝",
    avatarColor: "#FDF3D9",
    catchphrase: "増配発表の日だけ、なぜか羽音が大きくなる",
    quote: "配当性向が上がってきてます。笑えない水準です",
    tags: ["高配当専門", "連続増配"],
  },
  {
    id: "morita",
    name: "守田 退三",
    reading: "もりた たいぞう",
    title: "守備・リスク管理担当",
    team: "teamB",
    species: "ザリガニ ／ 後退のプロフェッショナル",
    emoji: "🦞",
    avatarColor: "#FAECE7",
    catchphrase: "前に進む提案には必ず1回反対する。習性らしい",
    quote: "その銘柄、下がった時のことを考えましたか。考えてないでしょう",
    tags: ["守り重視", "資産性"],
  },

  // ── CROSS : 横断サポート ──────────────────────────────
  {
    id: "sumida",
    name: "墨田 検二",
    reading: "すみだ けんじ",
    title: "AIバックチェック担当（課長直属・全班横断）",
    team: "cross",
    species: "イカ ／ 嘘を嗅ぎ取る10本腕",
    emoji: "🦑",
    avatarColor: "#E0F7FA",
    catchphrase: "AIが出した数字を信じたことが一度もない。AIなのに",
    quote: "ソースはどこですか。一次情報ですか。AIが生成した可能性は排除できましたか",
    tags: ["AIファクトチェック", "ハルシネーション検知", "感情ゼロ・証拠100%"],
  },
];

// ── ブログ概要 ────────────────────────────────────────────
export const blogMeta = {
  name: "バリュー商会",
  tagline: "沼田課長と愉快な部下たちの投資記録",
  description:
    "インデックス投資だけでは物足りないけれど、米国株のような激しい値動きやリスクには正直しんどい——そんな中間地帯に居場所を求めている人。割安に放置されたニッチ市場の日本個別株に可能性を感じていて、ガバナンス改革やTOBが触媒になる瞬間を静かに待ちたい人のための、ゆるくて地味で時々熱い投資記録です。",
  founder: {
    name: "野村 沼之助",
    title: "野村の錬金術師・創業者",
    creditHistory: "野村信用口座歴10年",
  },
  manager: {
    name: "沼田 堅一",
    title: "課長・プレイングマネージャー",
    investmentYears: 9,
    tobCount: 20,
  },
  rivals: [
    {
      id: "index-religion",
      name: "インデックス宗教法人",
      subtitle: "総本山オルカン",
      emoji: "⛩️",
      members: ["住職", "積立ひつじ", "オルカン鸚鵡"],
    },
    {
      id: "momentum-chimp",
      name: "モメンタムチンパンジー組合",
      subtitle: "米国支部",
      emoji: "🚀",
      members: ["テック番長", "レバナス小猿", "ドル建て鷹"],
    },
  ],
};

export const teamLabels: Record<Team, string> = {
  founder: "創業者",
  manager: "課長",
  teamA: "バリュー発掘班",
  teamB: "インカム・優待班",
  cross: "横断サポート",
  rival: "ライバル",
};
