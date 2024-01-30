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
export const uploadImage = (data: FormData) => API.post('upload/post-image', data)

export const addPost = (data: Post) => API.post('addPost', data)
export const getPostsPerUser = (page: Number, email: string) => API.get(`getPostsPerUser/${page}/${email}`)

// user
export const getUserApi = (email: string) => API.get(`auth/getUser/${email}`)
export const updateProfile = (data: { email: string, name: string, username: string }) => API.put('user/updateProfile', data)
export const updateBirthday = (data: { email: string, birthday: string }) => API.put('user/updateBirthday', data)
export const updateName = (data: { email: string, name: string }) => API.put('user/updateName', data)
export const updateUsername = (data: { email: string, username: string }) => API.put('user/updateUsername', data)
export const updateEmail = (data: { email: string }) => API.put('user/updateEmail', data)
export const updateInterests = (data: { email: string, interests: string[] }) => API.put('user/updateInterests', data)
export const updatePicture = (data: { email: string, picture: string }) => API.put('user/updatePicture', data)

export const updatePassword = (data: {
	email: string,
	currentPassword: string
	confirmNewPassword: string,
	newPassword: string
}) => API.put('user/updatePassword', data)

export const passwordConfirmation = (data: { email: string, password: string }) => API.put('user/passwordConfirmation', data)

// otp
export const emailOtp = (to: { to: string }) => API.post('otp/', to)
