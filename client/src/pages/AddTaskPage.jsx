import './AddTaskPage.css'
import FolderBrowser from '../components/FolderBrowser'

export default function AddTaskPage() {
    return (
        <main className="add-task-page">
            <h3>Add new task</h3>
            <p>Create a transfer task to transfer fiels between cloud drives</p>
            <div className="folder-wrapper">
                <FolderBrowser folders={[1,2,3]}/>
                <FolderBrowser />
            </div>
        </main>
    )
}