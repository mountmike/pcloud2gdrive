import './AddTaskPage.css'
import Folders from '../components/Folders'
import Task from '../utils/tasks_api'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



export default function AddTaskPage() {
    const [originFolderId, setOriginFolderId] = useState(null)
    const [targetFolderId, setTargetFolderId] = useState(null)
    const [taskName, setTaskName] = useState("")

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    const buttonEnabler = () => {
      if (originFolderId && targetFolderId && taskName) {
        return false
      } else {
        return true
      }
    }

    const handleBtn = (e) => {
      Task.create({taskName, originFolderId, targetFolderId})
    }
    
    
    return (
        <main className="add-task-page">
            <header>
              <div className="left-wrapper">
                <h3>Add new task</h3>
                <p>Create a transfer task to transfer fiels between cloud drives</p>
                <section className="task-name-wrapper">
                    <label htmlFor="taskName">Task name: </label>
                    <input onChange={handleTaskNameChange} type="text" id="taskName" value={taskName}/>
                </section>
              </div>
              <div className="right-wrapper">
                <Link to={buttonEnabler() ? "#" : "/tasks" }>
                  <button id='createTaskBtn' disabled={buttonEnabler()} onClick={handleBtn}>
                    <FontAwesomeIcon icon={faFolderPlus} size="xl"/>
                    <span>Create Task</span>
                  </button>
                </Link>
              </div>
            </header>
            <div className="folders-wrapper">
                <section className="origin-wrapper">
                    <Folders 
                        parentFolder={{name: "Pcloud", id: 0}} 
                        setTargetId={setOriginFolderId} 
                        drive="pcloud"
                    />
                </section>
                <section className="target-wrapper">
                    <Folders 
                        parentFolder={{name: "Gdrive", id: 'root'}} 
                        setTargetId={setTargetFolderId} 
                        drive="gdrive"
                    />
                </section>
            </div>
        </main>
    )
}