import axios from 'axios'

export const API = axios.create({
	baseURL: 'http://localhost:3001/',
	withCredentials: true
})

// otp
export const emailOtp = (to: { to: string }) => API.post('otp/', to)
