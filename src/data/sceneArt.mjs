// 記事の章と章のあいだに差し込む場面イラスト（アイキャッチ）。
// 素材はCodex承認済みの16:9カットだけを使う。縮小のみで切り落とさない。
//   正本: public/images/shared-cast-20260925/*.webp（1672x941 など）
//   Web用: public/images/scenes/*.webp（横1280へ縮小しただけ・縦横比そのまま）
//
// match は見出し（h2）の文言に当てる。当たらない章には何も入れない＝
// 記事ごとに手で貼らなくても、内容に合った絵だけが出る。
export const sceneArt = [
	...[
		['rebanas-kozaru', 'レバナス小猿', /レバナス小猿|小猿/],
		['tech-bancho', 'テック番長', /テック番長/],
		['zensekai-bouzu', '全世界坊主', /全世界坊主|オルカン教祖/],
		['orukan-oumu', 'オルカン鸚鵡', /オルカン鸚鵡|鸚鵡/],
		['tsumitate-hitsuji', '積立ひつじ', /積立ひつじ/],
		['dollar-taka', 'ドル建て鷹', /ドル建て鷹/],
	].map(([id, name, match]) => ({
		id: `portrait-${id}`, src: `/images/cast-web/${id}-facing-left-v1.webp`,
		alt: `${name}の全身イラスト`, caption: `${name}、会議に参加。`,
		match, portrait: true, width: 640, height: 768,
	})),
	// ── 2026-10-08 追加：Codex制作・山本採用OKの12枚（アイキャッチ拡充_20261007 の 01〜12）。
	//    横1280へ縮小しただけ。古い11枚より前に置き、内容が合う章ではこちらを先に使う。
	//    13〜20（アイキャッチ追加_20261008）は公開承認がまだなので入れていない。
	{
		id: 'ec01-excavation', src: '/images/scenes/eyecatch-01-v1.webp',
		alt: '古い書庫の引き出しから、刷毛で工場の模型を掘り出すカワウソの河内と、隣で図面を読むワニの待伏',
		caption: '🦦 河内拾造 ＋ 🐊 待伏静江 ——古い帳簿の下に、まだ数えられていないものがある',
		match: /発掘|掘り出|隠れ資産|含み益|含み資産|土地|簿価|取得時期/,
	},
	{
		id: 'ec02-inspection', src: '/images/scenes/eyecatch-02-v1.webp',
		alt: '検査台を流れてくるビルの模型を虫眼鏡で調べるフクロウの夜見と、赤い札を上げるザリガニの守田',
		caption: '🦉 夜見賢三 ＋ 🦞 守田退三 ——通す前に、ひびを探す',
		match: /点検|検査|開いた|開いて|財務とリスク|貸借対照表|ＢＳ|BS|のれん|減損|後始末/,
	},
	{
		id: 'ec03-harvest', src: '/images/scenes/eyecatch-03-v1.webp',
		alt: '港の見える市場で、はかりに金貨をのせるミツバチの花岡と、野菜のかごを提げたフラミンゴの優田',
		caption: '🐝 花岡利次郎 ＋ 🦩 優田 ——受け取る実りを、量ってみる',
		match: /優待|配当と分割|配当が|配当は|還元は|還元と|ＤＯＥ|DOE|利回り/,
	},
	{
		id: 'ec04-watergate', src: '/images/scenes/eyecatch-04-v1.webp',
		alt: '水車小屋のある川で、石造りの水門を指し棒で示すビーバーの堀田',
		caption: '🦫 堀田独占 ——水をせき止めているのは、どこか',
		match: /参入障壁|堀|モート|ニッチ|シェア|独占|寡占|利益率|ぶれない|稼いでいるのは/,
	},
	{
		id: 'ec05-sorting', src: '/images/scenes/eyecatch-05-v1.webp',
		alt: '机いっぱいの資料を、タブレットを見ながら3つの箱へ仕分けていくイカの墨田',
		caption: '🦑 墨田 ——並べ直すと、同じ資料が別のものに見える',
		match: /仕分け|分類|整理|全部調べ|全部並べ|その後|回を|統計|バックテスト|検証/,
	},
	{
		id: 'ec06-fair', src: '/images/scenes/eyecatch-06-v1.webp',
		alt: '産業見本市で、工場の模型を示すビーバーの堀田と、光る半導体チップを指さすテック番長',
		caption: '🦫 堀田独占 ＋ 🦍 テック番長 ——古い工場と新しい技術、どちらが堀か',
		match: /技術と堀|技術の堀|AIに|ＡＩに|代替され|半導体のクリーンルーム|レーザーとAI/,
	},
	{
		id: 'ec07-rainy-watch', src: '/images/scenes/eyecatch-07-v1.webp',
		alt: '雨の窓辺で砂時計を横に、株主のつながりを描いた図を静かに眺めるワニの待伏',
		caption: '🐊 待伏静江 ——雨の日は、動かずに見ている',
		match: /下げた|急落|売られ|株主と|株主構成|大株主|持ち合い|ＴＯＢ|TOB|ＭＢＯ|MBO|待つ|待ち/,
	},
	{
		id: 'ec08-price-and-content', src: '/images/scenes/eyecatch-08-v1.webp',
		alt: '骨董の机で値札をつまみ上げるカワウソの河内と、箱の中の歯車を虫眼鏡でのぞくビーバーの堀田',
		caption: '🦦 河内拾造 ＋ 🦫 堀田独占 ——値札と中身は、別々に見る',
		match: /値札と|値札｜|値段と|中身|順位|安さの|割安|需給と/,
	},
	{
		id: 'ec09-keep-margin', src: '/images/scenes/eyecatch-09-v1.webp',
		alt: '夕暮れの港で、小舟に積む荷物の間隔を海図で確かめるザリガニの守田と、家の模型を抱えたミツバチの花岡',
		caption: '🦞 守田退三 ＋ 🐝 花岡利次郎 ——積みすぎない。余白も荷物のうち',
		match: /余力|余裕|余白|資金管理|現金比率|配分|上限|建玉|維持率|サイズ/,
	},
	{
		id: 'ec10-primary-source', src: '/images/scenes/eyecatch-10-v1.webp',
		alt: '図書館で古い資料のグラフを掲げるフクロウの夜見と、タブレットを手に大きな本を開くイカの墨田',
		caption: '🦉 夜見賢三 ＋ 🦑 墨田 ——もとの資料まで戻る',
		match: /一次資料|有価証券報告書|有報|開示|出所|いくらあるのか|数え方|逆算|逆から解/,
	},
	{
		id: 'ec11-daily-life', src: '/images/scenes/eyecatch-11-v1.webp',
		alt: '台所の食卓で、買い物かごと優待券を持つフラミンゴの優田と、びんに硬貨を入れる積立ひつじ',
		caption: '🦩 優田 ＋ 🐑 積立ひつじ ——暮らしの中で続くかたち',
		match: /積立ひつじ|暮らし|家計|続ける|続けら|ＮＩＳＡ|NISA|新NISA/,
	},
	{
		id: 'ec12-wide-and-deep', src: '/images/scenes/eyecatch-12-v1.webp',
		alt: '世界地図の箱庭を囲み、虫眼鏡で一か所をのぞくカワウソの河内と、翼を広げて全体を示すオルカン鸚鵡',
		caption: '🦦 河内拾造 ＋ 🦜 オルカン鸚鵡 ——広く持つ人と、深く見る人',
		match: /買われる|売られる683|分散|指数|ＴＯＰＩＸ|TOPIX|広く|全世界株/,
	},
	{
		id: 'rival-roundtable',
		src: '/images/scenes/scene-rival-roundtable-v1.webp',
		alt: '会議机を囲む沼田と日向のところへ、テック番長と全世界坊主が割り込んできている場面',
		caption: '🦍 テック番長 ＋ 🧘 全世界坊主 ——今日も、茶々を入れに来た',
		match: /乱入|ライバル|陣営|茶々|反論|インデックス|オルカン|全世界|米国株|Ｓ＆Ｐ|S&P|レバナス|積立/,
	},
	{
		id: 'risk-brake',
		src: '/images/scenes/scene-risk-brake-v2.webp',
		alt: '光る贈り物の箱に手を伸ばす日向を、チェックリストを持った守田がはさみを上げて止めている場面',
		caption: '🦞 守田退三 ——手を伸ばす前に、確認することがあります',
		match: /歯止め|買う前|飛びつ|入り方|買い方|置き方|降り方|撤退|損切|見送|やめる|失敗/,
	},
	{
		id: 'risk-discussion',
		src: '/images/scenes/scene-risk-discussion-v1.webp',
		alt: '机をはさんで資料を見ながら話し合うザリガニの守田と、トカゲの日向',
		caption: '🦞 守田退三 ＋ 🦎 日向昇 ——外れる側から、先に見る',
		match: /リスク|懸念|弱点|反証|外れる|逆に転ぶ|下振れ|前提が崩れ|危険|注意点|論点|割り引く|効かない/,
	},
	{
		id: 'dividend-care',
		src: '/images/scenes/scene-dividend-care-v1.webp',
		alt: '窓辺の観葉植物にじょうろで水をやるミツバチの花岡',
		caption: '🐝 花岡利次郎 ——配当は、育てるものです',
		match: /配当|優待|還元|利回り|ＤＯＥ|DOE|増配|権利|インカム|累進/,
	},
	{
		id: 'business-moat',
		src: '/images/scenes/scene-business-moat-v1.webp',
		alt: '川に築かれた木のダムを指し棒で示すビーバーの堀田',
		caption: '🦫 堀田独占 ——堀は、外から見えるところにある',
		match: /参入障壁|堀|モート|シェア|独占|寡占|ニッチ|競合|強み|値上げ|価格決定/,
	},
	{
		id: 'beaver-moat',
		src: '/images/scenes/scene-beaver-moat-v2.webp',
		alt: '机に置いたダムの模型を指し棒で説明する堀田と、メモを取る日向',
		caption: '🦫 堀田独占 ——模型を作ってきました。これが参入障壁です',
		match: /何で稼い|どんな会社|事業内容|ビジネスモデル|事業構造|稼ぎ方|セグメント|事業の中身|会社の中身/,
	},
	{
		id: 'asset-discovery',
		src: '/images/scenes/scene-asset-discovery-v1.webp',
		alt: '川辺で虫眼鏡をのぞきこみ、石のあいだの小箱を見つけたカワウソの河内',
		caption: '🦦 河内拾造 ——値札の裏に、拾えるものが落ちていないか',
		match: /値札|資産|純資産|ＢＰＳ|BPS|ＰＢＲ|PBR|含み益|含み資産|土地|簿価|ネットキャッシュ|現預金|投資有価証券|お宝|発掘|安さの中身/,
	},
	{
		id: 'financial-review',
		src: '/images/scenes/scene-financial-review-v1.webp',
		alt: '机に広げた決算資料と電卓を前に、書類を読み比べるフクロウの夜見',
		caption: '🦉 夜見賢三 ——数字は、並べて初めて意味が出る',
		match: /決算|業績|財務|検算|数字|営業利益|売上|キャッシュ|バランスシート|有利子負債|自己資本|進捗|四半期|採点|物差し/,
	},
	{
		id: 'patient-croc',
		src: '/images/scenes/scene-patient-croc-v2.webp',
		alt: '大きな砂時計のそばで報告書を読むワニの待伏と、隣でそわそわしている日向',
		caption: '🐊 待伏静江 ——急いでいるのは、たいてい相手のほう',
		match: /シナリオ|3年|三年|5年|五年|期待株価|見通し|将来|出口/,
	},
	{
		id: 'patient-research',
		src: '/images/scenes/scene-patient-research-v1.webp',
		alt: '砂時計の置かれた机で資料を読みながら考えこむワニの待伏',
		caption: '🐊 待伏静江 ——待つのも、仕事のうち',
		match: /待つ|待ち|待て|待た|待伏|ＴＯＢ|TOB|ＭＢＯ|MBO|カタリスト|触媒|きっかけ|時間|長期|仕込/,
	},
	{
		id: 'meeting',
		src: '/images/scenes/meeting-opening-v1.webp',
		alt: '会議机に集まって書類を見ている河内・夜見・守田・日向',
		caption: '沼底バリュー商会・全体会議 ——結論は、全員で出す',
		match: /まとめ(?![てるたま])|結論|位置づけ|総括|会議|振り返り|おわりに|方針|今週|近況|一言でいうと/,
	},
];

// 画像はすべて横1280・16:9（縮小しただけ）
export const SCENE_WIDTH = 1280;
export const SCENE_HEIGHT = 720;

// 1記事に入れる上限と、間隔（見出し何本ぶん空けるか）
export const SCENE_MAX_PER_POST = 3;
export const SCENE_MIN_GAP = 1;
export const SCENE_MIN_HEADINGS = 4;

// 記事ごとの指定（スラッグ → [見出しに当てる正規表現, 絵のid] の並び）。
// ここに書いた記事は、指定した章にだけ指定した絵を入れる（自動の当てはめは使わない）。
// 乱入の章の立ち絵（portrait）は従来どおり自動で入る。
export const sceneOverrides = {
	'topix-new35-2026-10': [
		[/需給と値札を足した順位/, 'ec08-price-and-content'],
		[/買われる35/, 'ec12-wide-and-deep'],
	],
	'tsutsumi-7937': [
		[/何が起きたか/, 'ec07-rainy-watch'],
		[/採点/, 'ec03-harvest'],
	],
};
