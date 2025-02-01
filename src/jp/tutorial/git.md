# Git

[Git](https://git-scm.com/) の公式サイトから Git ツールをダウンロードします。

## Git の初期設定

- ユーザー情報の設定

```bash
git config --global user.name "Soybean"
git config --global user.email "soybeanjs@outlook.com"
```

- SSH キーの生成

```bash
ssh-keygen
```

> 途中の選択肢では、そのまま Enter を押してください。

::: tip ヒント
完全なコマンド：

```bash
ssh-keygen -t rsa -C "soybeanjs@outlook.com"
```

> `-t` rsa は RSA 鍵を生成するオプション、`-C` はコメントを設定するオプションで、後にコメント内容を指定します。

:::

- Git の SSH キーをアップロード

ユーザーディレクトリ内の .ssh/id_rsa.pub を探し、ファイルを開いて内容をコピーし、Git コード管理プラットフォームの SSH キー設定に追加します。

## Git の基本コマンド

- main ブランチの最新コードを現在のブランチに同期

```bash
git pull origin main
git rebase origin/main
```

> 現在のブランチが main の場合、` ` を直接使用できます。

競合が発生した場合は、競合を解決した後、以下のコマンドで rebase を続行します。

```bash
git add .
git rebase --continue
```

- 直前のコミットの日時を変更

```bash
git commit --amend --date="2022-07-29T23:45"
```

- 複数のコミットを統合

```bash
git rebase -i HEAD~n  # n为要合并commit的个数
```

-- 指定したコミットを現在のブランチにコピー

```bash
git cherry-pick <commit_id>
```

> デフォルトでは元のコミット情報を保持します。コミット履歴を残さず適用したい場合は、`git cherry-pick -n <commit_id>` を使用します。
