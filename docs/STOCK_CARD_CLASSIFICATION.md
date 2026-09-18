# 紹介銘柄の編集タグ（ローカルプレビュー）

2026-09-13。対象47記事。分類46件／未設定1件。これは既存記事の投資テーゼを整理する編集タグであり、新しい財務分析・投資評価ではありません。rating・価格・本文は変更していません。

## 後から修正する方法

各記事のfrontmatterの `stockCard` 内に任意の `investmentType` と `assetTypes` を設定します。型を消すとホームに灰色の「分類未設定」が出ます。自動推定はしません。

- investmentType: 資産型 / 本業型 / ニッチトップ型 / インカム型 / イベント型 / 複合型
- assetTypes（配列）: 現預金 / 有価証券 / 土地・不動産 / ネットキャッシュ / その他資産
- 補助タグは投資テーゼに関係する資産のみ。単に貸借対照表に存在する資産、否定された含み益、他社の資産は付けません。「その他資産」はパンチ工業の売掛金です。
- 複合型は記事が資産・収益・還元・資本イベントなど複数の軸を主要な理由として扱う場合。本業型は収益力を主軸と明言する場合を優先します。
- 日本ホスピスHDは需要回復・制度変更・提携などの説明が中心で、今回の6分類への対応を確定せず未設定にしています。

## ローカル検証結果

- `python scripts/precheck.py`: 113本、エラー0、警告2（変更前と同じ。cheap-stock-census-2026-09 と doshisha-7483 の終値基準日）。
- `npm.cmd run build`: 成功、124ページ生成。Pagefindも成功、公開記事111本を索引化。既存のdownloads内HTML断片1件はhtml要素がないため検索対象外という警告あり。
- draft 2本（cheap-stock-census-2026-09 / reverse-value-02-short-screening）は記事ページ未生成。生成HTML・RSS・サイトマップへの該当記事URL混入なし。
- 46記事はタグ追加を除いて元のバイト列と一致。ホームは紹介銘柄欄・その専用処理とCSS以外が一致し、最新記事・siteUpdatesを保持。
- 7ランクの件数、ランク内の公開日降順、全47件のリンク先生成を検査。A++ 1 / A+ 2 / A 3 / A- 8 / B++ 15 / B+ 16 / B 2。
- ブラウザーでPC・スマホ表示、横あふれなし、Enterで展開／Spaceで閉じる操作、aria-expandedの反映、銘柄行から既存記事への遷移を確認。
- 詳細ログ・作業前バックアップ・検証スクリプト: `scratch/stock-rank-preview/`。

変更ファイル: `src/pages/index.astro`、`src/components/StockRankSummary.astro`（新規）、`src/content.config.ts`、下表の分類済み46記事、このドキュメント。`dist/` はローカルビルドで再生成。公開・deploy・commit・pushは未実施。

プレビューはリポジトリで `npm.cmd run preview -- --host 127.0.0.1 --port 4327` を実行し、`http://127.0.0.1:4327/#stock-ranks-title` を開きます。127.0.0.1に限定して待ち受けます。編集後は `npm.cmd run build` で再生成してください。

## 根拠一覧

引用は既存descriptionまたは本文。数値は記事に書かれた根拠をそのまま記録したもので、再計算や更新はしていません。

