import React, { useEffect } from 'react'
import { useState } from 'react';
import '../App.css'

const ToDo = () => {
    const [task, setTask] = useState("");
    // eslint-disable-next-line
    const [list, setList] = useState([]);
    const [ls, setLS] = useState([]);
    const [completedTask, setCompTask] = useState([]);

    const addTask = () => {
        if(task.length == 0){
            alert('Task name cant be empty !');
            return ;
        }
        setLS((ls) => {
            const newTask = [task, ...ls];
            // console.log(newTask);
            setTask('');
            localStorage.setItem("task", JSON.stringify(newTask));
            return newTask;
        })
    }

    const getTaskfromLS = () => {
        const savedTask = localStorage.getItem("task");
        if (savedTask) {

            const parsedData = JSON.parse(savedTask);
            // console.log(savedTask);
            setLS(...ls, parsedData);
        }

    }
    // console.log(ls);
 
    useEffect(() => {
        getTaskfromLS();
        // eslint-disable-next-line
    }, [])

    const removeTask = (index) => {
        // console.log(index)
        const updatedList = ls.filter((ele, id) => {
            localStorage.removeItem('task');
            return index !== id;
        })
        // console.log(updatedList);
        localStorage.setItem("task", JSON.stringify(updatedList));
        setLS(updatedList);
    }

    const taskCompleted = (data, index) => {
        removeTask(index);
        setCompTask((completedTask) => {
            const compTaskList = [data, ...completedTask];
            // console.log("completed task", compTaskList);
            return compTaskList;
        });
    }

    const emptyTaskLst = () => {
        localStorage.removeItem("task")
        setLS([]);
    }
    return (
        <>
            <div className='container'>
                <h1>Welcome </h1>
                <input type='text' placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} /> <br />
                <button onClick={addTask} >Add Task</button>
                {ls.length >= 1 ? <button onClick={emptyTaskLst}>Remove All Task</button> : ""}

                {ls.length >= 1 ? <h1>Tasks</h1> : <h1>No Active Tasks</h1>}
                {ls !== [] && ls.map((data, index) => {
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