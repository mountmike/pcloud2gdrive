import Task from "../apis/api_tasks.js"

export function renderTaskListPage() {
    return `
        <h2>Task List:</h2>
        <div class="task-list-wrapper">
        </div>
    `
}

function renderTask(task) {
    return `
        <div class="task">
            <p>Task name:</p><span>${task.task_name} </span>
            <p>Origin:</p><span>${task.origin_folder} </span>
            <p>Destination:</p><span>${task.destination_folder} </span>
        </div>
    `
}

export function renderTaskList() {
    Task.fetchTasks()
    .then(tasks => {
        document.querySelector(".task-list-wrapper").innerHTML = tasks.map(task => renderTask(task)).join("")
    })
    
}