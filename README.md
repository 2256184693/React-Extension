# React-Extension

本插件基于React添加了VSCode常用的代码片段为开发带来便利。

本插件支持 `.js`、`.jsx`、`.ts`、`.tsx`类型文件。

本插件内置的状态管理代码片段基于`Mobx`。

> 相同的指令在 `js` 和 `ts` 中可能会表现不同。（部分指令对`typescript`做了支持）

## Snippets

插件提供的代码片段如下所示。比如你可以键入 `mobx-` 然后按上下键选中 `mobx-state` 然后按下 `Enter`键，就会输出 `@observable stateKey = stateValue`这段代码。

### 常用的组件级代码片段

Prefix|Snippets|Description
:---|:---|:---
`react-page`|-|包含了一个预设的Class形式组件代码。
`react-mobx-page`|-|在常用Class组件的基础上增加了mobx的引入。

### 常用的代码片段

> `React Hooks` 常用代码片段已经支持。

Prefix|Snippets|Description
:---|:---|:---
`mobx-store`|-|包含一个预设的Mobx的Store代码。
`mobx-state`|@observable|增加一个observable的状态。
`mobx-computed`|@computed|增加一个computed的状态
`mobx-action`|@action|增加一个action函数
`mobx-runinaction`|runInAction|runInAction函数

## 快速新建模版

插件支持在Vscode左侧目录中快速新建模板文件，通过右键菜单-新建模版即可开启。

插件内置三种预设模版（默认模版、组件通用模版、函数组件模版）,用户按提示步骤依次选择应用场景即可快速创建对应的模版文件。

支持用户配置默认参数，来更快速的创建模版。用户可打开用户设置-扩展，找到React-Extension，进行配置。也可在 `settings.json` 中编辑。

### 支持的配置参数

key|type|default|description
:---|:---|:---|:---
`react.extension.snippets.autoCreate`|boolean|false|自动根据默认参数生成模版（省略前置的选项，只需要填写名称）
`react.extension.snippets.cssType`|scss/less|less|对应的样式文件类型
`react.extension.snippets.fileType`|typescript/javascript|typescript|是否使用typescript
`react.extension.snippets.tempType`|default/component/functional|default|默认模版类型

`react.extension.snippets.template`|Array|-|用户自定义的模版列表
`react.extension.snippets.defaultTemplate`|string|-|默认创建的自定义模版类型（配置该项后生效的前提是自动生成模版参数 `autoCreate` 为 `true`）

> 注意： `react.extension.snippets.defaultTemplate`请填写自定义的模版类型。

```json
{
  "react.extension.snippets.cssType": "scss",
  "react.extension.snippets.fileType": "javascript",
  "react.extension.snippets.tempType": "component",
  "react.extension.snippets.autoCreate": true
}
```

```json
{
  "react.extension.snippets.template": [
      {
          "type": "自定义模版名称",
          "path": "/Users/sh/Desktop/Files/custom1.json"
      },
      {
          "type": "自定义模版文件夹",
          "path": "/Users/sh/Desktop/Files/"
      },
  ],
  "react.extension.snippets.defaultTemplate": "自定义模版名称"
}
```

### 模版目前支持两种类型

- 用文件夹来对应模版文件夹。 使用该方式则将用户指向的文件夹中的所有文件复制到新建的文件夹目录下。


- 用JSON文件来描述模版内容。JSON内容如下：

```json
{
  "fileList": [
    {
      "name": "index.[cssext]",
      "body": [
        ".container {",
        "\t",
        "}"
      ]
    },
    {
      "name": "index.tsx",
      "type": "typescript",
      "body": [
        "import React from 'react';",
        "",
        "import './index.[cssext]';",
        "",
        "class $FILE_NAME extends React.Component {",
        "\tconstructor(props) {",
        "\t\tsuper(props);",
        "\t\tthis.state = {};",
        "\t}",
        "\trender() {",
        "\t\treturn (",
        "\t\t\t<div className=\"$FILE_NAME\"></div>",
        "\t\t);",
        "\t}",
        "\tcomponentDidMount() {}",
        "}",
        "export default $FILE_NAME;"
      ]
    }
  ]
}
```

> `type` 字段对应的是当前文件对应的的语法类型，也就是该配置对应的文件旨在满足条件的时候生成。字段为空代表不做判断。

> 注意： 案例中的 `[cssext]` 、 `$FILE_NAME` 字符，会在模版生成的具体过程中替换成实际的内容。目前支持的定义如下：

TEXT|ENUM|Description
:---|:---:|:---
`[cssext]`|less/scss|此处的文本会替换成当前所选的样式文件类型。
`$FILE_NAME`|-|此处的文本会替换成文件夹名称。

## Known Issues

暂无

## TODO

1. 用户本地模版文件夹内文件支持常量替换。

2. 增加更多React常用Snippets。

## For more information

**感谢使用本插件**
