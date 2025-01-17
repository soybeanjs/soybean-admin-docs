# NodeJS 安装教程

由于我们在日常开发过程中会遇到很多基于不同 NodeJS 版本开发的项目，有的项目需要使用低版本的 NodeJS，有的项目需要使用高版本的 NodeJS，所以我们需要安装 NodeJS 的版本管理工具。

下面推荐几个工具供大家参考

- ## nvm

### 安装

1.打开终端，输入以下命令：

#### macos

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

#### windows

```bash
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe
```

2.安装完成后，关闭终端，重新打开终端，输入以下命令：

```bash
nvm --version
```

3.如果出现版本号，则表示安装成功。

### 安装 NodeJS

1. 输入以下命令，列出所有可用的 NodeJS 版本：

```bash
nvm ls-remote
```

2. 选择一个版本进行安装，例如安装 NodeJS 14.17.0：

```bash
nvm install 18.20.5
```

3. 安装完成后，输入以下命令，切换到该版本：

```bash
nvm use 18.20.5
```

4. 输入以下命令，查看当前使用的 NodeJS 版本：

```bash
node -v
```

5. 输入以下命令，查看所有已安装的 NodeJS 版本：

```bash
nvm ls
```

- ## fnm

### windows

#### 安装chocolatey

1. 用管理员模式打开 windows Terminal

2. 执行下面命令

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. 输入choco -v，测试是否安装成功

> choco安装软件,都要用管理员模式打开 windows Terminal

### 安装fnm

1. 以管理员模式打开Terminal

2. 执行命令:

```bash
   choco install fnm
```

### 测试fnm命令

1. 打开Powershell

2. 输入 `fnm -h` 测试命令是否正常

```bash
  fnm -h
```

### 环境变量配置

#### Powershell

1. 在下面的目录新建profile.ps1文件

   ```other
   %USERPROFILE%\Documents\WindowsPowerShell\profile.ps1
   ```

   > %USERPROFILE%: 表示用户目录，直接在文件管理的地址栏输入 %USERPROFILE%，然后回车

   > WindowsPowerShell为新建的目录, 如果安装node后命令仍然无法识别，将文件夹名称改为PowerShell

2. 将下面的代码写入到上面的配置文件里面

   ```bash
   fnm env --use-on-cd | Out-String | Invoke-Expression
   ```

#### cmd

1. 搜索 cmd
2. 打开文件所在位置
3. 对 “命令提示符” 右键，点击属性
4. 修改 目标 为下面的值

   ```other
   %windir%\system32\cmd.exe /k %USERPROFILE%\bashrc.cmd
   ```

5. 进入用户目录，添加文件 bashrc.cmd
6. 将下面的代码写入到上面的配置文件里面

   ```bash
   @echo off
   FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z
   ```

#### git bash

进入用户目录，在git bash的配置文件 .bash_profile 添加下面的代码

```bash
eval $(fnm env | sed 1d)
export PATH=$(cygpath $FNM_MULTISHELL_PATH):$PATH

if [[ -f .node-version || -f .nvmrc ]]; then
   fnm use
fi
```

#### VSCode内置的cmd

在配置文件settings.json里面添加如下代码：

```json
"terminal.integrated.defaultProfile.windows": "Default Cmd",
"terminal.integrated.profiles.windows": {
  "Default Cmd":{
    "path": "C:\\Windows\\System32\\cmd.exe",
    "args": ["/k", "%USERPROFILE%\\bashrc.cmd"]
  }
}
```

### Mac

#### 安装fnm

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

#### 设置fnm环境

1. 在.zshrc中加入下面的代码

```bash
eval "$(fnm env --use-on-cd)"
```

2. 刷新.zshrc

```bash
source ~/.zshrc
```

#### fnm使用

#### 安装NodeJS

```other
fnm install 16
fnm install 14
fnm install 12
```

#### 使用NodeJS

```other
fnm use 16
fnm use 14
fnm use 12
```

#### 测试node命令

```other
node -v
```

#### fnm切换node默认版本

```other
fnm default 14 #默认使用版本14，每次打开terminal的node版本就是14
```

#### fnm更多用法

```other
fnm -h
```

> 或者访问 [https://github.com/Schniz/fnm](https://github.com/Schniz/fnm)
