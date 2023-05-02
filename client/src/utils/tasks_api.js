import axios from "axios"

export default class Task {
    
    static fetchAll() {
        return axios.get(`/api/task`)
        .then(tasks => tasks.data)
    }
    
    static create(details) {
        return axios.post(`/api/task`, details)
        .then(res => console.log(res))
    }

    static start(taskId) {
        return axios.post('/api/task/start', taskId)
    }

    static delete(taskId) {
        return axios.delete(`/api/task/${taskId}`)
    }

}
