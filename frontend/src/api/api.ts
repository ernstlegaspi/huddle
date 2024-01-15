import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:3001/',
	withCredentials: true
})

export const signIn = (data: { email: string, password: string }) => API.post('auth/sign-in', data)
export const signUp = (data: User) => API.post('auth/sign-up', data)
export const signOut = () => API.post('auth/sign-out', {})
