import axios from "axios"

export function login(data) {
  return axios.post("http://54.252.147.188:5001/api/session", data).then(res => res.data)
}

export function signup(data) {
  return axios.post("http://54.252.147.188:5001/api/user", data).then(res => res.data)
}