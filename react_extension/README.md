想启动哪个components文件夹里的案例就在APP.js内引入它并命名为Demo
先npm i 下载依赖，
再npm start启动
## 1. setState

### setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
			.setState()是同步方法，setState引起React的后续更新组件或页面的动作是异步的，即React状态更新是异步的
			如下面的第二个log输出就是状态页面渲染前的数据，callback里的log才是渲染后的数据
			//2.更新状态
		this.setState({count:count+1},()=>{
			console.log(this.state.count);
		})
		//console.log('12行的输出',this.state.count); //0 */
		
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态(原状态数据不参与数据更改) ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



## 2. lazyLoad懒加载
需要用时才加载组件
在'react'中引入lazy即import React, { Component,lazy,Suspense} from 'react'
lazy()用于懒加载组件同时必须搭配Suspense使用，否则报错
Suspense标签用于在懒加载时需要些的过渡动画或组件且是卸载里面的fallback属性内

```
import React, { Component} from 'react'
import Home from './Home' //Home是路由组件，这是直接引入不是懒加载
import About from './About' //About是路由组件，这是直接引入不是懒加载
//改为
import React, { Component,lazy,Suspense} from 'react'
import {NavLink,Route} from 'react-router-dom'
import Loading from './Loading'

const Home = lazy(()=> import('./Home') )  //懒加载，import是用的方法调用
const About = lazy(()=> import('./About'))

<Suspense fallback={<Loading/>}>
	{/* 注册路由 */}
	<Route path="/about" component={About}/>
	<Route path="/home" component={Home}/>
</Suspense>
```

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks
以前的版本里函数式组件没有this，则用不了this.state、this.refs但可以用props，
现在有了hooks则改变了该现状
#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState() 
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  //数组的解构
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存，以至于再次渲染时不会再次被初始化而覆盖改变了的数据
        返回值: 是个包含2个元素的【数组】, 第1个元素为内部当前状态值, 第2个为操作更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作，相当于componentWillMount和componentWillUpdate时执行
          return () => { // 在组件卸载前执行，返回的函数相当于componentWillUnmount，也可以不返回
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 监听stateValue的改变，不写则监听所有useState的改变如果指定的是[]则都不监听, 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据，ref里定义的是标签本身的真实Dom。
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment
当在APP.jsx或其他地方写jsx时的顶层标签不想要<div>时可用<Fragment>替代
当React解析时会直接扔掉<Fragment>，即它不会渲染在真实Dom从而少包一个<div>
<Fragment>有且只有一个key属性是可选的，称为文档碎片
### 使用
```jsx
import React, { Component,Fragment } from 'react'
export default class App extends Component {
	render() {
		return (
	<Fragment key={1}>
				<Demo/>
			</Fragment>
		)
	}
}
```


### 作用
> 可以不用必须有一个真实的DOM根标签了，同样还可以用空标签<></>代替但它不能写任何属性
```jsx
export default class App extends Component {
	render() {
		return (
			<>
				<Demo/>
			</>
		)
	}
}
```


<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信，父子组件通信用props更方便

### 使用

```js
1) 创建Context容器对象：
	//需要在通信组件的外层创建，方便全部组件能用
	const XxxContext = React.createContext()  //X大写代表是组件
	const MyContext = React.createContext()
	const {Provider,Consumer} = MyContext
2) 渲染子组时，父组件包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<XxxContext.Provider value={数据}>
		子组件
    </XxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  //只声明接收context不会使用该静态变量,不声明则this.context没有东西
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都它的封装react插件react-redux



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件(纵使子组件没有用到父组件的任何数据) ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
		```jsx
		//对父组件传入的props进行比较是否改变，改变则渲染否则不渲染，但数据多时不好操控
		shouldComponentUpdate(nextProps,nextState){
		console.log(this.props,this.state); //目前的props和state
		console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.state.carName === nextState.carName
	} 
	```
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要setState()产生新数据,如下面就是错误写法
			```
			changeCar = ()=>{
		//this.setState({carName:'迈巴赫'})

		const obj = this.state //obj是引用了this.state的地址，指的同一块空间
		obj.carName = '迈巴赫'
		console.log(obj === this.state);//true，它们内存地址相同为true，只是栈里内容改变了
		//state改变时react是进行浅比较，只当对象的内存地址不同才渲染页面，所以上面的改变不进行渲染
		this.setState(obj)
	}
			```
	项目中一般使用PureComponent来优化而不使用Component
	//import React, { Component } from 'react'
	import React, { PureComponent } from 'react'



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?
即如何把B组件摆在A组件的指定位置且A能传入B数据，且不知道B是哪一个组件
	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
		即插槽技术，先预留一个地方reander，但到底渲染哪个组件还没确定
	React中:
	组件标签体内容是一个特殊的标签属性，保留在this.children内
		1.使用children props: 通过组件标签体传入结构
		<A> Hello <A/>  //Hello是在A组件的children属性里
		2.使用render props: 通过组件标签属性传入结构, 一般用render函数属性
		<A render={(data) => <C data={data}></C>}></A> //一般都是写成render，当然也可改名


### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} //data是以对象的形式放在this.props



<hr/>

## 8. 错误边界

#### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

#### 特点：

只能捕获后代组件生命周期里产生的错误(如reander()的return产生的错误，不在return内的错误不算)，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

render() {
	test() //该方法未定义，该错误不能捕获
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
			</div>
		)
	}
##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

## 9. 组件通信方式总结

#### 方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：(这是一种设计理念，实现这种功能的库很多如下面两种)
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

#### 组件间的关系

		父子组件：props,子传父时需要子调用父给子传的函数
		兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

