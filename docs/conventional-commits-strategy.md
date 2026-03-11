## Conventional Commits & Branch Strategy

### Commit messages

- **Format**: `<type>(<scope>): <summary>`
- **Types used in this repo**
  - `feat`: 新機能追加（ライブラリ機能、デモ機能など）
  - `fix`: バグ修正
  - `chore`: ビルド・設定・ドキュメントなどの雑多な変更
  - `refactor`: 挙動を変えないリファクタリング
  - `docs`: ドキュメントのみの変更
  - `test`: テスト追加・変更
- **Scopes の例**
  - `lib`: `projects/ionic-audio` ライブラリ
  - `demo`: `ionic-audio-demo` Angular アプリ
  - `migration`: 移行全般（横断的な変更）
  - `build`: CI / ビルド・設定

### Branch 命名規則

- 基本形: `<type>/<short-description>`
  - 例:
    - `feat/ionic-audio-demo-basic`
    - `feat/ionic-audio-demo-capacitor`
    - `feat/ionic-audio-new-control-flow`
    - `chore/migration-inventory`
- マイグレーション関連で長く動くブランチは、`feat/ionic-angular-migration` のように親ブランチとして扱い、その下に機能ごとのブランチを切る。

### Pull Request

- **タイトル**: 原則として **最初のメインコミットと同じ Conventional Commits 形式** を使う。
  - 例: `feat(demo): add capacitor setup for ionic-audio demo`
- **本文テンプレート（推奨）**
  - `## Summary`: 1〜3 行で要約
  - `## Changes`: 箇条書きで主な変更点
  - `## How to test`: ビルド・起動・確認手順
  - `## Impact`: 影響範囲（Breaking change の有無など）

### 運用ルール（簡易）

- `master` には直接 push しない。必ず PR 経由でマージする。
- 一つの PR には「1 つのまとまった目的」を入れる（ライブラリ実装とドキュメントだけ、など）。
- 可能な限り `npm run build` など基本的なビルドが通る状態で PR を出す。

