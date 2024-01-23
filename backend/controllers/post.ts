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

		const user = await User.findByIdAndUpdate(userId,
			{ $push: { posts: newPost._id } },
			{ new: true }
		)

		return success(newPost, 201, res)
	}, res)
}

export const getPostsPerUser = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		const userPosts = await User.findById(userId)
			.populate('posts')
			.exec()

		if(!userPosts) return error(400, res)

		const reversedUserPosts = userPosts.posts.reverse()

		return success({ posts: reversedUserPosts }, 200, res)
	}, res)
}
