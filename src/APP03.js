import React, { useReducer } from 'react';

import './App.css';



function App() {
  //userReducer 第一个参数reducer函数()   第二个参数 state初始化state 
  //返回值为最新的state 和 dispatch()函数 触发reducer函数 计算最新的state
  /*
  对于复杂的state操作逻辑，嵌套的state对象，推荐使用useReducer()

  */ 

//第一个参数 初始化state
const initState = {count:0}
//第二个参数 reducer函数 (state,action) => newstate 经过不同的action.type后返回新的state 利用action提供的信息state=> new state
//接受当前应用的state和action.type后返回新的state  reducer幂等性
/**
 * 1.reducer处理的state对象immutable的，即永远不要直接修改state对象，reducer函数每次都返回一个新的state对象 
 * 2.我们可以用es6解构复写操作，复写需要改变的state属性 
 * 对于action的理解：
 * 用type表示具体的行为类型
 * 用payload携带信息
 * 
 *   const action = {
        type: 'addBook',
        payload: {
            book: {
                bookId,
                bookName,
                author,
            }
        }
    }


  reducer使用场景：
  如果你的state是一个数组或者对象。
  如果你的state变化很复杂，经常一个操作需要修改很多state。
  如果你希望构建自动化测试用例来保证程序的稳定性。
  如果你需要在深层子组件里面去修改一些状态。
  如果你用应用程序比较大，希望UI和业务能够分开维护。
 */
function reducer(state,action){
switch (action.type) {
  case "add":
    return{ 
      count:state.count+1
    }
    break;
  case "del":
    return{
      count:state.count-1
    }
    break;
  default:
    break;
}

}
const [state,dispatch] = useReducer(reducer,initState);
  return (
  <div className="App">
  
  count:{state.count}
  <button onClick={()=>{dispatch({type:"add"})}}>加</button>
  <button onClick={()=>{dispatch({type:"del"})}}>减</button>
  </div>
  );
}

export default App;
