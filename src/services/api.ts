import axios from "axios"
const BASE_URL = "http://localhost:3333/users"

export const api = axios.create({
  baseURL: BASE_URL,
})

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
})