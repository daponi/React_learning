import dva from 'dva';
import './index.css';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory as createHistory } from "history"

// 1. Initialize
//切换 history 为 browserHistory
const app = dva({
  history: createHistory(),
});
// import Router from "./router"
// console.log(Router)


// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
// app.model(require("./models/product").default);
//遍历JS文件，取出所有需要的Model文件
require("./models").default.forEach(key => app.model(key.default));

// 4. Router
app.router(require('./router').default);
/// console.log(require('./router'));
//这是换一种写法
// app.router(Router);
// console.log(Router);

// 5. Start
app.start('#root');

/**
 * 
 * <a href="#hello">Hello</a>
 * #hello
 * 
 * //history的API
 * https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
 * https://bestvpn.org/history/first
 * 
 * //老师博客：了解Hook
 * http://iwenwiki.com/blog/?p=58
 * 
 * http://iwenwiki.com/blog/?p=38
 * 
 * http://es6.ruanyifeng.com/
 * 
 */
