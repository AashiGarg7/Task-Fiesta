import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [addTask, setAddTask] = useState("");
  const [tasks,setTasks] = useState([]);
  const [showFinishedTasks, setShowFinishedTasks] = useState(false);

  useEffect(()=>{
    let taskString = localStorage.getItem("tasks");
    if(taskString){
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  },[])

  const saveToLS = () =>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }

  const handleEdit = (event,id) =>{

    let taskToEdit = tasks.find(item => item.id === id);
    if (taskToEdit) {
      setAddTask(taskToEdit.addTask);
    }
    // console.log(taskToEdit);
    let updatedTasks = tasks.filter(item => item.id !== id);
    setTasks(updatedTasks);
    saveToLS();
  }

  const handleDelete = (event,id) =>{
    let newTasks = tasks.filter(item=>{
      return item.id !== id;
    });
    setTasks(newTasks);
    saveToLS();

    // const updatedTasks = tasks.filter(item => item.id !== id);
    // setTasks(updatedTasks);
  }

  const handleAdd = () =>{
    setTasks([...tasks,{id: uuidv4(), addTask, isCompleted:false}])
    setAddTask("");
    saveToLS();
  }

  const handleOnChange = (event) =>{
    setAddTask(event.target.value);
  }

  const handleCheckbox = (event) =>{
    let id = event.target.name;
    let index = tasks.findIndex(item=>{
      return item.id === id;
    })
    
    
    let newTasks = [...tasks];
    
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveToLS();


    // const id = event.target.name;

    // // Create a copy of tasks array
    // const updatedTasks = tasks.map(item => {
    //   if (item.id === id) {
    //     // Toggle the isCompleted property for the clicked task
    //     return { ...item, isCompleted: !item.isCompleted };
    //   }
    //   return item;
    // });
  }


  const handleFinishedTasks = () => {
    setShowFinishedTasks(!showFinishedTasks);
  };

  const displayedTasks = showFinishedTasks ? tasks.filter(item => item.isCompleted) : tasks;

  return (
    <>
      <Navbar />
      <div className="md:container md:w-11/12 bg-gray-200 text-black mx-auto mt-5 rounded-md p-5  min-h-[80vh] ">
        <div className=' text-center  mb-5'>
          <h1 className='text-xl font-bold text-center mb-5 '>Manage your tasks at one place!</h1>
          <h2 className='text-xl mb-2 font-medium'>Add a Task</h2>

          <input className=" ml-1 sm:w-full w-9/12 rounded-full  text-slate-600 p-1 px-3" type="text" onChange={handleOnChange} value={addTask}/>
          
          <button onClick={handleAdd} disabled={addTask.length<=2} className=' bg-purple-600 hover:bg-purple-700 text-white p-3 py-1 rounded-md disabled:bg-purple-400 font-bold block sm:w-full w-9/12 mx-auto mt-2'>Save</button>
        </div>

        <button onClick={handleFinishedTasks} className=' text-lg bg-purple-600 hover:bg-purple-700 text-white px-2 ml-4  rounded-md mt-2 mb-4 font-bold text-black'>
        {showFinishedTasks ? "See All Tasks" : "See Finished Tasks"}
        </button>
        <div className= " h-[1px] my-3 opacity-25 w-[90%] mx-auto bg-black"></div>
        <h2 className="text-xl font-medium ml-4">Your Tasks</h2>
        <div className=" ml-4">

          {displayedTasks.length===0 && <div className='my-5'>No tasks to display</div>}

          {displayedTasks.map(item=>{

          
            return <div className=" flex sm:w-full md:w-1/2 my-1 justify-between">
              <div className='flex gap-5'>

                <input type="checkbox" checked={item.isCompleted?true:false}  onChange={handleCheckbox} name={item.id} id="" />

                <div className={`my-2 ${item.isCompleted?"line-through":""}`}>{item.addTask}</div>
              </div>

              <div className="flex h-full  ">
                <button onClick={(event)=>handleEdit(event,item.id)} className='   bg-purple-600 hover:bg-purple-700 text-white p-2 py-1 rounded-md mx-2 my-1 font-bold k'>Edit</button>

                <button onClick={(event)=>{handleDelete(event,item.id)}} className='  bg-purple-600 hover:bg-purple-700 text-white p-2 py-1 rounded-md mx-2 my-1 font-bold text-black' name={item.id}>Delete</button>
              </div>
            </div>
        })}
        
        </div>
      </div>
    </>
  );
}

export default App;
