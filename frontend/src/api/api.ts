import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:3001/',
	withCredentials: true
})

// auth
export const signIn = (data: { email: string, password: string }) => API.post('auth/sign-in', data)
export const signUp = (data: User) => API.post('auth/sign-up', data)
export const signOut = () => API.post('auth/sign-out', {})

// post
export const changePostImage = (data: FormData, prevImage: string) => API.post(`upload/change-post-image/${prevImage}`, data)
export const uploadPostImage = (data: FormData) => API.post('upload/post-image', data)

export const addPost = (data: Post) => API.post('addPost', data)
export const getPostsPerUser = (page: Number, email: string) => API.get(`getPostsPerUser/${page}/${email}`)

// user
export const getUserApi = (email: string) => API.get(`auth/getUser/${email}`)
export const updateProfile = (data: { email: string, name: string, username: string }) => API.put('user/updateProfile', data)
