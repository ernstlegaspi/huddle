import { API } from "../api"

export const getUserNotification = (email: string) => API.get(`notification/user-notification/${email}`)
