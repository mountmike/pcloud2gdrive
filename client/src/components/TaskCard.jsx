import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import Task from '../utils/tasks_api'

export default function TaskCard({ task }) {

    const handleStartBtn = (e) => {
        Task.start({taskId: task.id})
    }

    return (
        <article className="TaskCard">
            <section className="left">
                <FontAwesomeIcon icon={faThumbtack} size='3x' />
                <div className="task-details-wrapper">
                    <span>Task name:</span> <span>{task.name}</span>
                    <p>Origin path</p>
                    <p>Target path</p>
                </div>
            </section>
            <section className="center">
                <p>percentage complete</p>
            </section>
            <section className="right">
                <button onClick={handleStartBtn} id='startTaskBtn'>start task</button>
            </section>
        </article>
    )
}