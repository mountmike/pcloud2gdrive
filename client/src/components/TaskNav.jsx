import './TaskNav.css'

export default function TaskNav() {
    return (
        <section className="task-nav-wrapper">
            <div className="spacer"><h4>My Cloud</h4></div>
            <nav>
                <button>Task List</button>
                <button>Add Transfer</button>
            </nav>
        </section>
    )
}