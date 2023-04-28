import axios from "axios"

export default class Task {
    
    static create(details) {
        return axios.post(`/api/task`, details)
        .then(res => console.log(res))
    }

}
