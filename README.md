# hook-binary-mirror

处理github上不翻墙不能下载的模块

## 安装

全局安装 `npm i hook-binary-mirror -g`

### 方法1

package.json 增加一处 scripts

```
"scripts": {
  "preinstall": "hook-binary-mirror"
}
```
之后 
```
npm i
```

### 方法2

项目目录在 `npm i` 之前先执行一下

```
$ hook-binary-mirror
```