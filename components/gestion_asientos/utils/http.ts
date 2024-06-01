import axios from "axios"

export interface RequestResponse<T> {
  data: T | string
  status: boolean
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
})
