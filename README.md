
# React总结

## 1.react 开发环境的搭建

1.react.js 核心文件
2.react-dom.js 渲染页面中的DOM 当前文件依赖于react核心文件
3.babel.js  ES6转换成ES5  JSX语法转换成javascript 现今浏览器进行代码的兼容
react 核心包      npm i react --save
react-dom         npm i react-dom --save
babel             npm i babel-standalone --save

map遍历 map（(v,i)=>{ return (<p>{v}</p>) }）

Object.keys(obj) :获取obj对象的key数组

Object.values(obj)：获取obj对象的value数组

## 2.React组件属性

props属性

每个组件对象都会有props属性 组件对外的接口

组件标签内的所有属性都会保存在props中

读取某个属性值：this.props.propertyName

通过标签属性从组件外向组件内传递数据

对props属性值类型限制和必要性限制

<Person {...person}/> 将对象的所有属性通过props传递

Person.defultProps ={  }设置默认属性

Person.propTypes={
                    name:PropTypes.number,//验证name这个props传递进来的数据必须是number类型
                    age:PropTypes.number.isRequired //必须

}

state：组件的状态 组件对内的接口

this.setState({ ...  }) 异步 ，更改state

## 3.refs转发

1.字符串方式

组件或者dom 添加ref=“refDemo”  通过this.refs.refDemo.value 获取（例如输入框）

2.回调函数 ref={(input)=>{this.refDemo=input}} 通过 this.refDemo.value获取

3.React.CreateRef() 

构造函数中定义 this.refDemo = React.CreateRef()  通过this.refDemo.current.value

bind()绑定函数

绑定函数不能加()函数会立即执行

条件渲染：jsx中不允许有if语句

状态提升：多个组件需要反映相同的变化数据  ，提升到他们最近的一个父组件中  

​					多个子组件需要利用到对方状态的情况下 那么这个时候就需要使用到状态提升





tip：设置npm代理为淘宝代理：

npm config set registry https://registry.npm.taobao.org 

或者编辑 `~/.npmrc` 加入下面内容

registry = https://registry.npm.taobao.org

## 4.组件间传值

父组件->子组件 ：通过props

子组件->父组件 :  通过函数  子组件中绑定fufun 示例：<button onClick={this.props.fufun.bind(this,this.state.ziText)}>点击向父组件发送数据</button> 

父组件中：       <News name="xiaoming" fufun={this.datafun}> </News>

定义 this.state = {

​      text:"我是默认值"

​    } 

