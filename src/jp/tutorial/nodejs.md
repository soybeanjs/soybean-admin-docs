# NodeJS インストールチュートリアル

日常的な開発では、さまざまな NodeJS バージョンで開発されたプロジェクトに出会うことがよくあります。あるプロジェクトでは古いバージョンの NodeJS が必要で、別のプロジェクトでは新しいバージョンが必要です。そのため、NodeJS のバージョン管理ツールをインストールする必要があります。

以下に、いくつかのツールをおすすめします。

- ## nvm

### インストール

1.ターミナルを開き、以下のコマンドを入力します：

#### macos

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

#### windows

```bash
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe
```

2.インストールが完了したら、ターミナルを閉じて再度開き、以下のコマンドを入力します：

```bash
nvm --version
```

3.バージョン番号が表示されれば、インストール成功です。

### 安装 NodeJS

1. 以下のコマンドを入力して、利用可能な NodeJS のバージョンを一覧表示します：

```bash
nvm ls-remote
```

2. 任意のバージョンを選んでインストールします（例：NodeJS 18.20.5 をインストール）：

```bash
nvm install 18.20.5
```

3. インストールが完了したら、以下のコマンドでそのバージョンを切り替えます：

```bash
nvm use 18.20.5
```

4. 以下のコマンドで、現在使用している NodeJS のバージョンを確認します：

```bash
node -v
```

5. 以下のコマンドで、インストールされているすべての NodeJS バージョンを確認します：

```bash
nvm ls
```

- ## fnm

### windows

#### 安装chocolatey

1. 管理者モードで Windows Terminal を開きます。

2. 以下のコマンドを実行します：

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. choco -v と入力して、インストールが成功したか確認します。

> Chocolatey を使用してソフトウェアをインストールする際は、管理者モードで Windows Terminal を開く必要があります。

### fnm のインストール

1. 管理者モードで Terminal を開きます。

2. 以下のコマンドを実行します：

```bash
   choco install fnm
```

### fnm コマンドのテスト

1. PowerShell を開きます。

2. `fnm -h` と入力して、コマンドが正常に動作するかテストします：

```bash
  fnm -h
```

### 環境変数の設定

#### Powershell

1. 以下のディレクトリに `profile.ps1` ファイルを新規作成します：

   ```other
   %USERPROFILE%\Documents\WindowsPowerShell\profile.ps1
   ```

   > %USERPROFILE% はユーザーディレクトリを指します。ファイルエクスプローラーのアドレスバーに %USERPROFILE% を入力し、Enter を押してください。

   > WindowsPowerShell は新規作成したディレクトリ名です。Node をインストールした後もコマンドが認識されない場合は、フォルダ名を PowerShell に変更してください。

2. 上記の設定ファイルに以下のコードを追加します：

   ```bash
   fnm env --use-on-cd | Out-String | Invoke-Expression
   ```

#### cmd

1. cmd を検索します。
2. ファイルの場所を開きます。
3. 「コマンドプロンプト」を右クリックし、プロパティを選択します。
4. 目標を以下のように変更します：

   ```other
   %windir%\system32\cmd.exe /k %USERPROFILE%\bashrc.cmd
   ```

5. ユーザーディレクトリに bashrc.cmd ファイルを作成します。
6. 上記の設定ファイルに以下のコードを追加します：

   ```bash
   @echo off
   FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z
   ```

#### git bash

ユーザーディレクトリにある git bash の設定ファイル .bash_profile に以下のコードを追加します：

```bash
eval $(fnm env | sed 1d)
export PATH=$(cygpath $FNM_MULTISHELL_PATH):$PATH

if [[ -f .node-version || -f .nvmrc ]]; then
   fnm use
fi
```

#### VSCode 内蔵のcmd

設定ファイル settings.json に以下のコードを追加します：

```json
"terminal.integrated.defaultProfile.windows": "Default Cmd",
"terminal.integrated.profiles.windows": {
  "Default Cmd":{
    "path": "C:\\Windows\\System32\\cmd.exe",
    "args": ["/k", "%USERPROFILE%\\bashrc.cmd"]
  }
}
```

### macOS

#### fnm のインストール

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

#### fnm 環境の設定

1. .zshrc をリフレッシュします：

```bash
eval "$(fnm env --use-on-cd)"
```

2. source ~/.zshrc

```bash
source ~/.zshrc
```

#### fnm の使用

#### NodeJS のインストール

```other
fnm install 16
fnm install 14
fnm install 12
```

#### NodeJS の使用

```other
fnm use 16
fnm use 14
fnm use 12
```

#### Node コマンドのテスト

```other
node -v
```

#### fnm のデフォルト Node バージョンを切り替える

```other
fnm default 14 # デフォルトで Node バージョン 14 を使用、ターミナルを開くたびにバージョン 14 が使用される
```

#### fnm のその他の使い方

```other
fnm -h
```

> または [fnm](https://github.com/Schniz/fnm) を参照してください。
