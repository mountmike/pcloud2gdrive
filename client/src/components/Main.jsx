import AddCloudPage from '../pages/AddCloudPage'
import AddTaskPage from '../pages/AddTaskPage'
import CurrentTasksPage from '../pages/CurrentTasksPage'
import { Routes, Route } from "react-router-dom";


export default function Main({ currentPage }) {
    return (
        <section className="main-page-wrapper">
            <Routes>
                <Route path='/' element={<CurrentTasksPage />} />
                <Route path='/add-task' element={<AddTaskPage />} />
                <Route path='/add-cloud' element={<AddCloudPage />} />
            </Routes>
            
        </section>
    )
}