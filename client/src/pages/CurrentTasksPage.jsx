import { useEffect, useState } from 'react'
import Task from '../utils/tasks_api'
import TaskCard from '../components/TaskCard'
import './CurrentTaskPage.css'

export default function CurrentTasksPage() {
    const [taskList, setTaskList] = useState(null)

    useEffect(() => {
        Task.fetchAll().then(tasks => setTaskList(tasks))
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
                    <TaskCard key={task.originFolderId} task={task} />
                ))
                : "currently no tasks" }
            </section>
        </main>
    )
}