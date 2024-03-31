# Icon Tutorial

## I. Static Usage: Directly written in the template

- **iconify**

  - Install the vscode smart prompt plugin: [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

  - Find the icon: URL [https://icones.js.org/](https://icones.js.org/) or install vscode - [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)

  - Determine the icon name: After finding the icon, copy the name such as: 'mdi:emoticon' or 'mdi-emoticon', the corresponding vue template is

    ```html
    <div>
      <icon-mdi-emoticon class="text-24px text-red" />
      <icon-mdi:emoticon style="font-size:24px;color:#f00;" />
    </div>
    ```

    ::: tip Tip
    'icon-' is a preset prefix, set the variable VITE_ICON_PREFFIX in .env
    :::

  - Set the style: Apply the style attribute or class attribute directly like the html tag; set the corresponding color and size by setting the color and font-size attributes

- **Local svg icon**

  - Choose an svg in the src/assets/svg-icon directory, take its filename, for example: 'custom-icon.svg'

  - The corresponding vue template is

    ```html
    <icon-local-custom-icon class="text-24px text-red" />
    ```

    ::: tip Tip
    'icon-local' is a preset prefix, set the variable VITE_ICON_LOCAL_PREFFIX in .env
    :::


### II. Dynamic Rendering: Render corresponding icon based on the icon name

- **iconify**

  - Determine the icon name, such as: 'mdi-emoticon'

  - Dynamic rendering

    ```html
    <svg-icon icon="mdi-emoticon" />
    ```

  - Dynamic rendering of multiple icons

    ```html
    <svg-icon
      v-for="icon in icons"
      :key="icon"
      :icon="icon"
      class="text-24px text-red"
    />
    ```

- **Local svg icons**

  - Determine the svg file name, for example: 'custom-icon.svg'

  - Dynamic rendering

    ```html
    <svg-icon local-icon="custom-icon" style="font-size:24px;color:#f00;" />
    ```

    ::: tip Tip
    svg-icon is a global component that has been registered, directly applied in the template, the icon attribute is the iconify icon name, and local-icon is the file name of the local svg icon
    :::

## III. Rendering through the render function: Suitable for NaiveUI icon rendering

- Determine the icon name, such as: iconify: **'mdi-emoticon'**, or local svg icon 'custom-icon.svg'

  - Use **useSvgIconRender**

    ::: tip Code location
    packages/hooks/src/use-svg-icon-render.ts
    :::

    ```typescript
    import { useSvgIconRender } from '@sa/hooks';
    import SvgIcon from '@/components/custom/svg-icon.vue';

    const { SvgIconVNode } = useSvgIconRender(SvgIcon);

    SvgIconVNode({ icon: 'ant-design:close-outlined', fontSize: 18 }); // iconify

    SvgIconVNode({ localIcon: "custom-icon" }); // Local svg icon
    ```
