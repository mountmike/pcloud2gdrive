import './AddTaskPage.css'
import Folders from '../components/Folders'


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
    
    
    return (
        <main className="add-task-page">
            <h3>Add new task</h3>
            <p>Create a transfer task to transfer fiels between cloud drives</p>
            <div className="folder-wrapper">
                <Folders parentFolder={{name: "Pcloud", id: 0}} />
            </div>
        </main>
    )
}