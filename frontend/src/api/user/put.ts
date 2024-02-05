import { API } from "../api"

export const acceptFriendRequest = (data: { email: string, userId: string, friendId: string }) => API.put(`user/accept-friend-request`, data)

export const removePicture = (data: { email: string, isCoverPhoto: boolean, picture: string }) => API.put('user/removePicture', data)

export const passwordConfirmation = (data: { email: string, password: string }) => API.put('user/passwordConfirmation', data)

export const updateBirthday = (data: { email: string, birthday: string }) => API.put('user/updateBirthday', data)
export const updateEmail = (data: { email: string, newEmail: string }) => API.put('user/updateEmail', data)
export const updateInterests = (data: { email: string, interests: string[] }) => API.put('user/updateInterests', data)
export const updateName = (data: { email: string, name: string }) => API.put('user/updateName', data)
export const updatePassword = (data: { email: string, currentPassword: string, confirmNewPassword: string, newPassword: string }) => API.put('user/updatePassword', data)
export const updatePhoto = (data: { email: string, isCoverPhoto: boolean, picture: string, prevPicture?: string, changing?: boolean }) => API.put('user/updatePhoto', data)
export const updateProfile = (data: { email: string, name: string, username: string }) => API.put('user/updateProfile', data)
export const updateUsername = (data: { email: string, username: string }) => API.put('user/updateUsername', data)