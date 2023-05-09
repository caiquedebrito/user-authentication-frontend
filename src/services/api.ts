import axios from "axios"
const BASE_URL = "user-authentication-production.up.railway.app"

export const api = axios.create({
  baseURL: BASE_URL,
})

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
})