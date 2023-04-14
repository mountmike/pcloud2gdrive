export default class Task {
    
    static fetchTasks() {
        return axios.get(`/task`).then(tasks => tasks.data)
    }

}