import './TaskNav.css'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function TaskNav() {

    
    return (
        <section className="task-nav-wrapper">
            <div className="spacer"><h4>My Cloud</h4></div>
            <nav>
                <Link to="/">
                    <button className={ "navBtn"} >
                        <FontAwesomeIcon icon={faListCheck} size="lg" color='#042A2B' />
                    </button>
                </Link>
                <Link to="/add-task">
                    <button className={ "navBtn"} >
                        <FontAwesomeIcon icon={faCalendarPlus} size="lg" color='#042A2B' />
                    </button>
                </Link>
            </nav>
        </section>
    )
}