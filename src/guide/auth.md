# 权限

## 用户角色

在 src/typings/business.d.ts 定义了类型

```typescript
/**
 * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
 * - super: 超级管理员(该权限具有所有路由数据)
 * - admin: 管理员
 * - test: 测试
 * - normal: 普通用户
 */
 type RoleType = 'super' | 'admin' | 'test' | 'normal';
```

在定义路由时通过给路由 meta 的 permissions 属性传入以上的值，就表示该路由对传入的角色类型才有权限访问
