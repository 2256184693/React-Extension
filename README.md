# Mobx-Snippets 

本插件基于React和Mobx添加了VSCode常用的代码片段为开发带来便利。本插件支持 `.js`、`.jsx`、`.ts`、`.tsx`类型文件。

> 相同的指令在 `js` 和 `ts` 中可能会表现不同。（部分指令对`typescript`做了支持）

## Snippets

插件提供的代码片段如下所示。比如你可以键入 `mobx-` 然后按上下键选中 `mobx-state` 然后按下 `Enter`键，就会输出 `@observable stateKey = stateValue`这段代码。

### 常用的组件级代码片段

Prefix|Snippets|Description
:---|:---|:---
`react-page`|-|包含了一个预设的Class形式组件代码。
`react-mobx-page`|-|在常用Class组件的基础上增加了mobx的引入。

### 常用的代码片段

Prefix|Snippets|Description
:---|:---|:---
`mobx-store`|-|包含一个预设的Mobx的Store代码。
`mobx-state`|@observable|增加一个observable的状态。
`mobx-computed`|@computed|增加一个computed的状态
`mobx-action`|@action|增加一个action函数
`mobx-runinaction`|runInAction|runInAction函数

## Known Issues

暂无

## Release Notes

### 0.0.1

Initial release.

-----------------------------------------------------------------------------------------------------------

### For more information

**感谢使用本插件**
