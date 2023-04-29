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

    static start(taskName) {
        return axios.post('/api/task/start', taskName)
    }

}
