import mongoose from 'mongoose'
import { Request, Response } from 'express'
import { catchError, error, getUserId, success } from '../utils'

import User from '../models/user'
import Post from '../models/post'

export const addPost = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { body, name, pictures, tags, username } = req.body
		const tagsArr: string[] = tags
		const userId = getUserId(req)

		if(!body || !name || !pictures || tagsArr.length < 1 || !userId || !username) return error(400, res)

		const newPost = await new Post({
			...req.body,
			owner: userId
		}).save()

		await User.findByIdAndUpdate(userId,
			{ $push: { posts: newPost._id } },
			{ new: true }
		)

		return success(newPost, 201, res)
	}, res)
}

export const getPostsPerUser = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { page } = req.params

		if(!page) return error(404, res)

		const p = +page // convert string to int
		const userId = getUserId(req)

		const userPosts = await User.findById(userId)
			.populate('posts')
			.exec()

		if(!userPosts) return error(400, res)

		const userPostsLen = userPosts.posts.length
		const reversedUserPosts = userPosts.posts.reverse()
		let count = 1
		const posts = []

		if(userPostsLen < 7 || p === 0) {
			for(let f=0; f<userPostsLen && count++ < 7; f++) {
				posts.push(reversedUserPosts[f])
			}

		return success({ posts, length: userPostsLen }, 200, res)
		}

		const startingIndex = 6 * p

		for(let f=startingIndex; f<userPostsLen && count++ < 7; f++) {
			posts.push(reversedUserPosts[f])
		}

		return success({ posts, length: userPostsLen }, 200, res)
	}, res)
}
