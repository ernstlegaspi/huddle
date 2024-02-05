import { API } from "../api"

export const getUserApi = (email: string) => API.get(`auth/getUser/${email}`)
export const getUserWithSameInterests = (email: string, interests: string) => API.get(`user/getUserWithSameInterests/${interests}/${email}`)
