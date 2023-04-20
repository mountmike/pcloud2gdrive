import './TaskNav.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function TaskNav({ setCurrentPage }) {
    const [isTasksPage, setIsTasksPage] = useState(true)
    const [isAddPage, setIsAddPage] = useState(false)

    const handleTaskPageBtn = e => {
        setIsTasksPage(true)
        setIsAddPage(false)
        // setCurrentPage(previousState => (
        //     [previousState.map(page => page.name === "addTaskPage" ? page.isActive = true : page.isActive = false)])
        // ) 
    }

    const handleAddPageBtn = e => {
        setIsAddPage(true)
        setIsTasksPage(false)
    }
    
    return (
        <section className="task-nav-wrapper">
            <div className="spacer"><h4>My Cloud</h4></div>
            <nav>
                <Link to="/tasks">
                    <button className={isTasksPage ? "navBtn active" : "navBtn"} onClick={handleTaskPageBtn}>
                        <FontAwesomeIcon icon={faListCheck} size="lg" color='#042A2B' />
                    </button>
                </Link>
                <Link to="/add-task">
                    <button className={isAddPage ? "navBtn active" : "navBtn"} onClick={handleAddPageBtn}>
                        <FontAwesomeIcon icon={faCalendarPlus} size="lg" color='#042A2B' />
                    </button>
                </Link>
            </nav>
        </section>
    )
}