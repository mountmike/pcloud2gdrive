import axios from "axios"

export function login(data) {
  return axios.post("/api/session", data).then(res => res.data)
}