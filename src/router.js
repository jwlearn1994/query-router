/*!
 * QueryRouter.js v1.0.0
 * (c) 2019 Johnny Wang
 * Released under the MIT License.
 */
(function (global, factory){
  // Nodejs 環境
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  // AMD 環境
  typeof define === 'function' && define.amd ? define(factory) :
  // Browser 環境
  (global = global || self, global.QueryRouter = factory());
}(this, function() { 'use strict';


  /*  */


  const getParams = function(q) {
    if (window.URLSearchParams) {
      return Object.fromEntries(new URLSearchParams(q));
    } else {
      var pairs = q.slice(1).split('&');
      var result = {};
      pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return JSON.parse(JSON.stringify(result));
    }
  }

  const setParams = function(j) {
    var arr = [];
    for (let [k, v] of Object.entries(j)){
      arr.push(encodeURIComponent(k) + '=' +encodeURIComponent(v));
    }
    return arr.join('&');
  }


  /*  */


  // 移除不需要的 DOM
  // 注意：請在渲染引擎運作之前調用，避免需要掛載的事件被動態刪除
  const use = function(parentID, id) {
    const dom = document.getElementById(id).outerHTML;
    const parent = document.getElementById(parentID);

    parent.innerHTML = '';
    return parent.innerHTML = dom;
  }


  /*  */


  const QueryRouter = function() {
    const self = this;
    self.home = function() {};
    self.routes = [];

    // 建立路由
    self.get = function(uri, callback) {
      return self.routes.push({
        uri,
        callback
      })
    };

    // 切換路由
    self.go = function(uri) {
      const noUri = (uri === void 0 || uri === '' || self.routes.every(route => {
        return route.uri.toLowerCase() !== uri.toLowerCase();
      }));

      if (noUri) return ;
      else {
        let page = setParams({
          page: uri
        });
        return window.location.search = `?${page}`;
      }
    }

    self.next = (n = 1) => {
      return window.history.go(n);
    }

    self.back = (n = 1) => {
      return window.history.go(-n);
    }

    // 執行對應函數
    self.init = function() {
      const page = getParams(window.location.search).page;
      const noPage = (page === void 0 || page === '' || this.routes.every(route => {
        return route.uri.toLowerCase() !== page.toLowerCase();
      }));

      if (noPage) {
        let options = {
          page: '/',
          use: use
        };
        return this.home.call(window, options);
      }
      else {
        for (let route of this.routes) {
          const re = new RegExp(`^${route.uri.toLowerCase()}$`);
          let options = {
            page,
            use // 外部定義
          };
    
          if (re.test(page.toLowerCase())) {
            return route.callback.call(window, options);
          }
        }
      }

    }
  }

  return QueryRouter;

}));