import axios from 'axios'
import { serverURL } from '../constants'

export const API = axios.create({
	baseURL: serverURL,
	withCredentials: true
})

// otp
export const emailOtp = (to: { to: string }) => API.post('otp/', to)
