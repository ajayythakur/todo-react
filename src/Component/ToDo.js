import React, { useEffect } from 'react'
import { useState } from 'react';
import '../App.css'

const ToDo = () => {
    const [name, setName] = useState("");
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    const [completedTask, setCompTask] = useState([]);

    const addTask = () => {
        setList((list) => {
            const newTask = [task, ...list];
            console.log(newTask);
            setTask('');
            return newTask;
        })



    }

    const removeTask = (index) => {
        const updatedList = list.filter((ele, id) => {
            return index !== id;
        })
        setList(updatedList);
    }

    const taskCompleted = (data, index) => {
        removeTask(index);
        setCompTask((completedTask) => {
            const compTaskList = [data, ...completedTask];
            console.log("completed task", compTaskList);
            return compTaskList;
        });
    }

    const emptyTaskLst = () => {
        setList([]);
    }

    // useEffect(()=>{
    //     getTaskfromLS();
    // },[])
    useEffect(() => {
        const name = prompt("Enter your name");
        setName(name);
    }, [])
    return (
        <>
            <div className='container'>
                <h1>Welcome {name}</h1>
                <input type='text' placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} /> <br />
                <button onClick={addTask} >Add Task</button>
                {list.length >= 1 ? <button onClick={emptyTaskLst}>Remove All Task</button> : ""}

                {list.length >= 1 ? <h1>Tasks</h1> : <h1>No Active Tasks</h1>}
                {list !== [] && list.map((data, index) => {
                    return (
                        <>
                            <span key={index}>
                                <div className='task-list'>
                                    <div className='task-name'>
                                        {data}
                                    </div>
                                    <div className='task-btn'>
                                        <span class="material-symbols-outlined" onClick={() => taskCompleted(data, index)}>
                                            check
                                        </span>
                                        <button onClick={() => removeTask(index)}><span class="material-symbols-outlined">
                                            delete
                                        </span></button>
                                    </div>
                                </div>
                            </span>
                        </>
                    )
                })}
                {list.length === 0 && completedTask.length > 0 ? <h4>Completed Tasks</h4> : ""}
                {
                    completedTask !== [] && completedTask.map((compTask, i) => {
                        return (
                            <>
                                <span key={i}>
                                    <div className='completed-task'> {compTask} </div>
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