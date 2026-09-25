// 記事の章と章のあいだに差し込む場面イラスト（アイキャッチ）。
// 素材はCodex承認済みの16:9カットだけを使う。縮小のみで切り落とさない。
//   正本: public/images/shared-cast-20260925/*.webp（1672x941 など）
//   Web用: public/images/scenes/*.webp（横1280へ縮小しただけ・縦横比そのまま）
//
// match は見出し（h2）の文言に当てる。当たらない章には何も入れない＝
// 記事ごとに手で貼らなくても、内容に合った絵だけが出る。
export const sceneArt = [
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
