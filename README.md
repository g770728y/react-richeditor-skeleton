# react-richeditor-skeleton

## 介绍

一款仿知乎的富文本编辑器\
本意是希望做成 skeleton, ui 完全由调用方式控制\
但由于项目紧张, 目前全部组件都实现在编辑器内部, 只是架构上实现了: `Mention(也就是@他人)` 组件由外部提供, 相当于一个尝试\
内部实现上, 完全采用 `plugin` 机制, 加载一个`BoldPlugin`, 全部跟**加粗**相关的快捷键 / 图标 等功能 自动挂载.

## Install

```bash
npm install --save react-richeditor-skeleton
```

## Usage

请参见 example 目录.

## License

MIT © [g770728y](https://github.com/g770728y)
