import { API } from "../api"

export const getPostsPerUser = (page: Number, email: string) => API.get(`getPostsPerUser/${page}/${email}`)
