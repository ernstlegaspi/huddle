import { API } from "../api"

export const getPostsPerUser = (page: Number, email: string) => API.get(`getPostsPerUser/${page}/${email}`)
export const getFriendsPosts = (email: string, friends: string) => API.get(`get-friends-posts/${friends}/${email}`)
export const getForYouPosts = (email: string, interests: string) => API.get(`for-you/${interests}/${email}`)
