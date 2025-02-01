# デバッグ

## 概要

ソフトウェア開発の世界では、デバッグは開発者の拡大鏡と手術用ナイフのようなもので、以下のことを助けてくれます：

- 🔍 コードのエラーを迅速に特定し修正する
- 🔄 コードの実行フローを深く理解する
- 📊 変数の状態をリアルタイムで監視する
- 💾 メモリ使用量を分析する
- ⚡ プログラムのパフォーマンスを最適化する

この記事では、VSCode の強力なデバッグ機能を使い、デバッグのプロセスを効率的に行う方法を紹介します。

## JavaScript と TypeScript のデバッグ

### tsx - TypeScript 実行ツール

[`tsx`](https://tsx.is/) は、Node.js で TypeScript を実行するための強化ツールです。これにより、TypeScript コードの実行がシンプルで直接的になります：

- 設定なしで TypeScript ファイルを実行
- ES モジュールと CommonJS の両方をサポート
- ソースマップのサポート
- 優れたパフォーマンス

```bash
# tsx をインストール
npm install -g tsx

# TypeScript ファイルを実行
tsx your-file.ts
```

VSCode のデバッグ設定を使うことで、ブレークポイントのデバッグや変数監視などの高度な機能を簡単に実現できます。次のセクションでは、VSCode のデバッグ環境の設定方法を詳しく説明します。

> 💡 ヒント：VSCode のデバッグ機能は、Node.js のデバッガーと完璧に統合されているため、JavaScript のデバッグと同じように簡単に TypeScript のコードをデバッグできます。

### tsx のデバッグ手順

1. 最初に `tsx` をグローバルにインストールします：

```bash
npm i -g tsx
```

2. 次に、プロジェクトの `.vscode/launch.json` に以下のデバッグ設定を追加します：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "TS Debugger",
      "runtimeExecutable": "tsx",
      "skipFiles": ["<node_internals>/**", "${workspaceFolder}/node_modules/**"],
      "program": "${file}"
    }
  ]
}
```

3. デバッグテスト

   - 新しく `debug.ts` ファイルを作成
   - 以下のコードを入力

     ```ts
     function transformToKebabCase(input: string): string {
       return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
     }

     function start() {
       const input = 'HelloWorld';
       const result = transformToKebabCase(input);
       return result;
     }

     start();
     ```

4. 画像の手順に従ってデバッグします

   ![](../../assets/VSCode调试指南01.png)
   ![](../../assets/VSCode调试指南02.png)

## Vue デバッグ

### デバッグ手順

1. プロジェクトの `.vscode/launch.json` に以下のデバッグ設定を追加します：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Vue Debugger",
      "url": "http://localhost:9527",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

> 設定内の URL のポート番号は、プロジェクトのローカル開発サーバーのポート番号と一致させてください。

2. プロジェクトをローカルで起動します
3. デバッグをテストします

- `about/index.vue` ページを開き、`onMounted` 内にブレークポイントを追加
- `Vue Debugger` を選択し、デバッグを開始 - ブラウザで about ページが開き、その後 VSCode に自動で戻ります
  ![](../../assets/VSCode调试指南03.png)
  > 同様に、例えばボタンをクリックして実行されるロジックをテストする場合、クリックイベント内にブレークポイントを追加し、ページ上でクリックすることでデバッグをトリガーできます。

### ブレークポイントの種類

- コンポーネントの methods にブレークポイントを設定
- ライフサイクルフック内にブレークポイントを設定
- 計算プロパティ内にブレークポイントを設定
- watch 内にブレークポイントを設定
- ルートガード内にブレークポイントを設定

> 開発環境で最良のデバッグ体験を得るために、ソースマップを有効にすることを忘れないでください：

```ts
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: true
  }
```
