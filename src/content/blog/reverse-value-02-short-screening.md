---
title: "逆バリュー投資②｜1年で株価が3倍以上になった貸借銘柄を全部調べたら、高PERは4つの型に分かれた【空売り候補スクリーニングの手順を公開／売ってはいけない高PERの見分け方】"
description: "沼底バリュー商会の連載「逆バリュー投資」第2回である。新人の日向が企画者となり、価値から離れすぎた株を少量ずつ売るという実験の第2弾として、今回はスクリーニングの手順そのものを公開する。対象は過去1年の上昇率ランキング上位75銘柄で、そこからETF3本を除いた個別株72銘柄について、株探の信用区分表示を1銘柄ずつ確認した。制度信用銘柄には買建のみができる銘柄と、買建と売建の両方ができる貸借銘柄があり、空売りができるのは後者だけである。72銘柄の内訳は貸借が50銘柄、買建のみの信用が20銘柄、現物のみが2銘柄だった。つまり大きく上がった株の3割近くは、そもそも売る手段が存在しない。この貸借50銘柄にPER50倍超またはPER算出不能という条件を重ねると9銘柄が残る。ところがその9銘柄を1社ずつ決算で確認したところ、高PERという同じ見た目の裏に、性質のまったく違う4つの型が並んでいた。第一の型は業績が追い付いていないものである。岡本硝子は1年で188円から824円へ338%上昇したが、売上高は5期前の48.9億円から今期予想55.5億円へ13%増えたにすぎず、1株利益は5期前の9.2円に対し今期予想は2.5円と4割以下に減っている。株価は4.4倍、利益は4割以下、結果としてPERは329倍になった。第二の型は赤字なのに上がっているものである。地盤ホールディングスは166円から1,056円へ536%上昇しPBRは17.01倍だが、今期は営業1.25億円の赤字、最終1.27億円の赤字を会社が予想している。アスタリスクは430円から1,673円へ289%上昇したが4期連続赤字で、今期予想も3.30億円の赤字と赤字幅が拡大し、売上は24.1億円から14.5億円へ4割減っている。第三の型は売ってはいけない高PERである。菊池製作所はPER92.9倍だが、これは3期連続の赤字から黒字転換した直後で利益がまだ小さいために起きている一時的な高PERであり、売上も利益も改善方向にある。エフ・アイ・ジーもPER52.2倍だが売上は133億円から140億円へ、営業利益は8.34億円から10億円へ伸びている。第四の型は当商会が危うく取り違えかけたもので、キオクシア、東京エレクトロン、SUMCOの3社はPERが算出不能と表示されるが、これは赤字だからではなく会社が今期予想を開示していないためである。この4つを区別しないまま高PERというだけで売り向かうと、回復途上の会社に踏み上げられる。空売りは損失が理論上無限であり、踏み上げと逆日歩という買いにはないコストが常にかかる。本稿は個別銘柄の売買を推奨するものではなく、あくまで検討の手順を公開したものである。沼田・河内・夜見・堀田・待伏・守田・墨田・日向とレバナス小猿が詰める。投資助言ではありません。"
cardDesc: "<span class='card-highlight'>日向の実験連載、第2回。1年で大きく上がった75銘柄を1社ずつ調べました。まず驚いたのは、3割近くがそもそも売る手段のない銘柄だったことです。</span>貸借50／買建のみ20／現物のみ2。空売りできるのは貸借だけ。<span class='card-note'>そこにPER50倍超という条件を重ねると9社。ところが決算を開けたら、同じ高PERの裏に性質の違う4つの型が並んでいました。業績が追い付いていない型、赤字なのに上がっている型、そして赤字から回復した直後で一時的に高PERになっている「売ってはいけない型」。さらに当商会が取り違えかけた4つ目——PER算出不能は赤字という意味ではありませんでした。区別しないまま売ると踏み上げられます。投資助言ではありません。</span>"
pubDate: "2026-09-13T10:00:00+09:00"
related: ["small-short-overvaluation-2026", "cheap-stock-census-2026-09", "scorecard-45-stocks-2026q3", "core-satellite-onkabu-design", "margin-carry-10year-model"]
draft: true
---

> 🦎 「課長。<span class="t-blue">この前の実験、続けていいですか</span>」

🧑‍💼**沼田**「逆バリューか」

🦎**日向**「<span class="t-amber">はい。前回は『なぜ少量ずつ売るのか』という考え方の話でした</span>。<strong>今回は、探し方をやります</strong>」

