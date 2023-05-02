import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons'
import Task from '../utils/tasks_api'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../db/firebase'
import { useState } from 'react';
import ProgressTracker from './ProgressTracker'
import Button from '@mui/material/Button';

export default function TaskCard({ task, setTaskList }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(task.isComplete)
    const [popupIsVisible, setPopupIsVisible] = useState(false)

   
    const percentageComplete = () => {
        if (isComplete) {
            return 100
        }
        const total = task.totalFiles
        return Math.ceil((progress / 2) / total * 100)
    }

    const handleStartBtn = async (e) => {
        setProgress(0)
        Task.start({taskId: task.id})
        const unsub = onSnapshot(doc(db, "tasks", task.id, "shards", "progress"), (doc) => {
            if (doc.exists()) {
                setProgress(doc.data().count)
            }
        });
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
        setTaskList(previousList => previousList.filter(el => el.id !== task.id))

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
                <p>percentage complete: {percentageComplete()}%</p>
                <ProgressTracker progress={percentageComplete()} />
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