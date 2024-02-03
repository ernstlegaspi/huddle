import { Request, Response } from 'express'

import Notification from '../models/notification'
import { catchError, getUserId, success } from '../utils'

export const addNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		await new Notification({ ...req.body, ownerId: userId }).save()

		return success({}, 201, res)
	}, res)
}

export const getUserNotification = async (req: Request, res: Response) => {
	return catchError(async () => {
		const userId = getUserId(req)

		const userNotification = await Notification.find({ ownerId: userId })

		console.log(userNotification)

		return success({}, 200, res)
	}, res)
}