| 記事 | 投資タイプ | 補助タグ | 明示根拠（抜粋） |
| --- | --- | --- | --- |
| [chuo-malleable-5607](../src/content/blog/chuo-malleable-5607.md) | 資産型 | 現預金 / 有価証券 / ネットキャッシュ / 土地・不動産 | 株価601円の84.5%が金融資産で埋まる |
| [daiichi-cutter-1716](../src/content/blog/daiichi-cutter-1716.md) | 資産型 | ネットキャッシュ | 守り堅い資産型 |
| [daiken-5900](../src/content/blog/daiken-5900.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | 資産の裏付けは極厚 |
| [daishin-chemical-4629](../src/content/blog/daishin-chemical-4629.md) | 複合型 | 現預金 | 速さの違う時計が2つ動いている |
| [doshisha-7483](../src/content/blog/doshisha-7483.md) | 複合型 | 現預金 / ネットキャッシュ | 事業の質も高く、事業ROICは35.2% |
| [em-systems-4820](../src/content/blog/em-systems-4820.md) | ニッチトップ型 | — | 国内シェア42.8%＝4割超の首位 |
| [endo-lighting-6932](../src/content/blog/endo-lighting-6932.md) | イベント型 | — | 動のイベント株 |
| [fenwal-6870](../src/content/blog/fenwal-6870.md) | 複合型 | ネットキャッシュ / 有価証券 | 代替の効かないニッチトップ |
| [fujikura-kasei-4620](../src/content/blog/fujikura-kasei-4620.md) | 資産型 | 現預金 / ネットキャッシュ / 有価証券 | 62.7%が金融資産で説明できる |
| [gunei-chemical-4229](../src/content/blog/gunei-chemical-4229.md) | 資産型 | 現預金 / 有価証券 | 現金・有価証券の山に埋もれて見えなくなっている資産バリュー株 |
| [hoshiwa-denki-6748](../src/content/blog/hoshiwa-denki-6748.md) | 複合型 | 有価証券 | リターンの主エンジンはBPSの年10%複利 |
| [katakura-3001](../src/content/blog/katakura-3001.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | コクーンシティ |
| [kawasaki-setsubi-1777](../src/content/blog/kawasaki-setsubi-1777.md) | 本業型 | — | 投資妙味が残るのは収益力と可視性の側にある |
| [keihan-hd-9045](../src/content/blog/keihan-hd-9045.md) | 資産型 | 土地・不動産 | 土地含み益5,000〜7,000億円 |
| [kitazato-368a](../src/content/blog/kitazato-368a.md) | ニッチトップ型 | — | 日本の体外受精（IVF）消耗品市場を独占 |
| [kozosodo-hd-7868](../src/content/blog/kozosodo-hd-7868.md) | イベント型 | — | 東京博善」の売却検討を会社が公表 |
| [nakayama-steel-5408](../src/content/blog/nakayama-steel-5408.md) | 資産型 | 現預金 / ネットキャッシュ / 土地・不動産 | 資産の裏付けだけで説明できてしまう |
| [nankai-chemical-4040](../src/content/blog/nankai-chemical-4040.md) | 本業型 | — | この銘柄の割安性の主戦場は収益力側にある |
| [nanshin-7399](../src/content/blog/nanshin-7399.md) | 資産型 | 現預金 / ネットキャッシュ / 土地・不動産 | 株価618円をすでに上回っている |
| [nifty-lifestyle-4262](../src/content/blog/nifty-lifestyle-4262.md) | インカム型 | — | 本稿の中核は株主優待の設計にある |
| [nihon-bs-hoso-9414](../src/content/blog/nihon-bs-hoso-9414.md) | 複合型 | 土地・不動産 | 資産価値と株価の乖離＋カタリスト |
| [nihon-gear-6356](../src/content/blog/nihon-gear-6356.md) | ニッチトップ型 | — | 原発バルブアクチュエーター国内シェア90%超 |
| [nihon-hospice-7061](../src/content/blog/nihon-hospice-7061.md) | 分類未設定 | — | 6分類への対応を保留 |
| [nisshin-group-8881](../src/content/blog/nisshin-group-8881.md) | 複合型 | 現預金 / 土地・不動産 | 本稿の中核は実行設計にある |
| [nssol-2327](../src/content/blog/nssol-2327.md) | イベント型 | — | 総会後に防衛策が消滅 |
| [okaya-kouki-7485](../src/content/blog/okaya-kouki-7485.md) | 資産型 | 有価証券 | 投資有価証券だけで時価総額を170%超逆転 |
| [oyo-9755](../src/content/blog/oyo-9755.md) | 資産型 | ネットキャッシュ | 国策インフラ資産バリューの守り |
| [penta-ocean-1893](../src/content/blog/penta-ocean-1893.md) | 本業型 | — | 安さの在り処が収益力と還元にある |
| [punch-industry-6165](../src/content/blog/punch-industry-6165.md) | 資産型 | 現預金 / その他資産 | 株価539円の93%が現金・売掛金で裏付けられた |
| [ryoyu-systems-4685](../src/content/blog/ryoyu-systems-4685.md) | 複合型 | — | 3つの強力な投資テーゼが重なっている |
| [sakurajima-futo-9353](../src/content/blog/sakurajima-futo-9353.md) | 資産型 | 有価証券 | 含み資産の実体は土地ではなく有価証券 |
| [sanko-6964](../src/content/blog/sanko-6964.md) | 資産型 | 現預金 / 有価証券 | 割安さは含み益ではなく簿価そのものが評価されていない |
| [sankyo-frontier-9639](../src/content/blog/sankyo-frontier-9639.md) | 本業型 | — | 強みはストック収入比率48%とROE11.0%の収益力 |
| [shinko-kogyo-6458](../src/content/blog/shinko-kogyo-6458.md) | 本業型 | — | 資本コストの2倍を稼ぐ事業 |
| [shinyei-3004](../src/content/blog/shinyei-3004.md) | 資産型 | 有価証券 | 政策保有株5銘柄の現在時価が時価総額88億円の91.2% |
| [showa-kagaku-4990](../src/content/blog/showa-kagaku-4990.md) | 資産型 | 現預金 / 有価証券 | 複利のエンジンは現時点では本業ではなく保有株にある |
| [tanaken-1450](../src/content/blog/tanaken-1450.md) | 本業型 | — | 持たざる経営 |
| [tobu-network-9036](../src/content/blog/tobu-network-9036.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | 修正ネットキャッシュのたった25.4% |
| [toc-8841](../src/content/blog/toc-8841.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | 1,891億円の東京都心の不動産を378億円で買っている |
| [tokai-electronics-8071](../src/content/blog/tokai-electronics-8071.md) | 資産型 | 現預金 / ネットキャッシュ | 株価2,800円を純キャッシュだけで上回る |
| [tokai-senko-3577](../src/content/blog/tokai-senko-3577.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | 株価は保有現金を下回る |
| [tosnet-4754](../src/content/blog/tosnet-4754.md) | 複合型 | ネットキャッシュ | 投資妙味の中心は『株主構成が動き始めた』こと |
| [toso-5956](../src/content/blog/toso-5956.md) | 資産型 | 現預金 / 有価証券 / 土地・不動産 | 聞いているのはいくらの資産をいくらで買えるかだけ |
| [towns-197a](../src/content/blog/towns-197a.md) | インカム型 | — | 累進配当をもらいながら |
| [toyo-tec-9686](../src/content/blog/toyo-tec-9686.md) | 複合型 | 有価証券 / 土地・不動産 | 待つコストがマイナスにならない資産バリュー |
| [tv-tokyo-9413](../src/content/blog/tv-tokyo-9413.md) | 資産型 | 現預金 / 有価証券 | 全事業をEV/EBITDA1.9倍でタダ同然に買える資産バリュー株 |
| [yamau-hd-5284](../src/content/blog/yamau-hd-5284.md) | 複合型 | ネットキャッシュ / 土地・不動産 | 市場は依然として利益率3%時代の評価を当てたまま |
