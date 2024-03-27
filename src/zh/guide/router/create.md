# 路由创建

## 命令创建

通过执行 `pnpm gen-route` 命令，可以快速创建路由文件

**路由名称的命名规则**

- 一级路由: `demo`, `demo-page`, `route1`
  > 名称为小写加连字符`-`的形式
- 二级路由: `demo2_child`, `demo2-page_child`, `route2_child`
  > 路由的层级用下划线`_`分隔，两边仍然遵守一级路由的命名规则
- 三级及三级以上路由: `demo3_child_child`, `demo3-page_child_child_child`

## 手动创建

**手动创建路由文件，需要遵循以下规则：**
每层路由的文件夹名称为路由名称，文件夹下的 `index.vue` 或者 `[id].vue` 为路由组件