🧑‍💼**沼田**「<span class="t-green">やってみろ。ただし条件がある</span>」

🦎**日向**「はい」

🧑‍💼**沼田**「<span class="t-red">『上がりすぎている株』を探すな</span>。<strong>『上がりすぎていて、かつ売れる株』を探せ</strong>」

🦎**日向**「<span class="t-blue">……売れる株？</span>」

🧑‍💼**沼田**「<span class="t-amber">やってみれば分かる。そこで3割が消える</span>」

---

## 🔧 第1章｜空売りの前に消える3割──貸借銘柄とは何か

🦎**日向**「<span class="t-green">まず、上がった株を集めました</span>。<strong>過去1年の上昇率ランキング、上位75銘柄です</strong>」

🦉**夜見**「財務分析担当の夜見です。<span class="t-blue">そこからETF3本を除きます</span>。<strong>個別株は72銘柄</strong>」

🦎**日向**「<span class="t-amber">で、課長に言われた『売れるかどうか』を1社ずつ調べたんですが</span>」

> 🧱 **制度信用の3区分（株探の表示）**
> ・<span class="t-green"><strong>貸借</strong></span> … 買建（信用買い）と<strong>売建（信用売り）の両方</strong>ができる → <span class="t-red"><strong>空売り可</strong></span>
> ・<span class="t-amber"><strong>信用</strong></span> … 買建<strong>のみ</strong>ができる → <span class="t-red">空売り不可</span>
> ・<span class="t-blue"><strong>現物</strong></span> … 制度信用の対象外。現物取引のみ → <span class="t-red">空売り不可</span>

🦎**日向**「<span class="t-red">72銘柄の内訳が、これです</span>」

| 信用区分 | 銘柄数 | 空売り |
|---|---:|:---:|
| <strong>貸借</strong> | <strong>50</strong> | <span class="t-green">できる</span> |
| 信用（買建のみ） | 20 | <span class="t-red">できない</span> |
| 現物のみ | 2 | <span class="t-red">できない</span> |

🦎**日向**「<span class="t-amber">……22銘柄、つまり3割近くが、そもそも売れませんでした</span>」

🧑‍💼**沼田**「<span class="t-green">そこが最初の関門だ</span>。<strong>『この株は高すぎる』という判断が正しくても、売る手段がなければ何もできない</strong>」

🦫**堀田**「モート担当だ。<span class="t-blue">しかもこれは偶然ではない</span>。<strong>貸借銘柄の指定には流動性や株主数の基準がある</strong>。<span class="t-amber">急騰した小型株ほど、売れない側に残りやすい</span>」

🦎**日向**「<span class="t-green">上がりすぎた株ほど売れない……逆じゃないですか</span>」

🦞**守田**「リスク管理担当の守田だ。<span class="t-red">逆ではない。それが仕組みだ</span>。<strong>だから逆バリューは、最初から土俵が狭い</strong>」

---

## 📊 第2章｜貸借50銘柄にPERを当てたら、9社が残った

🦎**日向**「<span class="t-blue">残った貸借50銘柄に、条件を重ねます</span>」

> 🔍 **今回のスクリーニング条件**
> ・過去1年の上昇率ランキング上位（<strong>75銘柄</strong>）→ ETF除外で <strong>72銘柄</strong>
> ・信用区分が <span class="t-green"><strong>貸借</strong></span>（＝空売りができる） → <strong>50銘柄</strong>
> ・<span class="t-red">PER 50倍超 または PER算出不能</span> → <span class="t-red"><strong>9銘柄</strong></span>

| コード | 銘柄 | 市場 | 1年前 → 現在 | <strong>1年騰落</strong> | PER | PBR |
|---|---|---|---|---:|---:|---:|
| 285A | キオクシア | 東Ｐ | 3,150 → 60,540 | <span class="t-red"><strong>+1,821.9%</strong></span> | <span class="t-amber">算出不能</span> | 13.40 |
| 6072 | 地盤ＨＤ | 東Ｓ | 166 → 1,056 | <span class="t-red"><strong>+536.1%</strong></span> | <span class="t-amber">算出不能</span> | <span class="t-red">17.01</span> |
| 4062 | イビデン | 東Ｐ | 3,633 → 21,590 | +494.3% | 72.6倍 | 10.65 |
| 7746 | 岡本硝子 | 東Ｓ | 188 → 824 | +338.3% | <span class="t-red"><strong>328倍</strong></span> | 9.69 |
| 6522 | アスタリスク | 東Ｇ | 430 → 1,673 | +289.1% | <span class="t-amber">算出不能</span> | 7.27 |
| 4392 | ＦＩＧ | 東Ｐ | 330 → 1,010 | +206.1% | 52.2倍 | 3.14 |
| 3444 | 菊池製作所 | 東Ｓ | 354 → 1,054 | +197.7% | 92.9倍 | 2.12 |
| 8035 | 東エレク | 東Ｐ | 20,600 → 56,100 | +172.3% | <span class="t-amber">算出不能</span> | 11.90 |
| 3436 | ＳＵＭＣＯ | 東Ｐ | 1,289 → 3,264 | +153.2% | <span class="t-amber">算出不能</span> | 2.00 |

