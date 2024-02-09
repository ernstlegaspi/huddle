import { Request, Response } from 'express'

import Notification from '../models/notification'
import { catchError, getUserId, success } from '../utils'
import { userPullField, userSetField } from '../utils/db/user'

export const addNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { ownerId } = req.body

		await Promise.all([
			new Notification({ ...req.body }).save(),
			userSetField(ownerId, { hasNotification: true })
		])

		return success({}, 201, res)
	}, res)
}

export const deleteNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const { id, otherUserId } = req.params
		const currentUserId = getUserId(req)

		await Promise.all([
			Notification.findByIdAndDelete(id),
			userPullField(otherUserId, { requestsSent: currentUserId })
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
