# Getting Started

This document will help you start the project from scratch.

## Environment Preparation

Make sure your environment meets the following requirements:

- **git**: You need git to clone and manage project versions.
- **NodeJS**: >=18.0.0, recommended 18.19.0 or higher.
  > You can use [volta](https://volta.sh/) or [fnm](https://github.com/Schniz/fnm) to manage your NodeJS versions.
- **pnpm**: >= 8.0.0, recommended latest version.

## VSCode Plugins

This project recommends using VSCode for development, and the project has built-in VSCode configurations, including recommended plugins and settings.

The following are the recommended plugins:

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - Automatically add HTML/XML closing tags
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag) - Add closing tags and automatically rename paired tags for HTML/XML
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - Automatically rename paired HTML/XML tags
- [Color Highlight](https://github.com/naumovs/vscode-ext-color-highlight) - Color highlighting plugin
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - Highlight .env files
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Unify some configurations of different editors
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Code check
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - Git graphical operation tool
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Display git information for specific lines of code
- [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones) - Plugin for searching iconify icons
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Plugin for real-time display of Iconify icons
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n internationalization plugin
- [javascript console utils](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils) - Provides shortcut ctrl+l to directly input console.log()
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) - Icon theme, display various icons for files and folders
- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) - Theme
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting plugin
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - unocss writing hint plugin
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue service plugin
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) - vue2, vue3 writing hint

## Getting the Code

### Get the Code from GitHub

```bash
# Clone the code
git clone https://github.com/soybeanjs/soybean-admin.git
```

### Get code from Gitee

```bash
# Clone the code
git clone https://gitee.com/honghuangdc/soybean-admin.git
```

::: warning Note
The latest version of the code is based on github.
:::

### Install dependencies

Install project dependencies

```bash
pnpm i
```

## Plugin configuration
### Install Vue - Official, disable Vetur

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue service plugin

## npm scripts

```json
{
  // Build package (prod environment)
  "build": "cross-env VITE_SERVICE_ENV=prod vite build",
  // Build package (dev environment)
  "build:dev": "vite build",
  // Build package (test environment)
  "build:test": "cross-env VITE_SERVICE_ENV=test vite build",
  // Delete node_modules, dist, pnpm-lock.yaml of the main project and sub-projects
  "cleanup": "sa cleanup",
  // Commit code (generate commit information that conforms to specifications)
  "commit": "sa git-commit",
  // Local run (dev environment)
  "dev": "vite",
  // Local run (prod environment)
  "dev:prod": "cross-env VITE_SERVICE_ENV=prod vite",
  // Local run (test environment)
  "dev:test": "cross-env VITE_SERVICE_ENV=test vite",
  // Generate routes
  "gen-route": "sa gen-route",
  // eslint check and auto fix
  "lint": "eslint . --fix",
  // Initialize simple-git-hooks
  "prepare": "simple-git-hooks",
  // Preview the built dist in local environment
  "preview": "vite preview",
  // Release
  "release": "sa release",
  // ts check for vue files
  "typecheck": "vue-tsc --noEmit --skipLibCheck",
  // Update dependency packages
  "update-pkg": "sa update-pkg"
}
```

## Directory Structure