🦎**日向**「<span class="t-green">9社出ました。ここから売り候補を選べば——</span>」

🦑**墨田**「AIバックチェック担当の墨田です。<span class="t-red">待ってください</span>」

🦎**日向**「<span class="t-amber">早い</span>」

🦑**墨田**「<span class="t-blue">この9社を1社ずつ決算で開きました</span>。<strong>同じ『高PER』という見た目の裏に、性質のまったく違う4つの型が入っています</strong>」

🦑**墨田**「<span class="t-red">区別せずに売ると、事故になります</span>」

---

## 📉 第3章｜型①｜業績が追い付いていない──岡本硝子（7746）

🐊**待伏**「待ち伏せ担当の待伏です。<span class="t-blue">いちばん教科書的なのがこれです</span>」

| 決算期 | 売上高 | 営業利益 | <strong>最終利益</strong> | EPS |
|---|---:|---:|---:|---:|
| 2023年3月期 | 48.9億円 | 1.33億円 | 2.14億円 | <span class="t-green">9.2円</span> |
| 2024年3月期 | 45.8億円 | 0.61億円 | 1.01億円 | 4.4円 |
| 2025年3月期 | 46.9億円 | 1.26億円 | 0.89億円 | 3.8円 |
| 2026年3月期 | 47.3億円 | <span class="t-red">▲0.78億円</span> | <span class="t-red">▲1.49億円</span> | <span class="t-red">▲5.6円</span> |
| <strong>2027年3月期 予想</strong> | <strong>55.5億円</strong> | 1.92億円 | 0.75億円 | <span class="t-red"><strong>2.5円</strong></span> |

🐊**待伏**「<span class="t-amber">5期並べると、はっきりします</span>。<strong>売上は48.9億円から55.5億円へ、5年で13%増えただけです</strong>」

🦉**夜見**「<span class="t-red">EPSは9.2円から2.5円へ、4割以下に減っています</span>」

🦎**日向**「<span class="t-blue">……株価は4.4倍になってるのに</span>」

🦉**夜見**「<span class="t-green">その割り算がPER328倍です</span>。<strong>株価824円 ÷ EPS2.5円</strong>」

🧑‍💼**沼田**「<span class="t-amber">誤解しないように言っておくが、これは会社の悪口ではない</span>。<strong>売上は伸びているし、今期は黒字に戻る計画だ</strong>。<span class="t-blue">問題は会社の中身ではなく、値札のほうにある</span>」

🦫**堀田**「<span class="t-green">この型の特徴は、下がるときに理由が要らないことだ</span>。<strong>PER328倍は『何かを期待して』付いた値段で、期待が薄れるだけで戻る</strong>」

---

## 🩸 第4章｜型②｜赤字なのに上がっている──地盤ＨＤ・アスタリスク

🦉**夜見**「<span class="t-blue">PER算出不能の銘柄のうち、本当に赤字なのは2社でした</span>」

### 🏗️ 地盤ホールディングス（6072）｜PBR17.01倍

| 決算期 | 売上高 | 営業利益 | <strong>最終利益</strong> | EPS |
|---|---:|---:|---:|---:|
| 2024年3月期 | 18.8億円 | <span class="t-red">▲0.48億円</span> | <span class="t-red">▲0.95億円</span> | ▲4.2円 |
| 2025年3月期 | 18.8億円 | 1.09億円 | 0.74億円 | 3.3円 |
| 2026年3月期 | 31.9億円 | 0.35億円 | <span class="t-green">1.97億円</span> | <span class="t-green">8.8円</span> |
| <strong>2027年3月期 予想</strong> | 36.0億円 | <span class="t-red"><strong>▲1.25億円</strong></span> | <span class="t-red"><strong>▲1.27億円</strong></span> | <span class="t-red">▲5.7円</span> |

