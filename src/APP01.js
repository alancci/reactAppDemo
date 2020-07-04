import React,{useState,useContext, createContext,useReducer} from 'react';

import './App.css';

function App() {
  const [val,setVal] = useState(0);
  //共享状态钩子函数
  const APPContext = createContext();
  const Achild = ()=>{
    const {name} = useContext(APPContext)
    return(
      <p>Achild{name}</p>
    )
  }
  const Bchild = ()=>{
    const {name} =useContext(APPContext)
    return(
      <p>Bchild{name}</p>
    )
  }


  const reducer = (state,action)=>{
    const actionFn = {
      add:function(){
        return{
          ...state,
          count:state.count+10
        }
      }
     
    }
    return actionFn[action.type]()
  }
  const [state,dispatch] = useReducer(reducer,{count:10})
  const addcount = ()=>{
    dispatch({
      type:"add"
    })
  }
  return (
    <div className="App">
     <p>{val}</p>
     
     <button onClick={()=>{setVal(val+1)}}>点击加1</button>
     <APPContext.Provider value={{name:"xiaoming"}}>
       <Achild>
      
       </Achild>
       <Bchild>
       
       </Bchild>
     </APPContext.Provider>
     <p>{state.count}</p>
     <button onClick={addcount}>点击加10</button>

    </div>
  );
}

export default App;