```
soybean-admin
├── .vscode                        // vscode plugins and settings
│   ├── extensions.json            // recommended vscode plugins
│   ├── launch.json                // debug configuration file (debug Vue and TS)
│   └── settings.json              // vscode configuration (effective in this project, can be copied to user configuration file)
├── build                          // vite build related configuration and plugins
│   ├── config                     // build and packaging configuration
│   │   └── proxy.ts               // network request proxy
│   └── plugins                    // build plugins
│       ├── index.ts               // plugin summary
│       ├── router.ts              // elegant-router plugin
│       ├── unocss.ts              // unocss plugin
│       └── unplugin.ts            // auto import UI components, auto parse iconify icons, auto parse local svg as icons
├── packages                       // sub-projects
│   ├── axios                      // network request encapsulation
│   ├── color-palette              // color palette
│   ├── hooks                      // compositional function hooks
│   ├── materials                  // component materials
│   ├── ofetch                     // network request encapsulation
│   ├── scripts                    // scripts
│   ├── uno-preset                 // uno-preset configuration
│   └── utils                      // utility functions
├── public                         // public directory (resources in the folder will be in the root directory after packaging)
│   └── favicon.svg                // website tab icon
├── src
│   ├── assets                     // static resources
│   │   ├── imgs                   // images
│   │   └── svg-icon               // local svg icons
│   ├── components                 // global components
│   │   ├── advanced               // advanced components
│   │   ├── common                 // common components
│   │   └── custom                 // custom components
│   ├── constants                  // constants
│   │   ├── app.ts                 // app constants
│   │   ├── business.ts            // business constants
│   │   ├── common.ts              // general constants
│   │   └── reg.ts                 // regular expression constants
│   ├── enums                      // enums
│   ├── hooks                      // compositional function hooks
│   │   ├── chart                  // charts
│   │   │   └── use-echarts        // echarts
│   │   └── common                 // common hooks
│   │       ├── form               // form
│   │       ├── router             // router
│   │       └── table              // table
│   ├── layouts                    // Layout components
│   │   ├── base-layout            // Basic layout (includes global header, multi-tabs, sidebar, footer and other common parts)
│   │   ├── blank-layout           // Blank layout component (single page)
│   │   ├── hooks                  // Hooks for layout components
│   │   └── modules                // Layout component modules
│   │       ├── global-breadcrumb  // Global breadcrumb
│   │       ├── global-content     // Global main content
│   │       ├── global-footer      // Global footer
│   │       ├── global-header      // Global header
│   │       ├── global-logo        // Global Logo
│   │       ├── global-menu        // Global menu
│   │       ├── global-sider       // Global sidebar
│   │       ├── global-tab         // Global tabs
│   │       └── theme-drawer       // Theme drawer
│   ├── locales                // Internationalization configuration
│   │   ├── langs              // Language files
│   │   ├── dayjs.ts           // Internationalization configuration for dayjs
│   │   ├── locale.ts          // Collection of language files
│   │   └── naive.ts           // Internationalization configuration for NaiveUI
│   ├── plugins                // Plugins
│   │   ├── assets.ts          // Import of various static resources dependencies (css, scss, etc.)
│   │   ├── dayjs.ts           // dayjs plugin
│   │   ├── iconify.ts         // iconify plugin
│   │   ├── loading.ts         // Loading plugin during global initialization
│   │   └── nprogress.ts       // Top loading bar nprogress plugin
│   ├── router                 // vue router
│   │   ├── elegant            // Route declaration, import and conversion files generated by elegant-router plugin
│   │   ├── guard              // Route guards
│   │   ├── routes             // Route declaration entry
│   │   └── index.ts           // Router entry
│   ├── service                // Network requests
│   │   ├── api                // API interfaces
│   │   └── request            // Encapsulated request functions
│   ├── store                  // pinia state management
│   │   ├── modules            // Modules for state management
│   │   │   ├── app            // app state (page reload, menu collapse, project configuration drawer)
│   │   │   ├── auth           // auth state (user information, user rights)
│   │   │   ├── route          // route state (dynamic routes, menus, route cache)
│   │   │   ├── tab            // tab state (multi-tabs, cached page scroll position)
│   │   │   └── theme          // theme state (project theme configuration)
│   │   └── plugins            // State management plugins
│   ├── styles                 // Global styles
│   │   ├── css                // css
│   │   └── scss               // scss
│   ├── theme                  // Theme configuration
│   │   ├── settings.ts        // Default theme configuration and override configuration
│   │   └── vars.ts            // CSS variables corresponding to theme tokens
│   ├── typings                // TS type declaration files (*.d.ts)
│   │   ├── api.d.ts           // Type declaration for the data returned by the request interface
│   │   ├── app.d.ts           // Type declarations related to the application
│   │   ├── common.d.ts        // Common type declarations
│   │   ├── components.d.ts    // Type declarations for automatically imported components
│   │   ├── elegant-router.d.ts// Route declarations generated by the elegant-router plugin
│   │   ├── env.d.ts           // Type declarations related to vue route description and request environment
│   │   ├── global.d.ts        // Global common types
│   │   ├── naive-ui.d.ts      // NaiveUI types
│   │   ├── router.d.ts        // Type declarations for Vue's route description
│   │   ├── storage.d.ts       // Local storage data types
│   │   └── union-key.d.ts     // Union types
│   ├── utils                  // Global utility functions (pure functions, no state)
│   │   ├── common             // Common utility functions
│   │   ├── icon               // Icon related utility functions
│   │   └── storage            // Storage related utility functions
│   ├── views                  // Pages
│   │   ├── _builtin           // System built-in pages: login, exception pages, etc.
│   │   ├── about              // About
│   │   ├── function           // Function
│   │   ├── home               // Home
│   │   ├── manage             // System management
│   │   ├── multi-menu         // Multi-level menu
│   │   └── user-center        // User center
│   ├── App.vue                // Vue file entry
│   └── main.ts                // Project entry ts file
├── .editorconfig              // Unified editor configuration
├── .env                       // Environment file
├── .env.development           // Environment file for development environment
├── .env.production            // Environment file for production environment
├── .eslintignore              // Configuration file to ignore eslint check
├── .gitignore                 // Configuration file to ignore git commit
├── .npmrc                     // npm configuration
├── env-config.ts              // Configuration file for request environment
├── eslint.config.js           // eslint flat configuration file
├── index.html                 // html file
├── package.json               // npm dependency description file
├── pnpm-lock.yaml             // Dependency lock file for npm package manager pnpm
├── README.md                  // Project introduction document
├── README.zh-CN.md            // Project introduction document (Chinese)
├── tsconfig.json              // TS configuration
├── uno.config.ts              // Configuration for atomic css framework unocss
└── vite.config.ts             // vite configuration
```

