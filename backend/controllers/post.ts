import { Request, Response } from 'express'
import { catchError, error, getUserId, success } from '../utils'

import User from '../models/user'
import Post from '../models/post'
import { userPushField } from '../utils/db/user'

export const addPost = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { body, email, name, pictures, tags, username } = req.body
		const tagsArr: string[] = tags
		const userId = getUserId(req)

		if(!body || !email || !name || !pictures || tagsArr.length < 1 || !userId || !username) return error(400, res, "Error creating a new post. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

		const newPost = await new Post({
			...req.body,
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

export const getPostsPerUser = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { email, page } = req.params

		if(!page || !email) return error(404, res, "Error getting your posts. Try again later.")

		const user = await User.findOne({ email })

		if(!user) return error(401, res, "User does not exist")

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
