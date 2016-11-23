# theMosquitoMan - WEBSITE

### Description
一個專門分享「衛教」、「環境衛生」、「打擊登革熱」資訊的網站。

## Getting Started

### Pre Requirements
Must have 
+ [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).
+ For **`Ubuntu`** , you must have to install `ruby` and `ruby-compass`
  - command: **`sudo apt install ruby-compass`**


### Install package

```bash
npm install -i
```

### Usage


build sass , js 

```bash
$ gulp
```

build hbs's template to html, and watch
```bash
$ ./bin/build -w
```

- Use **`gulp`** to construct it .
  - **Maybe**, if your gilp doesn't work , you can make this command 
  - **`npm install -g gulp-cli`** 
- **`canner-core`** is your main component which you also use in [`handlebar.js`](http://handlebarsjs.com).


## Develop

### Add a new site
- Create a `.hbs` file in **`layout/`**

```html
<!DOCTYPE HTML>
<html lan="en">
<head>
  {{> head }}
</head>

<body style="overflow-x:hidden;">
  {{>header}}
  
  ---------------
  Write your code
  ---------------
  
  {{> footer}}
</body>
<script src="./dist/src/jquery-2.2.4.min.js"></script>
<script src="./dist/js/nav.js"></script>
</html>
```

- `.scss` or `.sass` or `.css` in **`sass/`**
  - in your .hbs file :

```html
<link href="./dist/css/filename.css">
```

- `.js` in **`js/`** 
  - in your .hbs file :

```html
<script src="./dist/js/filename.js"></script>
```

- Remember update `route.js`

```js
{
  data: {
    path: './',
    title: 'My title'
  },
  partials: './partials.js',
  layout:  "./layout/index.hbs",
  filename: "./index.html"
},
```

- Make command : 
```
$ gulp
$ ./bin/build -w
```

### Structure

```
index.html : 首頁
about.html : 關於我們
context.html : 文言蚊
interact.html : 互動專區
killer.html : 降蚊十八招
knowledge.html : 聞風喪膽
qa.html : 有蚊必答
realTime.html : 即時疫情
resource.html : 資料來源
route.js : control hbs 產生的內容及位置
partial.js : control .hbs's component (詳細請看handlebar.js)
gulpfile.js : control gulp
config.rb : compass's config
| - realMap/ : 即時疫情下面的各圖表html
| - interact/ : 互動專區裡面的html
| - content/ : 文言蚊的html
| - sass/ : scss檔案（compass會自動抓取這裡面的scss檔來編譯）
| - js/ : js 檔案（未編譯前）
| - layout/ : hbs 的 template檔案（未編譯前）
| - bin/
| - | - build : canner-core 的核心
| - dist/
| - | - audio/ : some audio music
| - | - css/ : minify .css
| - | - js/ : minify .js
| - | - src/ : img, data, and some library's file
| - | - favicon/ : 網頁標籤上左上角的小小icon
| - game/ : 各遊戲檔案
| - | - Mosquito_war/ : 掌蚊宗師遊戲檔案


```
### Lisense
MIT @theMosquitoMan team


