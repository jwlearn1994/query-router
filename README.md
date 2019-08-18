# QueryRouter

一個簡單的 query 參數路由，使用參數 page 進行路由切換。

本身其實頁面沒有切換，只是利用參數 page 的路由值去執行不同的 js 函數。

建議只用在較簡單的畫面，複雜 DOM 結構還是建議使用正規路由。



## Install

```js
const router = new QueryRouter();
```



## Usage

設定首頁，當 page 參數沒有提供或是沒有配對到指定的設定時，就會執行 home 這個函數。

```js
router.home = function() {
  console.log('home');
};
```

設定路由名稱及函數，注意！路由名稱不要加上 / ，請使用純字串即可（大小寫會自動比對）

使用 About = about = ABout ，都會匹配到 about

```js
router.get('about', function() {
  console.log('about');
});
```



## 切換路由

內建配置三個動作，go, next, back 函數

- go(name)

```js
// 定義過的路徑
router.go('about'); // http://example.com/?page=about

// 未定義的
router.go(); // undefined
router.go('asdawdsac'); // undefined
```


- next(number)

```js
// 預設下一頁
router.next(); // === history.go(1);

// 指定下幾頁
router.next(2);
```


- back(number)

```js
// 預設上一頁
router.back(); // === history.go(-1);

// 指定上幾頁
router.back(2); // === history.go(-2);
```



## 使用單頁內容拆分模組為頁面

- use(parentID, id)

定義路由時的函數中，自帶一個 res 物件，其中 use 方法可以接受兩個參數，

第一個是父組件 ID ，第二個是該父組件中希望顯示的區塊 id。

```html
<div id="app">
  <div id="home">Home</div>
  <div id="about">About</div>
</div>
```

```js
router.home = function(res) {
  res.use('app', 'home');
};

router.get('about', function(res) {
  res.use('app', 'about');
});
```

調用 use 會先把指定的子組件暫存起來，然後將父組件內部所有東西刪除後，

再把暫存起來的指定子組件放回來。（請在調用 use 後再進行其他事件追加，避免掛載事件被刪除）



## 推薦與 Pug 一起使用

推薦用 pug 將 html 模組化引入，可讓不同路由的頁面拆分為不同檔案。

```pug
#app
  include ./pages/home.pug
  include ./pages/about.pug
```