🐊**待伏**「<span class="t-amber">前期は最終1.97億円で過去最高でした</span>。<strong>ところが今期は、会社自身が赤転を予想しています</strong>」

🦎**日向**「<span class="t-red">株価は1年で6.4倍、PBRは17倍</span>。<span class="t-blue">……そこに赤字予想</span>」

### 📱 アスタリスク（6522）｜4期連続赤字

| 決算期 | 売上高 | <strong>最終利益</strong> |
|---|---:|---:|
| 2022年8月期 | 24.1億円 | <span class="t-green">3.22億円</span> |
| 2023年8月期 | 17.6億円 | <span class="t-red">▲1.70億円</span> |
| 2024年8月期 | 15.8億円 | <span class="t-red">▲3.89億円</span> |
| 2025年8月期 | 16.7億円 | <span class="t-red">▲1.82億円</span> |
| <strong>2026年8月期 予想</strong> | <strong>14.5億円</strong> | <span class="t-red"><strong>▲3.30億円</strong></span> |

🦉**夜見**「<span class="t-red">売上は24.1億円から14.5億円へ、4割減っています</span>。<strong>赤字は4期連続で、今期は幅が広がる予想です</strong>」

🦎**日向**「<span class="t-amber">株価は3.9倍……</span>」

🦞**守田**「<span class="t-red">ここで止める</span>。<strong>『赤字なのに上がっている』は、売りの理由としては弱い</strong>」

🦎**日向**「え」

🦞**守田**「<span class="t-blue">赤字の会社が上がるのは、たいてい将来の何かを買われているからだ</span>。<strong>その何かが実現するかどうかを、こちらは判定できない</strong>。<span class="t-amber">判定できないものに売り向かうのは、賭けであって投資ではない</span>」

🧑‍💼**沼田**「<span class="t-green">守田の言うとおりだ</span>。<strong>うちが売るのは『高すぎる』ではなく『高さを維持できない』と言い切れるときだけだ</strong>」

---

## 🛑 第5章｜型③｜売ってはいけない高PER──菊池製作所・ＦＩＧ

🦑**墨田**「<span class="t-red">ここがいちばん重要です</span>。<strong>同じ高PERでも、絶対に売り向かってはいけない型があります</strong>」

### 🔧 菊池製作所（3444）｜PER92.9倍

| 決算期 | 売上高 | 営業利益 | <strong>最終利益</strong> |
|---|---:|---:|---:|
| 2023年4月期 | 51.0億円 | <span class="t-red">▲6.31億円</span> | <span class="t-red">▲11.01億円</span> |
| 2024年4月期 | 52.1億円 | <span class="t-red">▲6.49億円</span> | <span class="t-red">▲8.18億円</span> |
| 2025年4月期 | 54.6億円 | <span class="t-red">▲5.20億円</span> | <span class="t-green">0.43億円</span> |
| 2026年4月期 | 60.9億円 | <span class="t-red">▲2.48億円</span> | <span class="t-green">1.03億円</span> |
| <strong>2027年4月期 予想</strong> | 61.8億円 | <span class="t-green"><strong>1.77億円</strong></span> | <span class="t-green"><strong>1.37億円</strong></span> |

🦉**夜見**「<span class="t-blue">3期連続の営業赤字から、今期ようやく営業黒字に戻る計画です</span>。<strong>PER92.9倍が高いのは、利益がまだ小さいからです</strong>」

🦎**日向**「<span class="t-green">……分母が小さいだけ</span>」

🦫**堀田**「<span class="t-amber">そのとおりだ。そして売上は51.0億円から61.8億円へ、着実に伸びている</span>。<strong>回復の初期に付くPERは、必ず高く出る</strong>」

🦞**守田**「<span class="t-red">この型に売り向かうと、いちばん危ない</span>。<strong>利益が回復するほどPERは自動的に下がり、株価は下がらない</strong>。<span class="t-blue">売り方の負けパターンとして典型的だ</span>」

### 💻 エフ・アイ・ジー（4392）｜PER52.2倍

🐊**待伏**「<span class="t-green">こちらも中身が伴っています</span>。<strong>売上133億円→予140億円、営業利益8.34億円→予10.0億円</strong>。<span class="t-amber">2024年12月期に14.12億円の最終赤字がありましたが、翌期には7.83億円の黒字へ戻しています</span>」

🦎**日向**「<span class="t-blue">高PERだけど、伸びてるほう……</span>」

