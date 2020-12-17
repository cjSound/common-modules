---
title: '快速上手'
---

# 快速上手

::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**

```vue
<template>
	<div class="red-center-text">
		<p>{{ message }}</p>
      <el-button>默认按钮</el-button>

		<input v-model="message" placeholder="Input something..." />
	</div>
</template>
<script>
	export default {
		data() {
			return {
				message: 'Hello Vue',
			};
		},
	};
</script>
<style>
	.red-center-text {
		color: #ff7875;
		text-align: center;
	}
</style>
```
:::

## 赏花

<obit-gif />