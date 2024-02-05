import { API } from "../api"

export const getUserApi = (email: string) => API.get(`auth/getUser/${email}`)
export const getUserFriends = (email: string) => API.get(`user/get-user-friends/${email}`)
export const getUserWithSameInterests = (email: string, interests: string) => API.get(`user/getUserWithSameInterests/${interests}/${email}`)
