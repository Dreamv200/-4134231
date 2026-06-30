import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const timeout = process.env.API_TIMEOUT || 30000

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: parseInt(timeout),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor สำหรับการจัดการข้อผิดพลาด
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export const fetchWaterData = async (householdId) => {
  try {
    const response = await apiClient.get(`/water/${householdId}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch water data: ${error.message}`)
  }
}

export const submitWaterReading = async (data) => {
  try {
    const response = await apiClient.post('/water', data)
    return response.data
  } catch (error) {
    throw new Error(`Failed to submit water reading: ${error.message}`)
  }
}

export const fetchMaintenance = async () => {
  try {
    const response = await apiClient.get('/maintenance')
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch maintenance data: ${error.message}`)
  }
}

export const fetchHistory = async (startDate, endDate) => {
  try {
    const response = await apiClient.get('/history', {
      params: { start: startDate, end: endDate }
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch history: ${error.message}`)
  }
}

export default apiClient
