import { API } from "../api"

export const deleteNotification = (email: string, _id: string, otherUserId: string) => API.delete(`notification/${email}/${_id}/${otherUserId}`)