🧑‍💼**沼田**「<span class="t-green">そうだ。<strong>PERという数字は、売り候補を見つける道具ではない</strong></span>。<span class="t-amber">『中身を開けるべき銘柄』を絞る道具でしかない</span>」

---

## 🦑 第6章｜墨田「私も、危うく取り違えました」

🦑**墨田**「<span class="t-red">4つ目の型を出します。これは当商会の失敗になりかけたものです</span>」

🦑**墨田**「<span class="t-blue">キオクシア・東京エレクトロン・ＳＵＭＣＯの3社は、PERが『算出不能』と表示されます</span>。<strong>最初、私はこれを赤字だと解釈しました</strong>」

🦎**日向**「<span class="t-amber">違うんですか</span>」

🦑**墨田**「<span class="t-red">違います。<strong>会社が今期の業績予想を開示していないからです</strong></span>。<span class="t-green">3社とも決算短信の予想欄が『－』で、赤字だからではありません</span>」

> ⚠️ **PERが出ない理由は2つある**
> ・<span class="t-red">①<strong>赤字</strong></span> … 地盤ＨＤ、アスタリスク → <span class="t-amber">分母がマイナス</span>
> ・<span class="t-blue">②<strong>会社が予想を開示していない</strong></span> … キオクシア、東エレク、ＳＵＭＣＯ → <span class="t-green">分母が存在しないだけ</span>

🦑**墨田**「<span class="t-amber">この2つを混ぜると、『半導体大手3社が赤字なのに上がっている』という、事実と違う記事ができあがります</span>」

🦎**日向**「<span class="t-green">……あぶなかった</span>」

🧑‍💼**沼田**「<span class="t-blue">スクリーニングは、ここが怖い</span>。<strong>表の空欄には意味が2つ以上あるのに、機械は1つに見せる</strong>。<span class="t-red">だから最後は必ず、1社ずつ決算を開く</span>」

---

## 🐒 乱入｜レバナス小猿「上がってる株を売るんですか？」

🐒**レバナス小猿**「<span class="t-red">ちょっと待ってくださいよ</span>。<strong>いま『1年で6倍になった株』の話してましたよね</strong>」

🦎**日向**「はい」

🐒**小猿**「<span class="t-blue">それ、買うんじゃなくて……売るんですか？</span>」

🦎**日向**「<span class="t-amber">検討します</span>」

🐒**小猿**「<span class="t-red">正気ですか！？ 6倍になった株はですね、7倍にもなるんですよ</span>。<strong>ボクの世界では、上がってる株を売るのは自殺行為です</strong>」

🦞**守田**「<span class="t-green">小猿、その指摘は正しい</span>」

🐒**小猿**「<span class="t-amber">またそれだ</span>」

🦞**守田**「<span class="t-blue">空売りは損失が理論上無限で、買いにはないコストが2つかかる</span>」

> 🚨 **買いにはないコスト**
> ・<span class="t-red"><strong>踏み上げ</strong></span> … 上がるほど損失が膨らみ、証拠金の追加が要る
> ・<span class="t-red"><strong>逆日歩</strong></span> … 売り建てが多い銘柄では、<span class="t-amber">持っているだけで日々かかる費用が発生する</span>
> ・<span class="t-blue">加えて、配当落調整金を<strong>支払う側</strong>に回る</span>

🦞**守田**「<span class="t-amber">だから第1回で書いたとおり、うちの売建は全体の1.5%しかない</span>。<strong>本命は買いだ。売りはおまけだ</strong>」

🐒**小猿**「<span class="t-green">……じゃあ、なんでやるんですか</span>」

🦎**日向**「<span class="t-blue">あ、それ僕が答えます</span>」

🐒**小猿**「おっ、新人くん」

🦎**日向**「<span class="t-amber">バリュー投資って、価値と値段がズレてるところを探す作業じゃないですか</span>。<strong>ズレは、安いほうにも高いほうにも出るはずなんです</strong>」

🦎**日向**「<span class="t-green">なのに僕たち、安いほうしか見ていなかった</span>。<span class="t-red">それって、物差しの半分を捨ててるのと同じでは、と思って</span>」

🐒**小猿**「<span class="t-blue">……えっ、けっこう良いこと言いますね</span>」

🧑‍💼**沼田**「<span class="t-green">こいつが企画者だからな</span>」

🐒**小猿**「<span class="t-amber">ボク、今日は絡む相手を間違えた気がします</span>」

---

## 🧯 第7章｜守田の歯止め

