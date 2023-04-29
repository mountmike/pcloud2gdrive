import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

export default function TaskCard({ task }) {

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
                <p>context menue</p>
            </section>
        </article>
    )
}