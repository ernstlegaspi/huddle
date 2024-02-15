import { Request, Response } from 'express'
import { catchError, error, getUserId, success } from '../utils'

import User from '../models/user'
import Post from '../models/post'
import { userPushField } from '../utils/db/user'

export const addPost = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { body, name, pictures, tags, username, interests } = req.body
		const tagsArr: string[] = tags
		const interestsArr: string[] = interests
		const userId = getUserId(req)

		if(!body || !name || !pictures || interestsArr.length < 1 || tagsArr.length < 1 || !userId || !username) return error(400, res, "Error creating a new post. Try again later.")

		const newPost = await new Post({
			...req.body,
			interests: interestsArr,
			owner: userId
		}).save()

		await userPushField(userId, { posts: newPost._id })

		return success(newPost, 201, res)
	}, res)
}

export const getFriendsPosts = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { friends } = req.params
		const friendsArr = friends.split('-')

		const friendsPosts = await Post.find({
			owner: { $in: friendsArr }
		}).sort({ createdAt: -1 })

		return success(friendsPosts, 200, res)
	}, res)
}

export const getForYouPosts = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { interests } = req.params
		const interestsArr = interests.split('-')
		const currentUserId = getUserId(req)

		const forYouPosts = await Post.find({
			owner: { $ne: currentUserId },
			interests: { $in: interestsArr }
		}).sort({ createdAt: -1 })

		return success(forYouPosts, 200, res)
	}, res)
}

export const getPostsPerUser = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { page } = req.params

		if(!page) return error(404, res, "Error getting your posts. Try again later.")

		const p = +page // convert string to int
		const userId = getUserId(req)

		const userPosts = await User.findById(userId)
			.populate('posts')
			.exec()

		if(!userPosts) return success({ posts: [] }, 200, res)

		const userPostsLen = userPosts.posts.length
		const reversedUserPosts = userPosts.posts.reverse()
		let count = 1
		const posts = []

		const startingIndex = userPostsLen < 7 || p === 0 ? 0 : 6 * p

		for(let f=startingIndex; f<userPostsLen && count++ < 7; f++) {
			posts.push(reversedUserPosts[f])
		}

		return success({ posts, length: userPostsLen }, 200, res)
	}, res)
}
