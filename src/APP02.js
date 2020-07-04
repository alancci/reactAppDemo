import React,{useState,useEffect} from 'react';

import './App.css';

function AsyncPage({name}){
  const [Loading,setLoading] = useState(true)
  const [person,setPerson] = useState({})
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setPerson({name})
      setLoading(false)},
      3000);
  
      return ()=>{
        console.log("组件卸载")
      }
    },[name])


  return(Loading? <div>Loading</div>:<div>{person.name}</div>
  )
 
}

function App() {



  const [name,setName]=useState("xiaoming")
  const [show,setShow]=useState(true)
  const changeName = (name)=>{
        setName(name)
  }
  return (
    <div className="App">
   
   {show?<AsyncPage name={name}/>:<div>组件卸载</div>}
      <button onClick={()=>changeName('小黑')}>设置小黑</button>
      <button onClick={()=>changeName('小红')}>设置小红</button>
      <button onClick={()=>setShow(false)}>组件卸载</button>
    </div>
  );
}

export default App;