🦞**守田**「<span class="t-red">最後に、この連載の枠を明示しておく</span>」

> 🛡️ **逆バリュー投資の運用ルール**
> ・<span class="t-blue">売建は全体の<strong>数%まで</strong>。買いポジションのヘッジという位置づけを超えない</span>
> ・<span class="t-green">一度に売らない。<strong>分割で、高値をコツコツ</strong>。バリュー株の段階買いの鏡像</span>
> ・<span class="t-amber">短期の踏み上げは覚悟のうえ。<strong>それが耐えられない金額では建てない</strong></span>
> ・<span class="t-red">「登り100日、下げ3日」。<strong>下げは速いので、深追いせず適度に利確する</strong></span>
> ・<span class="t-red"><strong>回復途上の高PER（型③）には手を出さない</strong></span>

🦑**墨田**「<span class="t-blue">記事としての注記も置きます</span>。<strong>本稿で挙げた9銘柄は、スクリーニングを通過した「中身を開けるべき銘柄」であって、売り推奨ではありません</strong>。<span class="t-amber">当商会がこのうちのいずれかを実際に売り建てているかどうかも、本稿では述べていません</span>」

🧑‍💼**沼田**「<span class="t-green">それでいい</span>。<strong>今日の記事の値打ちは銘柄ではなく、72社が50社になり、9社になり、そこから4つの型に割れたという手順のほうにある</strong>」

---

## 📋 まとめ｜今回の手順と発見

| 段階 | 結果 |
|---|---|
| 過去1年の上昇率上位 | 75銘柄（ETF3本を除き<strong>72銘柄</strong>） |
| <strong>信用区分で絞る</strong> | <span class="t-red">貸借<strong>50</strong>／買建のみ20／現物のみ2 ＝ <strong>3割近くが売れない</strong></span> |
| PER50倍超 or 算出不能 | <strong>9銘柄</strong> |
| <span class="t-red">型①業績が追い付いていない</span> | 岡本硝子（株価4.4倍・EPSは5年で4割以下・PER328倍） |
| <span class="t-amber">型②赤字なのに上がっている</span> | 地盤ＨＤ（PBR17倍・今期赤転予想）／アスタリスク（4期連続赤字・減収） |
| <span class="t-green">型③売ってはいけない高PER</span> | <strong>菊池製作所（黒転直後で分母が小さいだけ）／ＦＩＧ（中身が伴う）</strong> |
| <span class="t-blue">型④PERが出ないだけ</span> | <strong>キオクシア・東エレク・ＳＵＭＣＯ ＝ 赤字ではなく予想未開示</strong> |

> 🦎 **日向より**
> 「<span class="t-green">スクリーニングを回して分かったのは、機械が出した9社のうち、性質が同じものは1つもなかったということでした</span>。<strong>同じ『高PER』でも、売っていいのは1社か2社で、絶対に売ってはいけないものが混ざっている</strong>。<span class="t-blue">条件を通ったところが終点ではなく、そこが入口でした</span>。<span class="t-amber">次回は、この中から実際に決算資料を全部開けてみます</span>」

🧑‍💼**沼田**「<span class="t-green">新人が9社開けて帰ってきた</span>。<strong>それだけで、この企画は元が取れている</strong>」

---

*この連載は不定期で続きます。*

*関連：[逆バリュー投資①｜なぜ少量ずつ売るのか](/blog/small-short-overvaluation-2026/)／[シケモク圏の人口調査](/blog/cheap-stock-census-2026-09/)／[バリュー投資の通信簿](/blog/scorecard-45-stocks-2026q3/)／[信用キャリーの10年設計](/blog/margin-carry-10year-model/)*

*※本稿は投資助言ではありません。特定銘柄の売買、とりわけ空売りを推奨するものではありません。空売りは損失が理論上無限であり、踏み上げ・逆日歩・配当落調整金の支払いなど、買いにはないコストが発生します。制度信用の区分（貸借／信用／現物）は株探の表示に基づく2026年9月8日時点のものであり、区分は取引所の判断で変更されます。実際に空売りが可能かどうかは、必ずご自身の証券会社で確認してください。株価・PER・PBRおよび上昇率は2026年9月8日時点、業績数値は各社の決算短信によります。本稿で挙げた銘柄は、スクリーニング条件を通過した分析対象として記載したものであり、企業の事業内容や経営を否定するものではありません。当商会が各銘柄のポジションを保有しているか否かについては述べていません。投資はご自身の判断と責任でお願いします。*
