# Routing component

## Layout components

- **layout.base**: Layout with common parts, such as global header, sidebar, footer, etc.

- **layout.blank**: Blank layout

## Page components

- **view.[RouteKey]**: Page components
  > For example: `view.home`, `view.multi-menu_first_child`

## Mixed components of layout and page

- **layout.base$view.[RouteKey]**: Mixed components of layout and page
  > For example: `layout.base$view.home`, `layout.base$view.multi-menu_first_child`

::: tip Tip
This type of component represents a single-level route
:::
