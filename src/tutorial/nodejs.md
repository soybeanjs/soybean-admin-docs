# NodeJS installation tutorial

Since we often encounter projects developed based on different NodeJS versions in our daily development, some projects require an older version of NodeJS, while others need a newer version. Therefore, we need to install a NodeJS version management tool.

Below are some recommended tools for reference:

- ## nvm

### 安装

1.Open the terminal and enter the following command:

#### macos

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

#### windows

```bash
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe
```

2.After installation, close the terminal, reopen it, and enter the following command:

```bash
nvm --version
```

3.If a version number appears, the installation was successful.

Installing NodeJS

1. Enter the following command to list all available NodeJS versions:

```bash
nvm ls-remote
```

2. Select a version to install, for example, to install NodeJS 18.20.5:

```bash
nvm install 18.20.5
```

3. After installation, enter the following command to switch to that version:

```bash
nvm use 18.20.5
```

4. Enter the following command to check the current NodeJS version:

```bash
node -v
```

5. Enter the following command to view all installed NodeJS versions:

```bash
nvm ls
```

- ## fnm

### windows

### Install Chocolatey

1. Open Windows Terminal in administrator mode.

2. Run the following command:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. Enter choco -v to test whether the installation was successful.

> When using Chocolatey to install software, always open Windows Terminal in administrator mode.

### Install fnm

1. Open Terminal in administrator mode.

2. Run the following command:

```bash
  choco install fnm
```

### Test fnm command

1. Open PowerShell.

2. Enter fnm -h to test whether the command works properly.

```bash
  fnm -h
```

### Environment Variable Configuration

#### PowerShell

1. Create a profile.ps1 file in the following directory:

```other
%USERPROFILE%\Documents\WindowsPowerShell\profile.ps1
```

> %USERPROFILE% represents the user directory. You can enter %USERPROFILE% in the file explorer’s address bar and press Enter.

> If the WindowsPowerShell folder does not exist, create it. If the command is still not recognized after installing NodeJS, rename the folder to PowerShell.

2. Add the following code to the configuration file:

```bash
fnm env --use-on-cd | Out-String | Invoke-Expression
```

#### cmd

1. Search for CMD.
2. Open the file location.
3. Right-click on “Command Prompt” and select “Properties.”
4. Modify the target to the following value:

   ```other
   %windir%\system32\cmd.exe /k %USERPROFILE%\bashrc.cmd
   ```

5. Go to the user directory and create a file named bashrc.cmd.
6. Add the following code to the configuration file:

```bash
@echo off
FOR /f "tokens=\*" %%z IN ('fnm env --use-on-cd') DO CALL %%z
```

#### git bash

Go to the user directory and add the following code to the .bash_profile configuration file for Git Bash:

```bash
eval $(fnm env | sed 1d)
export PATH=$(cygpath $FNM_MULTISHELL_PATH):$PATH

if [[-f .node-version || -f .nvmrc]]; then
fnm use
fi
```

#### VSCode Built-in CMD

Add the following configuration to settings.json:

```json
"terminal.integrated.defaultProfile.windows": "Default Cmd",
"terminal.integrated.profiles.windows": {
  "Default Cmd": {
  "path": "C:\\Windows\\System32\\cmd.exe",
  "args": ["/k", "%USERPROFILE%\\bashrc.cmd"]
  }
}
```

### macOS

#### Install fnm

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

#### Set up fnm environment

1. Add the following code to .zshrc:

```bash
eval "$(fnm env --use-on-cd)"
```

2. Refresh .zshrc:

```bash
source ~/.zshrc
```

#### Using fnm

#### Install NodeJS

```other
fnm install 16
fnm install 14
fnm install 12
```

#### Use NodeJS

```other
fnm use 16
fnm use 14
fnm use 12
```

#### Test NodeJS command

```other
node -v
```

#### Set default NodeJS version

```other
fnm default 14 # Sets NodeJS 14 as the default version when opening a terminal.
```

#### More fnm commands

```other
fnm -h
```

> fnm -h or visit https://github.com/Schniz/fnm
