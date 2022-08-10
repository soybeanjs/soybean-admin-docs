## 1.interface 和 type

### interface 和 type 使用优先级：能用 interface 表示的类型就用 interface。

## 2.请求函数

### api 接口：

统一以 **fetch** 开头，例如：

```typescript
/**
 * 获取用户信息
 * @param id - 用户唯一标识id
 */
function fetchUserInfo(id：string) {
	// ***
}
/**
 * 删除列表项
 * @param id - 列表id
 */
function fetchDeleteListItem(id：string) {
	// ***
}
```
