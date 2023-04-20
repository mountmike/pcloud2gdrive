import AddCloudPage from '../pages/sub_pages/AddCloudPage'
import AddTaskPage from '../pages/sub_pages/AddTaskPage'
import CurrentTasksPage from '../pages/sub_pages/CurrentTasksPage'
import { Routes, Route } from "react-router-dom";


export default function Main({ currentPage }) {
    return (
        <section className="main-page-wrapper">
            <Routes>
                <Route path='/tasks' element={<CurrentTasksPage />} />
                <Route path='/add-task' element={<AddTaskPage />} />
                <Route path='/add-cloud' element={<AddCloudPage />} />
            </Routes>
            
        </section>
    )
}