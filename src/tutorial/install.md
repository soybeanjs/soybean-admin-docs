## 安装教程

### 安装 Node.js

windows 平台下安装：

1.[官网](http://nodejs.cn/download/)下载安装包(.msi 结尾)

2.选择自定义安装目录，例如 D:\Program Files\Nodejs

3.安装完成后，在安装目录 D:\Program Files\Nodejs 下新建两个文件夹 node_cache 和 node_global

4.打开 cmd 命令窗，依次执行两条命令

```bash
npm config set prefix "D:\Program Files\Nodejs\node_global"

npm config set cache "D:\Program Files\Nodejs\node_cache"
```

5.设置系统变量：

（1）新增环境变量 **NODE_PATH** ： **D:\Program Files\Nodejs\node_global\node_modules**

（2）在 PATH 变量添加：**D:\Program Files\Nodejs\node_global**

6.设置国内淘宝镜像：

```bash
 npm config set registry=https://registry.npmmirror.com/
```

mac 平台下安装：

```bash
brew install node
#安装指定版本
brew install node14
```

安装后，根据提示将环境变量写入.zshrc，然后同上设置国内淘宝镜像

### 安装 pnpm

在 Linux 或 macOS 下：

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

在 Windows 下（使用 PowerShell）：

```bash
Invoke-WebRequest 'https://get.pnpm.io/v6.16.js' -UseBasicParsing -o pnpm.js; node pnpm.js add --global pnpm; Remove-Item pnpm.js
```
