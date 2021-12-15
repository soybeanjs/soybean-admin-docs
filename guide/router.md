# 路由

## 说明

### type RouteKey

**解释：**

联合类型RouteKey声明所有的路由key，方便统一管理路由

**写法：**

（1）小写加连字符表示一个层级的路由

```typescript
// 登录页
| 'login'
//404页面
| 'not-found'
```

(2)多层级的路由通过下划线隔开

```typescript
// 文档
| 'document'
// vue文档
| 'document_vue'
// vite文档
| 'document_vite'
// naive文档
| 'document_naive'
// 多级菜单
| 'multi-menu'
// 多级菜单的一级
| 'multi-menu_first'
// 多级菜单的一级的下一级
| 'multi-menu_first_second'
```



### router/constant

**解释：**

用于声明路由的name，path和title，通过类型RouteKey来智能定义

**写法：**

（1）路由的name：与RouteKey保持一致

（2）路由的path：所有的path以 **/** 开头，多级路由可通过将对应RouteKey的下划线转换成斜杠 **/** 后作为path

（3）路由的title：可作为菜单的文本名称和浏览器标签文本(document.title)

### router/routes和router/modules

**解释：**

固定的路由声明和按模块划分的路由声明

该路由声明是完整的vue-router的路由声明，区别于**router/constant**

（1）固定的路由声明：通用的路由，无论是哪个系统都会有一些通用的路由

例如：登录页，404页面等

（2）按模块划分的路由声明：根据业务定义不同的路由

**路由划分：**

（1）首先以布局为划分依据：有的路由页面需要共享公共部分，有的路由页面单独一个页面

（2）其次以路由层级为划分依据：有的只有自身一层路由，有的有多层子路由

