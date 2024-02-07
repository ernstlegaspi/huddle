import { Request, Response } from 'express'

import Notification from '../models/notification'
import User from '../models/user'
import { catchError, getUserId, success, updateUser } from '../utils'

export const addNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { ownerId } = req.body

		await Promise.all([
			new Notification({ ...req.body }).save(),
			updateUser(ownerId, { hasNotification: true })
		])

		return success({}, 201, res)
	}, res)
}

export const deleteNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { id, otherUserId } = req.params
		const currentUserId = getUserId(req)

		await Promise.all([
			await Notification.findByIdAndDelete(id),
			User.findByIdAndUpdate(otherUserId,
				{ $pull: { requestsSent: currentUserId } },
				{ $new: true }
			)
		])
		

		return success({}, 200, res)
	}, res)
}

export const getUserNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		const userNotification = await Notification.find({ ownerId: userId })

		return success(userNotification, 200, res)
	}, res)
}
