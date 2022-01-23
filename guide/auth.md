# 权限

## 用户角色

在src/typings/business/auth.d.ts定义了类型

```typescript
/**
  * 用户角色类型
  * - super: 超级管理员
  * - admin: 管理员
  * - test: 测试
  * - visitor: 游客
  */
 type RoleType = 'super' | 'admin' | 'test' | 'visitor';
```

在定义路由时通过给路由meta的permissions属性传入以上的值，就表示该路由对传入的角色类型才有权限访问
