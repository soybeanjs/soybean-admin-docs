# System Icons

## Icon Rendering Principle

Based on the svg json data of iconify, the svg data is converted into vue components through the unplugin-icons plugin.

- [unplugin-icons](https://github.com/antfu/unplugin-icons)
- [iconify](https://github.com/iconify/iconify)
- [Journey with Icons Continues](https://antfu.me/posts/journey-with-icons-continues)


## Local svg icon rendering principle

By using the `unplugin-icons` plugin and `vite-plugin-svg-icons` plugin, local svg files are converted into vue components

> Local svg icons need to be placed in the src/assets/svg-icon directory

## Related configuration

**.env configuration file**

- VITE_ICON_PREFIX: iconify icon prefix
- VITE_ICON_LOCAL_PREFIX: local svg icon prefix, the format follows {VITE_ICON_PREFIX}-{local icon name}

## Note

Based on the rendering mechanism of svg icons, once the svg files are loaded and transformed into components, they become a part of your project and will not automatically detect and update any changes made to the source files. Therefore, if you modify an svg file and want to see the changes in your project, you need to restart the project.