定义：datafun= (text)=> {

​    console.log(text)

​    this.setState({

​      text

​    }



同级组件之间传值：

通过pubsub-js

安装 npm i pubsub-js --save

import PubSub from 'pubsub-js'

例如new组件与phone组件 

new组件中： <button onClick={this.pubsub.bind(this)}>点击同级组件发送数据</button>

  pubsub(){

​    PubSub.publish("evt",this.state.num)

  }    pubsub发布一个名为evt 的内容为this.state.num 的数据

phone组件中:在构造函数中

constructor(props) {

​    super(props)

​    PubSub.subscribe("evt",(msg,data)=>{

​      console.log("phone"+data)

​    })

  }  订阅名为evt数据

import React, { PureComponent } from 'react'

import News from './News'

import Phone from './Phone'

class Home extends PureComponent {

  constructor(props) {

​    super(props)

​    this.state = {

​      text:"我是默认值"

​    }

  }

  datafun= (text)=> {

​    console.log(text)

​    this.setState({

​      text

​    }  

​    )

  }

  render() {

​    return (

 <p>Home-------{this.state.text}</p>

            <div>

<div>       <News name="xiaoming" fufun={this.datafun}> </News>

​       <Phone></Phone>

​      </div>

  }

}

export default Home

## 5.异步请求：

npm i json-server -g

npm i axios --save

import axios from 'axios'

模拟数据

data.json

{

  "arr":[

​    {"id":"1","name":"小明"},

​    {"id":"2","name":"小明"},

​    {"id":"3","name":"小明"},

​    {"id":"4","name":"小明"},

​    {"id":"5","name":"小明"}

  ]

}

启动 json-server

json-server data.json --port 4000

json-server json文件名  -port 端口号

导入axios

import axios from 'axios'

钩子函数中调用

 componentDidMount(){

​    this.ajaxfun()

  }

回调函数中获取数据

ajaxfun=()=>{

​    axios.get("http://localhost:4000/arr").then((ok)=>{

​      console.log(ok)

​      this.setState({

​        arr:ok.data

​      })

​    })

  }



示例：

import React, { PureComponent } from 'react'

import axios from 'axios'

class Home extends PureComponent {

  constructor(props) {

​    super(props)



​    this.state = {

​      arr:[]

​    }

  }

  componentDidMount(){

​    this.ajaxfun()

  }

  ajaxfun=()=>{



​    axios.get("http://localhost:4000/arr").then((ok)=>{

​      console.log(ok)

​      this.setState({

​        arr:ok.data

​      })

​    })

  }

  render() {

​    return (

            <div>


​      Home---{this.state.arr.map((v,i)=>{

​        return <p key={i}>{v.name}</p>

​      })}

​      </div>

​    )

  }

}

export default Home



## 6.解决跨域问题：

正向代理--开发环境     客户端-> 代理服务器为->目标服务器

反向代理--上线环境     网络请求->代理服务器 ->网络服务器 请求客户端

找到文件 项目\node_modules\react-scripts\config\webpackDevServer.config.js

  proxy:{
      "/api":{
        target:"http://www.weather.com.cn/data/cityinfo",
        changeOrigin:true,
        "pathRewrite":{
          "^/api":"/"
        }
      }
    },

## 7.react路由

1.安装： cnpm i  react-router-dom --save 

react-router 核心api  react-router-dom 更多 

hash  HashRouter hash模式 带#号 刷新不会丢失

browser BrowserRouter Browser模式 不带#好 历史记录模式 刷新会丢失 本地模式不会丢失

2.index.js引入路由

3.路由模式包裹根组件

Browser模式

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'));

引入router  import { Route } from 'react-router-dom';

配置Route

Link导航<Link>  <NavLink> 可以动态的给选中的类名添加active类名  设置选中的样式

包裹<Switch></Switch> 多个匹配时只渲染一个

<Redirect from="/" to="/home" exact> 如果是/ 则精准匹配到/home

路由进阶与高阶组件 ：

withRouter（高阶组件  参数为组件返回也是组件）

就是让没有路由切换的组件也具备三个属性：location match history

作用：1.监控路由变化

2.Link.pathname 切换路径

3.编程式导航 props.history.push("url")

4.路由传参   <Route path="/Phone/:id" component={Phone}/>   <Link to="/phone/我是参数">点我去phone</Link>  

  接受参数：componentDidMount(){

​    console.log(this.props.match.params.id)

  }

5.query方式传参   <NavLink to={{pathname:"/news",query:{name:"xiaoming"}}}>news</NavLink>

接受参数： componentDidMount() {

​    console.log(this.props.location.query.name)

  }



## 8.Hook

##### 让无状态组件有状态:使用

##### useState()

使用状态

##### useContent()

共享状态

##### useEffect()

副作用

##### useReducer()

userReducer 第一个参数reducer函数()  第二个参数 state初始化state 

返回值为最新的state 和 dispatch()函数 （触发reducer函数 计算最新的state）

官方推荐： 对于复杂的state操作逻辑，嵌套的state对象，推荐使用useReducer()

useReducer(reducer,initState)

//第一个参数 reducer函数 (state,action) => newstate 经过不同的action.type后返回新的state 利用action提供的信息state=> new state   ，接受当前应用的state和action.type后返回新的state

//第二个参数 初始化state

const initState = {count:0}

tip：1.reducer处理的state对象immutable的，即永远不要直接修改state对象，reducer函数每次都返回一个新的state对象 

​		2.我们可以用es6解构复写操作，复写需要改变的state属性 

\* action：

 \*用type表示具体的行为类型

 *用payload携带信息

 const action = {

​    type: 'addBook',

​    payload: {

​      book: {

​        bookId,

​        bookName,

​        author,

​			} 

​		}

​	}

#####  reducer使用场景：

 如果你的state是一个数组或者对象。

 如果你的state变化很复杂，经常一个操作需要修改很多state。

 如果你希望构建自动化测试用例来保证程序的稳定性。

 如果你需要在深层子组件里面去修改一些状态。

 如果你用应用程序比较大，希望UI和业务能够分开维护


## 9.redux

js提供的可预测性的状态容器：（一个固定的输入，必定可以等到一个结果）

集中管理react中多个组件的状态

redux 状态管理库 

#### 场景：

1. 某个组件的状态需要共享的时候。
2. 一个 组件需要改变另一个组件状态的时候。
3. 组件中的状态需要在任何地方都可以拿到的时候。

1.安装redux

cnpm i redux --save

2.创建redux目录 创建reducer.js    store.js  action.js 

3.reducer.js中定义数据 并向外暴露数据data  并定义对数据操纵的行为

var obj = [{

  name:"小明",age:18

}]

export function data(state=obj[0].age,action){

  switch (action.type) {

​    case "ADD":

​      return state+action.data

​    case "DEL":

​      return state-action.data  

​    default:

​      return state

  }

}

action.js中定义对数据的操作

指定暴露方法名    返回操作类型  操作数据类型

export const add=(num)=>{

  return{type:"ADD",data:num }

}

export const del=(num)=>{

  return{type:"DEL",data:num }

}

store.js  中放置reduce.js中暴露的数据data

import {createStore} from 'redux'

import {data} from './reducer'

export var store=createStore(data) 



在需要数据的组件中：

​	import {store} from '../redux/store'

​    import * as action from "../redux/action"

挂载

componentDidMount(){

​    store.subscribe(()=>{

​      this.setState({

​        num:store.getState()

​      })

​    })

  }

在触发函数中调用

 	<button onClick={()=>{store.dispatch(action.add(1))}}>点我加1</button>

​      <button onClick={()=>{store.dispatch(action.del(1))}}>点我减1</button>





## 10.react生命周期函数

#### 组件生命周期三个阶段

1. **加载阶段（Mounting）：**在组件初始化时执行，有一个显著的特点：创建阶段生命周期函数在组件的一辈子中只执行一次；

2. **更新阶段（Updating）：**属性和状态改变时执行，根据组件的state和props的改变，有选择性的触发0次或多次；

3. **卸载阶段（Unmounting）：**在组件对象销毁时执行，一辈子只执行一次；

   ### 旧的声明周期函数

   Mounting加载阶段：

   constructor() 加载时调用一次，初始化state

   getDefaultProps() 设置默认的props

   getInitialState() 初始化state

   componentWillMount() 组件加载时调用以后都不会调用，

   render() 

   componentDidMount() 组件渲染之后调用只调用一次。

   Updating（更新阶段）:

   componentWillReceiveProps(nextProps)

   组件加载时不调用 组件加载新的props时调用

   shouldComponentUpdata(Props,nextState)

   组件接收新的props或者state时调用 return true 就会渲染更新 return false 就会阻止渲染更新

   componentWillUpdate()组件更新时调用

   render() 创建虚拟dom diff算法  更新dom树

   componentDidUpdate()组件加载时不调用，组件更新完成后调用

   Unmounting卸载

   componentWillUnmount()

   

   ### 新的生命周期函数

   #### 3.1.Mounting 加载阶段

   > **constructor()**

   加载的时候调用一次，可以初始化state

   > **static getDerivedStateFromProps(props, state)**

   组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

   > **render()**

   react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

   > **componentDidMount()**

   组件渲染之后调用，只调用一次

   #### 3.2、Updating（更新阶段：涉及5个钩子函数)

   > **static getDerivedStateFromProps(props, state)**

   组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

   > **shouldComponentUpdate(nextProps, nextState)**

   组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）

   > **render()**

   react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

   > **getSnapshotBeforeUpdate(prevProps, prevState)**

   触发时间: update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法

   > **componentDidUpdate()**

   组件加载时不调用，组件更新完成后调用

   #### 3.3、Unmounting（卸载阶段：涉及1个钩子函数）

   > **componentWillUnmount()**

   组件渲染之后调用，只调用一次

   #### 3.4、Error Handling(错误处理)

   > **componentDidCatch(error，info)**

   任何一处的javascript报错会触发

   

   

   ###### 













This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
