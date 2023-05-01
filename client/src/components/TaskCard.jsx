import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faBars } from '@fortawesome/free-solid-svg-icons'
import Task from '../utils/tasks_api'

export default function TaskCard({ task }) {

    const handleStartBtn = (e) => {
        Task.start({taskId: task.id})
    }

    return (
        <article className="TaskCard">
            <section className="left">
                <FontAwesomeIcon className='task-icon' icon={faThumbtack} size='3x' />
                <div className="task-details-wrapper">
                    <h5>Task name:</h5><span> {task.name}</span><br />
                    <h5>Origin path:</h5><span> {task.originPath}</span><br />
                    <h5>Target path:</h5><span> {task.targetPath}</span>
                  
                </div>
            </section>
            <section className="center">
                <p>percentage complete</p>
            </section>
            <section className="right">
                <button onClick={handleStartBtn} id='startTaskBtn'>
                    <FontAwesomeIcon icon={faBars} size='2x' />
                </button>
            </section>
        </article>
    )
}