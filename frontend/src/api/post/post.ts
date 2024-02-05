import { API } from "../api"

export const addPost = (data: Post) => API.post('addPost', data)

export const changePostImage = (data: FormData, prevImage: string) => API.post(`upload/change-image/${prevImage}`, data)

export const uploadImage = (data: FormData) => API.post('upload/image', data)
