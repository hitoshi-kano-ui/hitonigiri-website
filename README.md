# ヒトニギリ研究所 ホームページ

設計書 `ヒトニギリ研究所_ホームページ構築設計書_v1.0.docx` に準拠した静的HTML/CSSサイト。

## ローカルで閲覧する

ブラウザで `index.html` を直接開いても動作するが、フォントやリンク挙動を本番に近づけるには簡易サーバ経由を推奨。

```bash
cd orchestrator/teams/content/website
python3 -m http.server 8000
# → http://localhost:8000/ をブラウザで開く
```

## ファイル構成

```
website/
├── index.html                          トップページ (/)
├── philosophy/index.html               想い/考え方 (/philosophy)
├── services/
│   ├── index.html                      サービス一覧 (/services)
│   ├── hsm/index.html                  HSM詳細
│   ├── the-future/index.html           THE FUTURE詳細
│   ├── labor-advisor/index.html        労務トラブルアドバイザー詳細
│   ├── hr-ai/index.html                人事×AIサポート詳細
│   └── hr-advisory/index.html          人事アドバイザリー詳細
├── about/index.html                    代表者紹介・会社情報 (/about)
├── contact/
│   ├── index.html                      お問い合わせフォーム (/contact)
│   └── complete/index.html             送信完了
├── privacy/index.html                  プライバシーポリシー (/privacy)
├── css/style.css                       共通スタイル
├── js/main.js                          モバイルナビ・フォーム制御
└── assets/images/                      画像格納先（差し替え予定）
```

## デザイン仕様

| 項目 | 値 |
|------|-----|
| ブランドカラー（メイン） | `#0C8DC4` |
| ブランドカラー（ダーク） | `#086A95` |
| 本文色 | `#1A2733` |
| 補助色 | `#4A5868`, `#7A8694` |
| 和文フォント | Noto Sans JP（Google Fonts CDN） |
| 英数フォント | Inter / system-ui |
| ブレークポイント | 768px / 480px |

## 配置済み画像（`assets/images/`）

- `logo.png` — フルロゴ（ヘッダー）
- `logo-mark.png` — マーク単体（予備）
- `favicon.png` — 64×64 ファビコン
- `representative.png` — 代表理事 顔写真

## 既知の未確定事項（要差し替え）

- お問い合わせフォーム送信先（現状はモック動作で `/contact/complete/` へ遷移）
- ドメイン
- info@ メールアドレス（privacy/index.html）

## 補足

- フォームは送信先未定のためフロントエンドのモック実装。本番化時はバックエンド連携が必要。
- グローバルナビ・フッターは全ページに直接埋め込み。CMS化や共通化は今後の運用方針に応じて検討。
