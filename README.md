# hook-binary-mirror

处理github上不翻墙不能下载的模块

用法: 

1. `npm i hook-binary-mirror -S`

2. package.json 增加一处 scripts

```
"scripts": {
  "preinstall": "hook-binary-mirror"
}
```
