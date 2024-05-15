import type { ICreateShift, IShift, IUser } from '@/types'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// interceptor that saves cookie if it exists named session-token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('session-token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// interceptor that saves token in local storage
axiosInstance.interceptors.response.use((response) => {
  const token = response.headers['session-token']
  if (token) {
    localStorage.setItem('session-token', token)
  }
  return response
})

export const login = async (natid: string, password: string) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', { natid, password })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const register = async (user: IUser) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', user)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getAllShifts = async (natid: string) => {
  try {
    const response = await axiosInstance.get(`/shifts/${natid}`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createShift = async (shift: ICreateShift) => {
  try {
    const response = await axiosInstance.post('/shifts', shift)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
