import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faPlay, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import Task from '../utils/tasks_api'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../db/firebase'
import { useEffect, useState } from 'react';
import ProgressTracker from './ProgressTracker'
import Button from '@mui/material/Button';

export default function TaskCard({ task, setTaskList }) {
    const [progress, setProgress] = useState(0)
    const [popupIsVisible, setPopupIsVisible] = useState(false)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "tasks", task.id, "shards", "progress"), (doc) => {
            if (doc.exists()) {
                setProgress(doc.data().count)
            }
        });
    }, [])
   
    const percentageComplete = () => {
        if (task.isComplete) {
            return 100
        }
        const total = task.totalFiles
        return Math.ceil((progress / 2) / total * 100)
    }

    const handleStartBtn = async (e) => {
        setProgress(0)
        Task.start({taskId: task.id})
        
    }

    const handleCloseBtn = (e) => {
        setPopupIsVisible(true)
    }

    const handleNoBtn = (e) => {
        setPopupIsVisible(false)
    }

    const handleYesBtn = (e) => {
        setPopupIsVisible(false)
        Task.delete(task.id)

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
                <FontAwesomeIcon onClick={handleCloseBtn} id='closeBtn' icon={faXmark} />
                
            </section>
            <section className="center">
                {task.isComplete ?
                <div className="progress-wrapper">
                    <h4 className='task-complete-heading'><span>Task complete!</span> <FontAwesomeIcon icon={faCheck} /></h4>
                    <ProgressTracker progress={100} colour="success" />
                </div>
                :
                <div className="progress-wrapper">
                    <p>Percentage complete: {percentageComplete()}%</p>
                    <ProgressTracker progress={percentageComplete()} />
                </div>    
                }       
            </section>
            <section className="right">
                <button onClick={handleStartBtn} id='startTaskBtn'>
                    <FontAwesomeIcon icon={faPlay} size='2x' />
                </button>
                
            </section>
            <div className={popupIsVisible ? "popup-wrapper visible" : "popup-wrapper"} >
                <div className="popup">
                    <p>Are you sure you want to delete this task?</p>
                    <section className="buttons">
                        <Button onClick={handleNoBtn} size='small' variant="outlined" >No</Button>
                        <Button onClick={handleYesBtn} size='small' color="error" variant="outlined">Yes</Button>
                    </section>
                </div>
            </div>
        </article>
    )
}