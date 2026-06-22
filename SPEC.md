# ヒトニギリ研究所 公式サイト 仕様書

> このドキュメントは、当サイトの全構成・設定を網羅した運用台帳である。  
> サイトに修正を加える際は、本ファイルも併せて改訂すること。

**最終更新日：2026-06-22**  
**初版作成日：2026-06-22**

---

## 1. 基本情報

| 項目 | 内容 |
|------|------|
| サイト名 | ヒトニギリ研究所 公式サイト |
| 公開URL | https://hitonigiri.com |
| ドメイン | hitonigiri.com |
| ドメイン登録業者 | お名前.com（GMOインターネット）|
| ホスティング | Cloudflare Pages |
| ソースコード管理 | GitHub: `hitoshi-kano-ui/hitonigiri-website` |
| 公開日 | 2026-06-22 |
| 法人情報 | 一般社団法人ヒトニギリ研究所（〒263-0035 千葉県千葉市稲毛区稲毛町5-557） |

---

## 2. ドメイン・DNS設定

### 2-1. ドメイン
- **登録業者**：お名前.com（解約・更新はここで管理）
- **DNS権威**：Cloudflare（**お名前.comのDNSは使用していない**）

### 2-2. ネームサーバ
```
fiona.ns.cloudflare.com
george.ns.cloudflare.com
```
（旧：`01-04.dnsv.jp`（お名前.com）から2026-06-22に切替）

### 2-3. DNSレコード一覧

| Type | Name | Content | Proxy | 用途 |
|------|------|---------|-------|------|
| CNAME | hitonigiri.com | hitonigiri-website.pages.dev | Proxied | Webサイト |
| CNAME | www | hitonigiri-website.pages.dev | Proxied | www→裸ドメインリダイレクト用 |
| MX (priority 1) | hitonigiri.com | aspmx.l.google.com | DNS only | メール（Google Workspace）|
| MX (priority 5) | hitonigiri.com | alt1.aspmx.l.google.com | DNS only | メール |
| MX (priority 5) | hitonigiri.com | alt2.aspmx.l.google.com | DNS only | メール |
| MX (priority 10) | hitonigiri.com | alt3.aspmx.l.google.com | DNS only | メール |
| MX (priority 10) | hitonigiri.com | alt4.aspmx.l.google.com | DNS only | メール |
| TXT | hitonigiri.com | `v=spf1 include:_spf.google.com ~all` | DNS only | SPF（メール送信元認証）|
| TXT | hitonigiri.com | `google-site-verification=2docNYyGVVHqTVI7JUiClsKGwAhfpNxShQq3lQEqubw` | DNS only | Google認証（Workspace/Search Console）|

⚠️ **MXとTXTは絶対にProxy（オレンジ雲）にしてはならぬ**（メール停止する）

---

## 3. メール設定（Google Workspace）

### 3-1. 主アカウント
- `hitoshi-kano@hitonigiri.com`（代表理事 嘉野均）

### 3-2. その他のアドレス
- `info@hitonigiri.com`：**未作成**（今後設定予定）

### 3-3. 認証
- SPF：設定済（上記DNS参照）
- DKIM：**未設定**（推奨：今後追加）
- DMARC：**未設定**（推奨：今後追加）

---

## 4. ホスティング（Cloudflare Pages）

### 4-1. プロジェクト
| 項目 | 内容 |
|------|------|
| プロジェクト名 | `hitonigiri-website` |
| GitHubリポジトリ | `hitoshi-kano-ui/hitonigiri-website` |
| Production branch | `main` |
| Framework preset | None（静的HTML） |
| Build command | なし |
| Build output directory | なし（リポジトリルート） |
| 暫定URL | https://hitonigiri-website.pages.dev |

### 4-2. カスタムドメイン
| ドメイン | 状態 | SSL | 備考 |
|---------|------|-----|------|
| hitonigiri.com | Active | Cloudflare Universal SSL | 本番URL |
| www.hitonigiri.com | Active | Cloudflare Universal SSL | 301リダイレクトで裸ドメインへ |

