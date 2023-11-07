import { useEffect, useReducer, useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
  const [taskList, setTaskList]= useState([])
  const [completed, setCompleted]= useState([])

  useEffect(()=>{
    let taskFromLS = localStorage.getItem("taskList");

    if(taskFromLS){
      setTaskList(JSON.parse(taskFromLS))
    }
  },[])

  const [{isOver}, drop] =  useDrop(()=>({
    accept: "todo",
    drop:(item)=>addToCompleted(item.id,
      item.projectName, item.taskDesc, item.timestamp,
      item.duration),
    collect: (monitor)=>({
      isOver: !!monitor.isOver(),
    })
  }))

  const addToCompleted=(id,projectName, taskDesc,timestamp,duration)=>{
    const moveTask = taskList.filter((task)=> id === task.id);
    setCompleted((completed)=> [...completed,{moveTask,
    projectName,taskDesc,duration,timestamp}])
   
  }

  console.log(taskList)
  return (
    <>
     <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
     <p className="text-xl pl-6">Hi there !!</p>
     <div className="flex flex-row items-center">
     <p className="text-xl pl-6">Click</p> 
     <AddTask  taskList={taskList} setTaskList={setTaskList}/>
     <p className="text-xl my-2">to add a new task </p>

     </div>
     <div className="flex flex-row" >
     <div className="w-full">
     <h2 className="ml-6 text-xl my-4 py-2 w-3/4 font-semibold max-w-lg  px-4
    bg-gray-200">To Do:</h2>


    <div className="ml-6 flex flex-col-reverse">

     {taskList.map((task,i)=>
      
      <ToDo key={i} task={task} 
      index={i}
      taskList ={taskList}
      setTaskList={setTaskList}/>
      
      )}
      </div>
    </div>
    <div className="w-full flex flex-col" ref={drop}>
    <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4 py-2 px-4 
    bg-gray-200">Completed</h2>
      {completed.map((task,i)=>
      
      <ToDo key={i} task={task}
      taskList ={taskList}
      
      setTaskList={setTaskList}/>
    
     )}
    </div>
    </div>
     </>
  );
}

export default App;
