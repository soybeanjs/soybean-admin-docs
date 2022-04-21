## 1.interface和type

### interface和type使用优先级：能用interface表示的类型就用interface。

## 2.请求函数

### api接口：

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
