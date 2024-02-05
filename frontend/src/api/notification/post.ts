import { API } from "../api"

export const addNotification = (data: { email: string, content: string, name: string, otherUserId: string, ownerId: string, picture: string, type: string }) => API.post('notification', data)