### 4-3. 自動デプロイ
- `main`ブランチへのpushで自動デプロイ（約30秒〜1分で本番反映）

---

## 5. セキュリティ設定（Cloudflare）

### 5-1. SSL/TLS
- **暗号化モード**：Full (strict)
- **Always Use HTTPS**：ON
- **HSTS**：有効
  - Max Age: `15552000`（180日 / 6ヶ月）
  - Include SubDomains: **OFF**（メールドメインへの影響回避のため）
  - Preload: OFF
  - No-Sniff Header: ON

### 5-2. ボット対策
- **Bot Fight Mode**：ON
- **JS Detections**：ON

### 5-3. セキュリティヘッダ（`_headers` ファイルで設定）
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'
```

### 5-4. リダイレクトルール
| 種類 | 内容 | 仕組み |
|------|------|--------|
| HTTP → HTTPS | 自動 | Cloudflare "Always Use HTTPS" |
| www → 裸ドメイン | 301 Permanent Redirect（クエリ保持） | Cloudflare Redirect Rule "Redirect from WWW to root [Template]" |

---

## 6. SEO設定

### 6-1. 各ページに実装済み
- `<link rel="canonical">`：正規URL一本化（hitonigiri.com に集約）
- OGP meta（og:type, og:url, og:title, og:description, og:image, og:site_name, og:locale）
- Twitter Card meta
- JSON-LD構造化データ

### 6-2. 構造化データ詳細
| ページ | スキーマタイプ |
|--------|---------------|
| `/` | Organization + WebSite |
| `/services/hsm/` | Service |
| `/services/the-future/` | Service |
| `/services/labor-advisor/` | Service |
| `/services/hr-ai/` | Service |
| `/services/hr-advisory/` | Service |
| `/about/` | AboutPage + Person |
| `/contact/complete/` | noindex（サンクスページのためインデックス除外）|

### 6-3. SEO関連ファイル
| ファイル | 用途 |
|---------|------|
| `sitemap.xml` | 全11ページのサイトマップ |
| `robots.txt` | クロール許可ポリシー + AI検索クローラ明示許可 |
| `llms.txt` | AI検索（ChatGPT/Claude/Perplexity等）向け構造化サマリ |
| `404.html` | カスタム404ページ（noindex）|

### 6-4. AI検索対応
robots.txtで以下を明示許可：
- GPTBot / ChatGPT-User（OpenAI）
- ClaudeBot / Claude-Web / anthropic-ai（Anthropic）
- PerplexityBot / Perplexity-User（Perplexity）
- Google-Extended（Google AI Overviews）
- Applebot-Extended（Apple Intelligence）
- CCBot（Common Crawl）

---

## 7. 解析・検索エンジン登録

### 7-1. Cloudflare Web Analytics
- **状態**：有効
- **特徴**：Cookieなし・個人特定なし・サーバサイド計測（広告ブロックに強い）
- **アクセス**：Cloudflareダッシュボード → Analytics → Web Analytics → hitonigiri.com
- **計測項目**：ページビュー、訪問数、流入元、デバイス、Core Web Vitals（LCP/INP/CLS）

### 7-2. Google Search Console
- **状態**：所有権確認済（DNS-TXTで自動認証）
- **サイトマップ**：`https://hitonigiri.com/sitemap.xml` 送信済（11ページ検出）
- **プロパティタイプ**：ドメイン
- **アクセス**：https://search.google.com/search-console → hitonigiri.com

---

## 8. ファイル構成

