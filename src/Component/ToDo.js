import React, { useEffect } from 'react'
import { useState } from 'react';

const ToDo = () => {
    const [task,setTask] = useState("");
    const [list,setList] = useState([]);
    const [completedTask,setCompTask] = useState([]);

    const localStorageKey = "todo:tasks";

    const saveTaskinLS = (newTasks) => {
        setList(newTasks);
        console.log(newTasks)
        localStorage.setItem(localStorageKey, JSON.stringify(newTasks));
    }

    const getTaskfromLS = () => {
        const savedTasks = localStorage.getItem(localStorageKey);
        console.log(savedTasks);
        if(savedTasks){
            setTask(JSON.parse(savedTasks));
        }
    }

    const addTask = () => {
        setList((list)=>{
            const newTask = [task,...list];
            console.log(newTask);
            setTask('');
            return newTask;
        })

  

    }

    const removeTask = (index) => {
        const updatedList = list.filter((ele,id) => {
            return index != id;
        })
        setList(updatedList);
    }

    const taskCompleted = (data,index) => {
        removeTask(index);
        setCompTask((completedTask) => {
            const compTaskList = [data, ...completedTask];
            console.log("completed task",compTaskList);
            return compTaskList;
        });
    }

    const emptyTaskLst = () => {
        setList([]);
    }

    // useEffect(()=>{
    //     getTaskfromLS();
    // },[])
    return (
   <>
            <div>
                <h1>ToDo App</h1>
                <input type='text' placeholder='Enter Task' value={task} onChange={(e)=>setTask(e.target.value)} />
                <button className='btn' onClick={addTask} >Add Task</button>

                <h1>Tasks</h1>
                {list.length >= 1 ? <button onClick={emptyTaskLst}>Remove All Task</button> : ""}
                {list != [] && list.map((data,index)=>{
                    return(
                        <>
                        <span key={index}>
                           <div> {data}
                           <button onClick={() => taskCompleted(data,index)}>Mark Complete</button>
                           <button onClick={() => removeTask(index)}>Remove</button>
                           </div>
                        </span>
                        </>
                    )
                })}
                <h1>Completd Task</h1>
                {
                   completedTask !=[] && completedTask.map((compTask,i)=>{
                        return(
                            <>
                            <span key={i}>
                                <div> {compTask} </div>
                            </span>
                            </>
                        )
                    })
                }
          </div>
        
    </>
  )
}

export default ToDo