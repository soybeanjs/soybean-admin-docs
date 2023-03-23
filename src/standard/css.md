## css 书写顺序

- 定位属性：

```
position display float left top right bottom overflow clear z-index
```

- 自身属性：

```
width height padding border margin background
```

- 文字样式：

```
font-family font-size font-style font-weight font-varient color
```

- 文本属性：

```
text-align vertical-align text-wrap text-transform text-indent text-decoration letter-spacing word-spacing white-space text-overflow
```

- css3 中新增属性：

```
content box-shadow border-radius transform
```

### class 类名的顺序：

- 自定义的 class 类名(遵循 BEM 命名法)
- css 插件提供的类名按照以上的 css 属性对应的顺序

例如 ：自定义类名结合 UnoCss

```html
<div
	class="demo-container absolute flex justify-center items-center left-10px top-12px overflow-hidden wh-full p-10px border-1px border-[#f00] m-24px bg-[#fff]text-32px text-[#0f0]"
></div>
<style>
	.demo-container {
		box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
	}
</style>
```
