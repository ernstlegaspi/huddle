import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:3001/',
	withCredentials: true
})

// auth
export const signIn = (data: { email: string, password: string }) => API.post('auth/sign-in', data)
export const signUp = (data: User) => API.post('auth/sign-up', data)
export const signOut = () => API.post('auth/sign-out', {})

// notification
export const addNotification = (data: { email: string, content: string, name: string, otherUserId: string, ownerId: string, picture: string, type: string }) => API.post('notification', data)
export const deleteNotification = (email: string, _id: string) => API.delete(`notification/${email}/${_id}`)
export const getUserNotification = (email: string) => API.get(`notification/user-notification/${email}`)

// post
export const changePostImage = (data: FormData, prevImage: string) => API.post(`upload/change-image/${prevImage}`, data)
export const uploadImage = (data: FormData) => API.post('upload/image', data)

export const addPost = (data: Post) => API.post('addPost', data)
export const getPostsPerUser = (page: Number, email: string) => API.get(`getPostsPerUser/${page}/${email}`)

// user
export const getUserApi = (email: string) => API.get(`auth/getUser/${email}`)
export const updateBirthday = (data: { email: string, birthday: string }) => API.put('user/updateBirthday', data)
export const updateEmail = (data: { email: string, newEmail: string }) => API.put('user/updateEmail', data)
export const updateInterests = (data: { email: string, interests: string[] }) => API.put('user/updateInterests', data)
export const updateName = (data: { email: string, name: string }) => API.put('user/updateName', data)
export const updatePhoto = (data: { email: string, isCoverPhoto: boolean, picture: string, prevPicture?: string, changing?: boolean }) => API.put('user/updatePhoto', data)
export const updateProfile = (data: { email: string, name: string, username: string }) => API.put('user/updateProfile', data)
export const removePicture = (data: { email: string, isCoverPhoto: boolean, picture: string }) => API.put('user/removePicture', data)
export const updateUsername = (data: { email: string, username: string }) => API.put('user/updateUsername', data)
export const getUserWithSameInterests = (email: string, interests: string) => API.get(`user/getUserWithSameInterests/${interests}/${email}`)
export const acceptFriendRequest = (data: { email: string, userId: string, friendId: string }) => API.put(`user/accept-friend-request`, data)

export const updatePassword = (data: {
	email: string,
	currentPassword: string
	confirmNewPassword: string,
	newPassword: string
}) => API.put('user/updatePassword', data)

export const passwordConfirmation = (data: { email: string, password: string }) => API.put('user/passwordConfirmation', data)

// otp
export const emailOtp = (to: { to: string }) => API.post('otp/', to)
