import { useEffect, useState } from 'react'
import Task from '../utils/tasks_api'
import TaskCard from '../components/TaskCard'
import './CurrentTaskPage.css'
import { ThreeCircles } from  'react-loader-spinner'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../db/firebase'

export default function CurrentTasksPage() {
    const [taskList, setTaskList] = useState(null)

    useEffect(() => {
        const q = query(collection(db, "tasks"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push(doc.data());
        });
        setTaskList(tasks)
        });
        // Task.fetchAll().then(tasks => {
        //     setTaskList(tasks)
        // })
    }, [])

    return (
        <main className="current-tasks-page">
            <header>
              <div className="left-wrapper">
                <h3>Current Tasks List</h3>
                <p>Manage current transfer tasks</p>
              </div>
              <div className="right-wrapper">
       
              </div>
            </header>
            <section className="task-wrapper">
                {taskList ?
                taskList.map(task => (
                    <TaskCard key={task.originFolderId} task={task} setTaskList={setTaskList}/>
                ))
                :
                <div className="loader-wrapper">
                    <ThreeCircles
                        height="300"
                        width="300"
                        color="#042A2B"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                        />
                </div> }
            </section>
        </main>
    )
}