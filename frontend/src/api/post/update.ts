import { API } from "../api"

export const updateLike = (data: { email: string, likerId: string, postId: string }) => API.put('like', data)
