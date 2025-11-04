# アイコンチュートリアル

## 一、静的な使用方法：template 内で直接記述する

- **iconify**
  - VSCode の IntelliSense プラグインをインストール: [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

  - アイコンを検索する：ウェブサイト [https://icones.js.org/](https://icones.js.org/) または VSCode 拡張機能 - [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)

  - 名前をコピーします（例: ‘mdi:emoticon’ または ‘mdi-emoticon’）。それに対応する Vue の template は以下のようになります。

    ```html
    <div>
      <icon-mdi-emoticon class="text-24px text-red" />
      <icon-mdi:emoticon style="font-size:24px;color:#f00;" />
    </div>
    ```

    ::: tip ヒント
    'icon-' はプレフィックスとして .env で VITE_ICON_PREFIX に設定できます。
    :::

  - スタイルの設定：style 属性または class 属性を使用; color や font-size を設定して色やサイズを調整

- **ローカル svg アイコン**
  - src/assets/svg-icon ディレクトリに svg を配置，取它的文件名，例: 'custom-icon.svg'

  - を使用する場合の Vue の template 記述

    ```html
    <icon-local-custom-icon class="text-24px text-red" />
    ```

    ::: tip ヒント
    'icon-local' はプレフィックスとして .env で VITE_ICON_LOCAL_PREFIX に設定できます。
    :::

## 二、動的レンダリング：アイコン名に応じて適切なアイコンをレンダリング

- **iconify**
  - アイコン名を決定，如：'mdi-emoticon'

  - 動的レンダリング

    ```html
    <svg-icon icon="mdi-emoticon" />
    ```

  - 複数アイコンを動的レンダリング

    ```html
    <svg-icon v-for="icon in icons" :key="icon" :icon="icon" class="text-24px text-red" />
    ```

- **ローカル svg アイコン**
  - アイコン名を決定，例如: 'custom-icon.svg'

  - 動的レンダリング

    ```html
    <svg-icon local-icon="custom-icon" style="font-size:24px;color:#f00;" />
    ```

    ::: tip ヒント
    svg-icon はグローバルコンポーネントとして登録済みです。
    icon は iconify のアイコン名、local-icon はローカル svg アイコンのファイル名を指定します。
    :::

## 三、render 関数を使用してレンダリング：NaiveUI のアイコン表示向け

- アイコン名を決定，例：iconify: **'mdi-emoticon'**, またはローカル svg アイコン: 'custom-icon.svg'
  - useSvgIcon を使用

    ```typescript
    import { useSvgIcon } from '@/hooks/common/icon';

    const { SvgIconVNode } = useSvgIcon();

    SvgIconVNode({ icon: 'ant-design:close-outlined', fontSize: 18 }); // iconify

    SvgIconVNode({ localIcon: 'custom-icon' }); // ローカル svg アイコン
    ```

## 四、オフラインロード：指定した iconify アイコンコレクションを追加

- **使用手順**
  - 依存関係をインストール

    ```bash
    ## アイコンコンポーネントデータ
    pnpm add @iconify/vue

    ## オフラインアイコンデータ
    pnpm add @iconify/json
    ```

  ::: tip ヒント
  プロジェクトにはすでに必要な依存関係が含まれているため、コンポーネント内で直接利用できます。
  :::
  - オフラインアイコンコレクションデータを準備

    例: Ant Design のアイコンライブラリをプロジェクトに追加する場合：

    ```typescript
    import AntDesign from '@iconify/json/json/ant-design.json';
    ```

  - `addCollection` メソッドでオフラインアイコンを追加

    ```typescript
    import { addCollection } from '@iconify/vue';
    ```

- **コードサンプル**

  ```vue
  <script lang="ts" setup>
  import { Icon, addCollection } from '@iconify/vue';
  import AntDesign from '@iconify/json/json/ant-design.json';

  addCollection(AntDesign);
  </script>

  <template>
    <Icon icon="ant-design:search" class="text-40px text-success" />
  </template>
  ```