```
hitonigiri-website/
├── SPEC.md                         本ファイル
├── README.md                       README
├── _headers                        Cloudflareセキュリティヘッダ設定
├── _redirects                      （現状未使用。リダイレクトはCloudflare Redirect Ruleで実装）
├── 404.html                        カスタム404ページ
├── llms.txt                        AI検索向け構造化サマリ
├── robots.txt                      クローラポリシー
├── sitemap.xml                     サイトマップ
├── index.html                      トップ
├── philosophy/index.html           想い/考え方
├── services/
│   ├── index.html                  サービス一覧
│   ├── hsm/index.html              HSM詳細
│   ├── the-future/index.html       THE FUTURE詳細
│   ├── labor-advisor/index.html    労務トラブルアドバイザー詳細
│   ├── hr-ai/index.html            人事×AIサポート詳細
│   └── hr-advisory/index.html      人事アドバイザリー詳細
├── about/index.html                代表者紹介・会社情報
├── contact/
│   ├── index.html                  お問い合わせフォーム（※現状モック）
│   └── complete/index.html         送信完了
├── privacy/index.html              プライバシーポリシー
├── css/style.css                   共通スタイル
├── js/main.js                      共通スクリプト
└── assets/images/
    ├── logo.png                    フルロゴ
    ├── logo-mark.png               マーク単体
    ├── favicon.png                 ファビコン
    └── representative.png          代表理事写真
```

---

## 9. デザイン仕様

| 項目 | 値 |
|------|-----|
| ブランドカラー（メイン） | `#0C8DC4` |
| ブランドカラー（ダーク） | `#086A95` |
| 本文色 | `#1A2733` |
| 補助色 | `#4A5868`, `#7A8694` |
| 和文フォント | Noto Sans JP（Google Fonts CDN） |
| 英数フォント | Inter / system-ui |
| ブレークポイント | 768px / 480px |
| デザイン方針 | 誠実・落ち着き・専門性（経営者層向け） |
| アニメーション | IntersectionObserverによるfade-up/stagger演出 |

---

## 10. 更新フロー

### 10-1. 通常の修正
```
殿 → 家老（AI）に修正依頼
      ↓
家老がGitHubリポジトリを編集してpush
      ↓
Cloudflare Pages が自動検知 → 1分以内に本番反映
      ↓
家老が反映確認・SPEC.md改訂・殿に報告
```

### 10-2. 殿の作業
HTMLを一切触る必要なし。**家老に「○○を××に直して」と一言告げるだけ**。

### 10-3. 改訂時のルール
- HTML/CSS/JS等の変更を伴う作業時、本SPEC.mdも併せて改訂する
- 改訂履歴は本ファイル末尾の「12. 改訂履歴」に追記する

---

## 11. 既知の未実装事項

| 項目 | 状態 | 優先度 |
|------|------|--------|
| お問い合わせフォーム本番化 | モック動作中（送信されない）| 高 |
| info@hitonigiri.com メール作成 | 未作成 | 高 |
| 問い合わせデータベース化 | 未着手 | 中 |
| DMARC TXT追加（メール認証強化）| 未設定 | 中 |
| DKIM追加（メール認証強化）| 未設定 | 中 |
| Bing Webmaster Tools登録 | 未登録 | 低 |
| 専用OGP画像作成（現状はロゴ流用）| 未作成 | 低 |
| ブログ機能 | 未着手 | 低 |

---

## 12. 関連URL・アクセス先

| サービス | URL |
|---------|-----|
| 公開サイト | https://hitonigiri.com |
| GitHubリポジトリ | https://github.com/hitoshi-kano-ui/hitonigiri-website |
| Cloudflareダッシュボード | https://dash.cloudflare.com |
| Cloudflare Pages | dash.cloudflare.com → Workers & Pages → hitonigiri-website |
| Google Search Console | https://search.google.com/search-console |
| お名前.com Navi | https://navi.onamae.com |
| Google Workspace 管理 | https://admin.google.com |

---

## 13. 改訂履歴

| 日付 | 改訂内容 | 担当 |
|------|---------|------|
| 2026-06-22 | 初版作成（全構成を網羅）| 家老 |
