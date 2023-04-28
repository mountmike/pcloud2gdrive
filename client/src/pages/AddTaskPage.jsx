import './AddTaskPage.css'
import Folders from '../components/Folders'
import { useEffect, useState } from 'react';


const familyTree = {
    name: "John",
    age: 90,
    children: [
      {
        name: "Mary",
        age: 60,
      },
      {
        name: "Arthur",
        age: 60,
        children: [
          {
            name: "Lily",
            age: 35,
            children: [
              {
                name: "Hank",
                age: 60,
              },
              {
                name: "Henry",
                age: 57,
              },
            ],
          },
          {
            name: "Billy",
            age: 37,
          },
        ],
      },
      {
        name: "Dolores",
        age: 55,
      },
    ],
  };

export default function AddTaskPage() {
    const [originFolderId, setOriginFolderId] = useState(null)
    const [targetFolderId, setTargetFolderId] = useState(null)
    const [taskName, setTaskName] = useState("")

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }
    
    
    return (
        <main className="add-task-page">
            <h3>Add new task</h3>
            <p>Create a transfer task to transfer fiels between cloud drives</p>
            <section className="task-name-wrapper">
                <label for="taskName">Task name: </label>
                <input onChange={handleTaskNameChange} type="text" id="taskName" value={taskName}/>
            </section>
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